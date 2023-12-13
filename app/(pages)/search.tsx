import { View, StyleSheet, TextInput } from 'react-native';
import { SearchBar } from '../../components/search/SearchBar';
import { SearchResults } from '../../components/search/SearchResults';

// search bar with auto search after 500ms
// show search results in a list with profile pictures and usernames


export default function Search() {
  return (
    <View style={styles.container}>
      <SearchBar />
      <SearchResults/>
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
