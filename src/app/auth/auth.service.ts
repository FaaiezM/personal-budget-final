import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: Observable<firebase.User>;
  public errMsg: any = '';
  private uid : string;

  getUid(): string {
    return localStorage.getItem('uid');
  }

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = firebaseAuth.authState;
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((value) => {
        console.log('Success!', value);
        this.uid = value.user.uid;
        localStorage.setItem("uid", value.user.uid);
        this.router.navigate(['charts']);
      })
      .catch((err) => {
        console.log('Something went wrong:', err.message);
        this.errMsg = err.message;
      });
      console.log(this.firebaseAuth.currentUser);
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((value) => {
        console.log(value);
        this.uid = value.user.uid;
        localStorage.setItem("uid", value.user.uid);
        this.router.navigate(['charts']);
      })
      .catch((err) => {
        console.log('Something went wrong:', err.message);
        this.errMsg = err.message;
      });
  }

  logout() {
    this.firebaseAuth.signOut();
    localStorage.clear();
    this.router.navigate(['login']);
  }

  get isAuthenticated(): boolean {
    return this.user !== null;
}

  get currentUserID(): string {
    return this.isAuthenticated ? this.getUid() : null;
  }
}










