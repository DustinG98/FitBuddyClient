import { ActivityIndicator, Dimensions, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { FetchPosts } from '../../redux/actions/posts';
import { State } from '../../redux/types/state';
import PostThumbnail from '../posts/PostThumbnail';
import { FetchProfile, FollowUser, UnfollowUser } from '../../redux/actions/users';
import { ProfileHeader } from './ProfileHeader';
import { Stack } from 'expo-router';

export default function Profile ({ userId }: { userId?: string }) {
  const dispatch: ThunkDispatch<any, any, any> = useAppDispatch();

  const { loading: postLoading } = useAppSelector((state: State) => state.postsState)
  const posts = useAppSelector((state: State) => state.postsState.posts[userId ?? 'mine'])

  const { profile: _profile, profileLoading, profiles } = useAppSelector((state: State) => state.usersState)
  const profile = userId ? profiles.find((record) => record.userId === userId) : _profile
    
  useEffect(() => {
    if(!profileLoading && !profile) dispatch(FetchProfile(userId))
    if(!postLoading && !posts) dispatch(FetchPosts(userId))
  }, [profile, posts])

  function onRefresh() {
    dispatch(FetchPosts(userId ?? '1'))
  }

  function followUnfollowUser(userId: string, isFollowing: boolean) {
    if(!isFollowing) {
      dispatch(FollowUser(userId))
    } else {
      dispatch(UnfollowUser(userId))
    }
  }

  return (
    <View style={styles.profileContainer}>
      <Stack.Screen  options={{
        header: () => (profile && <ProfileHeader followUnfollowUser={followUnfollowUser} isMyProfile={userId === undefined} profile={profile}/>)
      }}/>
      {
       !postLoading && posts && posts.length > 0 ? <FlatList
          data={posts}
          keyExtractor={item => item.sortKey}
          renderItem={({ item }) => (
            <PostThumbnail post={item}/>
          )}
          numColumns={3}
          refreshControl={<RefreshControl tintColor='#FFDD00'  refreshing={postLoading} onRefresh={onRefresh} />}
          contentContainerStyle={styles.postContainer}
        /> : postLoading  ? <ActivityIndicator size="large" color="#FFDD00" /> : <View><Text style={{ color: '#fff' }}>No Posts</Text></View>
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