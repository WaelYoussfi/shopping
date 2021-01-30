import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  token: string;

  constructor(private route: Router) {}

  signupUser(email: string, password: string) {
    firebase.default
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => console.log(error));
  }

  signinUser(email: string, password: string) {
    firebase.default
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        this.route.navigate(['/']);
        firebase.default
          .auth()
          .currentUser.getIdToken()
          .then((token: string) => (this.token = token));
      })
      .catch((error) => console.log(error));
  }

  getToken() {
    firebase.default
      .auth()
      .currentUser.getIdToken()
      .then((token: string) => (this.token = token));
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  logout() {
    firebase.default.auth().signOut();
    this.token = null;
  }
}
