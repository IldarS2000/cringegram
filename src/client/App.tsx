import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppLoading from 'expo-app-loading';
import {useMyFonts} from './src/hooks/useMyFonts';
import {EnterPhoneNumber} from './src/screens/Auth/EnterPhoneNumber';
import {StoreProvider} from './src/context/store-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useStores} from "./src/hooks/useStores";
import {EnterSecurityCode} from './src/screens/Auth/EnterSecurityCode';

const Stack = createNativeStackNavigator();

const App = () => {
    const {authStore: {isAuth, isLoading}} = useStores();

    const fontsLoaded = useMyFonts();

    if (!fontsLoaded || isLoading) {
        return <AppLoading/>
    }

    return (
        <StoreProvider>
            <View style={styles.app}>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{headerShown: false}}>
                        {!isAuth && (
                            <Stack.Group>
                                <Stack.Screen name='Phone' component={EnterPhoneNumber}/>
                                <Stack.Screen name='Code' component={EnterSecurityCode}/>
                            </Stack.Group>
                        )}
                    </Stack.Navigator>
                </NavigationContainer>
            </View>
        </StoreProvider>
    );
}

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