import React, {FC, useEffect, useRef, useState} from 'react'
import {Animated, StyleSheet, Text} from 'react-native';
import {observer} from 'mobx-react-lite';
import {useStores} from "../hooks/useStores";
import {Input} from "../components/UI/Input/Input";
import {Button} from "../components/UI/Button/Button";
import {Fonts} from "../constants/fonts";

export const EnterUsername: FC = observer((): JSX.Element => {
    const { profileStore: { updateUsername, errorMessage, clearErrorMessage, isLoading } } = useStores();
    const [username, setUsername] = useState<string>('');

    const fadeAnimation = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(
            fadeAnimation, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true
            }).start();
    }, [fadeAnimation]);

    const handleButtonPress = () => {
        if (username.length >= 4 && username.length <= 16) {
            updateUsername(username);
        }
    };

    return (
        <Animated.View style={{
            ...styles.enterUsername,
            opacity: fadeAnimation,
        }}>
            <Text style={styles.title}>Введите никнейм</Text>
            <Input
                placeholder='Никнейм'
                onChangeText={setUsername}
                onFocus={clearErrorMessage}
                value={username}
                style={styles.input}
                hasError={!!errorMessage}
                onSubmitEditing={handleButtonPress}
                disabled={isLoading}
                maxLength={16}
                autoFocus={true}
            />
            <Button
                text='OK'
                onPress={handleButtonPress}
                disabled={username.length < 4 || username.length > 16}
            />
        </Animated.View>
    );
});

const styles = StyleSheet.create({
    enterUsername: {
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
    },
    input: {
        marginBottom: 40,
    }
});