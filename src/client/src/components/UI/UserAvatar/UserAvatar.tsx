import React, {FC} from 'react'
import {StyleSheet} from 'react-native';
import {Image} from 'react-native';

interface Props {
    avatar?: string;
}

export const UserAvatar: FC<Props> = ({ avatar }: Props): JSX.Element => {
    return (
        <Image
            source={avatar
                ? {uri: avatar}
                : require('../../../../assets/icon.png')
            }
            style={styles.avatar}
        />
    );
};

const styles = StyleSheet.create({
    avatar: {
        height: '100%',
        width: '100%',
        borderRadius: 100,
    },
});