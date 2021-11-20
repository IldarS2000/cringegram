import React, {FC} from 'react'
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {Color} from "../constants/colors";
import {Fonts} from "../constants/fonts";
import SubscriptionsIcon from "../../assets/svg/subscriptions.svg";
import SubscribersIcon from "../../assets/svg/subscribers.svg";
import PostsIcon from "../../assets/svg/posts.svg";
import {SubsType} from "../enums/subs.enum";
import {NavigationScreenProp} from "react-navigation";

interface Props {
    userId: number;
    postsCount: number;
    subscriptionCount: number;
    subscribersCount: number;
    navigation: NavigationScreenProp<any>;
}

export const ProfileContentInfo: FC<Props> = ({
    userId,
    postsCount,
    subscribersCount,
    subscriptionCount,
    navigation
}) => {
    const handleSubsPress = (subsType: SubsType) => {
        navigation.navigate('SUBSCRIBERS', { userId, subsType });
    };

    return (
        <View style={styles.contentInfo}>
            <TouchableWithoutFeedback onPress={() => handleSubsPress(SubsType.SUBSCRIPTIONS)}>
                <View style={styles.infoItem}>
                    <SubscriptionsIcon width={24} height={24} fill={Color.BLUE300}/>
                    <Text style={styles.infoText}>{subscriptionCount}</Text>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => handleSubsPress(SubsType.SUBSCRIBERS)}>
                <View style={styles.infoItem}>
                    <SubscribersIcon width={24} height={20} fill={Color.BLUE300}/>
                    <Text style={styles.infoText}>{subscribersCount}</Text>
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.infoItem}>
                <PostsIcon width={24} height={20} fill={Color.BLUE300}/>
                <Text style={styles.infoText}>{postsCount}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    contentInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 10,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoText: {
        ...Fonts.digits,
        marginLeft: 8,
    },
});