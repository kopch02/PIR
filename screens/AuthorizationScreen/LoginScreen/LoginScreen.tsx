import React, {useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {TextInput} from 'react-native';
import {Button} from 'react-native';
import {styles} from './LoginScreenStyle';
import {NavigationProp} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

type Props = {
  navigation: NavigationProp<any>;
};

function signIn(email: string, password: string) {
  auth()
    .signInWithEmailAndPassword(email, password)
    .catch(error => {
        if (error.code === 'auth/invalid-credential') {
            Alert.alert('Почта или пароль неверны!');
        }
        if (error.code === 'auth/invalid-email') {
            Alert.alert('Неверная почта!');
        }
        if (error.code === 'auth/wrong-password') {
            Alert.alert('Неверный пароль!');
        }
      console.error(error);
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
        onChangeText={setEmail}></TextInput>
      <TextInput
        placeholder="Пароль"
        style={styles.input}
        onChangeText={setPassword}></TextInput>
      <Button title="Вход" onPress={() => signIn(email, password)}></Button>
      <Button title="Регистрация" onPress={() => navigation.navigate("register")}></Button>
    </View>
  );
};

export default LoginScreen;
