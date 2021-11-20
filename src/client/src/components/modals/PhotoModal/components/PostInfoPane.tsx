import React, {FC} from "react";
import {StyleSheet, Text, TouchableWithoutFeedback, useWindowDimensions, View} from "react-native";
import {Color} from "../../../../constants/colors";
import {Fonts} from "../../../../constants/fonts";
import {getStyleByCondition} from "../../../../utils/get-style-by-condition";
import DislikeIcon from "../../../../images/dislike.svg";
import CommentIcon from "../../../../images/comment.svg";
import DotsIcon from "../../../../images/dots.svg";
import {format, parseISO} from "date-fns";

interface Props {
    description: string;
    postDateISO?: string;
    onDislikePress: () => void;
    onDislikeCountPress: () => void;
    onCommentPress: () => void;
    onDotsPress: () => void;
    isOtherUser: boolean;
    likeCount: number;
    commentsCount: number;
}

export const PostInfoPane: FC<Props> = ({
    isOtherUser,
    description,
    onCommentPress,
    onDislikeCountPress,
    onDislikePress,
    onDotsPress,
    postDateISO,
    likeCount,
    commentsCount,
}: Props): JSX.Element => {
    const {height} = useWindowDimensions();
    return (
        <View style={{
            ...styles.descriptionWrapper,
            height: height - 360
        }}>
            <View style={{
                ...styles.buttons,
                ...getStyleByCondition(isOtherUser, { maxWidth: 200 })
            }}>
                <View style={styles.button}>
                    <TouchableWithoutFeedback onPress={onDislikePress}>
                        <DislikeIcon fill={Color.BLUE200} width={24} height={24} />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={onDislikeCountPress}>
                        <Text style={styles.buttonText}>{likeCount}</Text>
                    </TouchableWithoutFeedback>
                </View>
                <TouchableWithoutFeedback onPress={onCommentPress}>
                    <View style={styles.button}>
                        <CommentIcon fill={Color.BLUE200} width={24} height={24} />
                        <Text style={styles.buttonText}>{commentsCount}</Text>
                    </View>
                </TouchableWithoutFeedback>
                {!isOtherUser &&
                <TouchableWithoutFeedback onPress={onDotsPress}>
                    <DotsIcon fill={Color.BLUE200} width={24} height={24}/>
                </TouchableWithoutFeedback>
                }
            </View>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.date}>
                {postDateISO && format(parseISO(postDateISO), 'dd MMMM yyyy')}, Cringe
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
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
});