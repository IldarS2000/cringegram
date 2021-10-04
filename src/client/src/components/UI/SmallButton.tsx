import React, {FC, ReactNode} from 'react'
import {StyleSheet, ViewStyle, TouchableWithoutFeedback, View} from 'react-native';
import { Color } from '../../constants/colors';

interface Props {
    text?: string;
    style?: ViewStyle;
    onPress?: () => void;
    disabled?: boolean;
    icon?: ReactNode;
}

export const SmallButton: FC<Props> = ({
    icon,
    style,
    disabled = false,
    onPress,
}: Props): JSX.Element => {

    return (
        <TouchableWithoutFeedback
            onPress={onPress}
            disabled={disabled}
        >
            <View style={{
                ...styles.button,
                ...style,
            }}>
                {icon}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Color.WHITE,
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Color.BLACK300,
        justifyContent: 'center',
        alignItems: 'center',
    },
});