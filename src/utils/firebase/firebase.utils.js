import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCCcaA3-Mw4gKJTKgqet5hv-RJkO5ADrvg",
    authDomain: "crwn-db-2-b0d0b.firebaseapp.com",
    projectId: "crwn-db-2-b0d0b",
    storageBucket: "crwn-db-2-b0d0b.appspot.com",
    messagingSenderId: "1019483917225",
    appId: "1:1019483917225:web:554d8a4eab19f07dd9d2b8"
};

const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);