import React, {FC} from 'react'
import {StyleSheet} from 'react-native';
import {Input} from '../../components/UI/Input';
import {Button} from '../../components/UI/Button';
import {AuthLayout} from './AuthLayout';
import {useStores} from "../../hooks/useStores";
import {observer} from 'mobx-react-lite';
import {NavigationScreenProp} from "react-navigation";
import {validateEmail} from "../../utils/validate-email";

interface Props {
    navigation: NavigationScreenProp<any>
}

export const Email: FC<Props> = observer(({navigation}) => {
    const {authStore: {isSubmitting, errorMessage, checkUserExists, clearErrorMessage, setEmail, email }} = useStores();

    const handleButtonPress = () => {
        if (validateEmail(email)) {
            checkUserExists(email);
        }
    };

    return (
        <AuthLayout
            title={'Добро пожаловать!'}
            navigation={navigation}
        >
            <Input
                label='Почтовый ящик'
                placeholder='Почтовый ящик'
                onChangeText={setEmail}
                onFocus={clearErrorMessage}
                value={email}
                style={styles.input}
                hasError={!!errorMessage}
                onSubmitEditing={handleButtonPress}
                disabled={isSubmitting}
                keyboardType='email-address'
                autoFocus={true}
            />
            <Button
                text='OK'
                onPress={handleButtonPress}
                disabled={!validateEmail(email)}
            />
        </AuthLayout>
    );
});

const styles = StyleSheet.create({
    input: {
        marginBottom: 40,
    }
});