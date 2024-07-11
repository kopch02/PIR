import React from 'react';
import { StyleSheet, View } from 'react-native';
import '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import {makeAutoObservable, runInAction} from 'mobx';
import auth from '@react-native-firebase/auth';

class NotesStore {
    userData:{_data:{status: string;text: string;}, id:string}[] = [];

    constructor() {
        makeAutoObservable(this);
      }

      async getNotes() {
        runInAction(() => {
        firestore()
          .collection('notes')
          .doc(`${auth().currentUser?.email}`).collection('note').get()
          .then(documentSnapshot => {
            // console.log('User data: ', documentSnapshot.docs);
            this.userData = documentSnapshot.docs;
          });
        })

          return this.userData
      };

}

export const notesStore = new NotesStore();


