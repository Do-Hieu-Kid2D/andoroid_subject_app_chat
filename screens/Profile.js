import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
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
} from '../firebase/firebase';
import {
    images,
    icons,
    texts,
    colors,
    numbers,
    frontSize as fontSizes,
} from '../constants/index';
import UIHeader from '../navigation/UIHeader';

export default function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUserFromStorage = async () => {
            try {
                const stringUser = await AsyncStorage.getItem('user');
                const userOBJ = JSON.parse(stringUser);
                // setUser(userOBJ);
                return userOBJ.uid;
            } catch (error) {
                console.log('Error getting user from AsyncStorage:', error);
                return null; // Trả về giá trị mặc định hoặc xử lý lỗi ở đây nếu cần thiết
            }
        };

        const fetchDataFromFirebase = async () => {
            const userID = await getUserFromStorage();
            console.log(
                '====> userID lên firebase lấy dữ liệu Profile: ',
                userID,
            );
            const getUserDataOnce = async _userID => {
                try {
                    // console.log('_userID', _userID);
                    const path = `users/${_userID}`;
                    firebaseGet(firebaseDatabaseRef(firebaseDatabase, path))
                        .then(snapshot => {
                            if (snapshot.exists()) {
                                // Dữ liệu tồn tại
                                const userData = snapshot.val();
                                console.log('====> USER PROFILE:', userData);
                                setUser(userData);
                            } else {
                                console.log('KHÔNG THẤY USER PROFILE');
                                return null;
                            }
                        })
                        .catch(error => {
                            // Xử lý lỗi
                            console.error('LỖI LẤY USER PROFILE:', error);
                            return null;
                        });
                } catch (error) {
                    console.error('LỖI LẤY USER PROFILE:', error);
                    return null;
                }
            };

            getUserDataOnce(userID);
        };
        fetchDataFromFirebase();
    }, []);

    if (!user) {
        return (
            <SafeAreaView
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    const handleChangeProfile = () => {
        alert('hhii');
    };

    return (
        <SafeAreaView
            style={{flex: 1, backgroundColor: 'rgba(255, 101, 54, 0.01)'}}>
            <UIHeader
                title={user.displayName ? user.displayName : user.email}
                leftIconName={icons.like}
                rightIconName={icons.valentine}
            />
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View style={{paddingVertical: 15}}>
                    <Image
                        style={{
                            width: 180,
                            height: 180,
                            resizeMode: 'cover',
                            borderRadius: 90,
                            alignSelf: 'center',
                            borderColor: colors.MAIN_COLOR,
                            borderWidth: 4,
                        }}
                        source={{
                            uri: user.photoURL
                                ? user.photoURL
                                : 'https://kenh14cdn.com/203336854389633024/2023/7/8/photo-8-16888099647611685495690.jpg',
                        }}
                    />
                </View>
                <View style={styles.container2}>
                    <Text style={styles.headerText}>
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text
                                style={{
                                    fontSize: 19,
                                }}>
                                ❤️
                            </Text>
                        </View>{' '}
                        I WANT TO SAY{' '}
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 5,
                            }}>
                            <Text
                                style={{
                                    fontSize: 19,
                                }}>
                                ❤️
                            </Text>
                        </View>
                    </Text>
                    <Text style={styles.dataText}>
                        Make the Future Awesome, Enjoy the little things!
                    </Text>
                </View>
                <View style={styles.container}>
                    <View style={styles.row}>
                        <Text style={styles.text1}>Username: </Text>
                        <Text style={styles.text}>
                            {user.displayName ? user.displayName : user.email}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.text1}>Email:</Text>
                        <Text style={styles.text}>{user.email}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.text1}>Gender: </Text>
                        <Text style={styles.text}>
                            {user.gender ? user.gender : 'Secret'}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.text1}>Address: </Text>
                        <Text style={styles.text}>
                            {user.address
                                ? user.address
                                : 'Sky 😎 Land Sky 😎 Land Sky 😎 Land Sky 😎 Land Sky 😎 Land Sky 😎'}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.text1}>Phone: </Text>
                        <Text style={styles.text}>
                            {user.phone ? user.phone : '0102030405'}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                        style={{
                            paddingVertical: 10,
                            paddingHorizontal: 5,
                            backgroundColor: 'red',
                            marginTop: 30,
                            height: 50,
                            width: 150,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: colors.GREEN_BUTTON,
                            borderRadius: 15,
                        }}
                        onPress={handleChangeProfile}>
                        <Text
                            style={{
                                color: 'white',
                                fontSize: fontSizes.h4,
                            }}>
                            Thay đổi
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        // borderColor: 'transparent',
        borderTopColor: colors.MAIN_COLOR,
        borderTopWidth: 1,
        marginHorizontal: 10,
        // backgroundColor: 'yellow',
        // flex: 1,
        flexDirection: 'column',
    },
    container2: {
        // backgroundColor: 'gray',
        // height: 100,
        marginTop: -3,
        alignItems: 'center',
        marginHorizontal: 42,
        paddingBottom: 15,
    },
    headerText: {
        color: colors.MAIN_COLOR,
        fontSize: fontSizes.h1 * 1.2,
        backgroundColor: 'rgba(255, 204, 204,0.4)',
        paddingHorizontal: 20,
        paddingVertical: 3,
        borderRadius: 16,
    },
    dataText: {
        color: colors.MAIN_COLOR,
        fontSize: fontSizes.h3,
        textAlign: 'center',
        marginTop: 8,
        lineHeight: 25,
    },
    row: {
        // borderWidth: 2,
        flexDirection: 'row',
        paddingVertical: 6,
    },
    text1: {
        fontWeight: 'bold',
        fontSize: fontSizes.h5,
        color: colors.LETTER,
        minWidth: 120,
        maxWidth: numbers.DEVICE_WIDTH - 20 - 120,
        marginStart: 50,
    },
    text: {
        fontWeight: 'bold',
        fontSize: fontSizes.h5,
        color: colors.LETTER,
        minWidth: 120,
        maxWidth: numbers.DEVICE_WIDTH - 20 - 120 - 50,
    },
});
