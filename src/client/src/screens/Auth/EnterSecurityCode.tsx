import React, {FC, useEffect, useRef, useState} from 'react'
import {StyleSheet, View, Keyboard, TextInput} from 'react-native';
import {AuthLayout} from './AuthLayout';
import {useStores} from "../../hooks/useStores";
import {observer} from "mobx-react-lite";
import {NavigationScreenProp} from "react-navigation";
import { CodeInputGroup } from '../../components/UI/CodeInputGroup';

interface Props {
    navigation: NavigationScreenProp<any>
}

export const EnterSecurityCode: FC<Props> = observer(({navigation}) => {
    const [code, setCode] = useState<string>('');
    const { authStore: { isSubmitting, sendSecurityCode, errorMessage, clearErrorMessage } } = useStores();
    const inputRef = useRef<TextInput>();

    const handleInputChange = (value: string): void => {
        console.log(value);
        setCode(value);
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        if (code.length === 4) {
            Keyboard.dismiss();
            sendSecurityCode(code);
        }
    }, [code]);

    return (
            <AuthLayout
                title={'Подтверждение'}
                navigation={navigation}
            >
                <View>
                    <CodeInputGroup
                        onFocus={clearErrorMessage}
                        value={code}
                        onChangeText={handleInputChange}
                        ref={inputRef}
                        disabled={isSubmitting}
                        hasError={!!errorMessage}
                    />
                </View>
            </AuthLayout>
    );
});

const styles = StyleSheet.create({
});