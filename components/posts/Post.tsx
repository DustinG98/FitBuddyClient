import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native"
import { WorkoutPlanWorkout } from "../../models/workouts"
import { PostRecord } from "../../models/posts"
import { AntDesign } from '@expo/vector-icons'; 
import { useEffect, useState } from "react";

export default function Post ({ post }: { post: PostRecord }) {
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        Image.prefetch(`${process.env.EXPO_PUBLIC_POST_BUCKET}/${post.image}`)
        .then(() => {
            setLoaded(true)
        })
    }, [])

    return (
        <View style={styles.postContainer}>
            {
                loaded ? (
                    <>
                        <Image source={{ uri: `${process.env.EXPO_PUBLIC_POST_BUCKET}/${post.image}` }} style={styles.postImage} />
                        <View style={styles.postContent}>
                            <View style={styles.postContent}>
                                <AntDesign name="hearto" size={24} color="#FFDD00" />
                                <Text style={styles.likeText}>{post.likes}</Text>
                            </View>
                        </View>
                    </>
                ) : <ActivityIndicator size="small" color="#FFDD00" />
            }

        </View>
    )
}

const styles = StyleSheet.create({
    postImage: {
        height: 200,
        borderRadius: 10,
        resizeMode: 'cover',
        marginBottom: 10,
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
        backgroundColor: '#212529',
        padding: 10,
        borderRadius: 10,
        width: 150
    },
    postContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})