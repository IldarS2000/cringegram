import React, {FC, useEffect, useState} from 'react'
import {
    Image,
    Modal,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback, useWindowDimensions,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import {View, Text} from 'react-native';
import {Color} from "../constants/colors";
import { useGalleryAccess } from '../hooks/useGalleryAccess';
import * as ImagePicker from "expo-image-picker";
import {ImageInfo} from "expo-image-picker/build/ImagePicker.types";
import EditIcon from '../images/edit.svg';
import {Fonts} from "../constants/fonts";
import {useStores} from "../hooks/useStores";

interface Props {
    visible: boolean;
    onRequestClose: () => void;
}

const pickImage = () => ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
    base64: true,
});

export const AddPostModal: FC<Props> = observer(({ visible, onRequestClose }: Props): JSX.Element => {
    useGalleryAccess();
    const { height } = useWindowDimensions();
    const { profileStore: { addPost } } = useStores();
    const [image, setImage] = useState<ImageInfo | null>(null);
    const [textFocused, setTextFocused] = useState<boolean>(false);
    const [description, setDescription] = useState<string>('');

    useEffect(() => {
        visible && pickImage().then((result) => {
            if (result.cancelled) {
                onRequestClose();
            } else {
                setImage(result);
            }
        });
    }, [visible]);

    useEffect(() => {
        !visible && setTextFocused(false);
    }, [visible]);

    const toggleTextFocused = () => setTextFocused((prev) => !prev);

    const handleImagePress = () => {
        pickImage().then((result) => {
            if (!result.cancelled) {
                setImage(result);
            }
        });
        setTextFocused(false);
    };

    const handlePostPress = () => {
        image && addPost(image, description);
        onRequestClose();
    };

    return (
        <Modal
            animationType='slide'
            onRequestClose={onRequestClose}
            visible={visible}
            transparent
        >
            <View style={styles.modal}>
                <TouchableWithoutFeedback onPress={handleImagePress}>
                    <Image source={{ uri: image?.uri }} style={{
                        ...styles.image,
                        ...{ height: textFocused ? 100 : '100%' }
                    }} />
                </TouchableWithoutFeedback>
                <View style={{
                    ...styles.textWrapper,
                    maxHeight: textFocused ? height - 100 : height - 300
                }}>
                    <TextInput
                        multiline
                        style={styles.text}
                        onFocus={toggleTextFocused}
                        onBlur={toggleTextFocused}
                        maxLength={128}
                        onChangeText={setDescription}
                        value={description}
                    />
                </View>
                <TouchableWithoutFeedback onPress={handlePostPress}>
                    <View style={styles.button}>
                        <EditIcon fill={Color.BLUE200} height={43} width={43} />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </Modal>
    );
});

const styles = StyleSheet.create({
    modal: {
        backgroundColor: Color.WHITE,
        height: '100%',
        width: '100%',
        position: 'relative'
    },
    image: {
        backgroundColor: Color.BLACK500,
        width: '100%',
        maxHeight: 300,
        height: '100%',
    },
    textWrapper: {
        flexGrow: 1,
        padding: 20,
        justifyContent: 'flex-start',
        position: 'relative',
    },
    text: {
        ...Fonts.description,
        height: '100%',
        width: '100%',
        backgroundColor: Color.BLUE100,
        borderRadius: 10,
        borderColor: Color.BLACK500,
        borderWidth: 3,
        padding: 20,
        paddingBottom: 40,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: Color.WHITE,
        width: 86,
        height: 86,
        borderRadius: 100,
        borderColor: Color.BLACK500,
        borderWidth: 3,
        position: 'absolute',
        bottom: 15,
        right: 15,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
    },
});