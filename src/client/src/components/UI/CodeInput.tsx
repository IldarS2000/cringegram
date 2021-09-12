import React, { FC, useState } from 'react'
import {
    View,
    StyleSheet,
    Text,
    ViewStyle,
    KeyboardType,
} from 'react-native';
import { Color } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { TextInputMask } from 'react-native-masked-text';

interface Props {
    label?: string;
    style?: ViewStyle;
    value?: string;
    keyboardType?: KeyboardType;
    onChangeText?: (value: string) => void;
    hasError?: boolean;
    disabled?: boolean;
    onSubmitEditing?: () => void;
}

export const CodeInput: FC<Props> = ({
     label,
     style,
     value,
     keyboardType,
     onChangeText,
     disabled = false,
     hasError = false,
     onSubmitEditing,
 }: Props): JSX.Element => {
    const [focused, setFocused] = useState<boolean>(false);

    return (
        <View
            style={{
            ...styles.wrapper,
            ...style,
        }}>
            {label && (
                <Text style={styles.label}>{label}</Text>
            )}
                <TextInputMask
                    type='custom'
                    options={{
                        mask: '9'
                    }}
                />
                <TextInputMask
                    type='custom'
                    options={{
                        mask: '9'
                    }}
                />
                <TextInputMask
                    type='custom'
                    options={{
                        mask: '9'
                    }}
                />
                <TextInputMask
                    type='custom'
                    options={{
                        mask: '9'
                    }}
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
    disabled: {
        backgroundColor: Color.BLACK100,
        color: Color.BLACK300
    },
    error: {
        borderColor: Color.RED300,
    }
});