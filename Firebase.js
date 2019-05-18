import * as firebase from 'firebase';
import 'firebase/firestore';
import fbConfig from './config';

export default class Firebase {
    static auth;
    static fb;
    static db;
    static user;

    static init() {
        if (!firebase.apps.length){
            Firebase.fb = firebase.initializeApp(fbConfig);
            Firebase.auth = firebase.auth();
            Firebase.storage = firebase.storage();
            Firebase.db = firebase.firestore();
        }
    }
}