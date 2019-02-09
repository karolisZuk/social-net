import * as firebase from 'firebase';
import fbConfig from './config';

export default class Firebase {
    static auth;
    static googleSignInProvider;
    static fb;
    static user;

    static init() {
        Firebase.fb = firebase.initializeApp(fbConfig);
        Firebase.auth = firebase.auth();
    }
}