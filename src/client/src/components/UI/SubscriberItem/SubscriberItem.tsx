import React, {FC} from 'react'
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {View, Text} from 'react-native';
import {UserShortInfo} from "../../../interfaces/user-short-info";
import {Color} from "../../../constants/colors";
import {Fonts} from "../../../constants/fonts";
import {UserAvatar} from "../UserAvatar/UserAvatar";
import {base64ImagePrefix} from "../../../constants/base64";

interface Props {
    user: UserShortInfo;
    color: string;
    onPress: (userId: number) => void;
}

export const SubscriberItem: FC<Props> = ({user, onPress, color}) => {
    return (
        <TouchableWithoutFeedback onPress={() => onPress(user.id)}>
            <View style={{
                ...styles.item,
                backgroundColor: color,
            }}>
                <View style={styles.avatarWrapper}>
                    <UserAvatar avatar={`${base64ImagePrefix}${user.avatar}`} />
                </View>
                <Text style={styles.username}>{user.username}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    item: {
        width: '100%',
        height: 58,
        borderColor: Color.BLACK500,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 27,
        elevation: 10,
        flexDirection: 'row',
        marginBottom: 40,
        borderRadius: 15,
    },
    avatarWrapper: {
        height: 46,
        width: 46,
        borderWidth: 1,
        borderColor: Color.BLACK500,
        borderRadius: 100,
        overflow: 'hidden',
    },
    avatar: {
        height: '100%',
        width: '100%',
        borderRadius: 100,
    },
    username: {
        ...Fonts.username,
        marginBottom: 20,
        color: Color.WHITE,
    },
});