import React, {FC, useState} from 'react'
import {StyleSheet} from 'react-native';
import {Input} from '../../components/UI/Input';
import {Button} from '../../components/UI/Button';
import {AuthLayout} from './AuthLayout';
import {useStores} from '../../hooks/useStores';
import {observer} from 'mobx-react-lite';
import {NavigationScreenProp} from "react-navigation";

interface Props {
    navigation: NavigationScreenProp<any>
}

export const SignUp: FC<Props> = observer(({navigation}) => {
    const [password, setPassword] = useState<string>('');
    const [verify, setVerify] = useState<string>('');
    const {authStore: {isSubmitting, errorMessage, clearErrorMessage, signUp }} = useStores();

    const handleButtonPress = () => {
        if (password.length >= 6 && password === verify) {
            signUp(password);
        }
    };

    return (
        <AuthLayout
            title='Регистрация'
            navigation={navigation}
        >
            <Input
                label='Пароль'
                placeholder='Пароль'
                onChangeText={setPassword}
                onFocus={clearErrorMessage}
                value={password}
                style={styles.input}
                hasError={!!errorMessage}
                onSubmitEditing={handleButtonPress}
                disabled={isSubmitting}
                maxLength={20}
                autoFocus={true}
                secureTextEntry={true}
            />
            <Input
                label='Подтверждение пароля'
                placeholder='Подтверждение пароля'
                onChangeText={setVerify}
                onFocus={clearErrorMessage}
                value={verify}
                style={styles.input}
                hasError={!!errorMessage}
                onSubmitEditing={handleButtonPress}
                disabled={isSubmitting}
                maxLength={20}
                autoFocus={true}
                secureTextEntry={true}
            />
            <Button
                text='OK'
                onPress={handleButtonPress}
                disabled={password.length < 6 && password !== verify}
            />
        </AuthLayout>
    );
});

const styles = StyleSheet.create({
    input: {
        marginBottom: 40,
    }
});