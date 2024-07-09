import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native';
import { Button } from 'react-native';
import { styles } from './AuthorizationScreenStyle';
import { NavigationProp } from '@react-navigation/native';

type Props = {
    navigation: NavigationProp<any>;
  };

  const AuthorizationScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.loginScreen}>
            <TextInput placeholder='Логин' style={styles.input}></TextInput>
            <TextInput placeholder='Пароль' style={styles.input}></TextInput>
            <Button title='Вход' onPress={() => navigation.navigate("home")}></Button>
        </View>
    );
}

export default AuthorizationScreen;
