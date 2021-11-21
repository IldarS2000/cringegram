import React, {FC, useEffect, useState} from 'react'
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {observer} from 'mobx-react-lite';
import {NavigationRoute, NavigationScreenProp} from "react-navigation";
import DislikeIcon from '../images/dislike.svg';
import {Fonts} from "../constants/fonts";
import {UserShortInfo} from "../interfaces/user-short-info";
import {Color} from "../constants/colors";
import {getLikes} from "../services/api.service";
import {SubscriberItem} from "../components/UI/SubscriberItem/SubscriberItem";

interface Props {
    navigation: NavigationScreenProp<any>;
    route: NavigationRoute<{postId: number}>;
}

export const Likes: FC<Props> = observer(({navigation, route}) => {
    const [users, setUsers] = useState<UserShortInfo[]>([]);

    useEffect(() => {
        route.params?.postId && getLikes(route.params.postId).then((response) => {
            setUsers(response.data);
        });
    }, [route.params?.postId]);

    const handleUserPress = (userId: number) => {
        navigation.navigate('OTHER_PROFILE', { userId });
    };

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Оценки</Text>
            <DislikeIcon style={styles.icon} width={70} height={70} fill={Color.BLUE300} />
            <FlatList<UserShortInfo>
                style={styles.users}
                data={users}
                keyExtractor={({ id }) => `${id}`}
                renderItem={({ item }) => {
                    return <SubscriberItem
                        user={item}
                        color={Color.BLUE300}
                        onPress={handleUserPress}
                    />
                }}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        marginTop: 60,
    },
    title: {
        ...Fonts.h1,
        marginBottom: 12,
    },
    icon: {
        height: 70,
        width: 70,
        marginBottom: 15,
    },
    users: {
        width: '90%',
        marginBottom: 40,
    },
});