import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link, usePathname } from 'expo-router'
import { AuthService } from '../services/AuthService';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';

export default function App() {
  const [ formState, setFormState ] = useState({ email: '', password: '', storeUserPassword: false });
  const pathname = usePathname();
  const authService = new AuthService(pathname);

  const onPressForgotPassword = () => {

  }

  const onPressLogin = () => {
    authService.login(formState.email, formState.password, formState.storeUserPassword)
      .then((response) => { 
        console.log({response});
      })
  }

  const onPressSignUp = () => {

  }
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Gym Buddy</Text>
      <Text style={styles.subHeaderText}>Please log into your account.</Text>

      <TextInput
        style={styles.inputText}
        placeholder="Email"
        onChangeText={text => setFormState({ ...formState, email: text })}
        value={formState.email}
        placeholderTextColor="#a8a8a8"
      />
      <TextInput
        style={styles.inputText}
        secureTextEntry
        placeholder="Password"
        onChangeText={text => setFormState({ ...formState, password: text })}
        value={formState.password}
        placeholderTextColor="#a8a8a8"
      />
      <TouchableOpacity
        onPress = {onPressForgotPassword}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress = {onPressLogin}
        style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress = {onPressSignUp}>
        <Text style={styles.signUpText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '5%',
  },
  subHeaderText: {
    fontSize: 12,
    color: '#fff',
    marginBottom: '10%',
  },
  inputText:{
    height:50,
    width: "100%",
    textAlign: "center",
    color:"white",
    backgroundColor: "#212529",
    borderRadius: 25,
    marginBottom: '5%',
    padding: '5%',
  },
  container: {
    flex: 1,
    backgroundColor: '#101214',
    color: '#fff',
    padding: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgot: {
    color: "white",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#FFDD00",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"#101214",
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpText: {
    color: "#fff",
  }
});
