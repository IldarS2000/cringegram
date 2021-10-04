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

export const SignIn: FC<Props> = observer(({navigation}) => {
    const [password, setPassword] = useState<string>('');
    const {authStore: {isSubmitting, errorMessage, clearErrorMessage, signIn }} = useStores();

    const handleButtonPress = () => {
        if (password.length >= 6) {
            signIn(password);
        }
    };

    return (
        <AuthLayout
            title={'Авторизация'}
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
            <Button
                text='OK'
                onPress={handleButtonPress}
                disabled={password.length < 6}
            />
        </AuthLayout>
    );
});

const styles = StyleSheet.create({
    input: {
        marginBottom: 40,
    }
});