import React, {useState} from 'react';
import {Alert, View} from 'react-native';
import {TextInput} from 'react-native';
import {Button} from 'react-native';
import {styles} from './RegistrScreenStyle';
import {NavigationProp} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

type ErrorCodes = 'auth/email-already-in-use' | 'auth/invalid-email' | 'auth/weak-password';

function register(email: string, password: string, rePassword: string) {

    const errorMessages = {
        'auth/email-already-in-use': 'Эта почта уже используется!',
        'auth/invalid-email': 'Неправильная почта!',
        'auth/weak-password': 'Пароль слишком короткий или не надёжный!'
    };

  if (password === rePassword) {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('Успешная регистрация');
        firestore().collection('notes').doc(email).set({})
      })
      .catch(error => {
        const errorMessage = errorMessages[error.code as ErrorCodes];
        if (errorMessage) {
          Alert.alert(errorMessage);
        } else {
            console.error(error);
        }
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
        onChangeText={setEmail}
        autoCapitalize="none"></TextInput>
      <TextInput
        placeholder="Пароль"
        style={styles.input}
        onChangeText={setPassword}
        autoCapitalize="none"
        textContentType='password'
        secureTextEntry></TextInput>
      <TextInput
        placeholder="Повторите Пароль"
        style={styles.input}
        onChangeText={setRePassword}
        autoCapitalize="none"
        textContentType='password'
        secureTextEntry></TextInput>
      <Button
        title="Регистрация"
        onPress={() => register(email.toLowerCase(), password, rePassword)}></Button>
    </View>
  );
};

export default RegistrScreen;
