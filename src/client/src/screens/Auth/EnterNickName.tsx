import React, {FC, useState} from 'react'
import {StyleSheet} from 'react-native';
import {Input} from '../../components/UI/Input';
import {Button} from '../../components/UI/Button';
import {AuthLayout} from './AuthLayout';
import {useStores} from "../../hooks/useStores";
import {observer} from 'mobx-react-lite';
import {NavigationScreenProp} from "react-navigation";

interface Props {
    navigation: NavigationScreenProp<any>
}

export const EnterNickName: FC<Props> = observer(({navigation}) => {
    const [nickName, setNickName] = useState<string>('');
    const {authStore: {isSubmitting, errorMessage, sendNickName, clearErrorMessage}} = useStores();

    const handleInputChange = (value: string): void => {
        setNickName(value);
    };

    const handleButtonPress = () => {
        if (nickName.length >= 4) {
            sendNickName(nickName);
        }
    };

    return (
        <AuthLayout
            title={'Введите никнейм'}
            navigation={navigation}
        >
            <Input
                placeholder='имя пользователя'
                onChangeText={handleInputChange}
                onFocus={clearErrorMessage}
                value={nickName}
                style={styles.input}
                hasError={!!errorMessage}
                onSubmitEditing={handleButtonPress}
                disabled={isSubmitting}
                maxLength={20}
                autofocus={true}
            />
            <Button
                text='OK'
                onPress={handleButtonPress}
                disabled={nickName.length < 4 || isSubmitting}
            />
        </AuthLayout>
    );
});

const styles = StyleSheet.create({
    input: {
        marginBottom: 40,
    }
});