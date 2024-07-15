import React, { useState } from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {styles} from './NotesItemStyle';
import {observer} from 'mobx-react';
import ModalDropdown from 'react-native-modal-dropdown';

type NoteType = {
  title: string;
  text: string;
  status:string;
};

type StatusKey = 'В планах' | 'В работе' | 'Выполнено';

const NotesItem = observer(
  ({item, onPress}: {item: NoteType; onPress: () => void}) => {
    const [status, setStatus] = useState(item.status);

    const statusStyles:Record<StatusKey, { borderColor: string }> = {
        'В планах': { borderColor: 'lightblue' },
        'В работе': { borderColor: 'orange' },
        'Выполнено': { borderColor: 'lightgreen' },
      };
console.log(item)
    return (
      <TouchableOpacity style={[styles.vv, statusStyles[status as StatusKey]]} onPress={onPress}>
        <View style={styles.top}>
          <Text style={styles.status}>{item.title}</Text>
          <ModalDropdown
            options={['В планах', 'В работе', 'Выполнено']}
            defaultValue={item.status}
            saveScrollPosition={false}
            defaultIndex={0}
            isFullWidth={true}
            textStyle={styles.selecterText}
            dropdownTextStyle={styles.selecterText}
            onSelect={(index, value) => setStatus(value)}
          />
        </View>
        <Text style={styles.text}>{item.text}</Text>
      </TouchableOpacity>
    );
  },
);

export default NotesItem;
