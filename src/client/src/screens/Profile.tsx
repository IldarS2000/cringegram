import React, {FC, useEffect} from 'react'
import {FlatList, Image, StyleSheet, TouchableWithoutFeedback, useWindowDimensions} from 'react-native';
import {observer} from 'mobx-react-lite';
import {NavigationScreenProp} from "react-navigation";
import {View, Text} from 'react-native';
import {useStores} from '../hooks/useStores';
import {Fonts} from '../constants/fonts';
import {toJS} from "mobx";

interface Props {
    navigation: NavigationScreenProp<any>
}

export const Profile: FC<Props> = observer(({navigation}) => {
    const {authStore: {logout}, profileStore: {getUser, user, posts, getUserPosts}} = useStores();
    const {width} = useWindowDimensions();

    useEffect(() => {
        getUser();
        getUserPosts()
    }, []);

    return (
        <View style={styles.screen}>
            <TouchableWithoutFeedback
                onPress={logout}
            >
                <Text style={styles.logout}>logout</Text>
            </TouchableWithoutFeedback>
            {user && (
                <>
                    <View style={styles.info}>
                        <View style={styles.imageWrapper}>
                            <Image
                                source={{
                                    uri: user.avatar,
                                }}
                                style={styles.avatar}
                            />
                        </View>
                        <Text style={styles.name}>{user.username}</Text>
                        <Text style={styles.aboutMe}>{user.aboutMe}</Text>
                    </View>
                    <View style={styles.contentInfo}>
                        <Text style={styles.subCount}>Subs: {user.subscriptionCount}</Text>
                        <Text style={styles.postCount}>Posts: {user.postCount}</Text>
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
    logout: {
        ...Fonts.label,
        alignSelf: 'flex-end',
        marginRight: 10
    },
    info: {
        alignItems: 'center',
        marginBottom: 40
    },
    avatar: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 50,
    },
    imageWrapper: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
        marginBottom: 5,
        borderWidth: 1
    }
    ,
    name: {
        ...Fonts.h1
    },
    aboutMe: {
        ...Fonts.description,
        maxWidth: 200
    },
    contentInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%'
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

});