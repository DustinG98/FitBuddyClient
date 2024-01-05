import { ThunkDispatch } from '@reduxjs/toolkit';
import { Text, View } from 'react-native';
import { useAppDispatch } from '../../src/redux/hooks';
import { ShowNotification } from '../../src/redux/actions/users';
import { Button } from 'react-native-paper';

export default function Inbox() {
  const dispatch: ThunkDispatch<any, any, any> = useAppDispatch();

  const sendNotification = () => {
    dispatch(ShowNotification({message: 'Hello World', type: 'success'}))
  }

  const sendErrorNotification = () => {
    dispatch(ShowNotification({message: 'Hello World', type: 'error'}))
  }

  return (
    <View>
      <Text>Inbox Page</Text>
      <Button onPress={sendNotification}>Send Notification</Button>
      <Button onPress={sendErrorNotification}>Send Error Notification</Button>
    </View>
  );
}
