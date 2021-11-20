import React, {FC, useEffect, useState} from 'react'
import {Alert, FlatList, Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {observer} from 'mobx-react-lite';
import {NavigationRoute, NavigationScreenProp} from "react-navigation";
import {View, Text} from 'react-native';
import {Fonts} from '../constants/fonts';
import {toJS} from 'mobx';
import {Color} from "../constants/colors";
import {base64ImagePrefix} from "../constants/base64";
import SubscribersIcon from './../../assets/svg/subscribers.svg';
import SubscriptionsIcon from './../../assets/svg/subscriptions.svg';
import PostsIcon from './../../assets/svg/posts.svg';
import EyeIcon from '../images/eye.svg';
import SubAddIcon from '../images/sub-add.svg';
import SubRemoveIcon from '../images/sub-remove.svg';
import SearchIcon from '../images/search.svg';
import {PostPhoto} from "../components/PostPhoto";
import {PhotoModal} from "../components/PhotoModal";
import {Post} from "../interfaces/post";
import {UserInfoResponse} from "../interfaces/dto/user-info-response";
import {getAllUserPosts, getUserInfo} from "../services/api.service";
import {postDateComparator} from "../utils/post-date-comparator";


interface Props {
    navigation: NavigationScreenProp<any>;
    route: NavigationRoute<{userId: number}>;
}

export const OtherProfile: FC<Props> = observer(({navigation, route: {params}}) => {
    const [showPhotoModal, setShowPhotoModal] = useState<Post | null>(null);
    const [user, setUser] = useState<UserInfoResponse | null>(null);
    const [posts, setPosts] = useState<Post[] | null>(null);

    useEffect(() => {
        const getUser = async (userId: number) => {
            try {
                const [
                    { data: userInfo },
                    { data: posts },
                ] = await Promise.all([getUserInfo(userId), getAllUserPosts(userId)]);
                setUser(userInfo);
                setPosts(posts.sort(postDateComparator));
            } catch (e) {
                console.log(e.message);
            }
        };
        params?.userId && getUser(params.userId);
    }, [params?.userId]);


    const handleFeedButtonPress = () => {
        navigation.navigate('FEED') ;
    };

    const handleSearchPress = () => {
        navigation.navigate('SEARCH');
    };

    const hidePhotoModal = () => setShowPhotoModal(null);

    const handlePhotoPress = (post: Post) => {
        setShowPhotoModal(post);
    };

    const handleSubPress = () => {
        Alert.alert('плюс подписка');
    };

    return (
        <View style={styles.screen}>
            <TouchableWithoutFeedback
                onPress={handleFeedButtonPress}
            >
                <EyeIcon width={24} height={24} fill={Color.BLACK500} style={styles.feedButton}/>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
                onPress={handleSearchPress}
            >
                <SearchIcon width={24} height={24} fill={Color.BLACK500} style={styles.search}/>
            </TouchableWithoutFeedback>
            {!(1 > 3) ? (
                    <TouchableWithoutFeedback
                        onPress={handleSubPress}
                    >
                        <SubAddIcon width={24} height={24} fill={Color.BLUE200} style={styles.subscribe}/>
                    </TouchableWithoutFeedback>
                ) : (
                    <TouchableWithoutFeedback
                        onPress={handleSubPress}
                    >
                        <SubRemoveIcon width={24} height={24} fill={Color.BLUE200} style={styles.subscribe}/>
                    </TouchableWithoutFeedback>
            )}
            {user && (
                <>
                    <View style={styles.info}>
                        <Text style={styles.name}>{user.username}</Text>
                        <View style={styles.imageWrapper}>
                            <Image
                                source={user.avatar ? {
                                    uri: `${base64ImagePrefix}${user.avatar}`,
                                } : require('../../assets/icon.png')}
                                style={styles.avatar}
                            />
                        </View>
                        <Text style={styles.aboutMe}>{user.aboutMe}</Text>
                    </View>
                    <View style={styles.contentInfo}>
                        <View style={styles.infoItem}>
                            <SubscriptionsIcon width={24} height={24} fill={Color.BLUE300}/>
                            <Text style={styles.infoText}>{user.subscriptionCount || 0}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <SubscribersIcon width={24} height={20} fill={Color.BLUE300}/>
                            <Text style={styles.infoText}>{user.subscribersCount || 0}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <PostsIcon width={24} height={20} fill={Color.BLUE300}/>
                            <Text style={styles.infoText}>{posts?.length || 0}</Text>
                        </View>
                    </View>
                    <FlatList
                        style={styles.posts}
                        contentContainerStyle={styles.postsContainer}
                        numColumns={2}
                        data={toJS(posts)}
                        keyExtractor={({id}) => `${id}`}
                        renderItem={({item}) => {
                            return (
                                <PostPhoto post={item} onPress={() => handlePhotoPress(item)} />
                            )
                        }}
                    />
                </>
            )}
            <PhotoModal visible={!!showPhotoModal} onRequestClose={hidePhotoModal} post={showPhotoModal!} isOtherUser />
        </View>
    );
});

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        marginTop: 40,
    },
    feedButton: {
        alignSelf: 'flex-start',
        left: 15,
        position: 'absolute'
    },
    search: {
        alignSelf: 'flex-end',
        right: 15,
        position: 'absolute'
    },
    subscribe: {
        alignSelf: 'flex-end',
        right: 15,
        top: 35,
        position: 'absolute'
    },
    info: {
        alignItems: 'center',
        marginBottom: 40
    },
    avatar: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 50,
    },
    imageWrapper: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
        marginBottom: 15,
        borderWidth: 1
    },
    name: {
        ...Fonts.username,
        marginBottom: 15,
    },
    aboutMe: {
        ...Fonts.description,
        maxWidth: 200,
        minHeight: 21,
    },
    contentInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 10,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoText: {
        ...Fonts.digits,
        marginLeft: 8,
    },
    subCount: {
        ...Fonts.paragraph
    },
    postCount: {
        ...Fonts.paragraph
    },
    posts: {
        marginBottom: 40,
    },
    postsContainer: {
        alignContent: 'flex-start',
    },
    postPhoto: {
        resizeMode: 'cover',
        backgroundColor: 'black'
    },
    addButton: {
        position: 'absolute',
        bottom: 60,
    },
});