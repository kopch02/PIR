import React, {useState} from 'react';
import {StyleSheet, View, FlatList, RefreshControl} from 'react-native';
import NotesItem from '../NotesItem/NotesItem';
import {styles} from './NotesListStyle';
import {NavigationProp} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';

type Props = {
  notes: {_data: {title: string; text: string, status:string}; id: string}[] | undefined;
  onRefresh: () => void;
  refreshing: boolean;
  renderItem: any;
};

const NotesList: React.FC<Props> = ({
  notes,
  onRefresh,
  refreshing,
  renderItem,
}) => {
  return (
    <FlatList
      data={notes}
      renderItem={renderItem}
      style={styles.HomeScreen}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }></FlatList>
  );
};

export default observer(NotesList);
