import React, {FC, useEffect} from 'react'
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

interface Props {
    navigation: NavigationScreenProp<any>
}

export const Profile: FC<Props> = observer(({navigation}) => {
    const {profileStore: {getUser, user, posts, getUserPosts}} = useStores();
    const {width} = useWindowDimensions();

    useEffect(() => {
        getUser();
        getUserPosts()
    }, []);

    const handleSettingsClick = () => {
        navigation.navigate('SETTINGS') ;
    };

    return (
        <View style={styles.screen}>
            <TouchableWithoutFeedback
                onPress={handleSettingsClick}
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
                            <Text style={styles.infoText}>{user.postCount || 0}</Text>
                        </View>
                    </View>
                    <FlatList
                        style={styles.posts}
                        numColumns={2}
                        data={toJS(posts)}
                        keyExtractor={({id}) => `${id}`}
                        renderItem={({item}) => {
                            return (
                                <View style={{
                                    height: width / 2,
                                    width: width / 2,
                                    backgroundColor: 'black'

                                }}>
                                    <Image
                                        source={{uri: item.photo}}
                                        style={{
                                            ...styles.postPhoto,
                                            width: width / 2,
                                            height: width / 2
                                        }}
                                    />
                                </View>
                            )
                        }}
                    />
                </>
            )}
            <SmallButton style={styles.addButton} icon={<AddIcon width={24} height={24} fill={Color.BLUE300} />} />
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
    settings: {
        ...Fonts.label,
        alignSelf: 'flex-end',
        right: 14,
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
    },
    subCount: {
        ...Fonts.paragraph
    },
    postCount: {
        ...Fonts.paragraph
    },
    posts: {
        marginBottom: 40
    },
    postPhoto: {
        resizeMode: 'cover',
        backgroundColor: 'black'
    },
    addButton: {
        position: 'absolute',
        bottom: 60,
    }
});