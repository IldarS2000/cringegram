import React, {FC, useEffect, useState} from 'react'
import {
    Image,
    Modal,
    StyleSheet, TextInput,
    TouchableWithoutFeedback, useWindowDimensions,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import {View, Text} from 'react-native';
import {Color} from "../constants/colors";
import {Fonts} from "../constants/fonts";
import {Post} from "../interfaces/post";
import {format, parseISO} from "date-fns";
import DislikeIcon from '../images/dislike.svg';
import CommentIcon from '../images/comment.svg';
import DotsIcon from '../images/dots.svg';
import {Button} from "./UI/Button";
import {useStores} from "../hooks/useStores";
import EditIcon from "../images/edit.svg";
import {getStyleByCondition} from "../utils/get-style-by-condition";
import {NavigationScreenProp} from "react-navigation";

interface Props {
    visible: boolean;
    onRequestClose: () => void;
    post?: Post;
    isOtherUser?: boolean;
    navigation: NavigationScreenProp<any>;
    onLikePress: (postId: number) => void;
}

export const PhotoModal: FC<Props> = observer(({
    visible,
    onRequestClose,
    post,
    isOtherUser = false,
    navigation,
    onLikePress
}: Props): JSX.Element => {
    const { height } = useWindowDimensions();
    const { profileStore: { deletePost, updatePost } } = useStores();

    const [showExtraMenu, setShowExtraMenu] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [description, setDescription] = useState<string>(post?.description || '');

    useEffect(() => {
        post && setDescription(post.description || '');
    }, [post]);

    const handleRequestClose = () => {
        setShowExtraMenu(false);
        setEditMode(false);
        onRequestClose();
    };

    const handleCommentsPress = () => {

    };

    const handleDislikeCountPress = () => {
        navigation.navigate('LIKES', { postId: post!.id });
    };

    const handleDislikePress = () => {
        post && onLikePress(post.id);
    };

    const handleDotsPress = () => {
        setShowExtraMenu(true);
    };

    const handleEditPress = () => {
        setEditMode(true);
    };

    const handleDeletePress = () => {
        post && deletePost(post.id);
        handleRequestClose();
    };

    const handleEditConfirm = () => {
        post && updatePost(post.id, description);
        setShowExtraMenu(false);
        setEditMode(false);
    };

    return (
        <Modal
            animationType='fade'
            onRequestClose={handleRequestClose}
            visible={visible}
            transparent
        >
            <View style={styles.modal}>
                <Image source={{uri: `data:image/png;base64,${post?.photo}`}} style={styles.image} />
                {editMode ? (
                    <>
                        <TouchableWithoutFeedback>
                            <View style={{
                                ...styles.textWrapper,
                                maxHeight: height - 360
                            }}>
                                <TextInput
                                    multiline
                                    style={styles.text}
                                    maxLength={128}
                                    onChangeText={setDescription}
                                    value={description}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={handleEditConfirm}>
                            <View style={styles.buttonEdit}>
                                <EditIcon fill={Color.BLUE200} height={43} width={43} />
                            </View>
                        </TouchableWithoutFeedback>
                    </>
                ) : (
                    <>
                        {showExtraMenu ? (
                            <View style={{
                                ...styles.descriptionWrapper,
                                height: height - 360,
                            }}>
                                <TouchableWithoutFeedback onPress={() => setShowExtraMenu(false)}>
                                    <View style={{
                                        ...styles.extraBackground,
                                        height: '100%'
                                    }} />
                                </TouchableWithoutFeedback>
                                <View style={{
                                    ...styles.extraMenuWrapper,
                                    height: '100%',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                    <View style={styles.extraMenu}>
                                        <Button text='Edit' onPress={handleEditPress} />
                                        <Button
                                            text='Delete'
                                            primaryColor={Color.ORANGE300}
                                            secondaryColor={Color.ORANGE100}
                                            onPress={handleDeletePress}
                                        />
                                    </View>
                                    <Text style={styles.date}>
                                        {post?.createTimestamp && format(parseISO(post?.createTimestamp), 'dd MMMM yyyy')}, Cringe
                                    </Text>
                                </View>
                            </View>
                        ) : (
                            <View style={{
                                ...styles.descriptionWrapper,
                                height: height - 360
                            }}>
                                <View style={{
                                    ...styles.buttons,
                                    ...getStyleByCondition(isOtherUser, { maxWidth: 200 })
                                }}>
                                    <View style={styles.button}>
                                        <TouchableWithoutFeedback onPress={handleDislikePress}>
                                            <DislikeIcon fill={Color.BLUE200} width={24} height={24} />
                                        </TouchableWithoutFeedback>
                                        <TouchableWithoutFeedback onPress={handleDislikeCountPress}>
                                            <Text style={styles.buttonText}>{post?.likeCount}</Text>
                                        </TouchableWithoutFeedback>
                                    </View>
                                    <TouchableWithoutFeedback onPress={handleCommentsPress}>
                                        <View style={styles.button}>
                                            <CommentIcon fill={Color.BLUE200} width={24} height={24} />
                                            <Text style={styles.buttonText}>{0}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    {!isOtherUser &&
                                        <TouchableWithoutFeedback onPress={handleDotsPress}>
                                            <DotsIcon fill={Color.BLUE200} width={24} height={24}/>
                                        </TouchableWithoutFeedback>
                                    }
                                </View>
                                <Text style={styles.description}>{post?.description}</Text>
                                <Text style={styles.date}>
                                    {post?.createTimestamp && format(parseISO(post?.createTimestamp), 'dd MMMM yyyy')}, Cringe
                                </Text>
                            </View>
                        )}
                    </>
                )}
            </View>
        </Modal>
    );
});

const styles = StyleSheet.create({
    modal: {
        backgroundColor: Color.WHITE,
        height: '100%',
        width: '100%',
        position: 'relative',
        alignItems: 'center',
    },
    image: {
        backgroundColor: Color.BLACK500,
        width: '100%',
        maxHeight: 360,
        height: 360,
    },
    descriptionWrapper: {
        width: '100%',
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    description: {
        ...Fonts.description,
        flexGrow: 1,
    },
    buttons: {
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 35,
        width: '100%',
        flexDirection: 'row',
    },
    button: {
        flexDirection: 'row'
    },
    buttonText: {
        ...Fonts.digits,
        marginLeft: 8,
        minWidth: 20,
    },
    date: {
        ...Fonts.description,
        fontSize: 15,
        lineHeight: 18,
        color: Color.BLACK300,
        marginBottom: 25,
    },
    extraMenuWrapper: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
    extraMenu: {
        width: '90%',
        zIndex: 3,
        height: 140,
        borderRadius: 30,
        backgroundColor: Color.BLUE100,
        marginTop: 65,
        borderWidth: 2,
        borderColor: Color.BLACK500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 35,
        alignItems: 'center',
        elevation: 15,
    },
    extraBackground: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        zIndex: 2,
    },
    textWrapper: {
        width: '100%',
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
    buttonEdit: {
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