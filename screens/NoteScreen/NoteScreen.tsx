import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {styles} from './NoteScreenStyle';

interface RouteParams {
  data?: {
    status: string;
    text: string;
  };
}

const NoteScreen: React.FC<{route?: {params: RouteParams}}> = ({route}) => {
  if (route) {
    const {status, text} = route.params?.data || {};
    return (
      <View style={styles.noteScreen}>
        <Text style={styles.status}>{status}</Text>
        <Text>{text}</Text>
      </View>
    );
  }
};

export default NoteScreen;
