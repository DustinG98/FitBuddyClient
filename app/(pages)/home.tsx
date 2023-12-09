import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { useEffect } from 'react';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { socket } from '../../redux/store';
import { State } from '../../redux/types/state';
import { FetchUserFeed } from '../../redux/actions/users';
import { GET_FEED_ERROR, GET_FEED_SUCCESS } from '../../redux/types/users';
import Post from '../../components/posts/Post';

export default function Home (props: any, data: any) {
  const dispatch: ThunkDispatch<any, any, any> = useAppDispatch();

  const postState = useAppSelector((state: State) => state.postsState)
  const usersState = useAppSelector((state: State) => state.usersState)

  const handleGetFeedSuccess = (data: any) => {
    dispatch({ type: GET_FEED_SUCCESS, payload: data })
  }

  const handleGetFeedError = (data: any) => {
    dispatch({ type: GET_FEED_ERROR, payload: data })
  }

  useEffect(() => {
    console.log('connected', socket.connected)
    if(!socket.connected) return
    socket.subscribe('get_user_feed_success', handleGetFeedSuccess)
  
    socket.subscribe('get_user_feed_error', handleGetFeedError)
    console.log({usersState})
    if(!usersState.feed || usersState.feed.length === 0 && !usersState.loading) dispatch(FetchUserFeed())

    return () => {
      socket.unsubscribe('get_user_feed_success', handleGetFeedSuccess)
      socket.unsubscribe('get_user_feed_error', handleGetFeedError)
    }
  }, [socket.connected])
  return (
    <View style={styles.homeContainer}>
      <FlatList
        contentContainerStyle={styles.postContainer}
        contentOffset = {{x: 0, y: 20}}
        numColumns={1}
        decelerationRate={"fast"}
        snapToInterval={Dimensions.get("window").height * 0.8}
        data={usersState.feed}
        keyExtractor={(item) => item}
        renderItem={({item}) => <Post postId={item} />}
        initialNumToRender={2}
      />
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
    homeContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#101214',
      color: '#fff',
      overflow: 'hidden',
    },
    postContainer: {
      backgroundColor: '#101214',
      width: Dimensions.get('window').width,
      overflowX: 'hidden',
      overflowY: 'scroll',
      paddingTop: 10,
    },
})