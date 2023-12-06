import { ActivityIndicator, Dimensions, FlatList, Image, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { FetchPosts } from '../../redux/actions/posts';
import { socket } from '../../redux/store';
import { GET_POSTS_ERROR, GET_POSTS_SUCCESS } from '../../redux/types/posts';
import { State } from '../../redux/types/state';
import Post from '../../components/posts/Post';
import { FetchProfile } from '../../redux/actions/users';
import { GET_PROFILE_ERROR, GET_PROFILE_SUCCESS } from '../../redux/types/users';
import { ProfileHeader } from '../../components/profile/ProfileHeader';
import { Stack } from 'expo-router';

export default function Profile (props: any, data: any) {
  const dispatch: ThunkDispatch<any, any, any> = useAppDispatch();

  const postState = useAppSelector((state: State) => state.postsState)
  const usersState = useAppSelector((state: State) => state.usersState)

  useEffect(() => {
    socket.subscribe('get_posts_by_id_success', (data: any) => {
      dispatch({ type: GET_POSTS_SUCCESS, payload: data })
    })
  
    socket.subscribe('get_posts_by_id_error', (data: any) => {
      dispatch({ type: GET_POSTS_ERROR, payload: data })
    })

    socket.subscribe('get_profile_success', (data: any) => {
      dispatch({ type: GET_PROFILE_SUCCESS, payload: data })
    })

    socket.subscribe('get_profile_error', (data: any) => {
      dispatch({ type: GET_PROFILE_ERROR, payload: data })
    })

    if(!postState.posts || !postState.posts.length) dispatch(FetchPosts('1'))

    if(!usersState.profile || !usersState.profile.id) dispatch(FetchProfile())
  }, [])

  function onRefresh() {
    dispatch(FetchPosts('1'))
  }
  return (
    <View style={styles.profileContainer}>
      <Stack.Screen  options={{
        header: () => (usersState.profile && <ProfileHeader profile={usersState.profile}/>)
      }}/>
      {
       postState.posts && postState.posts.length > 0 ? <FlatList
        data={postState.posts}
        keyExtractor={item => item.sortKey}
        renderItem={({ item }) => (
          <Post post={item}/>
        )}
        numColumns={3}
        refreshControl={<RefreshControl tintColor='#FFDD00'  refreshing={postState.loading} onRefresh={onRefresh} />}
        contentContainerStyle={styles.postContainer}
      /> : <ActivityIndicator size="small" color="#FFDD00" />
                        

      }
      
    </View>

  );
}

const styles = StyleSheet.create({
    profileImage: {
      width: 50,
      height: 50,
      borderRadius: 50,
      marginRight: 16,
    },
    profileContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#101214',
      color: '#fff',
    },
    postContainer: {
      backgroundColor: '#101214',
      width: Dimensions.get('window').width,
      padding: 5,
      overflowX: 'hidden',
      overflowY: 'scroll',
    },
})