import { ActivityIndicator, Dimensions, FlatList, Image, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { FetchPosts } from '../../redux/actions/posts';
import { socket } from '../../redux/store';
import { GET_POSTS_ERROR, GET_POSTS_SUCCESS } from '../../redux/types/posts';
import { State } from '../../redux/types/state';
import PostThumbnail from '../../components/posts/PostThumbnail';
import { FetchProfile } from '../../redux/actions/users';
import { GET_PROFILE_ERROR, GET_PROFILE_SUCCESS } from '../../redux/types/users';
import { ProfileHeader } from '../../components/profile/ProfileHeader';
import { Stack } from 'expo-router';

export default function Profile (props: any, data: any) {
  const dispatch: ThunkDispatch<any, any, any> = useAppDispatch();

  const postState = useAppSelector((state: State) => state.postsState)
  const usersState = useAppSelector((state: State) => state.usersState)

  const handleGetPostSuccess = (data: any) => {
    dispatch({ type: GET_POSTS_SUCCESS, payload: data })
  }

  const handleGetPostError = (data: any) => {
    dispatch({ type: GET_POSTS_ERROR, payload: data })
  }

  const handleGetProfileSuccess = (data: any) => {
    dispatch({ type: GET_PROFILE_SUCCESS, payload: data })
  }

  const handleGetProfileError = (data: any) => {
    dispatch({ type: GET_PROFILE_ERROR, payload: data })
  }

  useEffect(() => {
    socket.subscribe('get_posts_by_id_success', handleGetPostSuccess)
  
    socket.subscribe('get_posts_by_id_error', handleGetPostError)

    socket.subscribe('get_profile_success', handleGetProfileSuccess)

    socket.subscribe('get_profile_error', handleGetProfileError)
    

    if(!postState.posts || !postState.posts.length) dispatch(FetchPosts('1'))

    if(!usersState.profile || !usersState.profile.id) dispatch(FetchProfile())

    return () => {
      socket.unsubscribe('get_posts_by_id_success', handleGetPostSuccess)
      socket.unsubscribe('get_posts_by_id_error', handleGetPostError)
      socket.unsubscribe('get_profile_success', handleGetProfileSuccess)
      socket.unsubscribe('get_profile_error',  handleGetProfileError)
    }
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
       !postState.loading && postState.posts && postState.posts.length > 0 ? <FlatList
          data={postState.posts}
          keyExtractor={item => item.sortKey}
          renderItem={({ item }) => (
            <PostThumbnail post={item}/>
          )}
          numColumns={3}
          refreshControl={<RefreshControl tintColor='#FFDD00'  refreshing={postState.loading} onRefresh={onRefresh} />}
          contentContainerStyle={styles.postContainer}
        /> : postState.loading  ? <ActivityIndicator size="large" color="#FFDD00" /> : <View><Text style={{ color: '#fff' }}>No Posts</Text></View>
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