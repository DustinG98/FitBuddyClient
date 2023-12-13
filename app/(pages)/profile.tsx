import { ActivityIndicator, Dimensions, FlatList, Image, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { FetchPosts } from '../../redux/actions/posts';
import { socket } from '../../redux/store';
import { GET_POSTS_ERROR, GET_POSTS_SUCCESS } from '../../redux/types/posts';
import { State } from '../../redux/types/state';
import PostThumbnail from '../../components/posts/PostThumbnail';
import { FetchProfile } from '../../redux/actions/users';
import { GET_MY_PROFILE_SUCCESS, GET_PROFILE_ERROR, GET_PROFILE_SUCCESS } from '../../redux/types/users';
import { ProfileHeader } from '../../components/profile/ProfileHeader';
import { Stack } from 'expo-router';

export default function Profile (props: any, data: any) {
  const dispatch: ThunkDispatch<any, any, any> = useAppDispatch();

  const postState = useAppSelector((state: State) => state.postsState)
  const usersState = useAppSelector((state: State) => state.usersState)

  const [ _posts, setPosts ] = useState<any[]>([])
  const [ _profile, setProfile ] = useState<any>()

  const profile = usersState.profile
  const posts = postState.posts

  useEffect(() => {
    if(profile) setProfile(_profile)
    if(posts) setPosts(_posts)

    if(!usersState.profileLoading && !profile) dispatch(FetchProfile())
    if(!postState.loading && !posts || posts.length === 0) dispatch(FetchPosts('1'))
  }, [profile, posts])

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