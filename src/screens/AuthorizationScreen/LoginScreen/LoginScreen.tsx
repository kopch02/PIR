import React, {useState} from 'react';
import { View, Alert} from 'react-native';
import {TextInput} from 'react-native';
import {Button} from 'react-native';
import {styles} from './LoginScreenStyle';
import {NavigationProp} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

type ErrorCodes = 'auth/invalid-credential' | 'auth/invalid-email' | 'auth/weak-password';

type Props = {
  navigation: NavigationProp<any>;
};

function signIn(email: string, password: string) {
    const errorMessages = {
        'auth/invalid-credential': 'Почта или пароль неверны!',
        'auth/invalid-email': 'Неверная почта!',
        'auth/weak-password': 'Неверный пароль!'
    };
  auth()
    .signInWithEmailAndPassword(email, password)
    .catch(error => {
        const errorMessage = errorMessages[error.code as ErrorCodes];
        if (errorMessage) {
            Alert.alert(errorMessage);
        } else {
            console.error(error);
        }
    });
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.loginScreen}>
      <TextInput
        placeholder="Почта"
        style={styles.input}
        onChangeText={setEmail}
        autoCapitalize="none"></TextInput>
      <TextInput
        placeholder="Пароль"
        style={styles.input}
        onChangeText={setPassword}
        autoCapitalize="none"
        textContentType='password'
        secureTextEntry></TextInput>
      <Button title="Вход" onPress={() => signIn(email.toLowerCase(), password)}></Button>
      <Button title="Регистрация" onPress={() => navigation.navigate("register")}></Button>
    </View>
  );
};

export default LoginScreen;
