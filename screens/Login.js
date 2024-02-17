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
} from 'react-native';
import React, {useState, useContext} from 'react';

import {signInWithEmailAndPassword, auth} from '../firebase/firebase';
import {frontSize as sizeFont, images, colors, texts} from '../constants/index';
import UITab from '../navigation/UITab';
import Register from './Register';
import UserContext from '../context/userContext';
import ErrorModal from '../components/ErrorModal';

function Login(props) {
    const [isFocused, setIsFocused] = useState(false);
    const [isFocused1, setIsFocused1] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const {isRememberMe} = useContext(UserContext);
    const {setIsRememberMe} = useContext(UserContext);

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

    const handleRegister = () => {
        navigate(Register);
    };
    const handleLogin = () => {
        console.log('long in : ', email, ' ', password);
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const objUserCredential = JSON.parse(
                    JSON.stringify(userCredential),
                );
                const userLogin = objUserCredential.user;

                if (userLogin.emailVerified) {
                    console.log(
                        '======> user log in success => REDIRECT SANG BÊN CHAT  ',
                        userLogin,
                    );
                    navigate('UITab');
                } else {
                    console.log(
                        '===> CÓ ÔNG ANH email:',
                        userLogin.email,
                        ' REGISTER rồi mà chưa xác nhận nên cũng OFF CHAT',
                        // JSON.stringify(userCredential),
                    );
                    setErrorModalVisible(true);
                }
            })
            .catch(error => {
                console.log('===> AI ĐÓ đăng nhập sai');
                setErrorModalVisible(true);
            });
    };

    const handleRememberMePress = () => {
        setRememberMe(!rememberMe);
        // setIsRememberMe(!rememberMe);
        // console.log('rememberMe ', rememberMe);
    };

    const handleForgotPasswordPress = () => {
        Alert.alert('handleForgotPasswordPress');
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
                            marginTop: 20,
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
                            Already have an Account!
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
                            placeholderTextColor={colors.PLACEHOLDER}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChangeText={email => {
                                setEmail(email);
                            }}
                        />

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
                            onChangeText={pass => {
                                setPassword(pass);
                            }}
                        />
                    </View>

                    <View style={styles2NUT.container}>
                        <TouchableOpacity
                            onPress={handleRememberMePress}
                            style={styles2NUT.rememberMeButton}>
                            {rememberMe ? (
                                <Text style={styles2NUT.rememberMeTextChecked}>
                                    ☑ Remember me
                                </Text>
                            ) : (
                                <Text
                                    style={styles2NUT.rememberMeTextUnchecked}>
                                    ☐ Remember me
                                </Text>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleForgotPasswordPress}
                            style={styles2NUT.forgotPasswordButton}>
                            <Text style={styles2NUT.forgotPasswordText}>
                                Forgot Password
                            </Text>
                        </TouchableOpacity>
                    </View>

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
                            onPress={handleLogin}>
                            Đăng nhập
                        </Text>
                    </TouchableOpacity>
                    {/* <Text
                        style={{
                            color: 'red',
                        }}>
                        {' '}
                        REMENBER IS
                        {JSON.stringify(rememberMe)}
                    </Text> */}
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingTop: 15,
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
                            New user?
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
                                onPress={handleRegister}>
                                Register now
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
                    </View>
                </View>
                <ErrorModal
                    visible={errorModalVisible}
                    content1={'Có lỗi khi đăng nhập, hãy thử lại!'}
                    onError={() => {
                        setErrorModalVisible(false);
                    }}
                />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles2NUT = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginHorizontal: 12,
        marginVertical: 8,
    },
    rememberMeButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rememberMeTextChecked: {
        fontSize: 16,
        color: colors.MAIN_COLOR,
    },
    rememberMeTextUnchecked: {
        fontSize: 16,
        color: 'gray',
    },
    forgotPasswordButton: {},
    forgotPasswordText: {
        fontSize: 16,
        color: 'gray',
    },
});

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
        height: 50,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: 'white',
        color: colors.LETTER,
        marginBottom: 12,
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

export default Login;
