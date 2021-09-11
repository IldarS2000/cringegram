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
}

enum BorderColorAnimatedValue {
    DEFAULT,
    ERROR,
    FOCUS
}

enum BorderWidthAnimatedValue {
    DEFAULT = 1,
    FOCUS = 2
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
}: Props): JSX.Element => {
    const [focused, setFocused] = useState<boolean>(false);
    const borderColorAnimation = useRef(
        new Animated.Value(BorderColorAnimatedValue.DEFAULT)
    ).current;
    const borderWidthAnimation = useRef(
        new Animated.Value(BorderWidthAnimatedValue.DEFAULT)
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
                })
        ]).start();
    }, [borderColorAnimation, focused, hasError]);

    const borderColorInterpolation = borderColorAnimation.interpolate({
        inputRange: [
            BorderColorAnimatedValue.DEFAULT,
            BorderColorAnimatedValue.ERROR,
            BorderColorAnimatedValue.FOCUS
        ],
        outputRange: [Color.BLACK500, Color.RED300, Color.BLUE300],
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
                borderColor: borderColorInterpolation,
                borderWidth: borderWidthAnimation,
                borderRadius: 50,
                height: 55,
                justifyContent: 'center',
                paddingHorizontal: paddingInterpolation
            }}>
                <InputComponent
                    {...maskedProps}
                    style={{
                        ...styles.input,
                        ...getStyleByCondition(hasError, styles.error),
                        ...getStyleByCondition(disabled, styles.disabled)
                    }}
                    placeholderTextColor={Color.BLACK200}
                    selectionColor={Color.BLUE300}
                    value={value}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder={focused ? '' : placeholder}
                    keyboardType={keyboardType}
                    onChangeText={onChangeText}
                    editable={!disabled}
                    onSubmitEditing={onSubmitEditing}
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: 80,
    },
    label: {
        ...Fonts.inputLabel,
        marginBottom: 4,
    },
    input: {
        ...Fonts.inputText,
        borderRadius: 50,
        height: 55,
    },
    disabled: {
        backgroundColor: Color.BLACK100,
        color: Color.BLACK300
    },
    error: {
        borderColor: Color.RED300,
    }
});