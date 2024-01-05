import { Stack } from 'expo-router'
import { Provider } from 'react-redux'
import { store } from '../src/redux/store'
import { PaperProvider } from 'react-native-paper'
import { theme } from '../src/theme/theme'
import { Notification } from '../src/components/notification/Notification'

export default function App() {
    return (
        <Provider store={store}>
            <PaperProvider theme={theme}>
                <Notification/>
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
            </PaperProvider>
        </Provider>
    )
}