import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on app!</Text>
      <Link href='/home'><Text>Home</Text></Link>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101214',
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
