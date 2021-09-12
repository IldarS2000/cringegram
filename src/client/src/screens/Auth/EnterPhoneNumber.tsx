import React, { FC, useState } from 'react'
import { StyleSheet } from 'react-native';
import { Input } from '../../components/UI/Input';
import { Button } from '../../components/UI/Button';
import { AuthLayout } from './AuthLayout';
import {useStores} from "../../hooks/useStores";
import {formatPhoneNumber} from "../../utils/format-phone-number";
import { observer } from 'mobx-react-lite';
import {NavigationScreenProp} from "react-navigation";

interface Props {
    navigation: NavigationScreenProp<any>
}

export const EnterPhoneNumber: FC<Props> = observer(({navigation}) => {
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const { authStore: { isSubmitting, errorMessage, sendPhoneNumber } } = useStores();

    const handleInputChange = (value: string): void => {
        setPhoneNumber(value);
    };

    const handleButtonPress = () => {
        const number = formatPhoneNumber(phoneNumber);
        if (number.length === 12) {
            sendPhoneNumber(formatPhoneNumber(phoneNumber));
        }
    };

    return (
        <AuthLayout
            title={'Авторизация'}
            style={styles.authLayout}
            navigation={navigation}
        >
            <Input
                label='Телефон'
                placeholder='+7'
                keyboardType='numeric'
                onChangeText={handleInputChange}
                mask='+7 (999) 999-99-99'
                value={phoneNumber}
                style={styles.input}
                hasError={!!errorMessage}
                onSubmitEditing={handleButtonPress}
                disabled={false}
            />
            <Button
                text='OK'
                onPress={handleButtonPress}
                disabled={phoneNumber.length < 18 || isSubmitting}
            />
        </AuthLayout>
    );
});

const styles = StyleSheet.create({
    authLayout: {
        height: '100%',
        width: '100%',
    },
    input: {
        marginBottom: 40
    }
});