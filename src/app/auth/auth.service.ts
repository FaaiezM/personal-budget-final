import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: Observable<firebase.User>;
  public errMsg: any = '';
  private uid : string;

  getUid(): string {
    return this.uid;
  }

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
    console.log(this.user.subscribe(user =>
      this.uid = user.uid));
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((value) => {
        console.log('Success!', value);
      })
      .catch((err) => {
        console.log('Something went wrong:', err.message);
        this.errMsg = err.message;
      });
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((value) => {
        console.log(value);
        localStorage.setItem("uid", value.user.uid);
      })
      .catch((err) => {
        console.log('Something went wrong:', err.message);
        this.errMsg = err.message;

      });

  }

  logout() {
    this.firebaseAuth.signOut();
  }

  get isAuthenticated(): boolean {
    return this.user !== null;
}

  get currentUserID(): string {
    return this.isAuthenticated ? this.getUid() : null;
  }
}










