import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import LoginScreen from './screens/AuthorizationScreen/LoginScreen/LoginScreen';
import RegistrScreen from './screens/AuthorizationScreen/RegistrScreen/RegistrScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const [user, setUser] = useState();
  const [init, setInit] = useState(true);

  function onAuthStateChanged(user) {
    setUser(user);
    if (init) setInit(false);
  }

  useEffect(() => {
    const subscruber = auth().onAuthStateChanged(onAuthStateChanged);
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
              options={{title: ''}}
            />
            <Stack.Screen
              name="register"
              component={RegistrScreen}
              options={{title: ''}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
  }

  return <HomeScreen></HomeScreen>;


}

export default App;
