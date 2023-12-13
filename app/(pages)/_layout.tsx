import React, { useEffect, useState } from 'react'
import { Stack, usePathname } from 'expo-router'
import NavBar from '../../src/components/nav'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Text } from 'react-native'
import { AuthService } from '../../src/services/AuthService'
import { socket } from '../../src/redux/store'
import { CreatePost } from '../../src/components/posts/CreatePost'
import * as ImagePicker from 'expo-image-picker';

export default function App() {
    const pathname = usePathname()

    const [authService, setAuthService] = useState<AuthService>()
    const onPressSignOut = () => {
        authService?.logout()
    }

    const [createModalVisible, setCreateModalVisible] = useState(false);


    useEffect(() => {
        const _authService = new AuthService(pathname);
        setAuthService(_authService)
        _authService.checkAuth()
            .then(() => {
                if(_authService.loggedIn) {
                    _authService.getAccessToken().then((token) => {
                        if (token && !socket.connected) {
                            socket.open(token);
                        }
                    })
                }
            })
    }, [])

    const [image, setImage] = useState<ImagePicker.ImagePickerResult | null>(null);

    async function pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });
        
        setImage(result);
        toggleModal();
    }

    const toggleModal = () => {
        setCreateModalVisible(!createModalVisible);
    }

    return (
        <>
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#101214',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitle: 'Gym Buddy',
                    headerRight: () => <>
                        <TouchableOpacity
                            onPress = {onPressSignOut}
                            style={styles.signOutBtn}>
                            <Text style={styles.signOutText}>Sign Out</Text>
                        </TouchableOpacity>
                    </>,
                    animation: 'simple_push',
                }}
            >
                <Stack.Screen name="index" options={{
                    headerShown: false,
                }}/>
                <Stack.Screen name="home" options={{
                    headerBackButtonMenuEnabled: false,
                    headerBackVisible: false,
                }}/>
                <Stack.Screen name="search" options={{
                    headerBackButtonMenuEnabled: false,
                    headerBackVisible: false,
                }} />
                <Stack.Screen name="inbox" options={{
                    headerBackButtonMenuEnabled: false,
                    headerBackVisible: false,
                }} />
                <Stack.Screen name="profile" options={{
                    headerBackButtonMenuEnabled: false,
                    headerBackVisible: false,
                }} 
                />

            </Stack>
            { socket ? <NavBar socket={socket} toggleModal={pickImage}/> : null }
            {createModalVisible && socket ? 
                <CreatePost socket={socket} modalOpen={createModalVisible} image={image} toggleModal={toggleModal} />
            : null}
        </>
    )
}

const styles = StyleSheet.create({
    icon: {
        color: '#fff',
        width: 35,
        height: 35,
    },
    signOutBtn:{
        alignItems:"center",
        justifyContent:"center",
    },
    signOutText:{
        color:"#fff",
        fontSize: 12,
        fontWeight: 'bold',
    },
  });