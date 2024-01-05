import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { usePathname } from 'expo-router'
import { AuthService } from '../src/services/AuthService';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAvoidingView } from 'react-native';

export default function App() {
  const [ errorState, setErrorState ] = useState({
    email: '',
    password: '',
    username: ''
  }); 
  const [ formState, setFormState ] = useState({ email: '', password: '', storeUserPassword: false, userName: '' });
  const [ formType, setFormType ] = useState('login'); // ['login', 'signup', 'forgot']
  const pathname = usePathname();
  const authService = new AuthService(pathname);
  
  useEffect(() => {
    authService.checkAuth();
  }, [])

  const validateEmail = (email: string) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  }

  const validatePassword = (password: string) => {
    const re = /^[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return re.test(password);
  }

  const handleLogin = () => {
    if(formState.email && formState.password) {
      authService.login(formState.email, formState.password, formState.storeUserPassword)
      .then(() => { 
      })
    } else {
      //TODO: Handle Error Showing
    }
  }

  const handleSignUp = () => {
    if(formState.email && formState.password && formState.userName) {
      authService.register(formState.email, formState.userName, formState.password)
      .then(() => {
      })
    } else {
      //TODO: Handle Error Showing
    }

  }

  const onPressSubmit = () => {
    switch(formType) {
      case 'login':
        handleLogin();
        break;
      case 'signup':
        handleSignUp();
        break;
      default:
        break;
    }

  }

  const onPressSignUp = () => {
    setErrorState({ username: '', password: '', email: '' });
    setFormState({ email: '', password: '', storeUserPassword: false, userName: '' });
    setFormType('signup');
  }

  const onPressLogin = () => {
    setErrorState({ username: '', password: '', email: '' });
    setFormState({ email: '', password: '', storeUserPassword: false, userName: '' });
    setFormType('login');
  }
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior='padding' style={styles.formContainer}>
        <Text style={styles.headerText}>Gym Buddy</Text>
        <View style={styles.actionContainer}>
          <TouchableOpacity
            onPress = {onPressLogin}
            style={formType === 'login' ? styles.activeFormAction : styles.formAction }>
            <Text style={formType === 'login' ? styles.activeFormActionText : styles.formActionText}>LOGIN </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={formType === 'signup' ? styles.activeFormAction : styles.formAction}
            onPress = {onPressSignUp}>
            <Text style={formType === 'signup' ? styles.activeFormActionText : styles.formActionText}>Signup</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={errorState.email !== '' ? styles.errorInputText : styles.inputText}
          placeholder="Email"
          onChangeText={text => {
            if(!validateEmail(text)) setErrorState({ ...errorState, email: 'Invalid email' });
            else setErrorState({ ...errorState, email: '' });
            setFormState({ ...formState, email: text })
          }}
          value={formState.email}
          placeholderTextColor="#a8a8a8"
        />
        {
          formType === 'signup' &&
          <TextInput
            style={styles.inputText}
            placeholder="Username"
            onChangeText={text => setFormState({ ...formState, userName: text })}
            value={formState.userName}
            placeholderTextColor="#a8a8a8"
          />
        }
        {errorState.password !== '' && <Text style={{ color: 'red', marginBottom: '5%', fontSize: 12 }}>{errorState.password}</Text>}
        <TextInput
          style={errorState.password !== '' ? styles.errorInputText : styles.inputText}
          secureTextEntry
          placeholder="Password"
          onChangeText={text => {
            setFormState({ ...formState, password: text })
            if(formType === 'signup' && !validatePassword(text)) setErrorState({ ...errorState, password: 'Password must be at least 8 characters, and contain at least one number, capitol letter, and lowercase letter.' });
            else setErrorState({ ...errorState, password: '' });
          }}
          value={formState.password}
          placeholderTextColor="#a8a8a8"
        />
        {
          formType === 'login' &&
          <TouchableOpacity
            onPress={() => setFormState({ ...formState, storeUserPassword: !formState.storeUserPassword })}
            style={styles.actionContainer}
          >
            <View style={formState.storeUserPassword ? styles.activeCheckBox : styles.checkBox}>
                <MaterialCommunityIcons name="check-bold" size={16} color={formState.storeUserPassword ? "#FFDD00" : "gray"} />
            </View>
            <Text style={styles.rememberInfoText}>
              Remember login information?
            </Text>
          </TouchableOpacity>
        }
        

        <TouchableOpacity
          onPress = {onPressSubmit}
          style={styles.loginBtn}>
          <Text style={styles.loginText}>{formType === 'login' ? "LOGIN" : "SIGN UP"}</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '5%',
  },
  activeFormAction: {
    borderBottomColor: '#FFDD00',
    borderBottomWidth: 3,
    marginLeft: '5%',
    marginRight: '5%',
  },
  activeFormActionText: {
    color: '#FFDD00',
    fontSize: 16,
    fontWeight: 'bold',
  },
  formAction: {
    marginLeft: '5%',
    marginRight: '5%',
  },
  formActionText: {
    color: '#a8a8a8',
    fontSize: 16,
    fontWeight: 'bold',
  },
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
  errorInputText: {
    height:50,
    width: "100%",
    textAlign: "center",
    color:"white",
    backgroundColor: "#212529",
    borderRadius: 25,
    marginBottom: '5%',
    padding: '5%',
    borderColor: 'red',
    borderWidth: 2,
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
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#101214',
    color: '#fff',
    padding: '10%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgot: {
    color: "white",
    fontSize:11,
    marginBottom: '5%',
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#FFDD00",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginBottom:10
  },
  loginText:{
    color:"#101214",
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpText: {
    color: "#fff",
  },
  rememberInfoText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: '5%',
  },
  activeCheckBox: {
    borderColor: "#FFDD00",
    borderWidth: 2,
    borderRadius: 5,
  },
  checkBox: {
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 5,
  }
});
