import React, {useEffect} from 'react';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';
import {styles} from './NoteScreenStyle';
import {NavigationProp} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

interface RouteParams {
  data: {
    status: string;
    text: string;
  };
  noteId: string;
}

type NoteScreenProps = {
  route?: {
    params?: RouteParams;
  };
  navigation: NavigationProp<any>;
};

const NoteScreen: React.FC<NoteScreenProps> = ({route, navigation}) => {
  if (route) {
    const deleteNote = async () => {
    await firestore().collection('notes').doc(`${auth().currentUser?.email}`).collection('note').doc(route.params?.noteId).delete();
      navigation.navigate('home');
    };

    useEffect(() => {
      navigation.setOptions({
        headerRight: () => <Button title="Удалить" onPress={deleteNote} />,
      });
    }, [navigation]);

    const {status, text} = route.params?.data || {};
    return (
      <View style={styles.noteScreen}>
        <TextInput multiline style={styles.status}>
          {status}
        </TextInput>
        <TextInput multiline>{text}</TextInput>
      </View>
    );
  }
};

export default NoteScreen;
