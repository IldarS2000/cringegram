import React, {FC} from 'react'
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {observer} from 'mobx-react-lite';
import {NavigationScreenProp} from "react-navigation";
import { View, Text } from 'react-native';
import { useStores } from '../hooks/useStores';
import { Fonts } from '../constants/fonts';

interface Props {
    navigation: NavigationScreenProp<any>
}

export const Profile: FC<Props> = observer(({navigation}) => {
    const {authStore: { logout }} = useStores();

    return (
        <View style={styles.screen}>
            <TouchableWithoutFeedback
                onPress={logout}
            >
                <Text style={styles.text}>kekwmek</Text>
            </TouchableWithoutFeedback>
        </View>
    );
});

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    text: {
        ...Fonts.h1
    }
});