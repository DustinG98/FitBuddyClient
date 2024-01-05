import { StyleSheet, Text, View } from "react-native";

export default function BlankPageHeader() {
    return (
        <View style={styles.container}>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#101214',
        color: '#fff',
        paddingTop: 64,
    }
})