import React, { FC, ReactNode } from 'react'
import { View, StyleSheet, Text, ViewStyle } from 'react-native';
import { Fonts } from '../../constants/fonts';

interface Props {
    title: string;
    style: ViewStyle;
    children: ReactNode;
}

export const AuthLayout: FC<Props> = ({ title, style, children }: Props): JSX.Element => {
    return (
        <View style={{
            ...styles.authLayout,
            ...style
        }}>
            <Text style={styles.title}>{title}</Text>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    authLayout: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        marginTop: 88,
        marginBottom: 40,
        ...Fonts.h1,
    }
});