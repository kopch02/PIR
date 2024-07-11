import React, {useEffect, useState} from 'react';
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
      await firestore()
        .collection('notes')
        .doc(`${auth().currentUser?.email}`)
        .collection('note')
        .doc(route.params?.noteId)
        .delete();
      navigation.navigate('home');
    };

    const {status, text} = route.params?.data || {};
    const [statusInput, setStatus] = useState(status);
    const [textInput, setText] = useState(text);

    useEffect(() => {
      navigation.setOptions({
        headerRight: () => <Button title="Удалить" onPress={deleteNote} />,
      });
    }, [navigation]);

    const changeNote = async (status:string|undefined, text:string|undefined) => {
        await firestore()
        .collection('notes')
        .doc(`${auth().currentUser?.email}`)
        .collection('note')
        .doc(route.params?.noteId).set({status:status, text:text})
    }

    const handleStatusChange = (newStatus:string) => {
        setStatus(newStatus);
        changeNote(statusInput, textInput);
      };
    
      const handleTextChange = (newText:string) => {
        setText(newText);
        changeNote(statusInput, textInput);
      };


    return (
      <View style={styles.noteScreen}>
        <TextInput multiline style={styles.status} onChangeText={handleStatusChange}>
          {status}
        </TextInput>
        <TextInput multiline onChangeText={handleTextChange}>{text}</TextInput>
      </View>
    );
  }
};

export default NoteScreen;
