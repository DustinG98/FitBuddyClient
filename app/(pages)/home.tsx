import { Dimensions, FlatList, StyleSheet, View, RefreshControl, ActivityIndicator, Text } from 'react-native';
import { useEffect } from 'react';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../../src/redux/hooks';
import { State } from '../../src/redux/types/state';
import { FetchUserFeed } from '../../src/redux/actions/users';
import Post from '../../src/components/posts/Post';

const EmptyState = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height * 0.8,
      }}
    >
      <Text style={{ color: '#fff' }}>It's quiet here...</Text>
    </View>
  )
}

export default function Home (props: any, data: any) {
  const dispatch: ThunkDispatch<any, any, any> = useAppDispatch();

  const postState = useAppSelector((state: State) => state.postsState)
  const { connected, feed, feedLoading } = useAppSelector((state: State) => state.usersState)

  useEffect(() => {
    if(connected && !feed) dispatch(FetchUserFeed())
  }, [connected, feed])
  return (
    <View style={styles.homeContainer}>
      {
        feedLoading && !feed ? <ActivityIndicator size="large" color="#FFDD00" /> : <FlatList
        contentContainerStyle={styles.postContainer}
        contentOffset = {{x: 0, y: 10}}
        numColumns={1}
        decelerationRate={"fast"}
        snapToInterval={Dimensions.get("window").height * 0.8}
        data={feed}
        keyExtractor={(item) => item}
        renderItem={({item}) => <Post postId={item} />}
        refreshControl={<RefreshControl tintColor='#FFDD00'  refreshing={postState.loading} onRefresh={() => dispatch(FetchUserFeed())}/>}
        pagingEnabled
        ListEmptyComponent={<EmptyState/>}
      />
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