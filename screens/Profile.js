import React, {useEffect, useState, useContext} from 'react';
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
    firebaseUpdate,
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
import {UpdateProfileModal} from '../components/UpdateProfileModal';
import UserContext from '../context/userContext';
import UpdateTextProfile from '../components/UpdateTextProfile';

export default function Profile() {
    const [user, setUser] = useState(null);
    const [isShowModalShowProfile, setIsShowModalShowProfile] = useState(false);
    const [isShowModalUpTextPro, setIsShowModalUpTextPro] = useState(false);
    const {urlProfile, setUrlProfile} = useContext(UserContext);
    const [reload, setReload] = useState('x');
    const [phone, setPhone] = useState('NaN Not set number');
    const [userName, setUserName] = useState('');
    const [gender, setGender] = useState('Secret');
    const [address, setAddress] = useState(
        'Sky 😎 Land Sky 😎 Land Sky 😎 Land Sky 😎 Land Sky 😎 Land Sky 😎',
    );
    const [wantSay, setWantSay] = useState(
        'Make the Future Awesome, Enjoy the little things!',
    );
    useEffect(() => {
        setUpProfile();
    }, [user]);

    useEffect(() => {
        const getUserFromStorage = async () => {
            try {
                // const stringUser = await AsyncStorage.getItem('user');
                // const userOBJ = JSON.parse(stringUser);
                // setUser(userOBJ);
                // return userOBJ.uid;
                const currentUser = auth.currentUser;
                console.log(
                    '===> currentUser auth HAVE ID : ',
                    currentUser.uid,
                );
                return currentUser.uid;
            } catch (error) {
                console.log('Error getting user from AsyncStorage:', error);
                return null; // Trả về giá trị mặc định hoặc xử lý lỗi ở đây nếu cần thiết
            }
        };

        const getDataUserFromFirebase = async () => {
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
                                setUpProfile(userData);
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
        getDataUserFromFirebase();
    }, [reload]);

    const handleChangeProfile = () => {
        setIsShowModalUpTextPro(true);
    };

    const handleUpdateShowUrl = () => {
        setIsShowModalShowProfile(true);
    };

    const setUpProfile = user => {
        if (user) {
            // console.log(
            //     '======================================setUpProfile:',
            //     user,
            // );
            setPhone(user.phone ? user.phone : 'NaN Not set number');
            setUserName(user.displayName ? user.displayName : user.email);
            setGender(user.gender ? user.gender : 'Secret');
            setWantSay(
                user.wantSay
                    ? user.wantSay
                    : 'Make the Future Awesome, Enjoy the little things!',
            );
            setAddress(
                user.address
                    ? user.address
                    : 'Sky 😎 Land Sky 😎 Land Sky 😎 Land Sky 😎 Land Sky 😎 Land Sky 😎',
            );
        }
    };

    const updateShowUrlToFirebase = () => {
        console.log('======> URL UPDATE PROFILE:', urlProfile);
        // cập nhật lại URL PROFILE
        const userId = user.userId;
        const path = `users/${userId}`;
        firebaseUpdate(firebaseDatabaseRef(firebaseDatabase, path), {
            showUrl: urlProfile,
        })
            .then(() => {
                console.log('====>OKE: ĐÃ cập nhật lại URL PROFILE');
                setIsShowModalShowProfile(false);
                setReload('reloadURL');
            })
            .catch(() => {
                console.log('======>ERROR: K THỂ cập nhật lại URL PROFILE');
            });
    };

    const updateTextProfileToFirebase = ({
        userName,
        phone,
        address,
        gender,
        wantSay,
    }) => {
        console.log('=====> updateTextProfileToFirebase: userName:', userName);
        console.log('=====> updateTextProfileToFirebase: gender:', gender);
        console.log('=====> updateTextProfileToFirebase: address:', address);
        console.log('=====> updateTextProfileToFirebase: phone:', phone);
        console.log('=====> updateTextProfileToFirebase: wantSay:', wantSay);

        const userId = user.userId;
        const path = `users/${userId}`;
        firebaseUpdate(firebaseDatabaseRef(firebaseDatabase, path), {
            phone: phone,
            address: address,
            gender: gender,
            displayName: userName,
            wantSay: wantSay,
        })
            .then(() => {
                setIsShowModalUpTextPro(false);
                setReload('reloadText');
                console.log('====>OKE: ĐÃ cập nhật lại TEXT PROFILE');
            })
            .catch(() => {
                console.log('======>ERROR: K THỂ cập nhật lại TEXT PROFILE');
            });
    };

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
                    <View
                        style={
                            {
                                // backgroundColor: colors.MAIN_COLOR,
                            }
                        }>
                        <View
                            style={{
                                position: 'absolute',
                                left: numbers.DEVICE_WIDTH * 0.5 + 45,
                                top: 3,
                                zIndex: 1,
                            }}>
                            <TouchableOpacity
                                style={{
                                    height: 25,
                                    width: 25,
                                    padding: 15,
                                    borderRadius: 14,
                                    backgroundColor: colors.GREEN_BUTTON,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onPress={handleUpdateShowUrl}>
                                <Image
                                    source={icons.pencil}
                                    style={{
                                        height: 18,
                                        width: 18,
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
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
                                uri: user.showUrl ? user.showUrl : texts.urlDefault,
                            }}
                        />
                    </View>
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
                    <Text style={styles.dataText}>{wantSay}</Text>
                </View>
                <View style={styles.container}>
                    <View style={styles.row}>
                        <Text style={styles.text1}>UserId: </Text>
                        <Text style={styles.text}>{user.userId}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.text1}>Username: </Text>
                        <Text style={styles.text}>{userName}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.text1}>Email:</Text>
                        <Text style={styles.text}>{user.email}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.text1}>Gender: </Text>
                        <Text style={styles.text}>{gender}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.text1}>Address: </Text>
                        <Text style={styles.text}>{address}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.text1}>Phone: </Text>
                        <Text style={styles.text}>{phone}</Text>
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
                            Cập nhật
                        </Text>
                    </TouchableOpacity>
                </View>
                {/* upShowModal */}
                <UpdateProfileModal
                    visible={isShowModalShowProfile}
                    header={'Cập nhật ảnh đại diện'}
                    data={
                        'Đường dẫn online tới ảnh profile google, facebook or any:'
                    }
                    onCancel={() => {
                        setIsShowModalShowProfile(false);
                    }}
                    onConfirm={updateShowUrlToFirebase}
                />

                <UpdateTextProfile
                    visible={isShowModalUpTextPro}
                    onCancel={() => {
                        setIsShowModalUpTextPro(false);
                    }}
                    updateTextProfile={updateTextProfileToFirebase}
                />
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
    inputText: {
        width: '95%',
        height: 45,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: 'white',
        color: colors.LETTER,
        marginBottom: 2,
    },
});
