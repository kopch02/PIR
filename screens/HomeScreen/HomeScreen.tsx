import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, RefreshControl} from 'react-native';
import {Text, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import {styles} from './HomeScreenStyle';
import '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import NotesItem from '../../components/Notes/NotesItem/NotesItem';
import {observable, action, computed} from 'mobx';
import {observer} from 'mobx-react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationProp} from '@react-navigation/native';


import {notesStore} from '../../stores/NotesStore';

type Props = {
  navigation: NavigationProp<any>;
};

const HomeScreen: React.FC<Props> = observer(({navigation}) => {
  const [notes, setNotes] =
    useState<{_data:{status: string;text: string;}, id:string}[]>();
    const [refreshing, setRefreshing] = useState(false);

  const Stack = createNativeStackNavigator();

  const fetchNotes = async (query = '') => {
    const res = await notesStore.getNotes();
    setNotes(res);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const renderItem = ({item,}: {item: {_data:{status: string;text: string;}, id:string};}) => {
    // console.log(item.id)
    return (
    <NotesItem
      item={item._data}
      onPress={() => navigation.navigate('note', {data: item._data, noteId:item.id})}></NotesItem>
  )};

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchNotes().then(() => setRefreshing(false));
  },[])

   const addNotes = async (status?:string, text?:string) => {
    const ref = firestore().collection("notes").doc(`${auth().currentUser?.email}`).collection('note');
    const item = await ref.add({status:status, text:text})
    onRefresh()
    navigation.navigate('note', {data: {status,text}, noteId:item.id})
   }


  return (
    <View>
      <Button title="+" onPress={() => addNotes("new", "")}></Button>
      <FlatList
        data={notes}
        renderItem={renderItem}
        style={styles.HomeScreen}
        refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        ></FlatList>
    </View>
  );
});

export default HomeScreen;
