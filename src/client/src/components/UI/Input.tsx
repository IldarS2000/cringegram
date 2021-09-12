import React, { FC, useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Text, ViewStyle, TextInput, KeyboardType, Animated } from 'react-native';
import { Color } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { getStyleByCondition } from '../../utils/get-style-by-condition';
import { TextInputMask } from 'react-native-masked-text';

interface Props {
    label?: string;
    style?: ViewStyle;
    value?: string;
    placeholder?: string;
    keyboardType?: KeyboardType;
    onChangeText?: (value: string) => void;
    mask?: string;
    hasError?: boolean;
    disabled?: boolean;
    onSubmitEditing?: () => void;
    maxLength?: number;
    onFocus?: () => void;
    autofocus?: boolean;
    onChange?: () => void;
}

enum BorderColorAnimatedValue {
    ERROR,
    DEFAULT,
    FOCUS,
}

enum BackgroundColorAnimatedValue {
    DEFAULT,
    DISABLED,
}

enum BorderWidthAnimatedValue {
    DEFAULT = 1,
    FOCUS = 2,
}

export const Input: FC<Props> = ({
    label,
    style,
    value,
    placeholder,
    keyboardType,
    onChangeText,
    mask,
    disabled = false,
    hasError = false,
    onSubmitEditing,
    maxLength,
    onFocus,
    autofocus = false,
    onChange
}: Props): JSX.Element => {
    const [focused, setFocused] = useState<boolean>(false);
    const borderColorAnimation = useRef(
        new Animated.Value(BorderColorAnimatedValue.DEFAULT)
    ).current;
    const borderWidthAnimation = useRef(
        new Animated.Value(BorderWidthAnimatedValue.DEFAULT)
    ).current;
    const backgroundColorAnimation = useRef(
        new Animated.Value(BackgroundColorAnimatedValue.DEFAULT)
    ).current;

    useEffect(() => {
        const colorValue = hasError 
            ? BorderColorAnimatedValue.ERROR 
            : focused 
                ? BorderColorAnimatedValue.FOCUS 
                : BorderColorAnimatedValue.DEFAULT;
        const widthValue = focused 
            ? BorderWidthAnimatedValue.FOCUS
            : BorderWidthAnimatedValue.DEFAULT;
        const backgroundColor = disabled
            ? BackgroundColorAnimatedValue.DISABLED
            : BackgroundColorAnimatedValue.DEFAULT;
        Animated.parallel([
            Animated.timing(borderColorAnimation,
                {
                    toValue: colorValue,
                    useNativeDriver: false,
                    duration: 300
                }),
            Animated.timing(borderWidthAnimation,
                {
                    toValue: widthValue,
                    useNativeDriver: false,
                    duration: 300
                }),
            Animated.timing(backgroundColorAnimation,
                {
                    toValue: backgroundColor,
                    useNativeDriver: false,
                    duration: 300
                }),
        ]).start();
    }, [borderColorAnimation, focused, hasError, borderWidthAnimation, backgroundColorAnimation, disabled]);

    const borderColorInterpolation = borderColorAnimation.interpolate({
        inputRange: [
            BorderColorAnimatedValue.ERROR,
            BorderColorAnimatedValue.DEFAULT,
            BorderColorAnimatedValue.FOCUS
        ],
        outputRange: [Color.RED300, Color.BLACK500, Color.BLUE300],
    });

    const backgroundColorInterpolation = backgroundColorAnimation.interpolate({
        inputRange: [
            BackgroundColorAnimatedValue.DEFAULT,
            BackgroundColorAnimatedValue.DISABLED,
        ],
        outputRange: [Color.WHITE, Color.BLACK200],
    });

    const paddingInterpolation = borderWidthAnimation.interpolate({
        inputRange: [
            BorderWidthAnimatedValue.DEFAULT,
            BorderWidthAnimatedValue.FOCUS
        ],
        outputRange: [22, 21],
    });

    const InputComponent = mask ? TextInputMask : TextInput;
    const maskedProps: any = !mask ? {} : {
        type: 'custom',
        options: {
            mask
        }
    };

    return (
        <View style={{
            ...styles.wrapper,
            ...style,
        }}>
            {label && (
                <Text style={styles.label}>{label}</Text>
            )}
            <Animated.View style={{
                backgroundColor: backgroundColorInterpolation,
                borderColor: borderColorInterpolation,
                borderWidth: borderWidthAnimation,
                borderRadius: 50,
                height: 55,
                justifyContent: 'center',
                paddingHorizontal: paddingInterpolation
            }}>
                {/*@ts-ignore*/}
                <InputComponent
                    {...maskedProps}
                    style={{
                        ...styles.input,
                        ...getStyleByCondition(hasError, styles.error),
                        ...getStyleByCondition(disabled, styles.disabled)
                    }}
                    placeholderTextColor={Color.BLACK300}
                    selectionColor={Color.BLUE300}
                    value={value}
                    onFocus={() => {
                        onFocus?.();
                        setFocused(true);
                    }}
                    autofocus={autofocus}
                    onChange={onChange}
                    onBlur={() => setFocused(false)}
                    placeholder={focused ? '' : placeholder}
                    keyboardType={keyboardType}
                    onChangeText={onChangeText}
                    editable={!disabled}
                    onSubmitEditing={onSubmitEditing}
                    maxLength={maxLength}
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: 80,
        justifyContent: 'center',
    },
    label: {
        ...Fonts.inputLabel,
        marginBottom: 4,
    },
    input: {
        ...Fonts.inputText,
        width: '100%',
    },
    disabled: {
        color: Color.BLACK300
    },
    error: {
        borderColor: Color.RED300,
    }
});