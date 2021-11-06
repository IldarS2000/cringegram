import React, {FC, useEffect, useState} from 'react'
import {FlatList, Image, StyleSheet, TouchableWithoutFeedback, useWindowDimensions} from 'react-native';
import {observer} from 'mobx-react-lite';
import {NavigationScreenProp} from "react-navigation";
import {View, Text} from 'react-native';
import {useStores} from '../hooks/useStores';
import {Fonts} from '../constants/fonts';
import {toJS} from 'mobx';
import SettingsIcon from './../../assets/svg/settings.svg';
import {Color} from "../constants/colors";
import {base64ImagePrefix} from "../constants/base64";
import SubscribersIcon from './../../assets/svg/subscribers.svg';
import SubscriptionsIcon from './../../assets/svg/subscriptions.svg';
import PostsIcon from './../../assets/svg/posts.svg';
import {SmallButton} from "../components/UI/SmallButton";
import AddIcon from './../../assets/svg/add.svg';
import EyeIcon from '../images/eye.svg';
import {AddPostModal} from "../components/AddPostModal";
import {PostPhoto} from "../components/PostPhoto";
import {PhotoModal} from "../components/PhotoModal";
import {Post} from "../interfaces/post";


interface Props {
    navigation: NavigationScreenProp<any>;
}

export const Profile: FC<Props> = observer(({navigation}) => {
    const {profileStore: {getUser, user, sortedPosts: posts, getUserPosts, postCount}} = useStores();
    const {width} = useWindowDimensions();
    const [showAddPostModal, setShowAddPostModal] = useState(false);
    const [showPhotoModal, setShowPhotoModal] = useState<Post | null>(null);

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if (user) {
            getUserPosts(user.id);
        }
    }, [user]);

    const handleSettingsPress = () => {
        navigation.navigate('SETTINGS') ;
    };

    const handleFeedButtonPress = () => {
        navigation.navigate('FEED') ;
    };

    const handleAddPress = () => {
        setShowAddPostModal(true);
    };

    const hideAddPostModal = () => setShowAddPostModal(false);

    const hidePhotoModal = () => setShowPhotoModal(null);

    const handlePhotoPress = (post: Post) => {
        setShowPhotoModal(post);
    };

    return (
        <View style={styles.screen}>
            <TouchableWithoutFeedback
                onPress={handleFeedButtonPress}
            >
                <EyeIcon width={24} height={24} fill={Color.BLACK500} style={styles.feedButton}/>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
                onPress={handleSettingsPress}
            >
                <SettingsIcon width={24} height={24} fill={Color.BLACK500} style={styles.settings}/>
            </TouchableWithoutFeedback>
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
                            <Text style={styles.infoText}>{postCount || 0}</Text>
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
            <SmallButton
                style={styles.addButton}
                icon={<AddIcon width={24} height={24} fill={Color.BLUE300} />}
                onPress={handleAddPress}
            />
            <AddPostModal visible={showAddPostModal} onRequestClose={hideAddPostModal} />
            <PhotoModal visible={!!showPhotoModal} onRequestClose={hidePhotoModal} post={showPhotoModal!} />
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
    settings: {
        alignSelf: 'flex-end',
        right: 15,
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