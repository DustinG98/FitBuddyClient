import { View, Text, Image, StyleSheet, ActivityIndicator, ImageBackground, Dimensions, TouchableHighlight } from "react-native"
import { WorkoutPlanWorkout } from "../../models/workouts"
import { PostRecord } from "../../models/posts"
import { AntDesign } from '@expo/vector-icons'; 
import { useEffect, useState } from "react";
import { Link, router, useNavigation, usePathname } from "expo-router";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../redux/hooks";
import { FetchPost } from "../../redux/actions/posts";
import { GET_POST_ERROR, GET_POST_SUCCESS } from "../../redux/types/posts";
import { socket } from "../../redux/store";

export default function Post ({ postId }: { postId: string }) {
    const dispatch: ThunkDispatch<any, any, any> = useAppDispatch();

    const [ post, setPost ] = useState<PostRecord>()
    const [loaded, setLoaded] = useState(false)
    const handleGetPostSuccess = (data: any) => {
        setLoaded(true)
        setPost(data)
        dispatch({ type: GET_POST_SUCCESS, payload: data })
    }
    
    const handleGetPostError = (data: any) => {
        dispatch({ type: GET_POST_ERROR, payload: data })
    }
    useEffect(() => {
        socket.subscribe(`get_post_success_${postId}`, handleGetPostSuccess)
        socket.subscribe(`get_post_error_${postId}`, handleGetPostError)

        if(!post) dispatch(FetchPost(postId))
        return () => {
            socket.unsubscribe(`get_post_success_${postId}`, handleGetPostSuccess)
            socket.unsubscribe(`get_post_error_${postId}`, handleGetPostError)
        }
    }, [])

    const postComponent = () => {
        return (
            <TouchableHighlight onPress={() => router.replace(`/posts/${post?.id}`)}>
                <ImageBackground resizeMode="cover" onLoadEnd={() => setLoaded(true)} source={{ uri: `${process.env.EXPO_PUBLIC_POST_BUCKET}/${post?.image}` }} style={styles.postImage} >
                    <View style={styles.postContent}>
                        <View style={styles.actionContainer}>
                            <AntDesign name="hearto" size={24} color="#FFDD00" />
                            <Text style={styles.likeText}>{post?.likes}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableHighlight>
        )
    }

    return (
        <View style={styles.postContainer}>
            {
                loaded ? postComponent() : <View style={styles.imagePlaceholder}>
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
    postImage: {
        height: Dimensions.get('window').height * 0.8,
        borderRadius: 10,
        resizeMode: 'contain',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    postText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14
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
    actionContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5%',
    }
})