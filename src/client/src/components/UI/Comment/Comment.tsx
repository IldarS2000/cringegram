import React, {FC, useEffect, useState} from "react";
import {StyleSheet, View, Text, TouchableWithoutFeedback} from "react-native";
import {getUserShortInfo} from "../../../services/api.service";
import { Comment as IComment } from "../../../interfaces/comment";
import {UserAvatar} from "../UserAvatar/UserAvatar";
import {UserShortInfo} from "../../../interfaces/user-short-info";
import {Fonts} from "../../../constants/fonts";
import {Color} from "../../../constants/colors";

interface Props {
    comment: IComment;
    onUserPress: (userId: number) => void;
}

export const Comment: FC<Props> = ({ comment, onUserPress }: Props): JSX.Element => {
    const [user, setUser] = useState<UserShortInfo>();

    useEffect(() => {
        getUserShortInfo(comment.userId).then((response) => {
            setUser(response.data);
        });
    }, []);

    const handleUserPress = () => {
        onUserPress(comment.userId);
    };

    return (
        <View style={styles.comment}>
            <TouchableWithoutFeedback onPress={handleUserPress}>
                <Text style={styles.username}>{user?.username}</Text>
            </TouchableWithoutFeedback>
            <View style={styles.wrapper}>
                <TouchableWithoutFeedback onPress={handleUserPress}>
                    <View style={styles.avatarWrapper}>
                        <UserAvatar avatar={user?.avatar} />
                    </View>
                </TouchableWithoutFeedback>
                <Text style={styles.text}>{comment.comment}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    comment: {
        maxWidth: 305,
        minWidth: 280,
        width: '100%',
        alignItems: 'center',
        minHeight: 108,
        elevation: 10,
        paddingBottom: 10,
        borderRadius: 18,
        backgroundColor: Color.WHITE,
        marginBottom: 15,
    },
    username: {
        ...Fonts.username,
        textAlign: 'center',
        width: '100%',
        marginVertical: 8,
    },
    avatarWrapper: {
        height: 52,
        width: 52,
        overflow: 'hidden',
        borderRadius: 52,
        borderWidth: 1,
        borderColor: Color.ORANGE300,
        marginRight: 8,
    },
    wrapper: {
        paddingHorizontal: 10,
        flexDirection: 'row',
    },
    text: {
        ...Fonts.comment,
        flexGrow: 1,
        maxWidth: '70%',
    },

});