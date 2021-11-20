import React, {FC, useEffect, useState} from 'react'
import {FlatList, Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {observer} from 'mobx-react-lite';
import {NavigationScreenProp} from "react-navigation";
import {View, Text} from 'react-native';
import {useStores} from '../hooks/useStores';
import {Fonts} from '../constants/fonts';
import {toJS} from 'mobx';
import SettingsIcon from './../../assets/svg/settings.svg';
import {Color} from "../constants/colors";
import {base64ImagePrefix} from "../constants/base64";
import {SmallButton} from "../components/UI/SmallButton/SmallButton";
import AddIcon from './../../assets/svg/add.svg';
import EyeIcon from '../images/eye.svg';
import {AddPostModal} from "../components/modals/AddPostModal/AddPostModal";
import {PostPhoto} from "../components/UI/PostPhoto/PostPhoto";
import {PhotoModal} from "../components/modals/PhotoModal/PhotoModal";
import {Post} from "../interfaces/post";
import SearchIcon from '../images/search.svg';
import {ProfileContentInfo} from "../components/UI/ProfileContentInfo/ProfileContentInfo";

interface Props {
    navigation: NavigationScreenProp<any>;
}

export const Profile: FC<Props> = observer(({navigation}) => {
    const {profileStore: {getUser, user, sortedPosts: posts, getUserPosts, toggleLike}} = useStores();
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

    const handleSearchPress = () => {
        navigation.navigate('SEARCH') ;
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

    const handleLikePress = (postId: number) => {
        toggleLike(postId);
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
            <TouchableWithoutFeedback
                onPress={handleSearchPress}
            >
                <SearchIcon width={24} height={24} fill={Color.BLACK500} style={styles.search}/>
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
                    <ProfileContentInfo
                        postsCount={posts?.length || 0}
                        subscribersCount={user.subscribersCount || 0}
                        subscriptionCount={user.subscriptionCount || 0}
                        userId={user.id}
                        navigation={navigation}
                    />
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
            {showPhotoModal && (
                <PhotoModal
                    visible={!!showPhotoModal}
                    onRequestClose={hidePhotoModal}
                    post={showPhotoModal!}
                    onLikePress={handleLikePress}
                    navigation={navigation}
                />
            )}
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
    search: {
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