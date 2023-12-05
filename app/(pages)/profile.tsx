import { FlatList, Image, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { FetchPosts } from '../../redux/actions/posts';
import { socket } from '../../redux/store';
import { GET_POSTS_ERROR, GET_POSTS_SUCCESS } from '../../redux/types/posts';
import { State } from '../../redux/types/state';
import Post from '../../components/posts/Post';

export default function Profile (props: any, data: any) {
  const dispatch: ThunkDispatch<any, any, any> = useAppDispatch();

  const postState = useAppSelector((state: State) => state.postsState)

  useEffect(() => {
    socket.subscribe('get_posts_by_id_success', (data: any) => {
      dispatch({ type: GET_POSTS_SUCCESS, payload: data })
    })
  
    socket.subscribe('get_posts_by_id_error', (data: any) => {
        dispatch({ type: GET_POSTS_ERROR, payload: data })
    })

    if(!postState.posts.length) dispatch(FetchPosts('1'))
  }, [])

  // useEffect(() => {
  //   fetchPosts()
  //    .then((data) => {
  //       console.log(data)
  //    })
  // }, [])

  function onRefresh() {
    dispatch(FetchPosts('1'))
  }
  return (
    <View style={styles.profileContainer}>
      <FlatList
        data={postState.posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Post post={item}/>
        )}
        refreshControl={<RefreshControl tintColor='#FFDD00'  refreshing={postState.loading} onRefresh={onRefresh} />}
        contentContainerStyle={styles.postContainer}
      />
    </View>

  );
}

const styles = StyleSheet.create({
    profileContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#101214',
      color: '#fff',
    },
    postContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      backgroundColor: '#101214',
      width: '100%',
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
    },
})