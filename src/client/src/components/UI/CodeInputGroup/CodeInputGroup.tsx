import React, {forwardRef, useEffect, useRef, useState} from 'react'
import {Animated, StyleSheet, Text, ViewStyle,} from 'react-native';
import {Color} from '../../../constants/colors';
import {CodeField, Cursor, useClearByFocusCell} from "react-native-confirmation-code-field";
import {Fonts} from "../../../constants/fonts";

interface Props {
    style?: ViewStyle;
    value: string;
    onChangeText: (value: string) => void;
    hasError?: boolean;
    disabled?: boolean;
    onFocus?: () => void;
}

const CELL_COUNT = 4;

enum BorderColorAnimatedValue {
    ERROR,
    DEFAULT,
    FOCUS
}

enum BackgroundColorAnimatedValue {
    DEFAULT,
    DISABLED,
}

export const CodeInputGroup = forwardRef(({
      style,
      value,
      onChangeText,
      disabled = false,
      hasError = false,
      onFocus
}: Props, ref): JSX.Element => {
    const [inputValue, setInputValue] = useState('');
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value: inputValue,
        setValue: setInputValue,
    });

    useEffect(() => {
        onChangeText(inputValue);
    }, [inputValue]);

    return (
        <CodeField
            //@ts-ignore
            ref={(input) => ref && (ref.current = input)}
            {...props}
            value={inputValue}
            onChangeText={setInputValue}
            cellCount={CELL_COUNT}
            rootStyle={[styles.codeInputGroup, style]}
            keyboardType='number-pad'
            textContentType='oneTimeCode'
            editable={!disabled}
            onFocus={onFocus}
            renderCell={({index, symbol, isFocused}) => {
                const borderColorAnimation = useRef(
                    new Animated.Value(BorderColorAnimatedValue.DEFAULT)
                ).current;
                const borderColorInterpolation = borderColorAnimation.interpolate({
                    inputRange: [
                        BorderColorAnimatedValue.ERROR,
                        BorderColorAnimatedValue.DEFAULT,
                        BorderColorAnimatedValue.FOCUS
                    ],
                    outputRange: [Color.RED300, Color.BLACK500, Color.BLUE300]
                });

                const backgroundColorAnimation = useRef(
                    new Animated.Value(BackgroundColorAnimatedValue.DEFAULT)
                ).current;
                const backgroundColorInterpolation = backgroundColorAnimation.interpolate({
                    inputRange: [BackgroundColorAnimatedValue.DEFAULT, BackgroundColorAnimatedValue.DISABLED],
                    outputRange: [Color.BLACK100, Color.BLACK200],
                });

                useEffect(() => {
                    const borderColorValue = hasError
                        ? BorderColorAnimatedValue.ERROR
                        : isFocused
                            ? BorderColorAnimatedValue.FOCUS
                            : BorderColorAnimatedValue.DEFAULT;
                    const backgroundColor = disabled
                        ? BackgroundColorAnimatedValue.DISABLED
                        : BackgroundColorAnimatedValue.DEFAULT;
                    Animated.parallel([
                        Animated.timing(borderColorAnimation,
                            {
                                toValue: borderColorValue,
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
                }, [borderColorAnimation, backgroundColorAnimation, isFocused, hasError, disabled]);

                return (
                    <Animated.View style={{
                        ...styles.cell,
                        borderColor: borderColorInterpolation,
                        backgroundColor: backgroundColorInterpolation,
                    }} key={index}

                    >
                        <Text
                            style={styles.cellText}
                            onLayout={getCellOnLayoutHandler(index)}
                        >
                            {symbol || (isFocused ? <Cursor/> : null)}
                        </Text>
                    </Animated.View>
                );
            }}
        />
    );
});

const styles = StyleSheet.create({
    codeInputGroup: {
        flexDirection: 'row'
    }
    ,
    cell: {
        justifyContent: 'center',
        borderWidth: 1,
        width: 52,
        height: 75,
        borderRadius: 8,
        marginRight: 7,
    },
    cellText: {
        ...Fonts.h1,
        textAlign: 'center'
    },
    error: {
        borderColor: Color.RED300,
    }
});