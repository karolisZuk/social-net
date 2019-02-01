import * as firebase from 'firebase';
import fbConfig from './config';

export default class Firebase {
    static auth;

    static init() {
        firebase.initializeApp(fbConfig);
        Firebase.auth = firebase.auth();
    }
}