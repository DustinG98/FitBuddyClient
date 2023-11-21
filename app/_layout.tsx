import { Stack, usePathname } from 'expo-router'
import NavBar from '../nav'
import Divider from '../shared/Divider'

export default function App() {
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
                }}
            >
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