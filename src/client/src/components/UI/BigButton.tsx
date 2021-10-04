import React, { FC, useRef } from 'react'
import { StyleSheet, ViewStyle, Animated, TouchableWithoutFeedback } from 'react-native';
import { Color } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';

interface Props {
    text?: string;
    style?: ViewStyle;
    onPress?: () => void;
    disabled?: boolean;
    color?: string;
}

enum ColorAnimatedValue {
    DEFAULT,
    PRESSED,
}

export const BigButton: FC<Props> = ({
    text,
    style,
    disabled = false,
    onPress,
    color = Color.BLUE100
}: Props): JSX.Element => {
    const colorAnimation = useRef(new Animated.Value(ColorAnimatedValue.DEFAULT)).current;

    const onPressIn = () => {
        Animated.spring(colorAnimation, {
            toValue: ColorAnimatedValue.PRESSED,
            useNativeDriver: false,
        }).start();
    };

    const onPressOut = () => {
        Animated.spring(colorAnimation, {
            toValue: ColorAnimatedValue.DEFAULT,
            useNativeDriver: false,
        }).start();
    };

    const colorInterpolation = colorAnimation.interpolate({
        inputRange: [
            ColorAnimatedValue.DEFAULT,
            ColorAnimatedValue.PRESSED,
        ],
        outputRange: [Color.WHITE, color]
    });

    const textColorInterpolation = colorAnimation.interpolate({
        inputRange: [
            ColorAnimatedValue.DEFAULT,
            ColorAnimatedValue.PRESSED
        ],
        outputRange: [color, Color.WHITE]
    })

    return (
        <TouchableWithoutFeedback
            onPress={onPress}
            disabled={disabled}
            onPressIn={onPressIn}
            onPressOut={onPressOut}

        >
            <Animated.View style={{
                ...styles.button,
                ...style,
                backgroundColor: colorInterpolation
            }}>
                <Animated.Text style={{...styles.text, color: textColorInterpolation}}>{text}</Animated.Text>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Color.BLACK300,
        height: 70,
        minWidth: 220,

        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    text: {
        ...Fonts.button,
    },
});