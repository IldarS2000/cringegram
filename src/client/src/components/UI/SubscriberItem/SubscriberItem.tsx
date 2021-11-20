import React, {FC} from 'react'
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {View, Text, Image} from 'react-native';
import {UserSearchResult} from "../../../interfaces/user-search-result";
import {Color} from "../../../constants/colors";
import {Fonts} from "../../../constants/fonts";

interface Props {
    user: UserSearchResult;
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
                    <Image
                        source={user.avatar
                            ? {uri: user.avatar}
                            : require('../../../../assets/icon.png')
                        }
                        style={styles.avatar}
                    />
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