import React, {FC, useEffect, useState} from 'react'
import {
    Image,
    Modal,
    StyleSheet,
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
import {BlurView} from "expo-blur";
import {getUserAvatar, getUserInfo} from "../services/api.service";
import {base64ImagePrefix} from "../constants/base64";
import {UserInfoResponse} from "../interfaces/dto/user-info-response";

interface Props {
    visible: boolean;
    onRequestClose: () => void;
    post?: Post;
    onProfileOpen: (userId: number) => void;
}

export const FeedPostModal: FC<Props> = observer(({ visible, onRequestClose, post, onProfileOpen}: Props): JSX.Element => {
    const { height, width } = useWindowDimensions();
    const [currentUser, setCurrentUser] = useState<UserInfoResponse | null>(null);

    useEffect(() => {
        visible && post && getUserInfo(post!.userId).then((response) => {
            setCurrentUser(response.data);
        });
        if (!visible) {
            setCurrentUser(null);
        }
    }, [visible, post]);

    const handleCommentsPress = () => {
        
    };

    const handleDislikePress = () => {

    };

    const handleProfileInfoPress = () => {
        currentUser && onProfileOpen(currentUser.id);
    };

    return (
        <Modal
            animationType='fade'
            onRequestClose={onRequestClose}
            visible={visible}
            transparent
            style={{
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <BlurView
                intensity={80}
                tint='dark'
                style={{
                    height,
                    width,
                    position: 'absolute'
                }}
            />
            <View style={styles.modal}>
                <View style={{
                    ...styles.descriptionWrapper,
                }}>
                    <TouchableWithoutFeedback onPress={handleProfileInfoPress}>
                        <View style={styles.profileInfo}>
                            <Image
                                style={styles.avatar}
                                source={currentUser?.avatar
                                    ? {uri: `${base64ImagePrefix}${currentUser.avatar}`}
                                    : require('../../assets/icon.png')
                                }
                            />
                                <Text style={styles.username}>{currentUser?.username}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <Text style={styles.description}>{post?.description}</Text>
                    <View style={styles.buttons}>
                        <TouchableWithoutFeedback onPress={handleCommentsPress}>
                            <View style={styles.button}>
                                <CommentIcon fill={Color.BLUE200} width={45} height={45} />
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.button}>
                            <TouchableWithoutFeedback onPress={handleDislikePress}>
                                <DislikeIcon fill={Color.BLUE200} width={45} height={45} />
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
});

const styles = StyleSheet.create({
    modal: {
        backgroundColor: Color.WHITE,
        height: '90%',
        width: '90%',
        position: 'relative',
        alignItems: 'center',
        zIndex: 2,
        margin: '5%',
        borderRadius: 40,
    },
    descriptionWrapper: {
        width: '100%',
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%'
    },
    profileInfo: {
        marginTop: 40,
        marginBottom: 20,
        marginLeft: 20,
        height: 60,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    description: {
        ...Fonts.description,
        flexGrow: 1,
        width: '100%',
        textAlign: 'left',
    },
    buttons: {
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 35,
        paddingHorizontal: 40,
        width: '100%',
        flexDirection: 'row',
    },
    button: {
        flexDirection: 'row'
    },
    avatar: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: Color.BLACK300,
    },
    username: {
        ...Fonts.username,
        color: Color.ORANGE300,
        flexGrow: 1,
        textAlign: 'center',
    }
});