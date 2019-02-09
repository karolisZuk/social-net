import * as firebase from 'firebase';
import fbConfig from './config'; //konfigas bus numestas kaip slacko zinute. Nekelkit configo i github. Aciu.

export default class Firebase {
    static auth;
    static fb;

    static init() {
        //Nevykdome, jei applikacija jau buvo inecializuota su firebase. Netikrindami gautume errora, kad aplikacija jau egzistuoja
        if (!firebase.apps.length){
            Firebase.fb = firebase.initializeApp(fbConfig);
            Firebase.auth = firebase.auth();
        }
    }
}