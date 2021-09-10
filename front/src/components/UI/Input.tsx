import React, { FC, useState } from 'react'
import { View, StyleSheet, Text, ViewStyle, TextInput, KeyboardType } from 'react-native';
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
}: Props): JSX.Element => {
    const [focused, setFocused] = useState<boolean>(false);

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
            <InputComponent
                {...maskedProps}
                style={{
                    ...styles.input,
                    ...getStyleByCondition(focused, styles.focused),
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
            />
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
        borderWidth: 1,
        borderColor: Color.BLACK500,
        height: 55,
        paddingHorizontal: 22
    },
    focused: {
        borderWidth: 2,
        borderColor: Color.BLUE300,
    },
    disabled: {
        backgroundColor: Color.BLACK100,
    },
    error: {
        borderColor: Color.RED300,
    }
});