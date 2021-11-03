import React, {FC} from 'react'
import {Image, StyleSheet} from 'react-native';
import {observer} from 'mobx-react-lite';
import {NavigationScreenProp} from "react-navigation";
import {View, Text} from 'react-native';
import {Fonts} from "../constants/fonts";
import LogoImage from '../images/logo-light.svg';
import {Color} from "../constants/colors";

interface Props {
    navigation: NavigationScreenProp<any>
}

export const About: FC<Props> = observer(({navigation}) => {

    return (
        <View style={styles.screen}>
            <Text style={styles.text}>Cringegram&nbsp;&mdash; антипод Instagram.
                Приложение сделано с&nbsp;целью высмеять концепт</Text>
            <View style={styles.logoWrapper}>
                <LogoImage style={styles.logo} height={163} width={163} />
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        ...Fonts.description,
        maxWidth: 295,
    },
    logoWrapper: {
        marginTop: 70,
        width: 115,
        height: 115,
        backgroundColor: Color.WHITE,
        overflow: 'hidden',
        elevation: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        height: 115,
        width: 115,
        top: 16,
    }
});