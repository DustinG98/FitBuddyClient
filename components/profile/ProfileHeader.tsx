import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"

export const ProfileHeader = ({profile, isMyProfile }: {isMyProfile: boolean, profile: { isFollowing: boolean, preferredUserName:string , followers: number, following: number }}) => {
    return (
        <View style={styles.profileContainer}>
            <View style={styles.profileNameContainer}>
                <Image style={styles.profileImage} width={100} height={100} source={{uri: 'https://avatars.githubusercontent.com/u/25105821?v=4'}} />
                <Text style={styles.profileName}>{profile.preferredUserName}</Text>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.infoBox}>
                    <Text style={styles.infoHeader}>Followers:</Text>
                    <Text style={styles.infoText}>{profile.followers}</Text>
                </View>
                <View style={styles.infoBox}>
                    <Text style={styles.infoHeader}>Following:</Text>
                    <Text style={styles.infoText}>{profile.following}</Text>
                </View>
            </View>
            <View style={styles.actionContainer}>
               {
                   isMyProfile ? <View>
                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionText}>Edit Profile</Text>
                    </TouchableOpacity>
                   </View> : <View>
                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionText}>{profile.isFollowing ? "Unfollow" : "Follow"}</Text>
                    </TouchableOpacity>
                   </View>
               }
            </View> 
      </View>
    )
}

const styles = StyleSheet.create({
    actionButton: {
        backgroundColor: '#FFDD00',
        borderRadius: 16,
        padding: 16,
    },
    actionText: {
        color: '#212529',
        fontWeight: 'bold',
        fontSize: 16,
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 32,
    },
    profileContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        width: '100%',
        backgroundColor: '#212529',
        paddingTop: 64,
    },
    profileNameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 16,
    },
    profileName: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 32,
    },
    infoBox: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#212529',
        marginHorizontal: 16,
    },
    infoHeader: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#fff',
    },
    infoText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#fff', 
    }
})