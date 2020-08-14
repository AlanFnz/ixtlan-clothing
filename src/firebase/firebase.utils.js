import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDsGejHH_mbUyPHfdaNiGBH81SaY4UhUBc",
    authDomain: "ixtlan-clothing.firebaseapp.com",
    databaseURL: "https://ixtlan-clothing.firebaseio.com",
    projectId: "ixtlan-clothing",
    storageBucket: "ixtlan-clothing.appspot.com",
    messagingSenderId: "240207446381",
    appId: "1:240207446381:web:7cca2bf91e6c2ac2efda64"
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