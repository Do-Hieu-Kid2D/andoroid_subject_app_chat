import React, {useEffect, useId, useState, useContext, lazy} from 'react';
import {
    Image,
    Text,
    View,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Modal,
    Button,
} from 'react-native';
import Swiper from 'react-native-swiper';
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
    get,
    onValue, //reload when online DB changed
    signInWithEmailAndPassword,
} from '../firebase/firebase';
import {images, icons, texts, colors, numbers} from '../constants/index';
import UserContext from '../context/userContext';

const imageSlidesShow = [
    images.slideShow1,
    images.slideShow2,
    images.slideShow3,
];

const ModalCustom = ({visible, onClose}) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <Modal
            animationType="fade" // Animation fade sẽ làm cho modal mờ dần
            transparent={true}
            visible={visible}
            onRequestClose={onClose}>
            <View style={stylesModal.centeredView}>
                <View style={stylesModal.modalView}>
                    <View style={stylesModal.modalText}>
                        <Text
                            style={{
                                color: colors.MAIN_COLOR,
                                fontSize: 20,
                            }}>
                            <Text>Mobile </Text>
                            <Text>programming 56KMT </Text>
                        </Text>
                        <View style={styleTable.container}>
                            <View style={styleTable.row}>
                                <Text style={styleTable.headerCell}>
                                    Content
                                </Text>
                                <Text style={styleTable.headerCell}>
                                    Description
                                </Text>
                            </View>
                            <View style={styleTable.row}>
                                <Text style={styleTable.cell}>AppName</Text>
                                <Text style={styleTable.cell}>
                                    {texts.NAME_APP}
                                </Text>
                            </View>
                            <View style={styleTable.row}>
                                <Text style={styleTable.cell}>Author</Text>
                                <Text style={styleTable.cell}>Đỗ văn Hiếu</Text>
                            </View>
                            <View style={styleTable.row}>
                                <Text style={styleTable.cell}>instructor</Text>
                                <Text style={styleTable.cell}>Đỗ Duy Cốp</Text>
                            </View>
                            <View style={styleTable.row}>
                                <Text style={styleTable.cell}>Start</Text>
                                <Text style={styleTable.cell}>12/02/2024</Text>
                            </View>
                            <View style={styleTable.row}>
                                <Text style={styleTable.cell}>Key</Text>
                                <Text style={styleTable.cell}>
                                    React native
                                </Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={{
                            borderColor: colors.MAIN_COLOR_BLUR,
                            borderWidth: 2,
                            borderRadius: 5,
                            paddingHorizontal: 30,
                            paddingVertical: 5,
                        }}
                        onPress={onClose}>
                        <Text
                            style={{
                                color: colors.MAIN_COLOR,
                            }}>
                            Đóng
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styleTable = StyleSheet.create({
    container: {
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        border: 'gray',
        minWidth: 100,
        paddingVertical: 5,
    },
    headerCell: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.MAIN_COLOR_BLUR,
        minWidth: 100,
    },
    cell: {
        textAlign: 'center',
        color: colors.LETTER,
    },
});

const stylesModal = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Lớp mờ
    },
    modalView: {
        backgroundColor: colors.WHITE_BLUR,
        borderRadius: 20,
        width: numbers.DEVICE_WIDTH - 30,
        alignItems: 'center',
        paddingVertical: 10,
    },
    modalText: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        textAlign: 'center',
        color: 'black',
    },
});

const MainScreen = props => {
    const [modalVisible, setModalVisible] = useState(false);
    const {isRememberMe} = useContext(UserContext);

    const handleRegister = () => {
        navigate('Register');
    };

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleDangNhap = () => {
        navigate('Login');
    };

    // Navigation
    const {navigation, route} = props;
    const {navigate, goBack} = navigation;

    useEffect(() => {
        // Mục tiêu là đăng nhập tự động

        onAuthStateChanged(auth, currentUser => {
            if (currentUser) {
                // const currentUser = auth.currentUser;
                currentUser.reload().then(function () {
                    console.log(
                        ' RELOAD USER ===> USER emailVerified = ',
                        currentUser.emailVerified,
                        ' thằng ',
                        currentUser.email,
                    );
                    console.log(
                        ' LƯU USER VÀO DB : vì khi đăng ký thì thằng này lưu hộ ==========> ',
                        currentUser,
                    );
                    const userId = currentUser.uid;
                    const path = `users/${userId}`;
                    AsyncStorage.setItem('user', JSON.stringify(currentUser));
                    // save data to firebase
                    firebaseSet(firebaseDatabaseRef(firebaseDatabase, path), {
                        email: currentUser.email,
                        emailVerified: currentUser.emailVerified,
                        accessToken: currentUser.accessToken,
                        userId: currentUser.uid,
                    })
                        .then(() => {
                            console.log(
                                '====> ĐÃ LƯU USER THÀNH CÔNG MAIN SCREEN',
                            );
                        })
                        .catch(() => {
                            console.log('K THỂ LƯU USER ');
                        });
                    if (currentUser.emailVerified) {
                        console.log(
                            '=====> THẰNG NÀY emailVerified RỒI NÊN CHO NÓ CHAT',
                        );
                        navigate('UITab');
                    } else {
                        console.log(
                            '=====> THẰNG NÀY ==== CHƯA ====  emailVerified  NÊN ===> OFF CHAT',
                        );
                    }
                    // if (isRememberMe) {
                    //     console.log(
                    //         'CÓ isRememberMe: ',
                    //         isRememberMe,
                    //         ' NÊN CHO SANG CHAT',
                    //     );
                    //     navigate('UITab');
                    // } else {
                    //     console.log(
                    //         'KHÔNG isRememberMe: ',
                    //         isRememberMe,
                    //         ' NÊN THÔI',
                    //     );
                    // }
                });
            } else {
                console.log(
                    '=============CHƯA ĐĂNG NHẬP===========  auth.currentUser() == NULL',
                );
            }
        });
    }, []);
    return (
        <View
            style={{
                // backgroundColor: 'white', // Đặt màu nền là màu xanh
                flex: 100,
            }}>
            <ImageBackground
                source={images.backGround}
                resizeMode="cover"
                style={{
                    flex: 100,
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        flex: 15,
                        justifyContent: 'flex-start',
                        // alignItems: 'center',
                        // backgroundColor: 'red',
                        marginTop: 5,
                    }}>
                    <Image
                        source={icons.logo}
                        style={{
                            height: 30,
                            width: 30,
                            marginLeft: 10,
                            marginRight: 5,
                        }}></Image>
                    <Text style={{color: 'white', fontSize: 19}}>
                        {texts.NAME_APP}
                    </Text>
                    <TouchableOpacity
                        onPress={handleOpenModal}
                        style={{marginLeft: 'auto'}}>
                        <Image
                            source={icons.question}
                            style={{
                                height: 30,
                                width: 30,
                                tintColor: 'white',
                                marginRight: 10,
                            }}></Image>
                    </TouchableOpacity>
                </View>
                <ModalCustom
                    visible={modalVisible}
                    onClose={handleCloseModal}
                />
                {/* Phần 2  */}
                <View
                    style={{
                        flex: 20,
                        // backgroundColor: 'green',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <Text
                        style={[
                            styles.textLarge,
                            {
                                marginTop: 20,
                                backgroundColor: 'white',
                                borderRadius: 10,
                                paddingHorizontal: 5,
                            },
                        ]}>
                        Welcome to
                    </Text>
                    <Text
                        style={[
                            styles.textLarge,
                            {
                                fontSize: 28,
                                fontWeight: 'bold',
                                color: colors.MAIN_COLOR,
                                backgroundColor: 'white',
                                borderRadius: 10,
                                paddingHorizontal: 15,
                            },
                        ]}>
                        {texts.NAME_APP}
                    </Text>
                    <Text
                        style={[
                            styles.textLarge,
                            {
                                marginBottom: 20,
                                backgroundColor: 'white',
                                borderRadius: 10,
                                paddingHorizontal: 5,
                            },
                        ]}>
                        Sign in to the awesome app
                    </Text>
                </View>
                {/* Phần 3  */}
                <View
                    style={[
                        {
                            flex: 40,
                            backgroundColor: 'green',
                        },
                    ]}>
                    <Swiper
                        style={styles.wrapper}
                        showsButtons={true}
                        autoplay={true} // Tự động chuyển slide
                        autoplayTimeout={2000} // Thời gian trễ giữa các lần chuyển slide (2 giây)
                        activeDotColor={colors.MAIN_COLOR}
                        dotColor="rgba(255, 255, 255, 0.8)" // Màu của các nút còn lại
                        buttonWrapperStyle={styles.buttonWrapper} // Thêm style cho nút chuyển đổi
                        prevButton={
                            <Text
                                style={[
                                    styles.buttonText,
                                    styles.prevButtonText,
                                ]}>
                                {'<'}
                            </Text>
                        } // Thêm style cho mũi tên trước
                        nextButton={
                            <Text
                                style={[
                                    styles.buttonText,
                                    styles.nextButtonText,
                                ]}>
                                {'>'}
                            </Text>
                        } // Thêm style cho mũi tên sau
                    >
                        {imageSlidesShow.map((image, index) => (
                            <View key={index}>
                                <Image source={image} style={styles.image} />
                            </View>
                        ))}
                    </Swiper>
                </View>
                {/* Phần 4  */}
                <View
                    style={{
                        flex: 25,
                        marginTop: 10,
                    }}>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            {justifyContent: 'center', alignItems: 'center'},
                        ]}
                        onPress={handleDangNhap}>
                        <Text
                            style={[
                                styles.textLarge,
                                {color: colors.MAIN_COLOR},
                            ]}>
                            ĐĂNG NHẬP
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.center}>
                        <Text
                            style={{
                                fontSize: 18,
                                marginTop: 15,
                                color: 'white',
                            }}>
                            Bạn chưa có tài khoản?
                        </Text>
                        <TouchableOpacity
                            style={{
                                fontSize: 26,
                                marginTop: 10,
                            }}
                            onPress={handleRegister}>
                            <Text
                                style={{
                                    color: colors.MAIN_COLOR,
                                }}>
                                Đăng ký ngay...
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
    },
    textLarge: {
        color: colors.LETTER,
        fontSize: 22,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        borderColor: colors.MAIN_COLOR_BLUR,
        borderWidth: 2,
        height: 50,
        borderRadius: 5,
        marginHorizontal: 10,
        marginTop: 10,
    },
    wrapper: {},
    image: {
        width: '100%',
        height: '100%',
    },
    buttonWrapper: {
        backgroundColor: 'transparent', // Đảm bảo nút chuyển đổi có nền trong suốt
    },
    buttonText: {
        fontSize: 32,
        color: colors.MAIN_COLOR_BLUR, // Màu cam cho mũi tên
    },
    prevButtonText: {
        marginLeft: 10, // Điều chỉnh khoảng cách giữa mũi tên và hình ảnh
    },
    nextButtonText: {
        marginRight: 10, // Điều chỉnh khoảng cách giữa mũi tên và hình ảnh
    },
});

export default MainScreen;
