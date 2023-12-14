import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import { Divider, HorizontalDivider } from "../shared/Divider"

export const ProfileHeader = ({profile, isMyProfile, followUnfollowUser }: {isMyProfile: boolean, profile: { isFollowing: boolean, preferredUserName:string , followers: number, following: number, userId: string }, followUnfollowUser: CallableFunction}) => {
    return (
        <View style={styles.profileContainer}>
            <View style={styles.profileNameContainer}>
                <Image style={styles.profileImage} width={100} height={100} source={{uri: 'https://avatars.githubusercontent.com/u/25105821?v=4'}} />
                <Text style={styles.profileName}>{profile.preferredUserName}</Text>
                <Text style={styles.bioText}>New Mexico ☀️ | Problem Solver 🧠</Text>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>{profile.followers}</Text>
                    <Text style={styles.infoHeader}>Followers</Text>
                </View>
                <HorizontalDivider color="#fff" />
                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>{profile.following}</Text>
                    <Text style={styles.infoHeader}>Following</Text>
                </View>
            </View>
            <View style={styles.actionContainer}>
                {
                   isMyProfile ? <>
                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionText}>Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subActionButton}>
                        <Text style={styles.subActionText}>Logout</Text>
                    </TouchableOpacity>
                   </> : <>
                    <TouchableOpacity style={styles.actionButton} onPress={() => { followUnfollowUser(profile.userId, profile.isFollowing) }}>
                        <Text style={styles.actionText}>{profile.isFollowing ? "Unfollow" : "Follow"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subActionButton}>
                        <Text style={styles.subActionText}>Message</Text>
                    </TouchableOpacity>
                   </>
               }
            </View> 
      </View>
    )
}

const styles = StyleSheet.create({
    bioText: {
        color: '#fff',
        fontSize: 16,
    },
    subActionButton: {
        backgroundColor: '#212529',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: 16,
        marginRight: 16,
        borderRadius: 16,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 8,
        paddingBottom: 8,
        borderWidth: 1,
        borderColor: '#FFDD00',
    },
    actionButton: {
        backgroundColor: '#FFDD00',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: 16,
        marginRight: 16,
        borderRadius: 16,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 8,
        paddingBottom: 8,
    },
    subActionText: {
        color: '#FFDD00',
        fontWeight: 'bold',
        fontSize: 16,
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
        marginBottom: 12,
    },
    profileContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#212529',
        paddingTop: 64,
    },
    profileNameContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
    },
    profileName: {
        color: '#fff',
        fontSize: 24,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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