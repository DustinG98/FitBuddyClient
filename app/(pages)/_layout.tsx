import React, { useEffect, useState } from 'react'
import { Stack, usePathname } from 'expo-router'
import NavBar from '../../nav'
import Divider from '../../components/shared/Divider'
import Profile from '../../assets/icons/Profile'
import { StyleSheet } from 'react-native'
import { TouchableHighlight } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Text } from 'react-native'
import { AuthService } from '../../services/AuthService'
import { WebSocketService } from '../../services/WebSocketService'

export default function App() {
    const pathname = usePathname()

    const [authService, setAuthService] = useState<AuthService>()
    const onPressSignOut = () => {
        authService?.logout()
    }

    const [connected, setConnected] = useState(false);
    const [socket, setSocket] = useState<WebSocketService>();

    useEffect(() => {
        const _authService = new AuthService(pathname);
        setAuthService(_authService)
        _authService.getAccessToken().then((token) => {
            if (token) {
                const webSocketService = new WebSocketService(token);
                setSocket(webSocketService);
                console.log(socket?.connected)
            }
        })
    }, [])

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
                    headerLeft: () => <>
                        <Text style={{color: '#fff', fontSize: 12, fontWeight: 'bold', marginLeft: 10}}>Connected: {connected ? 'Yes' : 'No'}</Text>
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
                <Stack.Screen name="schedule" options={{
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

            </Stack>
            <NavBar/>
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