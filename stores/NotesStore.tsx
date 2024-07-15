import React from 'react';
import {StyleSheet, View} from 'react-native';
import '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import {makeAutoObservable, runInAction} from 'mobx';
import auth from '@react-native-firebase/auth';

interface Data {
  title: string;
  text: string;
  status: string;
}

class NotesStore {
  userData: {
    _data: {title: string; text: string; status: string};
    id: string;
  }[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getNotes(): Promise<{_data: Data; id: string}[]> {
    return new Promise((resolve, reject) => {
      firestore()
        .collection('notes')
        .doc(`${auth().currentUser?.email}`)
        .collection('note')
        .get()
        .then(documentSnapshot => {
          const notes = documentSnapshot.docs.map(doc => {
            const data: Data = {
              title: doc.data()?.title || '',
              text: doc.data()?.text || '',
              status: doc.data()?.status || '',
            };
            return {
              _data: data,
              id: doc.id,
            };
          });
          resolve(notes);
        })
        .catch(error => reject(error));
    });
  }
}

export const notesStore = new NotesStore();
