import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import AppLoading from 'expo-app-loading';
import {useMyFonts} from './src/hooks/useMyFonts';
import {EnterPhoneNumber} from './src/screens/Auth/EnterPhoneNumber';
import {StoreProvider} from './src/context/store-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useStores} from "./src/hooks/useStores";
import {EnterSecurityCode} from './src/screens/Auth/EnterSecurityCode';
import { EnterNickName } from './src/screens/Auth/EnterNickName';
import {Profile} from "./src/screens/Profile";
import {observer} from "mobx-react-lite";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

const App = observer(() => {
    const {authStore: {isAuth, isLoading, authMe, setIsLoading}} = useStores();
    const fontsLoaded = useMyFonts();

    useEffect(() => {
        if (!isAuth) {
            new Promise(async () => {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    await authMe();
                } else {
                    setIsLoading(false);
                }
            });
        }
    }, [isAuth, isLoading]);

    if (!fontsLoaded || isLoading) {
        return <AppLoading/>
    }

    return (
        <View style={styles.app}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    {!isAuth ? (
                        <Stack.Group>
                            <Stack.Screen name='Phone' component={EnterPhoneNumber}/>
                            <Stack.Screen name='Code' component={EnterSecurityCode}/>
                            <Stack.Screen name='Name' component={EnterNickName}/>
                        </Stack.Group>
                    ) : (
                        <Stack.Group>
                            <Stack.Screen name='Profile' component={Profile}/>
                        </Stack.Group>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
});

const styles = StyleSheet.create({
    app: {
        height: '100%',
        width: '100%'
    }
});

export default () => {
    return (
        <StoreProvider>
            <App/>
        </StoreProvider>
    );
}