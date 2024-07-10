import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { styles } from './HomeScreenStyle';

const HomeScreen = () => {
    return (
        <View style={styles.HomeScreen}>
            <Text>тут будут заметки</Text>
            <Button title='Выход' onPress={() => auth().signOut()}></Button>
        </View>
    );
}

export default HomeScreen;
