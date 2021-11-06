import React, {FC, useEffect} from 'react'
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

interface Props {
    visible: boolean;
    onRequestClose: () => void;
    post?: Post;
}

export const PhotoModal: FC<Props> = observer(({ visible, onRequestClose, post}: Props): JSX.Element => {
    const { height } = useWindowDimensions();

    const handleCommentsPress = () => {
        
    };

    const handleDislikeCountPress = () => {

    };

    const handleDislikePress = () => {

    };

    return (
        <Modal
            animationType='fade'
            onRequestClose={onRequestClose}
            visible={visible}
            transparent
        >
            <View style={styles.modal}>
                <Image source={{uri: `data:image/png;base64,${post?.photo}`}} style={styles.image} />
                <View style={{
                    ...styles.descriptionWrapper,
                    height: height - 360
                }}>
                    <View style={styles.buttons}>
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
                        <TouchableWithoutFeedback>
                            <DotsIcon fill={Color.BLUE200} width={24} height={24} />
                        </TouchableWithoutFeedback>
                    </View>
                    <Text style={styles.description}>{post?.description}</Text>
                    <Text style={styles.date}>
                        {post?.createTimestamp && format(parseISO(post?.createTimestamp), 'dd MMMM yyyy')}, Cringe
                    </Text>
                </View>
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
    },
    date: {
        ...Fonts.description,
        fontSize: 15,
        lineHeight: 18,
        color: Color.BLACK300,
        marginBottom: 25,
    }
});