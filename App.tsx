import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import AuthorizationScreen from './screens/AuthorizationScreen/AuthorizationScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen 
            name="authorization"
            component={AuthorizationScreen}
            options={{title:""}}/>
            <Stack.Screen 
            name="home"
            component={HomeScreen}
            options={{title:""}}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
