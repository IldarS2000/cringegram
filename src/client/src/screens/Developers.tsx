import React, {FC, useEffect} from 'react'
import { StyleSheet, useWindowDimensions} from 'react-native';
import {observer} from 'mobx-react-lite';
import {NavigationScreenProp} from "react-navigation";
import {View, Text} from 'react-native';
interface Props {
    navigation: NavigationScreenProp<any>
}

export const Developers: FC<Props> = observer(({navigation}) => {
    return (
        <View style={styles.screen}>
            <Text>serega antoha pasha ildar</Text>
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
});