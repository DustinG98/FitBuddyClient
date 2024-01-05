import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { Button, Portal, Snackbar, Text } from "react-native-paper"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { ThunkDispatch } from "@reduxjs/toolkit"
import { ClearNotification } from "../../redux/actions/users"
import { router } from "expo-router"
import { useCustomTheme } from "../../theme/hooks"

export const Notification = () => {
    const [ visible, setVisible ] = useState(false)
    const { notification } = useAppSelector((state) => state.usersState)
    const [ notificationAction, setNotificationAction ] = useState<(() => void)| undefined>(undefined)
    const dispatch: ThunkDispatch<any, any, any> = useAppDispatch();
    const theme = useCustomTheme();

    function onDismiss() {
        setVisible(false)
        dispatch(ClearNotification())
    }

    useEffect(() => {
        if(notification && !visible) {
            setVisible(true)
        }
    }, [notification])

    const handleRoute = (route: string) => {
        router.push(route)
    }

    useEffect(() => {
        if(notification?.action) {
            const [action, data] = notification.action.split('#')
            switch(action) {
                case 'route':
                    setNotificationAction(() => () => handleRoute(data))
                    break;
                default:
                    setNotificationAction(undefined)
            }
        } else {
            setNotificationAction(undefined)
        }
    }, [notification?.action])

    return (
        <Portal>
            <Snackbar
                style={{ backgroundColor: notification?.type === 'error' ? theme.colors.error : theme.colors.notificationBackground }}
                wrapperStyle={{ top: 0, paddingTop: 100 }}
                visible={visible}
                onDismiss={onDismiss}
                elevation={5}
            >
                <View style={styles.container}>
                    <Text style={{ color: theme.colors.notificationText }}>{notification?.message}</Text>
                    <Button textColor="#000" onPress={notificationAction || onDismiss} mode="text">{notification?.actionName || "Dismiss"}</Button>
                </View>
            </Snackbar>
        </Portal>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})