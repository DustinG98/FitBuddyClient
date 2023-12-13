import { useLocalSearchParams } from 'expo-router';
import Profile from '../../../components/profile/Profile';

export default function ProfilePage () {
  const { id } = useLocalSearchParams();
  return (
    typeof id === 'string' ? <Profile userId={id} /> : <Profile />
  );
}
