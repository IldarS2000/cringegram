import React, {FC, useState} from 'react'
import {StyleSheet, TouchableWithoutFeedback, Text, View} from 'react-native';
import {AuthLayout} from './AuthLayout';
import {useStores} from "../../hooks/useStores";
import {observer} from "mobx-react-lite";
import {NavigationScreenProp} from "react-navigation";
import {AuthStage} from "../../enums/auth-stage.enum";

interface Props {
    navigation: NavigationScreenProp<any>
}

export const EnterSecurityCode: FC<Props> = observer(({navigation}) => {
    const [code, setCode] = useState<string>('');
    const { authStore: { isSubmitting, setAuthStage } } = useStores();

    const handleInputChange = (value: string): void => {
        setCode(value);
    };

    const handleButtonPress = () => {
        console.log(code);
    }

    return (
            <AuthLayout
                title={'Подтверждение'}
                style={styles.authLayout}
                navigation={navigation}
            >
                <View>
                    <TouchableWithoutFeedback
                        onPress={() => setAuthStage(AuthStage.PHONE_NUMBER)}
                    >
                        <Text>КЕК</Text>
                    </TouchableWithoutFeedback>
                </View>
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