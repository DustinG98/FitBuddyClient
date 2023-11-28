import { Text, View, StyleSheet } from 'react-native'
import { Link, usePathname } from 'expo-router'
import ChatBubble from '../assets/icons/ChatBubble'
import HomeIcon from '../assets/icons/Home'
import Divider from '../components/shared/Divider'
import Calendar from '../assets/icons/Calendar'
import Profile from '../assets/icons/Profile'
export default function NavBar () {
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
                <Link href='/schedule' style={styles.link}>
                    <View style={styles.routeContainer}>
                        <Calendar style={styles.icon} color={path === '/schedule' ? '#FFDD00' : '#fff'}/>
                        <Text style={path === '/schedule' ? styles.activeLinkText : styles.linkText}>Schedule</Text> 
                    </View>
                </Link>
                <Link href='/inbox' style={styles.link}>
                    <View style={styles.routeContainer}>
                        <ChatBubble style={styles.icon} color={path === '/inbox' ? '#FFDD00' : '#fff'}/>
                        <Text style={path === '/inbox' ? styles.activeLinkText : styles.linkText}>Inbox</Text>
                    </View>
                </Link>
                <Link style={styles.link} href='/profile'>
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
        padding: 10,
    },
    icon: {
        color: '#fff',
        width: 35,
        height: 35,
    }
  });
  