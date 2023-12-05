import { View, Text, ImageBackground, Modal, StyleSheet, TextInput, Button, TouchableHighlight, KeyboardAvoidingView } from "react-native"
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from "react";
import { Socket } from '../../services/WebSocketService';
import * as FileSystem from "expo-file-system";
import {Buffer} from "buffer";



export function CreatePost({ socket, modalOpen, toggleModal, image }: { socket: Socket, modalOpen: boolean, toggleModal: Function, image: ImagePicker.ImagePickerResult | null }) {
    const [description, setDescription] = useState('');

    const [imageUrl, setImageUrl] = useState('');

    function getS3Url() {
        return new Promise((resolve, reject) => {
            socket.send('get_s3_url', { imageType: 'png' })
            socket.subscribe('get_s3_url_success', (data: any) => {
                resolve(data)
            })
            socket.subscribe('get_s3_url_error', (data: any) => {
                reject(data)
            })
        })
    }

    function createPost(description: string, image: string) {
        return new Promise((resolve, reject) => {
            socket.send('create_update_post', { content: description, image })
            socket.subscribe('post_create_update_success', (data: any) => {
                resolve(data)
            })
            socket.subscribe('post_create_update_error', (data: any) => {
                reject(data)
            })
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
        e.preventDefault();
        getS3Url()
            .then((data: any) => {
                uploadImage(data)
                    .then(() => {
                        createPost(description, data.key)
                            .then((data: any) => {
                                console.log({data})
                                toggleModal()
                            })
                    })
            })
    }

    return (
        modalOpen &&
        <Modal
            presentationStyle="fullScreen"
            animationType="slide"
        >
            <View style={styles.modal}>
                {image && image.assets && image.assets[0] !== null ? <ImageBackground source={{uri: image.assets[0].uri}} style={{ width: image.assets[0].width / 3, height: image.assets[0].height / 3, zIndex: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} >
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
                    
                </ImageBackground> : null}
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