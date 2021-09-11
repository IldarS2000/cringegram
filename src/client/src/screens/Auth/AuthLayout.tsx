import React, { FC, ReactNode, useEffect, useRef } from 'react'
import { View, StyleSheet, Text, ViewStyle, Animated } from 'react-native';
import { Fonts } from '../../constants/fonts';

interface Props {
    title: string;
    style: ViewStyle;
    children: ReactNode;
}

export const AuthLayout: FC<Props> = ({ title, style, children }: Props): JSX.Element => {
    const fadeAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(
            fadeAnimation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    }, [fadeAnimation]);

    return (
        <Animated.View style={{
            ...styles.authLayout,
            ...style,
            opacity: fadeAnimation,
        }}>
            <Text style={styles.title}>{title}</Text>
            {children}
        </Animated.View>
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