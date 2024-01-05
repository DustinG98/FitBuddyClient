import React, { useEffect, useState } from 'react'
import { Stack, usePathname } from 'expo-router'
import NavBar from '../../src/components/nav'
import { Modal, StyleSheet, Touchable, TouchableHighlight, TouchableWithoutFeedback, View } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Text } from 'react-native'
import { AuthService } from '../../src/services/AuthService'
import { socket } from '../../src/redux/store'
import { CreatePostModal } from '../../src/components/posts/CreatePost'
import * as ImagePicker from 'expo-image-picker';
import { CreateWorkoutPlanModal } from '../../src/components/workouts/CreateWorkoutPlanModal'
import WorkoutsPageHeader from '../../src/components/shared/BlankPageHeader'
import BlankPageHeader from '../../src/components/shared/BlankPageHeader'

export default function App() {
    const pathname = usePathname()

    const [authService, setAuthService] = useState<AuthService>()
    const onPressSignOut = () => {
        authService?.logout()
    }

    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [ createWorkoutPlanModalVisible, setCreateWorkoutPlanModalVisible ] = useState(false)

    const [ createMenuVisible, setCreateMenuVisible ] = useState(false)


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
        if(createMenuVisible) toggleCreateMenu()
        setCreateModalVisible(!createModalVisible);
    }

    const toggleCreateMenu = () => {
        setCreateMenuVisible(!createMenuVisible)
    }

    const toggleWorkoutPlanModal = () => {
        if(createMenuVisible) toggleCreateMenu()
        setCreateWorkoutPlanModalVisible(!createWorkoutPlanModalVisible)
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
                }} />
                <Stack.Screen name="workouts" options={{
                    headerBackButtonMenuEnabled: false,
                    headerBackVisible: false,
                    header: () => <BlankPageHeader/>,
                }} />
                <Stack.Screen name="workout" options={{
                    headerBackButtonMenuEnabled: false,
                    headerBackVisible: false,
                }} />

            </Stack>
            {
               <Modal
                    animationType="slide"
                    transparent={true}
                    visible={createMenuVisible}
                    onRequestClose={() => {
                        toggleCreateMenu()
                    }}
               >
                    <TouchableWithoutFeedback onPress={() => toggleCreateMenu()}>
                        <View style={styles.createMenu}>
                            <TouchableOpacity style={styles.createButton} onPress={() => toggleWorkoutPlanModal()}>
                                <Text style={styles.createMenuText}>Create Workout Plan</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.createButton} onPress={() => pickImage()}>
                                <Text style={styles.createMenuText}>Create Post</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            }
            { socket ? <NavBar socket={socket} toggleModal={toggleCreateMenu}/> : null }
            
            {createModalVisible ? 
                <CreatePostModal modalOpen={createModalVisible} image={image} toggleModal={toggleModal} />
            : null}
            {
                createWorkoutPlanModalVisible && socket ?
                <CreateWorkoutPlanModal modalOpen={createWorkoutPlanModalVisible} toggleModal={toggleWorkoutPlanModal}/>
                : null
            }
        </>
    )
}

const styles = StyleSheet.create({
    createMenu: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingBottom: 100,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
        zIndex: 999,
    },
    createButton: {
        height: 40,
        backgroundColor: '#FFDD00',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 16,
    },
    cancelButton: {
        height: 40,
        backgroundColor: '#101214',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 16,
    },
    createMenuText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },
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