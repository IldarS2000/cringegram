import React, {FC} from 'react'
import {StyleSheet} from 'react-native';
import {Image} from 'react-native';
import {base64ImagePrefix} from "../../../constants/base64";

interface Props {
    avatar?: string;
}

export const UserAvatar: FC<Props> = ({ avatar }: Props): JSX.Element => {
    return (
        <Image
            source={avatar
                ? {uri: `${base64ImagePrefix}${avatar}`}
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