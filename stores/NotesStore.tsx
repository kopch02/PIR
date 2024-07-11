import React from 'react';
import { StyleSheet, View } from 'react-native';
import '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import {makeAutoObservable, runInAction} from 'mobx';
import auth from '@react-native-firebase/auth';

class NotesStore {
    userData:{status: string; text: string, time:string}[] = [];

    constructor() {
        makeAutoObservable(this);
      }

      async getNotes() {
        runInAction(() => {
        firestore()
          .collection('notes')
          .doc(`${auth().currentUser?.email}`)
          .onSnapshot(documentSnapshot => {
            // console.log('User data: ', documentSnapshot.data());
            this.userData = documentSnapshot.data()?.note;
          });
        })

          return this.userData
      };

}

export const notesStore = new NotesStore();


