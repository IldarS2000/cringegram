import React, { FC, useState } from 'react'
import { View, StyleSheet } from 'react-native';
import { Input } from '../../components/UI/Input';
import { Button } from '../../components/UI/Button';
import { AuthLayout } from './AuthLayout';

export const EnterPhoneNumber: FC = () => {
    const [number, setNumber] = useState<string>('');

    const handleInputChange = (value: string): void => {
        setNumber(value);
    };

    const handleButtonPress = () => {
        console.log(number);
    }

    return (
        <AuthLayout
            title={'Авторизация'}
            style={styles.authLayout}
        >
            <Input
                label='Телефон'
                placeholder='+7'
                keyboardType='numeric'
                onChangeText={handleInputChange}
                mask='+7 (999) 999-99-99'
                value={number}
                style={styles.input}
                hasError={false}
                onSubmitEditing={handleButtonPress}
            />
            <Button
                text='OK'
                onPress={handleButtonPress}
                disabled={number.length < 18}
            />
        </AuthLayout>
    );
};

const styles = StyleSheet.create({
    authLayout: {
        height: '100%',
        width: '100%',
    },
    input: {
        marginBottom: 40
    }
});