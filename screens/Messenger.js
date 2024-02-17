import React, {useState, useEffect, useRef} from 'react';
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
    SafeAreaView,
    FlatList,
    TextInput,
    Keyboard,
    ActivityIndicator,
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
    orderByKey,
    limitToFirst,
    query,
    firebasePush,
} from '../firebase/firebase';

import {
    images,
    icons,
    texts,
    colors,
    numbers,
    frontSize as sizeFont,
} from '../constants/index';
import {UserRepositories} from '../repositories/index';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import UIHeader from '../navigation/UIHeader';
import MessengerItem from '../components/MessengerItem';

function Messenger(props) {
    const {numberOfStar} = props;
    const [typedTextMessage, setTypedTextMessage] = useState('');
    const flatListRef = useRef();
    const [chatHistory, setChatHistory] = useState([]);

    const renderChatHistory = snapshotMessage => {
        // CẦN ĐƯA RA 1 MẢNG CHỨA CÁC OBJ NHƯ NHƯ SAU
        // {
        //     url: 'https://randomuser.me/api/portraits/men/70.jpg',
        //     messenger: 'Hello',
        //     timestamp: 1641654238000,
        //     showUrl: true,
        //     isSender: true,
        // }

        // console.log(
        //     `renderChatHistory nhận được: ${JSON.stringify(snapshotMessage)}`,
        // );
        let listChatRender = [];
        const myUserId = auth.currentUser.uid;
        let temp = '';
        Object.keys(snapshotMessage).forEach(key => {
            const item = snapshotMessage[key];
            if (key != 'createAt') {
                // Custom và push vào mảng
                let url = snapshotMessage[key].url;
                let idSend = snapshotMessage[key].userId;
                let messenger = snapshotMessage[key].messenger;
                let timestamp = key;
                let isSender = snapshotMessage[key].userId == myUserId;
                let showUrl = !(snapshotMessage[key].userId == temp);
                temp = snapshotMessage[key].userId;
                listChatRender.push({
                    url,
                    messenger,
                    timestamp,
                    isSender,
                    showUrl,
                    idSend,
                });
            }
        });
        console.log('listChatRender: ', listChatRender);
        setChatHistory(listChatRender);
    };

    useEffect(() => {
        // Hàm lắng nghe thay đổi trong NODE chats
        onValue(
            firebaseDatabaseRef(firebaseDatabase, 'chats'),
            async snapshot => {
                if (snapshot.exists()) {
                    console.log(
                        '========> Có sự thay đổi trên node CHATS hoặc mount (useEffect) component Messenger.js ================',
                    );
                    // Lấy được toàn bộ data của CHATS
                    let snapshotObject = snapshot.val();
                    console.log(
                        'snapshotObject chats: ',
                        JSON.stringify(snapshotObject),
                    );
                    // CÁI NÀY LÀ RENDER TIN NHẮN 2 THẰNG
                    // ID TAO
                    const myUserId = auth.currentUser.uid;
                    // ID MÀY
                    let myFriendUserId = props.route.params.user.userId;
                    // Tương tự như add chat vào thì cần dò xem là đang lưu với key nào
                    // xác định node cần push
                    const keyCanAlive1 = `${myUserId}--vs--${myFriendUserId}`;
                    const keyCanAlive2 = `${myFriendUserId}--vs--${myUserId}`;

                    // check và LẤY DATA - 1
                    const chatsRef1 = firebaseDatabaseRef(
                        firebaseDatabase,
                        `chats/${keyCanAlive1}`,
                    );
                    const snapshot1 = await firebaseGet(
                        query(chatsRef1, orderByKey()),
                    );
                    if (snapshot1.exists()) {
                        console.log(
                            `========>OKE TEST FIND 1:  TÌM THẤY NODE ĐỂ LẤY DỮ LIỆU MESSAGE: ${keyCanAlive1}`,
                        );

                        firebaseGet(
                            firebaseDatabaseRef(
                                firebaseDatabase,
                                `chats/${keyCanAlive1}`,
                            ),
                        )
                            .then(() => {
                                console.log(
                                    '===> OKE LẤY ĐƯỢC DỮ LIỆU TIN NHẮN RỒI: ',
                                    JSON.stringify(snapshot1.val()),
                                );
                                renderChatHistory(snapshot1.val());
                            })
                            .catch(error => {
                                console.error(
                                    '==========> ERROR: LỖI KHI LẤY DỮ LIỆU TIN NHẮN ',
                                    keyCanAlive1,
                                );
                            });
                    } else {
                        console.log(
                            `====>TEST FIND: NODE ${keyCanAlive1} TEST SAI RỒI "chats".`,
                        );
                    }
                    // check và LẤY DATA - 2
                    const chatsRef2 = firebaseDatabaseRef(
                        firebaseDatabase,
                        `chats/${keyCanAlive2}`,
                    );
                    const snapshot2 = await firebaseGet(
                        query(chatsRef2, orderByKey()),
                    );
                    if (snapshot2.exists()) {
                        console.log(
                            `========>OKE TEST FIND 1:  TÌM THẤY NODE ĐỂ LẤY DỮ LIỆU MESSAGE: ${keyCanAlive2}`,
                        );

                        firebaseGet(
                            firebaseDatabaseRef(
                                firebaseDatabase,
                                `chats/${keyCanAlive2}`,
                            ),
                        )
                            .then(() => {
                                console.log(
                                    '===> OKE LẤY ĐƯỢC DỮ LIỆU TIN NHẮN RỒI: ',
                                    JSON.stringify(snapshot2.val()),
                                );
                                renderChatHistory(snapshot2.val());
                            })
                            .catch(error => {
                                console.error(
                                    '==========> ERROR: LỖI KHI LẤY DỮ LIỆU TIN NHẮN ',
                                    keyCanAlive2,
                                );
                            });
                    } else {
                        console.log(
                            `====>TEST FIND: NODE ${keyCanAlive2} TEST SAI RỒI "chats".`,
                        );
                    }
                } else {
                    console.log(
                        '===>ERROR: KHÔNG CÓ DỮ LIỆU TRÊN NODE CHATS ???',
                    );
                }
            },
        );
    }, []);

    const {url, name, userId} = props.route.params.user;
    const {navigate, goBack} = props.navigation;

    const onPressRightIcon = () => {
        Alert.alert('onPressRightIcon');
    };
    const onPressLeftIcon = () => {
        goBack();
    };

    const whatNode = async keyCanAlive => {
        // Tham chiếu đến nút cha bạn muốn kiểm tra
        const chatsRef = firebaseDatabaseRef(firebaseDatabase, 'chats');

        // Key của nút con bạn muốn kiểm tra
        // Sử dụng firebaseGet() để lấy dữ liệu từ nút cha
        firebaseGet(child(chatsRef, keyCanAlive))
            .then(snapshot => {
                // Kiểm tra xem nút con có tồn tại không
                if (snapshot.exists()) {
                    console.log(
                        `========>OKE TEST FIND:  TÌM THẤY NODE ĐỂ ĐẨY MESSAGE: ${keyCanAlive}`,
                    );
                    return true;
                } else {
                    console.log(
                        `====>ERROR TEST FIND: NODE ${keyCanAlive} TEST SAI RỒI "chats".`,
                    );
                    return false;
                }
            })
            .catch(error => {
                console.error(
                    '====>ERROR TEST FIND: Lỗi khi kiểm tra nút con:',
                    error,
                );
            });
    };

    const handleSend = async () => {
        if (typedTextMessage.trim().length == 0) {
            return;
        }
        // lấy id của mk:
        const myUserId = auth.currentUser.uid;
        // lấy từ prop từ componet chat render trong flatlisst
        let myFriendUserId = props.route.params.user.userId;
        console.log('USER CHAT WITH ME : ', props.route.params.user);
        console.log(
            '=====> New chat:',
            myUserId,
            '----vs----',
            myFriendUserId,
            'Nội dung:',
            typedTextMessage,
        );
        // Lưu lên thôi
        // 1. chuẩn bị obj
        let newMessengerObject = {
            // URL K CÓ THÌ TRONG APO CŨNG LẤY 1 DEFAULT SET VÔ RỒI
            url: props.route.params.myUserObject.showUrl
                ? props.route.params.myUserObject.showUrl
                : texts.urlDefault,
            messenger: typedTextMessage,
            userId: myUserId,
        };

        // xác định node cần push
        const keyCanAlive1 = `${myUserId}--vs--${myFriendUserId}`;
        const keyCanAlive2 = `${myFriendUserId}--vs--${myUserId}`;
        // check và đẩy data thôi
        const chatsRef = firebaseDatabaseRef(firebaseDatabase, 'chats');

        firebaseGet(child(chatsRef, keyCanAlive1))
            .then(snapshot => {
                // Kiểm tra xem nút con có tồn tại không
                if (snapshot.exists()) {
                    console.log(
                        `========>OKE TEST FIND:  TÌM THẤY NODE ĐỂ ĐẨY MESSAGE: ${keyCanAlive1}`,
                    );
                    const timestamp = Date.now();
                    firebaseSet(
                        firebaseDatabaseRef(
                            firebaseDatabase,
                            `chats/${keyCanAlive1}/${timestamp}`,
                        ),
                        newMessengerObject,
                    )
                        .then(() => {
                            console.log(
                                '=====>OKE: ĐÃ THÊM 1 TIN NHẮN CHAT VÀO ',
                                keyCanAlive1,
                            );
                            Keyboard.dismiss();
                            setTypedTextMessage('');
                        })
                        .catch(error => {
                            console.error(
                                '==========> ERROR: LỖI KHI THÊM TIN NHẮN VÀO ',
                                keyCanAlive1,
                            );
                        });
                } else {
                    console.log(
                        `====>TEST FIND: NODE ${keyCanAlive1} TEST SAI RỒI "chats".`,
                    );
                }
            })
            .catch(error => {
                console.error(
                    '====>ERROR FIND: ĐỂ ĐẨY DỮ LIỆU LÊN CHATS',
                    error,
                );
            });

        firebaseGet(child(chatsRef, keyCanAlive2))
            .then(snapshot => {
                // Kiểm tra xem nút con có tồn tại không
                if (snapshot.exists()) {
                    console.log(
                        `========>OKE TEST FIND:  TÌM THẤY NODE ĐỂ ĐẨY MESSAGE: ${keyCanAlive2}`,
                    );
                    const timestamp = Date.now();
                    firebaseSet(
                        firebaseDatabaseRef(
                            firebaseDatabase,
                            `chats/${keyCanAlive2}/${timestamp}`,
                        ),
                        newMessengerObject,
                    )
                        .then(() => {
                            console.log(
                                '=====>OKE: ĐÃ THÊM 1 TIN NHẮN CHAT VÀO ',
                                keyCanAlive2,
                            );
                            Keyboard.dismiss();
                            setTypedTextMessage('');
                        })
                        .catch(error => {
                            console.error(
                                '==========> ERROR: LỖI KHI THÊM TIN NHẮN VÀO ',
                                keyCanAlive2,
                            );
                        });
                } else {
                    console.log(
                        `====>TEST FIND: NODE ${keyCanAlive2} TEST SAI RỒI "chats".`,
                    );
                }
            })
            .catch(error => {
                console.error(
                    '====>ERROR FIND: ĐỂ ĐẨY DỮ LIỆU VÀO CHAT',
                    error,
                );
            });
    };

    return (
        <View
            style={{
                flexDirection: 'column',
                flex: 1,
                backgroundColor: 'white',
                paddingBottom: 60,
            }}>
            {/* ===== HEADER ====== */}
            <UIHeader
                title={name}
                leftIconName={icons.left_arrow_small}
                rightIconName={icons.dots}
                onPressRightIcon={onPressRightIcon}
                onPressLeftIcon={onPressLeftIcon}
            />
            {/* <View>
                <Text style={{color: 'red'}}>
                    {JSON.stringify(props.route.params.user)}
                </Text>
            </View>*/}

            {/* ===== FLATLISST ====== */}
            <FlatList
                ref={flatListRef}
                style={{flex: 1}}
                data={chatHistory}
                renderItem={({item}) => (
                    <MessengerItem
                        onPress={() => {
                            alert(`You press item's name: ${item.timestamp}`);
                        }}
                        item={item}
                        key={`${item.timestamp}`}
                    />
                )}
                onContentSizeChange={() => {
                    // Cuộn xuống dưới cùng của FlatList khi nội dung thay đổi
                    flatListRef.current?.scrollToEnd({animated: true});
                }}
            />
            {/* Thanh nhắn tin*/}
            <View
                style={{
                    height: 50,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'white',
                    paddingStart: 12,
                }}>
                <TextInput
                    onChangeText={typedTextMessage => {
                        setTypedTextMessage(typedTextMessage);
                    }}
                    style={{
                        color: colors.LETTER,
                        borderWidth: 1,
                        width: '100%',
                        height: 38,
                        borderRadius: 20,
                        maxWidth: numbers.DEVICE_WIDTH - 45 - 12,
                        paddingStart: 12,
                        borderColor: colors.MAIN_COLOR,
                    }}
                    placeholder="Enter your message here"
                    value={typedTextMessage}
                    placeholderTextColor={colors.placeholder}
                />
                <View
                    style={{
                        width: 45,
                        // backgroundColor: 'red',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <TouchableOpacity
                        style={{
                            padding: 9,
                            // backgroundColor: 'green',
                            // paddingLeft: 15,
                            // backgroundColor: 'red',
                        }}
                        onPress={handleSend}>
                        <Image
                            style={{
                                height: 24,
                                width: 24,
                            }}
                            source={icons.send}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({});
export default Messenger;
