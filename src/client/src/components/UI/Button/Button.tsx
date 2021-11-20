import React, { FC, useEffect, useRef } from 'react'
import { StyleSheet, Text, ViewStyle, Animated, TouchableWithoutFeedback } from 'react-native';
import { Color } from '../../../constants/colors';
import { Fonts } from '../../../constants/fonts';

interface Props {
    text?: string;
    style?: ViewStyle;
    onPress?: () => void;
    disabled?: boolean;
    primaryColor?: string;
    secondaryColor?: string;
}

enum ColorAnimatedValue {
    DEFAULT,
    PRESSED,
    DISABLED
}

export const Button: FC<Props> = ({
    text,
    style,
    disabled = false,
    onPress,
    primaryColor = Color.GREEN300,
    secondaryColor = Color.GREEN100,
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

    useEffect(() => {
        const colorValue = disabled ? ColorAnimatedValue.DISABLED : ColorAnimatedValue.DEFAULT;
        Animated.timing(colorAnimation, {
            toValue: colorValue,
            useNativeDriver: false,
            duration: 200
        }).start();
    }, [colorAnimation, disabled]);

    const colorInterpolation = colorAnimation.interpolate({
        inputRange: [
            ColorAnimatedValue.DEFAULT,
            ColorAnimatedValue.PRESSED,
            ColorAnimatedValue.DISABLED
        ],
        outputRange: [primaryColor, secondaryColor, Color.BLACK200]
    });

    return (
        <TouchableWithoutFeedback
            onPress={onPress}
            disabled={disabled}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={style}
        >
            <Animated.View style={{
                ...styles.button,
                backgroundColor: colorInterpolation
            }}>
                <Text style={styles.text}>{text}</Text>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 35,
        height: 70,
        minWidth: 70,
        maxWidth: 70,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 15,
    },
    text: {
        ...Fonts.button,
        color: Color.WHITE,
    },
});