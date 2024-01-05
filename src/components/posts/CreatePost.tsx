import { View, Text, ImageBackground, Modal, StyleSheet, TextInput, Button, TouchableHighlight, KeyboardAvoidingView, Dimensions, ActivityIndicator } from "react-native"
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from "react";
import { Socket } from '../../services/WebSocketService';
import * as FileSystem from "expo-file-system";
import {Buffer} from "buffer";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { GetS3SignedUrl } from "../../redux/actions/posts";



export function CreatePost({ socket, modalOpen, toggleModal, image }: { socket: Socket, modalOpen: boolean, toggleModal: Function, image: ImagePicker.ImagePickerResult | null }) {
    const [description, setDescription] = useState('');

    const [loading, setLoading] = useState(false);

    const [ shouldCreatePost, setShouldCreatePost ] = useState(false)

    const { s3SignedUrl } = useAppSelector((state) => state.postsState)
    const dispatch: ThunkDispatch<any, any, any> = useAppDispatch();

    useEffect(() => {
        if(shouldCreatePost) {
            setLoading(true)
            dispatch(GetS3SignedUrl('png'))
        }
    }, [shouldCreatePost])

    useEffect(() => {
        if(s3SignedUrl && shouldCreatePost) {
            uploadImage(s3SignedUrl)
                .then(() => {
                    
                })
        }
    }, [s3SignedUrl])
    function createPost(description: string, image: string) {
        return new Promise((resolve, reject) => {
            function handleCreatePostSuccess(data: any) {
                socket.unsubscribe('post_create_update_success', handleCreatePostSuccess)
                socket.unsubscribe('post_create_update_error', handleCreatePostError)
                resolve(data)
            }
            function handleCreatePostError(data: any) {
                socket.unsubscribe('post_create_update_success', handleCreatePostSuccess)
                socket.unsubscribe('post_create_update_error', handleCreatePostError)
                reject(data)
            }
            socket.send('create_update_post', { content: description, image })
            socket.subscribe('post_create_update_success', handleCreatePostSuccess)
            socket.subscribe('post_create_update_error', handleCreatePostError)
        })
    }

    useEffect(() => { 
        if(image?.canceled) {
           toggleModal();
        }
    }, [image]);

    async function uploadImage(data: any) {
        // upload image to s3
        if(image?.assets && image?.assets[0].uri) {
            const base64 = await FileSystem.readAsStringAsync(image?.assets[0].uri, {
                encoding: FileSystem.EncodingType.Base64,
              });
            const buffer = Buffer.from(base64, "base64");
            const response = await fetch(data.presignedUrl, {
                method: 'PUT',
                body: buffer,
                headers: {
                    'Content-Type': 'image/png'
                }
            })
            return response
        }
    }

    async function handlePost(e: any) {
        setShouldCreatePost(true)
        // e.preventDefault();
        // setLoading(true)
        // getS3Url()
        //     .then((data: any) => {
        //         console.log(data)
        //         uploadImage(data)
        //             .then(() => {
        //                 createPost(description, data.key)
        //                     .then((data: any) => {
        //                         setLoading(false)

        //                         toggleModal()
        //                     })
        //             })
        //     })
    }

    return (
        modalOpen &&
        <Modal
            presentationStyle="fullScreen"
            animationType="slide"
        >
            <View style={styles.modal}>
            {image && image.assets && image.assets[0] !== null && !loading ? <ImageBackground source={{uri: image.assets[0].uri}} style={{ width: Dimensions.get("window").width, height: Dimensions.get("window").height, zIndex: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} >
                    <View style={styles.headerContainer}>
                        <Text style={{ color: '#fff' }}>Create Post</Text>
                        <TouchableHighlight onPress={() => toggleModal()}
                        >
                            <Text style={{ color: '#fff' }}>Cancel</Text>
                        </TouchableHighlight>
                    </View>
                    <KeyboardAvoidingView behavior="padding" style={styles.inputContainer}>
                        <TextInput
                            style={{ height: 40, borderColor: '#FFDD00', color: '#fff', borderWidth: 1, borderRadius: 15, width: '80%', marginRight: '5%', padding: 5, marginBottom: 30}}
                            onChangeText={text => setDescription(text)}
                            placeholder="Description and tags"
                        />
                        <TouchableHighlight 
                            style={{ height: 40, borderColor: '#FFDD00', borderWidth: 1, borderRadius: 15, width: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                            onPress={(e) => handlePost(e)}
                        >
                            <Text
                                style={{ color: '#FFDD00', fontSize: 12, fontWeight: 'bold' }}
                            >Post</Text>
                        </TouchableHighlight>
                    </KeyboardAvoidingView>
                    
                </ImageBackground> : <ActivityIndicator size="small" color="#FFDD00" />
                    }
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
      flex: 1,
      backgroundColor: '#101214',
      color: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 999,
    },
    modalHeaderText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#101214',
        width: '100%',
        padding: '5%',
        paddingTop: '10%',
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#101214',
        padding: '5%',
        paddingBottom: '10%',
    }
});