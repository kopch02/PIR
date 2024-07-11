import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import LoginScreen from './screens/AuthorizationScreen/LoginScreen/LoginScreen';
import RegistrScreen from './screens/AuthorizationScreen/RegistrScreen/RegistrScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import User from '@react-native-firebase/auth';
import {Button} from 'react-native';
import NoteScreen from './screens/NoteScreen/NoteScreen';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const [user, setUser] = useState();
  const [init, setInit] = useState(true);

  function onAuthStateChange(user:any) {
    setUser(user);
    if (init) setInit(false);
  }

  useEffect(() => {
    const subscruber = auth().onAuthStateChanged(onAuthStateChange);
    return subscruber;
  }, []);

  if (init) return <></>;

  if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="login"
            component={LoginScreen}
            options={{title: 'Вход'}}
          />
          <Stack.Screen
            name="register"
            component={RegistrScreen}
            options={{title: 'Регистрация'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{
            title: 'Главная',
            headerRight: props => (
              <Button title="Выход" onPress={() => auth().signOut()} />
            ),
          }}
        />
        <Stack.Screen
          name="note"
          component={NoteScreen}
          options={{
            title: 'Заметка',
            headerRight: props => (
              <Button title="Удалить" />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
