import { StyleSheet } from 'react-native';
import { Color } from './colors';

enum Font {
    RobotoSlab_100Thin = 'RobotoSlab_100Thin',
    RobotoSlab_200ExtraLight = 'RobotoSlab_200ExtraLight',
    RobotoSlab_300Light = 'RobotoSlab_300Light',
    RobotoSlab_400Regular = 'RobotoSlab_400Regular',
    RobotoSlab_500Medium = 'RobotoSlab_500Medium',
    RobotoSlab_600SemiBold = 'RobotoSlab_600SemiBold',
    RobotoSlab_700Bold = 'RobotoSlab_700Bold',
    RobotoSlab_800ExtraBold = 'RobotoSlab_800ExtraBold',
    RobotoSlab_900Black = 'RobotoSlab_900Black',
}

export const Fonts = StyleSheet.create({
    h1: {
        fontSize: 32,
        lineHeight: 40,
        fontFamily: Font.RobotoSlab_400Regular,
        color: Color.BLACK500,
    },
    h2: {
        fontSize: 20,
        lineHeight: 21,
        fontFamily: Font.RobotoSlab_400Regular,
        color: Color.BLACK500,
    },
    paragraph: {
        fontSize: 18,
        lineHeight: 21,
        fontFamily: Font.RobotoSlab_400Regular,
        color: Color.BLACK500,
    },
    button: {
        fontSize: 18,
        lineHeight: 21,
        fontFamily: Font.RobotoSlab_400Regular,
        color: Color.BLACK500,
    },
    description: {
        fontSize: 18,
        lineHeight: 21,
        fontFamily: Font.RobotoSlab_400Regular,
        color: Color.BLACK500,
    },
    inputLabel: {
        fontSize: 16,
        lineHeight: 21,
        fontFamily: Font.RobotoSlab_400Regular,
        color: Color.BLACK500,
    },
    label: {
        fontSize: 14,
        lineHeight: 21,
        fontFamily: Font.RobotoSlab_700Bold,
        color: Color.BLACK500,
    },
    inputText: {
        fontSize: 16,
        lineHeight: 21,
        fontFamily: Font.RobotoSlab_400Regular,
        color: Color.BLACK500,
    },
    username: {
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 21,
        color: Color.BLACK500,
    },
    digits: {
        fontSize: 18,
        lineHeight: 21,
        fontFamily: Font.RobotoSlab_400Regular,
        color: Color.BLACK500,
    },
    comment: {
        fontSize: 14,
        lineHeight: 17,
        fontFamily: Font.RobotoSlab_400Regular,
        color: Color.BLACK500,
    },
});