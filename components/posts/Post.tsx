import { View, Text, Image, StyleSheet, ActivityIndicator, ImageBackground, Dimensions, TouchableHighlight } from "react-native"
import { WorkoutPlanWorkout } from "../../models/workouts"
import { PostRecord } from "../../models/posts"
import { AntDesign, MaterialIcons } from '@expo/vector-icons'; 
import { useEffect, useState } from "react";
import { Link, router, useNavigation, usePathname } from "expo-router";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FetchPost } from "../../redux/actions/posts";
import { GET_POST_ERROR, GET_POST_SUCCESS } from "../../redux/types/posts";
import { socket } from "../../redux/store";
import { State } from "../../redux/types/state";
import { FetchProfile } from "../../redux/actions/users";
import { GET_PROFILE_ERROR, GET_PROFILE_SUCCESS } from "../../redux/types/users";

export default function Post ({ postId }: { postId: string }) {
    const dispatch: ThunkDispatch<any, any, any> = useAppDispatch();

    const postsState = useAppSelector((state: State) => state.postsState)

    const [ _post, setPost ] = useState<PostRecord>()
    const [ _profile, setProfile ] = useState<any>()

    const { post, profile } = postsState.othersPosts.find((record) => record.post.sortKey === `POST#${postId}`) ?? {}

    useEffect(() => {
        if(post) setPost(_post)
        if(profile) setProfile(profile)

        if(!postsState.loading && !post && !_post) dispatch(FetchPost(postId))
    }, [post, profile])

    const postComponent = () => {
        return (
            <TouchableHighlight>
                <ImageBackground resizeMode="cover" source={{ uri: `${process.env.EXPO_PUBLIC_POST_BUCKET}/${post?.image}` }} style={styles.postImage} >
                    <View style={styles.actions}>
                        <View style={styles.actionContainer}>
                            <AntDesign name="hearto" size={36} color="#FFF" />
                            <Text style={styles.likeText}>{post?.likes}</Text>
                        </View>
                        <View style={styles.actionContainer}>
                            <MaterialIcons name="comment" size={36} color="#FFF" />
                            <Text style={styles.likeText}>{post?.comments ?? 0}</Text>
                        </View>
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
                !postsState.loading ? postComponent() : <View style={styles.imagePlaceholder}>
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
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        alignItems: 'center',
        marginTop: '50%',
        width: 100,
        padding: '5%',
    },
    actionContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5%',
        height: Dimensions.get('window').height * 0.8 * 0.2 / 2,
    }
})