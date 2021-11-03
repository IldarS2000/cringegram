import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import AppLoading from 'expo-app-loading';
import {useMyFonts} from './src/hooks/useMyFonts';
import {StoreProvider} from './src/context/store-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useStores} from './src/hooks/useStores';
import {Profile} from './src/screens/Profile';
import {observer} from 'mobx-react-lite';
import './src/polyfills/array-buffer';
import {Email} from './src/screens/Auth/Email';
import {SignIn} from './src/screens/Auth/SignIn';
import {SignUp} from './src/screens/Auth/SignUp';
import {AuthStage} from './src/enums/auth-stage.enum';
import {EnterUsername} from "./src/screens/EnterUsername";
import { Settings } from './src/screens/Settings';
import {EditProfile} from "./src/screens/EditProfile";
import {Developers} from "./src/screens/Developers";
import {About} from "./src/screens/About";

const Stack = createNativeStackNavigator();

const App = observer(() => {
    const {authStore: {isAuth, isLoading, authMe}, profileStore: {username}} = useStores();
    const fontsLoaded = useMyFonts();

    useEffect(() => {
        if (!isAuth) {
            authMe();
        }
    }, [isAuth]);

    if (!fontsLoaded || isLoading) {
        return <AppLoading/>
    }

    return (
        <View style={styles.app}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={AuthStage.EMAIL}>
                    {!isAuth ? (
                        <Stack.Group>
                            <Stack.Screen name={AuthStage.EMAIL} component={Email}/>
                            <Stack.Screen name={AuthStage.SIGN_IN} component={SignIn}/>
                            <Stack.Screen name={AuthStage.SIGN_UP} component={SignUp}/>
                        </Stack.Group>
                    ) : (
                        <Stack.Group>
                            {!username ? (
                                <Stack.Screen name='USERNAME' component={EnterUsername} />
                            ) : (
                                <>
                                    <Stack.Screen name='PROFILE' component={Profile}/>
                                    <Stack.Screen name='SETTINGS' component={Settings}/>
                                    <Stack.Screen name='EDIT_PROFILE' component={EditProfile}/>
                                    <Stack.Screen name='DEVELOPERS' component={Developers} />
                                    <Stack.Screen name='ABOUT' component={About} />
                                </>
                            )}
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