import React, {FC, useState} from 'react'
import {StyleSheet} from 'react-native';
import {observer} from 'mobx-react-lite';
import {NavigationScreenProp} from "react-navigation";
import {View} from 'react-native';
import {useStores} from '../hooks/useStores';
import {ImageChanger} from "../components/UI/ImageChanger/ImageChanger";
import {ImageInfo} from "expo-image-picker/build/ImagePicker.types";
import {base64ImagePrefix} from "../constants/base64";
import {Input} from "../components/UI/Input/Input";
import {Button} from "../components/UI/Button/Button";

interface Props {
    navigation: NavigationScreenProp<any>
}

export const EditProfile: FC<Props> = observer(({navigation}) => {
    const {profileStore: {user, updateUserAvatar, isLoading, updateUserAboutMe}} = useStores();
    const [aboutMe, setAboutMe] = useState<string | null>(user?.aboutMe || null);

    const handleImageChange = (image: ImageInfo) => {
        updateUserAvatar(image);
    };

    const handleSave = () => {
        aboutMe && updateUserAboutMe(aboutMe);
        navigation.navigate('PROFILE');
    };

    return (
        <View style={styles.screen}>
            <ImageChanger
                style={styles.image}
                onChange={handleImageChange}
                source={user?.avatar
                    ? {uri: `${base64ImagePrefix}${user.avatar}`}
                    : require('../../assets/photo.png')
                }
            />
            <View style={styles.wrapper}>
                <Input
                    label='Описание'
                    placeholder='Описание'
                    onChangeText={setAboutMe}
                    value={aboutMe || ''}
                    disabled={isLoading}
                    maxLength={64}
                />
                <Button text='SAVE' onPress={handleSave}/>
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
    image: {
        marginTop: 100,
        marginBottom: 40,
    },
    wrapper: {
        width: '80%',
        flexGrow: 1,
        justifyContent: 'space-between',
        marginBottom: 30,
        alignItems: 'center'
    },
});