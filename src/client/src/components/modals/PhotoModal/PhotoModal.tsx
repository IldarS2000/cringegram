import React, {FC, useEffect, useState} from 'react'
import {
    Image,
    Modal,
    StyleSheet
} from 'react-native';
import {observer} from 'mobx-react-lite';
import {View} from 'react-native';
import {Color} from "../../../constants/colors";
import {Post} from "../../../interfaces/post";
import {useStores} from "../../../hooks/useStores";
import {NavigationScreenProp} from "react-navigation";
import {EditModePane} from "./components/EditModePane";
import {ExtraMenuPane} from "./components/ExtraMenuPane";
import {PostInfoPane} from "./components/PostInfoPane";
import {CommentsPane} from "./components/CommentsPane";
import {Comment} from "../../../interfaces/comment";

interface Props {
    visible: boolean;
    onRequestClose: () => void;
    post?: Post;
    isOtherUser?: boolean;
    navigation: NavigationScreenProp<any>;
    onLikePress: (postId: number) => void;
    onCommentAdd: (postId: number, comment: string) => Promise<Comment>;
}

enum PhotoModalPane {
    POST_INFO = 'POST_INFO',
    EXTRA_MENU = 'EXTRA_MENU',
    EDIT_MODE = 'EDIT_MODE',
    COMMENTS = 'COMMENTS'
}

export const PhotoModal: FC<Props> = observer(({
    visible,
    onRequestClose,
    post,
    isOtherUser = false,
    navigation,
    onLikePress,
    onCommentAdd,
}: Props): JSX.Element => {
    const { profileStore: { deletePost, updatePost } } = useStores();

    const [currentPane, setCurrentPane] = useState<PhotoModalPane>(PhotoModalPane.POST_INFO);
    const [description, setDescription] = useState<string>(post?.description || '');

    useEffect(() => {
        post && setDescription(post.description || '');
    }, [post]);

    const handleRequestClose = () => {
        setCurrentPane(PhotoModalPane.POST_INFO);
        onRequestClose();
    };

    const handleCommentsPress = () => {
        setCurrentPane(PhotoModalPane.COMMENTS);
    };

    const handleDotsPress = () => {
        setCurrentPane(PhotoModalPane.EXTRA_MENU)
    };

    const handleEditPress = () => {
        setCurrentPane(PhotoModalPane.EDIT_MODE);
    };

    const handleDislikeCountPress = () => {
        navigation.navigate('LIKES', { postId: post!.id });
    };

    const handleDislikePress = () => {
        post && onLikePress(post.id);
    };

    const handleDeletePress = () => {
        post && deletePost(post.id);
        handleRequestClose();
    };

    const handleEditConfirm = () => {
        post && updatePost(post.id, description);
        setCurrentPane(PhotoModalPane.POST_INFO);
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
                {currentPane === PhotoModalPane.POST_INFO && (
                    <PostInfoPane
                        isOtherUser={isOtherUser}
                        description={post?.description || ''}
                        onCommentPress={handleCommentsPress}
                        onDislikeCountPress={handleDislikeCountPress}
                        onDislikePress={handleDislikePress}
                        onDotsPress={handleDotsPress}
                        postDateISO={post?.createTimestamp}
                        likeCount={post?.likeCount || 0}
                        commentsCount={post?.commentsCount || 0}
                    />
                )}
                {currentPane === PhotoModalPane.EXTRA_MENU && (
                   <ExtraMenuPane
                       onDeletePress={handleDeletePress}
                       onEditPress={handleEditPress}
                       onMenuClosePress={() => setCurrentPane(PhotoModalPane.POST_INFO)}
                       postDateISO={post?.createTimestamp}
                   />
                )}
                {currentPane === PhotoModalPane.EDIT_MODE && (
                    <EditModePane
                        description={description}
                        onChangeDescription={setDescription}
                        onEditConfirm={handleEditConfirm}
                    />
                )}
                {currentPane === PhotoModalPane.COMMENTS && (
                    <CommentsPane
                        postId={post!.id}
                        navigation={navigation}
                        onCommentAdd={onCommentAdd}
                    />
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
});