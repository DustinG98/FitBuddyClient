import { useState, useEffect } from 'react';
import { TextInput, StyleSheet, Dimensions } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { SearchForUser } from '../../redux/actions/users';
import { State } from '../../redux/types/state';

export const SearchBar = () => {
    const [ searchState, setSearchState ] = useState({ search: '' })

    // dispatch search action when searchState.search changes but only after 500ms of no changes
    const dispatch: ThunkDispatch<any, any, any> = useAppDispatch();
    const { searchLoading } = useAppSelector((state: State) => state.usersState)


    useEffect(() => {
        const timer = setTimeout(() => {
            if(searchState.search.length > 0 && !searchLoading) dispatch(SearchForUser(searchState.search))
        }, 500)

        return () => clearTimeout(timer)
    }, [searchState.search])

    return (
        <TextInput
            placeholder="Search"
            onChangeText={text => {
                setSearchState({ ...searchState, search: text })
            }}
            style={styles.searchBar}
            value={searchState.search}
            placeholderTextColor="#a8a8a8"
        />
    )
}

const styles = StyleSheet.create({
    searchBar: {
        width: Dimensions.get('window').width * 0.9,
        height: 50,
        backgroundColor: '#212529',
        color: '#fff',
        padding: 10,
        fontSize: 18,
        borderRadius: 16,
        marginBottom: 20,
    }
})