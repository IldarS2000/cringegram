import React, {FC, useEffect, useMemo, useState} from 'react'
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {observer} from 'mobx-react-lite';
import {NavigationRoute, NavigationScreenProp} from "react-navigation";
import {SubsType} from "../enums/subs.enum";
import {formatSubsType} from "../utils/format-subs-type";
import SubscribersIcon from './../../assets/svg/subscribers.svg';
import SubscriptionsIcon from './../../assets/svg/subscriptions.svg';
import {Fonts} from "../constants/fonts";
import {UserShortInfo} from "../interfaces/user-short-info";
import {SubscriberItem} from "../components/UI/SubscriberItem/SubscriberItem";
import {Color} from "../constants/colors";
import {getSubscribers, getSubscriptions} from "../services/api.service";

interface Props {
    navigation: NavigationScreenProp<any>;
    route: NavigationRoute<{subsType: SubsType, userId: number}>;
}

export const Subscribers: FC<Props> = observer(({navigation, route}) => {
    const [users, setUsers] = useState<UserShortInfo[]>([]);

    const Icon = useMemo(() => {
        return route.params?.subsType === SubsType.SUBSCRIBERS
            ? SubscribersIcon
            : SubscriptionsIcon;
    }, [route.params?.subsType]);

    const color = useMemo(() => {
        return route.params?.subsType === SubsType.SUBSCRIBERS
            ? Color.ORANGE300
            : Color.BLUE300;
    }, [route.params?.subsType]);

    useEffect(() => {
        const getUsers = async (userId: number, subsType: SubsType) => {
            return subsType === SubsType.SUBSCRIBERS
                ? getSubscribers(userId)
                : getSubscriptions(userId);
        };
        if (route.params?.userId !== null && route.params?.userId !== undefined && route.params.subsType) {
            getUsers(route.params.userId, route.params.subsType).then((users) => {
                debugger
                setUsers(users);
            });
        }
    }, [route.params?.userId, route.params?.subsType]);

    const handleUserPress = (userId: number) => {
        navigation.navigate('OTHER_PROFILE', { userId });
    };

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>{formatSubsType(route.params!.subsType)}</Text>
            <Icon style={styles.icon} width={70} height={70} fill={color} />
            <FlatList<UserShortInfo>
                style={styles.users}
                data={users}
                keyExtractor={({ id }) => `${id}`}
                renderItem={({ item }) => {
                    return <SubscriberItem
                        user={item}
                        color={color}
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