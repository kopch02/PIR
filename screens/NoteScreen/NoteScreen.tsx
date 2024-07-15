import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';
import {styles} from './NoteScreenStyle';
import {NavigationProp} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

interface RouteParams {
  data: {
    title: string;
    text: string;
    status:string;
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

    const {title, text, status} = route.params?.data || {};
    const [titleInput, setTitle] = useState(title);
    const [textInput, setText] = useState(text);

    useEffect(() => {
      navigation.setOptions({
        headerRight: () => <Button title="Удалить" onPress={deleteNote} />,
      });
    }, [navigation]);

    const changeNote = async (title:string|undefined, text:string|undefined) => {
        await firestore()
        .collection('notes')
        .doc(`${auth().currentUser?.email}`)
        .collection('note')
        .doc(route.params?.noteId).set({title:title, text:text, status:status})
    }

    const handleStatusChange = (newStatus:string) => {
        setTitle(newStatus);
        changeNote(titleInput, textInput);
      };
    
      const handleTextChange = (newText:string) => {
        setText(newText);
        changeNote(titleInput, textInput);
      };


    return (
      <View style={styles.noteScreen}>
        <TextInput multiline style={styles.status} onChangeText={handleStatusChange}>
          {title}
        </TextInput>
        <TextInput multiline onChangeText={handleTextChange}>{text}</TextInput>
      </View>
    );
  }
};

export default NoteScreen;
