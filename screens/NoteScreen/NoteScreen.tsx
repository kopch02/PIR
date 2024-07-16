import React, {useEffect, useState} from 'react';
import { View, TextInput, Button, TouchableOpacity, Text} from 'react-native';
import {styles} from './NoteScreenStyle';
import {NavigationProp} from '@react-navigation/native';
import { notesStore } from '../../stores/NotesStore';

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
    const {title, text, status} = route.params?.data || {};
    const [titleInput, setTitle] = useState(title);
    const [textInput, setText] = useState(text);

    useEffect(() => {
      navigation.setOptions({
        headerRight: () => <TouchableOpacity style={styles.deleteBtn} onPress={() => notesStore.deleteNote(navigation, route.params?.noteId)}>
                <Text style={styles.deleteBtnText}>Удалить</Text>
            </TouchableOpacity>,
      });
    }, [navigation]);

    const handleTitleChange = (newStatus:string) => {
        setTitle(newStatus);
        notesStore.editNote(titleInput ?? "", textInput ?? "", status ?? "В работе", route.params?.noteId ?? "");
      };
    
      const handleTextChange = (newText:string) => {
        setText(newText);
        notesStore.editNote(titleInput ?? "", textInput ?? "", status ?? "В работе", route.params?.noteId ?? "");
      };

    return (
      <View style={styles.noteScreen}>
        <TextInput multiline style={styles.status} onChangeText={handleTitleChange}>
          {title}
        </TextInput>
        <TextInput multiline onChangeText={handleTextChange}>{text}</TextInput>
      </View>
    );
  }
};

export default NoteScreen;
