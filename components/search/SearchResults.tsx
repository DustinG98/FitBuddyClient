import { useState, useEffect } from 'react';
import { Text, FlatList, ActivityIndicator } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { SearchForUser } from '../../redux/actions/users';
import { State } from '../../redux/types/state';
import { SearchResult } from './SearchResult';

export const SearchResults = () => {
    const [ searchState, setSearchState ] = useState({ search: '' })

    // dispatch search action when searchState.search changes but only after 500ms of no changes
    const dispatch: ThunkDispatch<any, any, any> = useAppDispatch();
    const { searchResults, searchLoading } = useAppSelector((state: State) => state.usersState)

    return (
        
        searchLoading ? <ActivityIndicator size="small" color="#FFDD00" /> :
        <FlatList 
            data={searchResults}
            keyExtractor={(item) => item.userId}
            renderItem={({ item }) => <SearchResult searchResult={item} />}
        />
    )
}