import React, {FC, useEffect, useState} from "react";
import {FlatList, StyleSheet, TextInput, TouchableWithoutFeedback, useWindowDimensions, View} from "react-native";
import {getCommentsByPostId} from "../../../../services/api.service";
import {Comment as IComment} from "../../../../interfaces/comment";
import {Comment} from "../../../UI/Comment/Comment";
import {NavigationScreenProp} from "react-navigation";
import AddIcon from "../../../../../assets/svg/add.svg";
import {Color} from "../../../../constants/colors";
import {SmallButton} from "../../../UI/SmallButton/SmallButton";
import EditIcon from "../../../../images/edit.svg";
import {Fonts} from "../../../../constants/fonts";
import {commentIdComparator} from "../../../../utils/comment-id-comparator";

interface Props {
    postId: number;
    navigation: NavigationScreenProp<any>;
    onCommentAdd: (postId: number, comment: string) => Promise<IComment>;
}

export const CommentsPane: FC<Props> = ({ postId, navigation, onCommentAdd }: Props): JSX.Element => {
    const [comments, setComments] = useState<IComment[]>([]);
    const { height } = useWindowDimensions();
    const [creatingMode, setCreatingMode] = useState<boolean>(false);
    const [commentText, setCommentText] = useState<string>('');

    useEffect(() => {
        getCommentsByPostId(postId).then((comments) => {
            setComments(comments.data.sort(commentIdComparator));
        });
    }, [postId]);

    const handleUserPress = (userId: number) => {
        navigation.navigate('OTHER_PROFILE', { userId });
    };

    const handleAddPress = () => {
        setCreatingMode(true);
    };

    const handleAddConfirm = () => {
        if (commentText) {
            onCommentAdd(postId, commentText).then((comment) => {
                const newComments = comments.slice();
                setComments([comment, ...newComments]);
                setCreatingMode(false);
            });
        }
    };

    return (
        <View style={{
            ...styles.commentsPane,
            height: height - 360
        }}>
            {!creatingMode ? (
                <>
                    <FlatList<IComment>
                        style={styles.comments}
                        contentContainerStyle={styles.commentsContainer}
                        keyExtractor={({ id }) => `${id}`}
                        renderItem={({ item }) => {
                            return <Comment
                                comment={item}
                                onUserPress={handleUserPress}
                            />
                        }}
                        data={comments}
                    />
                    <SmallButton
                        style={styles.addButton}
                        icon={<AddIcon width={24} height={24} fill={Color.BLUE300} />}
                        onPress={handleAddPress}
                    />
                </>
            ) : (
                <>
                    <View style={{
                        ...styles.textWrapper,
                        maxHeight: height - 360
                    }}>
                        <TextInput
                            multiline
                            style={styles.text}
                            maxLength={128}
                            onChangeText={setCommentText}
                            value={commentText}
                        />
                    </View>
                    <TouchableWithoutFeedback onPress={handleAddConfirm}>
                        <View style={styles.buttonEdit}>
                            <EditIcon fill={Color.BLUE200} height={43} width={43} />
                        </View>
                    </TouchableWithoutFeedback>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    commentsPane: {
        width: '100%',
        flexGrow: 1,
        position: 'relative',
        alignItems: 'center',
    },
    comments: {
        width: '100%',
        height: '100%',
    },
    commentsContainer: {
        paddingTop: 20,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    addButton: {
        position: 'absolute',
        bottom: 10,
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
        backgroundColor: Color.WHITE,
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