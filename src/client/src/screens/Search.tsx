import React, {FC, useCallback, useEffect, useState} from 'react'
import {FlatList, StyleSheet} from 'react-native';
import {observer} from 'mobx-react-lite';
import {NavigationScreenProp} from "react-navigation";
import {View} from 'react-native';
import {Input} from "../components/UI/Input";
import {debounce} from "lodash";
import {UserSearchResult} from "../interfaces/dto/user-search-result";
import {UserSearchItem} from "../components/UserSearchItem";

interface Props {
    navigation: NavigationScreenProp<any>
}

const mockUsers: UserSearchResult[] = [
    {
        id: 1,
        username: 'kek',
        aboutMe: 'my description'
    },
    {
        id: 2,
        username: 'keks',
        aboutMe: 'my description'
    },
    {
        id: 3,
        username: 'wmek',
        aboutMe: 'my description'
    },
    {
        id: 4,
        username: 'kek',
        aboutMe: 'my description'
    },
    {
        id: 5,
        username: 'keks',
        aboutMe: 'my description'
    },
    {
        id: 6,
        username: 'wmek',
        aboutMe: 'my description'
    },
    {
        id: 7,
        username: 'kek',
        aboutMe: 'my description'
    },
    {
        id: 8,
        username: 'keks',
        aboutMe: 'my description'
    },
    {
        id: 9,
        username: 'wmek',
        aboutMe: 'my description'
    },
];

export const Search: FC<Props> = observer(({navigation}) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const getDebouncedSearchResult = useCallback(debounce((term: string) => {
        console.log(term);
    }, 500), []);

    useEffect(() => {
        getDebouncedSearchResult(searchTerm);
    }, [searchTerm]);

    const handleUserPress = (userId: number) => {
        navigation.navigate('OTHER_PROFILE', { userId });
    };

    return (
        <View style={styles.screen}>
            <Input
                value={searchTerm}
                onChangeText={setSearchTerm}
                label='Поиск пользователей'
                placeholder='Введите никнейм'
                style={styles.input}
            />
            <FlatList<UserSearchResult>
                style={styles.users}
                data={mockUsers}
                keyExtractor={({ id }) => `${id}`}
                renderItem={({ item }) => {
                    return <UserSearchItem user={item} onPress={handleUserPress}/>
                }}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        marginTop: 60,
    },
    input: {
        width: '90%',
        marginBottom: 40,
    },
    users: {
        width: '90%',
        flexGrow: 1,
        marginBottom: 50,
    }
});