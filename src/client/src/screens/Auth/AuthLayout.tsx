import React, {FC, ReactNode, useEffect, useRef} from 'react'
import {Animated, BackHandler, StyleSheet, Text, ViewStyle} from 'react-native';
import {Fonts} from '../../constants/fonts';
import {useStores} from "../../hooks/useStores";
import {AuthStage} from "../../enums/auth-stage.enum";
import {NavigationScreenProp} from "react-navigation";
import {observer} from "mobx-react-lite";

interface Props {
    title: string;
    style?: ViewStyle;
    children: ReactNode;
    navigation: NavigationScreenProp<any>
}

export const AuthLayout: FC<Props> = observer(({ title, style, children, navigation }: Props): JSX.Element => {
    const { authStore: {authStage, setAuthStage} } = useStores();
    useEffect(() => {
        switch (authStage) {
            case AuthStage.PHONE_NUMBER:
                navigation.navigate('Phone');
                break;
            case AuthStage.SECURITY_CODE:
                navigation.navigate('Code');
                break;
            case AuthStage.NICKNAME:
                navigation.navigate('Name')
                break;
        }
    }, [authStage]);

    useEffect(() => {
        const onBack = () => {
             switch (authStage) {
                 case AuthStage.NICKNAME:
                     setAuthStage(AuthStage.SECURITY_CODE);
                     break;
                 case AuthStage.SECURITY_CODE:
                     setAuthStage(AuthStage.PHONE_NUMBER);
                     break;
             }
        };
        //@ts-ignore
        const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);
        return () => backHandler.remove();
    }, []);

    const fadeAnimation = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(
            fadeAnimation, {
            toValue: 1,
            duration: 200,
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
});

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