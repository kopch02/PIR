import React, {useEffect } from 'react';
import { View, TouchableOpacity} from 'react-native';
import {Text} from 'react-native';
import {styles} from './HomeScreenStyle';
import '@react-native-firebase/database';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationProp} from '@react-navigation/native';
import NotesList from '../../components/Notes/NotesList/NotesList';

import { notesStore } from '../../stores/NotesStore';

type Props = {
  navigation: NavigationProp<any>;
};

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const Stack = createNativeStackNavigator();


  useEffect(() => {
    notesStore.getNotes();
  }, []);

  return (
    <View>
      <TouchableOpacity style={styles.addBtn} onPress={() => notesStore.addNotes(navigation, ' ', '')}>
        <Text style={styles.addBtnText}>+</Text>
      </TouchableOpacity>
      <NotesList
        notes={notesStore.userData}
        onRefresh={notesStore.refreshNote}
        refreshing={notesStore.refreshing}
        navigation={navigation}
      />
    </View>
  );
};

export default HomeScreen;
