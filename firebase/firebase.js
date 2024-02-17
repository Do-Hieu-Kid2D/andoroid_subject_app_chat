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
    update as firebaseUpdate,
    child,
    get as firebaseGet,
    push as firebasePush,
    onValue,
    orderByKey,
    limitToFirst,
    query,
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
    firebaseGet,
    onValue, //reload when online DB changed
    signInWithEmailAndPassword,
    firebaseUpdate,
    orderByKey,
    limitToFirst,
    query,
    firebasePush,
};

// cập nhật lại emailVerified
// const userId = currentUser.uid;
// const path = `users/${userId}`;
// firebaseUpdate(
//     firebaseDatabaseRef(firebaseDatabase, path),
//     {
//         emailVerified: false,
//         // ngu: 'NOT NGU',
//     },
// )
//     .then(() => {
//         console.log(
//             '====>OKE: ĐÃ cập nhật lại emailVerified',
//         );
//     })
//     .catch(() => {
//         console.log(
//             '======>ERROR: K THỂ cập nhật lại emailVerified',
//         );
//     });

// ========================================================================================
// Lấy dữ liệu

// const usersRef = firebaseDatabaseRef(firebaseDatabase, 'users');
// try {
//     // Lấy dữ liệu từ node 'users' với giới hạn là 1 phần tử đầu tiên
//     const snapshot = await firebaseGet(query(usersRef, orderByKey()));
//     if (snapshot.exists()) {
//         // Lấy giá trị của phần tử đầu tiên
//         // const userData = snapshot.val();
//         let x = 0;
//         snapshot.forEach(childSnapshot => {
//             const childKey = childSnapshot.key;
//             const childData = childSnapshot.val();
//             console.log('First child node key==== ', childKey);
//             x++;
//         });
//         console.log('TỔNG CÓ ====== ', x);
//     } else {
//         console.log('No users found');
//     }
// } catch (error) {
//     console.error('Error getting user data:', error);
// }
