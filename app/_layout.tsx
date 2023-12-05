import { Stack, usePathname } from 'expo-router'
import { Provider } from 'react-redux'
import NavBar from '../nav'
import Divider from '../components/shared/Divider'
import { store } from '../redux/store'

export default function App() {
    return (
        <Provider store={store}>
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
        </Provider>
    )
}