import { View, Text, Image, StyleSheet, ActivityIndicator, ImageBackground, Dimensions, TouchableHighlight } from "react-native"
import { WorkoutPlanWorkout } from "../../models/workouts"
import { PostRecord } from "../../models/posts"
import { AntDesign } from '@expo/vector-icons'; 
import { useEffect, useState } from "react";
import { Link, router, useNavigation, usePathname } from "expo-router";

export default function Post ({ post }: { post: PostRecord }) {
    const [preLoadFinished, setPreloadFinished] = useState(false)

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        Image.prefetch(`${process.env.EXPO_PUBLIC_POST_BUCKET}/${post.image}`)
        .then(() => {
            setPreloadFinished(true)
        })
    }, [])

    const postComponent = () => {
        return (
            <TouchableHighlight onPress={() => router.replace(`/posts/${post.id}`)}>
                <ImageBackground onLoadEnd={() => setLoaded(true)} source={{ uri: `${process.env.EXPO_PUBLIC_POST_BUCKET}/${post.image}` }} style={styles.postImage} >
                    <View style={styles.postContent}>
                        <View style={styles.actionContainer}>
                            <AntDesign name="hearto" size={24} color="#FFDD00" />
                            <Text style={styles.likeText}>{post.likes}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableHighlight>
        )
    }

    return (
        <View style={styles.postContainer}>
            {
                preLoadFinished ? postComponent() : <View style={styles.imagePlaceholder}>
                        <ActivityIndicator size="small" color="#FFDD00" />
                    </View>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    imagePlaceholder: {
        height: 200,
        borderRadius: 10,
        resizeMode: 'cover',
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    postImage: {
        height: 200,
        borderRadius: 10,
        resizeMode: 'cover',
        marginBottom: 10,
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
        width: Dimensions.get('window').width / 3 - 4,
        margin: 2,
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