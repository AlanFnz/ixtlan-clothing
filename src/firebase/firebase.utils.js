import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCSGprTF2iR91CKQ0zVLJ7y2fUY6J_gebI",
    authDomain: "arkhe-clothing-db.firebaseapp.com",
    databaseURL: "https://arkhe-clothing-db.firebaseio.com",
    projectId: "arkhe-clothing-db",
    storageBucket: "arkhe-clothing-db.appspot.com",
    messagingSenderId: "606288531804",
    appId: "1:606288531804:web:cdf15399f38be639507199"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    };

    return userRef; 

};

firebase.initializeApp(config); 

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;