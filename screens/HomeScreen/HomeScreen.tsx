import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, RefreshControl, TouchableOpacity} from 'react-native';
import {Text, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import {styles} from './HomeScreenStyle';
import '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import NotesItem from '../../components/Notes/NotesItem/NotesItem';
import {observable, action, computed} from 'mobx';
// import {observer} from 'mobx-react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationProp} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import NotesList from '../../components/Notes/NotesList/NotesList';

import {notesStore} from '../../stores/NotesStore';

type Props = {
  navigation: NavigationProp<any>;
};

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const [notes, setNotes] = useState<
    {_data: {title: string; text: string; status:string}; id: string}[] | undefined
  >();
  const [refreshing, setRefreshing] = useState(false);

  const Stack = createNativeStackNavigator();

  const fetchNotes = async (query = '') => {
    try {
      const notes = await notesStore.getNotes();
      setNotes(notes);
    } catch (error) {
      console.error('Failed to load notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchNotes().then(() => setRefreshing(false));
  }, []);

  const addNotes = async (title?: string, text?: string) => {
    const ref = firestore()
      .collection('notes')
      .doc(`${auth().currentUser?.email}`)
      .collection('note');
    const item = await ref.add({title: title, text: text, status:"В планах"});
    onRefresh();
    navigation.navigate('note', {data: {title, text}, noteId: item.id});
  };

  const renderItem = ({
    item,
  }: {
    item: {_data: {title: string; text: string, status:string}; id: string};
  }) => {
    return (
      <NotesItem
        item={item._data}
        nodeId={item.id}
        onPress={() =>
          navigation.navigate('note', {data: item._data, noteId: item.id})
        }></NotesItem>
    );
  };

  return (
    <View>
      {/* <Button title="+" onPress={() => addNotes('new', '')}></Button> */}
      <TouchableOpacity style={styles.addBtn} onPress={() => addNotes(' ', '')}>
        <Text style={styles.addBtnText}>+</Text>
      </TouchableOpacity>
      <NotesList
        notes={notes}
        onRefresh={onRefresh}
        refreshing={refreshing}
        renderItem={renderItem}
      />
    </View>
  );
};

export default HomeScreen;
