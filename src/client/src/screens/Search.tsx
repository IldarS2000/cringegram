import React, {FC, useCallback, useEffect, useState} from 'react'
import {FlatList, StyleSheet} from 'react-native';
import {observer} from 'mobx-react-lite';
import {NavigationScreenProp} from "react-navigation";
import {View} from 'react-native';
import {Input} from "../components/UI/Input/Input";
import {debounce} from "lodash";
import {UserShortInfo} from "../interfaces/user-short-info";
import {UserSearchItem} from "../components/UI/UserSearchItem/UserSearchItem";
import {searchUsers} from "../services/api.service";

interface Props {
    navigation: NavigationScreenProp<any>
}

export const Search: FC<Props> = observer(({navigation}) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [users, setUsers] = useState<UserShortInfo[]>([]);

    const getDebouncedSearchResult = useCallback(debounce(async (term: string) => {
        const { data: users } = await searchUsers(term);
        setUsers(users);
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
            <FlatList<UserShortInfo>
                style={styles.users}
                data={users}
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