import React, { FC, useEffect } from 'react';
import {ImageSourcePropType, StyleSheet, TouchableWithoutFeedback, View, ViewStyle, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';
import {useGalleryAccess} from "../../hooks/useGalleryAccess";

interface Props {
    onChange: (image: ImageInfo) => void;
    style?: ViewStyle;
    source: ImageSourcePropType;
}

export const ImageChanger: FC<Props> = ({ source, onChange, style }: Props): JSX.Element => {
    useGalleryAccess();

    const handleImagePick = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            base64: true,
        });

        if (!result.cancelled) {
            onChange(result);
        }
    };

    return (
        <TouchableWithoutFeedback
            onPress={handleImagePick}
        >
            <View
                style={{
                    ...styles.wrapper,
                    ...style
                }}
            >
                <Image source={source} style={styles.image}/>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        height: 130,
        width: 130,
        backgroundColor: 'black',
        borderRadius: 65,
        borderWidth: 1,
        position: 'relative',
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: 65,
        position: 'absolute'
    }
});