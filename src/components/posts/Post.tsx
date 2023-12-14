import { View, Text, Image, StyleSheet, ActivityIndicator, ImageBackground, Dimensions, TouchableHighlight, TouchableOpacity } from "react-native"
import { AntDesign, MaterialIcons } from '@expo/vector-icons'; 
import { useEffect, useState } from "react";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FetchPost, LikePost, UnlikePost } from "../../redux/actions/posts";
import { State } from "../../redux/types/state";

export default function Post (props: any) {
    const { postId } = props
    const dispatch: ThunkDispatch<any, any, any> = useAppDispatch();


    const { loading, othersPosts } = useAppSelector((state: State) => state.postsState)

    const { post, profile } = othersPosts.find((record: any) => record.post.sortKey === `POST#${postId}`) ?? {}

    const [isLiked, setIsLiked] = useState(post?.isLiked ?? false)
    const [ likes, setLikes ] = useState(post?.likes ?? 0)

    useEffect(() => {
        if(!loading && !post && !profile) dispatch(FetchPost(postId))
        setIsLiked(post?.isLiked ?? false)
        setLikes(post?.likes ?? 0)
    }, [post, profile])


    const likePost = () => {
        setIsLiked(true)
        setLikes(likes + 1)
        dispatch(LikePost(postId))
    }

    const unlikePost = () => {
        setIsLiked(false)
        setLikes(likes - 1)
        dispatch(UnlikePost(postId))
    }

    const postComponent = () => {
        return (
            <TouchableHighlight>
                <ImageBackground resizeMode="cover" source={{ uri: `${process.env.EXPO_PUBLIC_POST_BUCKET}/${post?.image}` }} style={styles.postImage} >
                    <View style={styles.actions}>
                        <TouchableOpacity onPress={() => isLiked ? unlikePost() : likePost()}>
                            <View style={styles.actionContainer}>
                                {
                                    isLiked ? <AntDesign style={styles.activeActionIcon} name="heart" size={36} color="#FFF" /> : <AntDesign style={styles.inactiveActionIcon} name="hearto" size={36} color="#FFF" />
                                }
                                
                                <Text style={styles.likeText}>{likes}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.actionContainer}>
                                <MaterialIcons style={styles.inactiveActionIcon} name="comment" size={36} color="#FFF" />
                            </View>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.postContent}>
                        <View style={styles.postTextCont}>
                            {/* <Image style={styles.profileImage} source={{ uri: `${process.env.EXPO_PUBLIC_PROFILE_BUCKET}/${profile?.profileImage}` }} /> */}
                        </View>
                        <View style={styles.postTextCont}>
                            <Image style={styles.profileImage} source={{uri: 'https://avatars.githubusercontent.com/u/25105821?v=4'}} />
                            <Text style={styles.postAuthor}>{profile?.preferredUserName} - </Text>
                            <Text style={styles.postText}>{post?.content}</Text>
                        </View>

                    </View>

                </ImageBackground>
            </TouchableHighlight>
        )
    }

    return (
        <View style={styles.postContainer}>
            {
                !loading ? postComponent() : <View style={styles.imagePlaceholder}>
                        <ActivityIndicator size="small" color="#FFDD00" />
                    </View>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    imagePlaceholder: {
        height: Dimensions.get('window').height * 0.8,
        borderRadius: 10,
        resizeMode: 'contain',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    profileImage: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginRight: 16,
    },
    postImage: {
        height: Dimensions.get('window').height * 0.8,
        borderRadius: 10,
        resizeMode: 'contain',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    postAuthor: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
    postText: {
        color: '#fff',
        fontSize: 12
    },
    likeText: {
        marginLeft: 5,
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12
    },
    postContainer: {
        borderRadius: 10,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.8,
        margin: 0,
        border: '1px solid #FFDD00',
    },
    postContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    postTextCont: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        padding: '5%',
    },
    // sidebar actions
    actions: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '50%',
        width: 100,
        padding: '5%',
    },
    activeActionIcon: {
        color: '#FF0000',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
    },
    inactiveActionIcon: {
        color: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
    },
    actionContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5%',
        height: Dimensions.get('window').height * 0.8 * 0.2 / 2,
    }
})