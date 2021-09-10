import React, { FC } from 'react'
import { View, StyleSheet, Text, ViewStyle, TouchableHighlight } from 'react-native';
import { Color } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { getStyleByCondition } from '../../utils/get-style-by-condition';

interface Props {
    text?: string;
    style?: ViewStyle;
    onPress?: () => void;
    disabled?: boolean;
}

export const Button: FC<Props> = ({
    text,
    style,
    disabled = false,
    onPress
}: Props): JSX.Element => {
    return (
        <TouchableHighlight
            style={{
                ...styles.button,
                ...style,
                ...getStyleByCondition(disabled, styles.disabled)
            }}
            delayPressIn={0}
            delayPressOut={0}
            activeOpacity={1}
            underlayColor={Color.GREEN100}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={styles.text}>{text}</Text>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Color.GREEN300,
        borderRadius: 35,
        height: 70,
        minWidth: 70,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    text: {
        ...Fonts.button,
        color: Color.WHITE,
    },
    pressed: {
        backgroundColor: Color.GREEN100
    },
    disabled: {
        backgroundColor: Color.BLACK200,
    },
});