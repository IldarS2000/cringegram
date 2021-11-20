import React, {FC} from 'react'
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {View, Text, Image} from 'react-native';
import {UserSearchResult} from "../../../interfaces/user-search-result";
import {Color} from "../../../constants/colors";
import {Fonts} from "../../../constants/fonts";

interface Props {
    user: UserSearchResult;
    onPress: (userId: number) => void;
}

export const UserSearchItem: FC<Props> = ({user, onPress}) => {
    return (
        <TouchableWithoutFeedback onPress={() => onPress(user.id)}>
            <View style={styles.item}>
                <View style={styles.avatarWrapper}>
                    <Image
                        source={user.avatar
                            ? {uri: user.avatar}
                            : require('../../../../assets/icon.png')
                        }
                        style={styles.avatar}
                    />
                </View>
                <View style={styles.info}>
                    <Text style={styles.username}>{user.username}</Text>
                    <Text style={styles.about}>{user.aboutMe}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    item: {
        width: '100%',
        height: 96,
        borderColor: Color.BLACK500,
        borderWidth: 2,
        borderBottomLeftRadius: 48,
        borderTopLeftRadius: 48,
        borderTopRightRadius: 24,
        borderBottomRightRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.BLUE100,
        elevation: 10,
        flexDirection: 'row',
        position: 'relative',
        marginBottom: 40,
    },
    avatarWrapper: {
        height: 96,
        width: 96,
        borderWidth: 2,
        borderColor: Color.BLACK500,
        borderRadius: 48,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: -2,
        overflow: 'hidden',
    },
    avatar: {
        height: '100%',
        width: '100%',
        borderRadius: 100,
    },
    info: {
        height: '100%',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    username: {
        ...Fonts.username,
        marginBottom: 20,
    },
    about: {
        ...Fonts.description,
    },
});