import React, {FC} from 'react'
import {Image, StyleSheet, TouchableWithoutFeedback, useWindowDimensions} from 'react-native';
import {observer} from 'mobx-react-lite';
import {View} from 'react-native';
import {Post} from "../../../interfaces/post";

interface Props {
    post: Post;
    onPress: () => void;
}

export const PostPhoto: FC<Props> = observer(({post, onPress}: Props): JSX.Element => {
    const {width} = useWindowDimensions();

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={{
                height: width / 2,
                width: width / 2,
                backgroundColor: 'black'

            }}>
                <Image
                    source={{uri: `data:image/png;base64,${post.photo}`}}
                    style={{
                        ...styles.postPhoto,
                        width: width / 2,
                        height: width / 2,
                    }}
                />
            </View>
        </TouchableWithoutFeedback>
    );
});

const styles = StyleSheet.create({
    postPhoto: {
        resizeMode: 'cover',
        backgroundColor: 'black'
    },
});