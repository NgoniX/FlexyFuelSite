import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

interface User {
  uid: string;
  email: string;
  displayName?: string;
  userLevel?: string;
  image?: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: firebase.User;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ) {

    afAuth.authState.subscribe(user => {
      this.user = user;
    });

  }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err));
    });
  }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err));
    });
  }

  updateUserData(cred) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`Users/${this.getUserID()}`);

    const data: User = {
      uid: this.getUserID(),
      email: cred.email,
      displayName: cred.displayName,
      userLevel: cred.userLevel,
      image: cred.image
    };

    return userRef.set(data, { merge: true });

  }

  logout(): Promise<void> {
    localStorage.removeItem('userLevel');
    return this.afAuth.auth.signOut();
  }

  getUserID() {

    if (firebase.auth().currentUser !== null) {
      return firebase.auth().currentUser.uid;
    } else {
      return null;
    }

  }

  getUserName() {
    if (firebase.auth().currentUser !== null) {
      return firebase.auth().currentUser.email;
    }
  }

  get authenticated(): boolean {
    return this.user !== null;
  }

}
