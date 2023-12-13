import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Link, usePathname } from 'expo-router'
import ChatBubble from '../assets/icons/ChatBubble'
import HomeIcon from '../assets/icons/Home'
import Divider from '../components/shared/Divider'
import Calendar from '../assets/icons/Calendar'
import Profile from '../assets/icons/Profile'
import { AntDesign } from '@expo/vector-icons'; 
import { useState } from 'react'
import { Socket } from '../services/WebSocketService'

export default function NavBar ({ socket, toggleModal }: { socket: Socket, toggleModal: Function }) {
    const [createMenuVisible, setCreateMenuVisible] = useState(false)

    const toggleCreateMenu = () => {
        toggleModal()
    }
    const path = usePathname()
    return (
        <>
            <Divider/>
            <View style={styles.container}>

                <Link href='/home' style={styles.link}>
                    <View style={styles.routeContainer}>
                        <HomeIcon style={styles.icon} color={path === '/home' ? '#FFDD00' : '#fff'}/>
                        <Text style={path === '/home' ? styles.activeLinkText : styles.linkText}>Home</Text>
                    </View>
                </Link>
                <Link href='/search' style={styles.link}>
                    <View style={styles.routeContainer}>
                        <AntDesign name="search1" size={35} color={path === '/search' ? '#FFDD00' : '#fff'} />
                        <Text style={path === '/search' ? styles.activeLinkText : styles.linkText}>Search</Text> 
                    </View>
                </Link>
                <TouchableOpacity style={styles.menuButton} onPress={() => toggleCreateMenu()}>
                    <View style={styles.routeContainer}>
                        <AntDesign name="pluscircle" size={35} color="#fff" />
                    </View>
                </TouchableOpacity>
                <Link href='/inbox' style={styles.link}>
                    <View style={styles.routeContainer}>
                        <ChatBubble style={styles.icon} color={path === '/inbox' ? '#FFDD00' : '#fff'}/>
                        <Text style={path === '/inbox' ? styles.activeLinkText : styles.linkText}>Inbox</Text>
                    </View>
                </Link>
                <Link style={styles.link} href={{pathname: '/profile', params: { socket }}}>
                    <View style={styles.routeContainer}>
                        <Profile style={styles.icon} color={path === '/profile' ? '#FFDD00' : '#fff'}/>
                        <Text style={path === '/profile' ? styles.activeLinkText : styles.linkText}>Profile</Text>
                    </View>
                </Link>
            </View>
        </>

    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#101214',
      color: '#fff',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      maxHeight: 80,
      paddingTop: 15,
    },
    createMenu: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        maxHeight: 120,
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 1)',
    },
    createButton: {
        height: 40,
        width: '100%',
        maxWidth: 120,
        backgroundColor: '#FFDD00',
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 60,
        height: 60,
    },
    routeContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    linkText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 5,
    },
    activeLinkText: {
        color: '#FFDD00',
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 5,
    },
    link: {
        paddingBottom: 15,
    },
    icon: {
        color: '#fff',
        width: 35,
        height: 35,
    }
  });
  