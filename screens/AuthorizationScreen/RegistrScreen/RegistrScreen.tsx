import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native';
import {Button} from 'react-native';
import {styles} from './RegistrScreenStyle';
import {NavigationProp} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

type Props = {
  navigation: NavigationProp<any>;
};

function register(email: string, password: string, rePassword: string) {
  if (password === rePassword) {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('Успешная регистрация');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Эта почта уже используется!');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('Неправильная почта!');
        }

        if (error.code === 'auth/weak-password') {
          Alert.alert('Пароль слишком короткий или не надёжный!');
        }

        console.error(error);
      });
  } else {
    Alert.alert('Пароли не совпадают');
  }
}

const RegistrScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  return (
    <View style={styles.registrScreen}>
      <TextInput
        placeholder="Почта"
        style={styles.input}
        onChangeText={setEmail}></TextInput>
      <TextInput
        placeholder="Пароль"
        style={styles.input}
        onChangeText={setPassword}></TextInput>
      <TextInput
        placeholder="Повторите Пароль"
        style={styles.input}
        onChangeText={setRePassword}></TextInput>
      <Button
        title="Регистрация"
        onPress={() => register(email, password, rePassword)}></Button>
    </View>
  );
};

export default RegistrScreen;
