import { useLocalSearchParams } from 'expo-router';
import Profile from '../../../components/profile/Profile';

export default function ProfilePage () {
  const { id } = useLocalSearchParams();
  console.log('profile page id', id);
  return (
    typeof id === 'string' ? <Profile userId={id} /> : <Profile />
  );
}
