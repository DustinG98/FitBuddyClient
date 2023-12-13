import { Link } from 'expo-router';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';

export const SearchResult = ({searchResult}: {searchResult: any}) => {
    console.log(searchResult)
    return (
        <Link  style={styles.searchResultCont} href={`/profile/${searchResult.userId}`}>
            <View style={styles.searchResultCont}>
                    <Image style={styles.profileImage} source={{ uri: 'https://avatars.githubusercontent.com/u/25105821?v=4'}} />
                    <Text style={styles.searchResultText}>{searchResult.preferredUserName}#{searchResult.discriminator}</Text>
            </View>
        </Link>
    )
}

const styles = StyleSheet.create({
    searchResultCont: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 24,
        marginBottom: 16,
        height: 100,
        width: Dimensions.get('window').width * 0.8,
        backgroundColor: '#212529',
    },
    searchResultText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    profileImage: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginRight: 16,
    },
})