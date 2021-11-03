import {useEffect} from "react";
import * as ImagePicker from "expo-image-picker";

export const useGalleryAccess = () => {
    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        })();
    }, []);
};