import {initializeApp} from 'firebase/app';
import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    initializeAuth,
    getReactNativePersistence,
    //read data from Firebase
} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
//ref = reference to a "collection"
import {
    getDatabase,
    ref as firebaseDatabaseRef,
    set as firebaseSet,
    child,
    get,
    onValue,
} from 'firebase/database';

const firebaseConfig = {
    apiKey: 'AIzaSyBTuKOuH1vshYSHhlro_fqllvdJBb1tVZw',
    authDomain: 'react-native-cd6d3.firebaseapp.com',
    databaseURL: 'https://react-native-cd6d3-default-rtdb.firebaseio.com',
    projectId: 'react-native-cd6d3.firebaseapp.com',
    storageBucket: 'react-native-cd6d3.appspot.com',
    appId: '1:863801608226:android:43a60f67b88dcebc09e27b',
    messagingSenderId: '863801608226',
};

const app = initializeApp(firebaseConfig);
// ĐĂNG NHẬP SONG AUTH VẪN LƯU KHI TẮT ĐI BẬT APP LẠI
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
// const auth = getAuth(); // K LƯU TRỮ KHẮP NƠI
const firebaseDatabase = getDatabase();

export {
    auth,
    firebaseDatabase,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    firebaseSet,
    firebaseDatabaseRef,
    sendEmailVerification,
    child,
    get,
    onValue, //reload when online DB changed
    signInWithEmailAndPassword,
};
