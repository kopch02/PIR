import React, {useState} from 'react';
import {StyleSheet, View, FlatList, RefreshControl} from 'react-native';
import {styles} from './NotesListStyle';
import {NavigationProp} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import NotesItem from '../NotesItem/NotesItem';
import { notesStore } from '../../../stores/NotesStore';

type Props = {
  notes: {_data: {title: string; text: string, status:string}; id: string}[] | undefined;
  onRefresh: () => void;
  refreshing: boolean;
  navigation:NavigationProp<any>;
};

const NotesList: React.FC<Props> = observer(({
  notes,
  onRefresh,
  refreshing,
  navigation
}) => {
    const renderItem = ({item,}: {
        item: {_data: {title: string; text: string, status:string}; id: string};
      }) => {
        return (
          <NotesItem
            item={item._data}
            nodeId={item.id}
            onPress={() =>
              navigation.navigate('note', {data: item._data, noteId: item.id})
            }/>)};
  return (
    <FlatList
      data={notesStore.userData}
      renderItem={renderItem}
      style={styles.HomeScreen}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl 
        refreshing={refreshing} 
        onRefresh={onRefresh} />}>
    </FlatList>
  );
},);

export default NotesList;
