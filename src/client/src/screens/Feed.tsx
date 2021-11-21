import React, {FC, useEffect, useState} from 'react'
import {
    FlatList,
    Image,
    RefreshControl,
    StyleSheet,
    TouchableWithoutFeedback,
    useWindowDimensions
} from 'react-native';
import {observer} from 'mobx-react-lite';
import {NavigationScreenProp} from "react-navigation";
import {View} from 'react-native';
import {useStores} from "../hooks/useStores";
import {toJS} from "mobx";
import {Color} from "../constants/colors";
import {base64ImagePrefix} from "../constants/base64";
import {Post} from "../interfaces/post";
import {FeedPostModal} from "../components/modals/FeedPostModal/FeedPostModal";

interface Props {
    navigation: NavigationScreenProp<any>
}

export const Feed: FC<Props> = observer(({navigation}) => {
    const { feedStore: { getAllPosts, sortedPosts: posts }, profileStore: { user } } = useStores();
    const [refreshing, setRefreshing] = useState(true);
    const {height, width} = useWindowDimensions();
    const [currentPostForModal, setCurrentPostForModal] = useState<Post | null>(null);

    useEffect(() => {
        getAllPosts().then(() => {
            setRefreshing(false);
        });
    }, []);

    useEffect(() => () => setCurrentPostForModal(null), []);

    const handleRefresh = async () => {
        setRefreshing(true);
        await getAllPosts();
        setRefreshing(false);
    };

    const handlePhotoPress = (post: Post) => {
        setCurrentPostForModal(post);
    };

    const handleCloseModalRequest = () => {
        setCurrentPostForModal(null);
    };

    const handleProfileOpen = (userId: number) => {
        userId === user?.id
            ? navigation.navigate('PROFILE')
            : navigation.navigate('OTHER_PROFILE', { userId });

    };

    return (
        <>
            <FeedPostModal
                visible={!!currentPostForModal}
                onRequestClose={handleCloseModalRequest}
                post={currentPostForModal!}
                onProfileOpen={handleProfileOpen}
                navigation={navigation}
            />
            <FlatList
                style={styles.posts}
                numColumns={1}
                data={toJS(posts)}
                snapToInterval={height}
                decelerationRate={0.9}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                }
                keyExtractor={({id}) => `${id}`}
                renderItem={({item}) => {
                    return (
                        <TouchableWithoutFeedback onPress={() => handlePhotoPress(item)}>
                            <View style={{
                                ...styles.photoWrapper,
                                paddingVertical: height * 0.2,
                                // height, width
                            }}>
                                <Image source={{uri: `${base64ImagePrefix}${item.photo}`}} style={{
                                    ...styles.photo,
                                    height: height * 0.6,

                                    width
                                }}/>
                            </View>
                        </TouchableWithoutFeedback>
                    )
                }}
            />
        </>
    );
});

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        width: '100%',
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    posts: {
        // backgroundColor: Color.BLUE100
    },
    photoWrapper: {
        backgroundColor: Color.BLACK500,
    },
    photo: {
        backgroundColor: Color.BLUE400,
    }
});