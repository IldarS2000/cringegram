import React, {FC, useEffect} from 'react'
import { StyleSheet, useWindowDimensions} from 'react-native';
import {observer} from 'mobx-react-lite';
import {NavigationScreenProp} from "react-navigation";
import {View} from 'react-native';
import {useStores} from '../hooks/useStores';
import SettingsIcon from './../../assets/svg/settings.svg';
import {Color} from "../constants/colors";
import {BigButton} from "../components/UI/BigButton";

interface Props {
    navigation: NavigationScreenProp<any>
}

export const Settings: FC<Props> = observer(({navigation}) => {
    const {authStore: { logout }, profileStore: {getUser, getUserPosts}} = useStores();

    useEffect(() => {
        getUser();
        getUserPosts()
    }, []);

    const handleEditPress = () => {
        navigation.navigate('EDIT_PROFILE');
    };

    return (
        <View style={styles.screen}>
            <SettingsIcon width={75} height={75} fill={Color.BLACK500} style={styles.icon} />
            <View style={styles.buttons}>
                <View>
                    <BigButton text='Изменить профиль' style={styles.button} onPress={handleEditPress}/>
                    <BigButton text='Разработчики' style={styles.button} />
                    <BigButton text='О Cringegram' />
                </View>
                <BigButton text='Выйти' color={Color.ORANGE300} onPress={logout}/>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },
    icon: {
        marginTop: 85,
        marginBottom: 40,
    },
    buttons: {
        justifyContent: 'space-between',
        flexGrow: 1,
        marginBottom: 30
    },
    button: {
        marginBottom: 14
    }
});