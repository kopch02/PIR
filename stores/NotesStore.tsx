import React from 'react';
import {StyleSheet, View} from 'react-native';
import '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import {makeAutoObservable, runInAction} from 'mobx';
import auth from '@react-native-firebase/auth';
import {NavigationProp} from '@react-navigation/native';


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
  refreshing = false;

  constructor() {
    makeAutoObservable(this);
  }

    async getNotes() {
        try {
            // this.userData = []
            const res = await firestore()
            .collection('notes')
            .doc(`${auth().currentUser?.email}`)
            .collection('note')
            .get()
            console.log(this.userData)
                const documentSnapshot = await res;
                this.userData = documentSnapshot.docs.map(doc => ({
                    _data: {
                        title: doc.data()?.title || '',
                        text: doc.data()?.text || '',
                        status: doc.data()?.status || '',
                    },
                    id: doc.id,
                }));
            
            console.log(this.userData)
        } catch {
            console.log("err");
        }
        return this.userData;
    }

    async refreshNote() {
        console.log("начало обновления")
        this.refreshing = true;
        await this.getNotes()
        this.refreshing = false;
        console.log("обновился")
    };  

    async addNotes(navigation:NavigationProp<any>, title?: string, text?: string) {
        const ref = firestore()
          .collection('notes')
          .doc(`${auth().currentUser?.email}`)
          .collection('note');
        const item = await ref.add({title: title, text: text, status:"В планах"});
        await this.refreshNote();
        navigation.navigate('note', {data: {title, text}, noteId: item.id});
    };

    async editNote (title:string, text:string, status: string, nodeId:string) {
        await firestore()
          .collection('notes')
          .doc(`${auth().currentUser?.email}`)
          .collection('note')
          .doc(nodeId)
          .set({title: title, text: text, status: status});
        await this.refreshNote();
    };

    async deleteNote (navigation:NavigationProp<any>, noteId:string | undefined) {
        await firestore()
          .collection('notes')
          .doc(`${auth().currentUser?.email}`)
          .collection('note')
          .doc(noteId).delete();
        await this.refreshNote();
        navigation.navigate('home');
    };

}

export const notesStore = new NotesStore();
