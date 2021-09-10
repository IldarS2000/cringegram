import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useMyFonts } from './src/hooks/useMyFonts';
import { EnterPhoneNumber } from './src/screens/Auth/EnterPhoneNumber';
import AppLoading from 'expo-app-loading'

export default function App() {
    const fontsLoaded = useMyFonts();

    if (!fontsLoaded) {
        return <AppLoading />
    }

    return (
        <View style={styles.app}>
            <EnterPhoneNumber />
        </View>
    );
}

const styles = StyleSheet.create({
    app: {
        height: '100%',
        width: '100%'
    }
});
