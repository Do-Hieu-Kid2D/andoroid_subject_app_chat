import {
    View,
    Text,
    Image,
    ImageBackground,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    TouchableWithoutFeedback,
    Keyboard,
    FlatList,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
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
    orderByKey,
    limitToFirst,
    query,
} from '../firebase/firebase';
import {frontSize as sizeFont, images, colors, texts} from '../constants/index';
import Login from './Login';
import UserContext from '../context/userContext';
import OkeModal from '../components/OkeModal';
import ErrorModalRegister from '../components/ErrorModalRegister';

function Register(props) {
    const [isFocused, setIsFocused] = useState(false);
    const [isFocused1, setIsFocused1] = useState(false);
    const [isFocused2, setIsFocused2] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState();
    const [errorPassword, setErrorPassword] = useState();
    const [errorRePassword, setErrorRePassword] = useState();
    const [statusButtonRegister, setStatusButtonRegister] = useState(false);
    const {isNewUser} = useContext(UserContext);
    const {setIsNewUser} = useContext(UserContext);
    const [okeModalVisible, setOkeModalVisible] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);

    useEffect(() => {
        handleStatusButtonLoin();
    }, [errorEmail, errorPassword, errorRePassword]);

    const handlePress = () => {
        Keyboard.dismiss(); // Ẩn bàn phím khi người dùng chạm vào vùng không phải là TextInput
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };
    const handleFocus1 = () => {
        setIsFocused1(true);
    };

    const handleBlur1 = () => {
        setIsFocused1(false);
    };
    const handleFocus2 = () => {
        setIsFocused2(true);
    };

    const handleBlur2 = () => {
        setIsFocused2(false);
    };

    const handleLogin = () => {
        navigate(Login);
    };
    const handleRegister = () => {
        console.log('=======> handleRegister: ', email, ' ', password);
        createUserWithEmailAndPassword(auth, email, password)
            .then(async userCredential => {
                const userNowRegister = userCredential.user;
                sendEmailVerification(userNowRegister).then(() => {
                    // setIsNewUser(true);
                    setOkeModalVisible(true);
                    console.log('=====>??? sendEmailVerification');
                });
                console.log('=====>OKE: VỪA ĐK 1 USER MỚI userNowRegister: ');
                // save data to firebase
                console.log('=====>OKE: LƯU USER VÀO DB :', userNowRegister);
                const userId = userNowRegister.uid;
                const path = `users/${userId}`;
                firebaseSet(firebaseDatabaseRef(firebaseDatabase, path), {
                    email: userNowRegister.email,
                    accessToken: userNowRegister.accessToken,
                    userId: userNowRegister.uid,
                })
                    .then(() => {
                        console.log(
                            '====>OKE: ĐÃ LƯU USER THÀNH CÔNG KHI REGISTER',
                        );
                    })
                    .catch(() => {
                        console.error(
                            '======>ERROR: K THỂ LƯU USER KHI REGISTER',
                        );
                    });

                // Tạo bảng chat
                // lấy full user trong hệ thống đã
                // trỏ tới thằng user
                const usersRef = firebaseDatabaseRef(firebaseDatabase, 'users');
                const keyUsers = [];
                try {
                    // Lấy dữ liệu từ node 'users' với giới hạn là 1 phần tử đầu tiên
                    const snapshot = await firebaseGet(
                        query(usersRef, orderByKey()),
                    );
                    if (snapshot.exists()) {
                        // Lấy giá trị của phần tử đầu tiên
                        // const userData = snapshot.val();
                        let x = 0;
                        snapshot.forEach(childSnapshot => {
                            const childKey = childSnapshot.key;
                            keyUsers.push(childKey);
                            console.log(
                                `CÁC USER HIỆN CÓ ${x + 1}: `,
                                childKey,
                            );
                            x++;
                        });
                        console.log(
                            '========>OKE MỚI ĐĂNG KÝ 1 THẰNG MỚI CẦN LẤY ĐỂ CONFIG LẠI BẲNG CHAT, TỔNG TẤT CẢ = ',
                            x,
                        );
                    } else {
                        console.error('=====>ERROR K THẤY BẢNG USER');
                    }
                } catch (error) {
                    console.error(
                        '=====>ERROR KHI LẤY DỮ LIỆU TẤT CẢ USER',
                        error,
                    );
                }
                // CÓ MẢNG KEY RỒI
                /// Key của mk có trong : userId;
                console.log(
                    '======> ĐĂNG KÝ CHAT userId: ',
                    userId,
                    ' VỚI TOÀN THỂ BÀ CON',
                );
                // Đăng ký chat với bà con thôi!
                // const chatsRef = firebaseDatabaseRef(firebaseDatabase, 'chats');
                keyUsers
                    .filter(eachKeyObj => eachKeyObj != userId)
                    .forEach(keyUser => {
                        const keyChat = `${userId}--vs--${keyUser}`;
                        const path = `chats/${keyChat}`;
                        // Lấy thời gian hiện tại
                        const currentTime = new Date();
                        const day = currentTime.getDate();
                        const month = currentTime.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
                        const year = currentTime.getFullYear();
                        const hours = currentTime.getHours();
                        const minutes = currentTime.getMinutes();
                        const seconds = currentTime.getSeconds();
                        // Định dạng lại theo định dạng bạn mong muốn
                        const timeNow = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
                        firebaseSet(
                            firebaseDatabaseRef(firebaseDatabase, path),
                            {
                                createAt: timeNow,
                            },
                        )
                            .then(() => {
                                console.log(
                                    '======> ',
                                    timeNow,
                                    ' ĐÃ ĐĂNG KÝ CHAT : ',
                                    keyChat,
                                );
                            })
                            .catch(() => {
                                console.error(
                                    '======>ERROR: K THỂ ĐĂNG KÝ CHAT VỚI BÀ CON ??? : ',
                                    keyChat,
                                );
                            });
                    });
            })
            .catch(error => {
                console.error(
                    '====>ERROR: KHÔNG THỂ ĐĂNG KÝ: ',
                    error.message,
                    ' CODE ERROR:',
                    error.code,
                );
                setErrorModalVisible(true);
            });
    };
    const handleNoRegister = () => {
        // Alert.alert('handleNoRegister Chưa đủ điều kiện rồi');
    };
    const isEmailValid = email => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const handleEmailChange = email => {
        // console.log(email);
        let isEmail = isEmailValid(email);
        setErrorEmail(!isEmail);
        if (isEmail) {
            setEmail(email);
            console.log(email);
        }
    };
    const handleReEnterPass = rePass => {
        // console.log(email);
        let isRePass = rePass == password;
        // console.log('isrePass: ', rePass, ' pass: ', password, isRePass);
        setErrorRePassword(!isRePass);
        // console.log(errorRePassword);
    };
    const handleEnterPass = pass => {
        // console.log(email);
        let isPass = pass.length >= 6;
        console.log(isPass);
        setErrorPassword(!isPass);
        if (isPass) {
            setPassword(pass);
            console.log(pass);
        }
    };

    const handleStatusButtonLoin = () => {
        if (
            errorEmail === false &&
            errorPassword === false &&
            errorRePassword === false
        ) {
            setStatusButtonRegister(true);
        } else {
            setStatusButtonRegister(false);
        }
        console.log('------------   OKE ---------');
        console.log('Email :', email);
        console.log('Password :', password);
        console.log('------------   OKE ---------');
    };

    // Navigation
    const {navigation, route} = props;
    const {navigate, goBack} = navigation;
    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View
                style={{
                    flex: 100,
                    backgroundColor: 'white',
                    padding: 5,
                }}>
                <ImageBackground
                    source={images.chat}
                    resizeMode="contain"
                    style={{
                        flex: 20,
                    }}></ImageBackground>
                <View
                    style={{
                        flex: 80,
                        flexDirection: 'column',
                    }}>
                    <View
                        style={{
                            height: 50,
                            // backgroundColor: 'red',
                            // marginTop: 20,
                        }}>
                        <Text
                            style={{
                                flex: 1,
                                maxHeight: '100%',
                                fontSize: 28,
                                fontWeight: 'bold',
                                color: colors.LETTER,
                                // backgroundColor: 'yellow',
                                textAlign: 'center',
                            }}>
                            Register an Account
                        </Text>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.labeInput}>Email:</Text>
                        <TextInput
                            style={[
                                styles.inputText,
                                isFocused && {
                                    borderColor: colors.MAIN_COLOR,
                                    borderWidth: 2,
                                },
                            ]}
                            placeholder="example@gmail.com"
                            // value=""
                            placeholderTextColor={colors.PLACEHOLDER}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChangeText={handleEmailChange}
                        />
                        <Text
                            style={[
                                {textDecorationLine: 'underline'},
                                errorEmail
                                    ? {color: '#990000'}
                                    : {color: '#ffffff'},
                            ]}>
                            Email chưa đúng định dạng!
                        </Text>
                        <Text style={styles.labeInput}>Password:</Text>
                        <TextInput
                            style={[
                                styles.inputText,
                                isFocused1 && {
                                    borderColor: colors.MAIN_COLOR,
                                    borderWidth: 2,
                                },
                            ]}
                            placeholder="Enter your password"
                            placeholderTextColor={colors.PLACEHOLDER}
                            secureTextEntry={true}
                            onFocus={handleFocus1}
                            onBlur={handleBlur1}
                            onChangeText={handleEnterPass}
                        />
                        <Text
                            style={[
                                {textDecorationLine: 'underline'},
                                errorPassword
                                    ? {color: '#990000'}
                                    : {color: '#ffffff'},
                            ]}>
                            Mật khẩu tối thiểu 6 ký tự
                        </Text>
                        <Text style={styles.labeInput}>Confirm Password:</Text>
                        <TextInput
                            style={[
                                styles.inputText,
                                isFocused2 && {
                                    borderColor: colors.MAIN_COLOR,
                                    borderWidth: 2,
                                },
                            ]}
                            placeholder="Re-enter password"
                            placeholderTextColor={colors.PLACEHOLDER}
                            secureTextEntry={true}
                            onFocus={handleFocus2}
                            onBlur={handleBlur2}
                            onChangeText={handleReEnterPass}
                        />
                        <Text
                            style={[
                                {textDecorationLine: 'underline'},
                                errorRePassword
                                    ? {color: '#990000'}
                                    : {color: '#ffffff'},
                            ]}>
                            Mật khẩu nhập lại không khớp!
                        </Text>
                    </View>

                    {statusButtonRegister ? (
                        <TouchableOpacity style={styles.button}>
                            <Text
                                style={[
                                    styles.labeInput,
                                    {
                                        textAlign: 'center',
                                        paddingTop: 4,
                                        color: 'white',
                                    },
                                ]}
                                onPress={handleRegister}>
                                Đăng ký
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'gray',
                                borderColor: 'rgba(0,0,0,0.7)',
                                borderWidth: 2,
                                borderRadius: 55,
                                width: 230,
                                marginTop: 20,
                                alignSelf: 'center',
                                padding: 5,
                            }}>
                            <Text
                                style={[
                                    styles.labeInput,
                                    {
                                        textAlign: 'center',
                                        paddingTop: 4,
                                        color: 'white',
                                    },
                                ]}
                                onPress={handleNoRegister}>
                                Đăng ký
                            </Text>
                        </TouchableOpacity>
                    )}

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingTop: 8,
                        }}>
                        <Text
                            style={[
                                styles.labeInput,
                                {
                                    paddingTop: 10,
                                    alignSelf: 'center',
                                    fontSize: sizeFont.h4,
                                    color: colors.LETTER,
                                },
                            ]}>
                            Already have an Account?
                        </Text>
                        <TouchableOpacity>
                            <Text
                                style={[
                                    styles.labeInput,
                                    {
                                        paddingTop: 10,
                                        alignSelf: 'center',
                                        fontSize: sizeFont.h4,
                                        paddingLeft: 7,
                                    },
                                ]}
                                onPress={handleLogin}>
                                Login now
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            // backgroundColor: 'purple',
                            flex: 1,
                        }}>
                        <View
                            style={{
                                //   flex: 1,
                                flexDirection: 'row',
                                height: 80,
                                //   paddingTop: 50,
                                alignItems: 'center',
                                marginHorizontal: 20,
                                // backgroundColor: 'yellow',
                            }}>
                            <View style={styles.gach}></View>
                            <Text
                                style={{
                                    color: colors.LETTER,
                                    marginHorizontal: 10,
                                    fontSize: 16,
                                }}>
                                Use other methods
                            </Text>
                            <View style={styles.gach}></View>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                // backgroundColor: 'red',
                                marginHorizontal: 60,
                            }}>
                            <Image source={images.facebook}></Image>
                            <Image source={images.google}></Image>
                            <Image source={images.twitter}></Image>
                            <Image source={images.linkedin}></Image>
                        </View>
                        <View>
                            <Text></Text>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <OkeModal
                        visible={okeModalVisible}
                        content1={
                            'Chúng tôi đã gửi yêu cầu xác nhận tới email: '
                        }
                        content2={email}
                        content3={
                            ' bạn cần xác nhận email để kích hoạt tài khoản thành công!'
                        }
                        onOke={() => {
                            setOkeModalVisible(false);
                            navigate('Login');
                        }}
                    />
                    <ErrorModalRegister
                        visible={errorModalVisible}
                        header={'Lỗi khi đăng ký'}
                        content2={'Có thể email này đã được sử dụng rồi!'}
                        onError={() => {
                            setErrorModalVisible(false);
                        }}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginHorizontal: 15,
        // backgroundColor: 'red',
    },
    labeInput: {
        color: colors.MAIN_COLOR,
        fontSize: sizeFont.h3,
        paddingBottom: 7,
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
    button: {
        borderColor: colors.MAIN_COLOR,
        borderWidth: 2,
        borderRadius: 55,
        width: 230,
        marginTop: 20,
        alignSelf: 'center',
        backgroundColor: colors.MAIN_COLOR,
        padding: 5,
    },
    gach: {height: 1, backgroundColor: 'black', flex: 1},
});

export default Register;
