import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { styles } from './NotesItemStyle';
import {observer} from 'mobx-react';

type NoteType = {
    status: string;
    text: string;
  };
  

const NotesItem = observer(({ item, onPress }: { item: NoteType, onPress:() => void }) => {
    return (
        <TouchableOpacity style={styles.vv} onPress={onPress} >
            <Text style={styles.status}>{item.status}</Text>
            <Text style={styles.text}>{item.text}</Text>
            {/* <Text>{String(item.item.time)}</Text> */}
        </TouchableOpacity>
    );
});

export default NotesItem;
