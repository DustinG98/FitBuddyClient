import { Stack, usePathname } from 'expo-router'
import NavBar from '../nav'
import Divider from '../components/shared/Divider'

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
                    headerShown: false,
                }}
            >
            </Stack>
        </>
    )
}