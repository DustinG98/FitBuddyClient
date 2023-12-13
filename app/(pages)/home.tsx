import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { useEffect } from 'react';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { State } from '../../redux/types/state';
import { FetchUserFeed } from '../../redux/actions/users';
import Post from '../../components/posts/Post';

export default function Home (props: any, data: any) {
  const dispatch: ThunkDispatch<any, any, any> = useAppDispatch();

  const postState = useAppSelector((state: State) => state.postsState)
  const { connected, feed } = useAppSelector((state: State) => state.usersState)

  useEffect(() => {
    if(connected && !feed || feed.length === 0) dispatch(FetchUserFeed())
  }, [connected, feed])
  return (
    <View style={styles.homeContainer}>
      <FlatList
        contentContainerStyle={styles.postContainer}
        contentOffset = {{x: 0, y: 10}}
        numColumns={1}
        decelerationRate={"fast"}
        snapToInterval={Dimensions.get("window").height * 0.8}
        data={feed}
        keyExtractor={(item) => item}
        renderItem={({item}) => <Post postId={item} />}
        pagingEnabled
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