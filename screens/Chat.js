import React, {useState, useEffect} from 'react';
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
} from 'react-native';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

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
import HeaderChat from '../navigation/HeaderChat';
import ChatItem from '../components/ChatItem';
import UIHeader from '../navigation/UIHeader';

function Chat(props) {
    const {numberOfStar} = props;
    // var myObject;
    const [myObject, setMyObject] = useState([]);
    const [users, setUsers] = useState([
        // {
        //     url: 'https://randomuser.me/api/portraits/men/67.jpg',
        //     name: 'Trần Văn Nam',
        //     message: 'Hello, How are you?',
        //     numberOfUnreadMessages: 9,
        // }
    ]);
    const [isVisibleNoti, setIsVisibleNoti] = useState(true);
    const [urlImg, setUrlImg] = useState(texts.urlDefault);

    useEffect(() => {
        setUrlImg(myObject.showUrl ? myObject.showUrl : texts.urlDefault);
    }, [myObject]);

    useEffect(() => {
        // Hàm lắng nghe thay đổi trong NODE USER
        onValue(
            firebaseDatabaseRef(firebaseDatabase, 'users'),
            async snapshot => {
                // debugger;
                if (snapshot.exists()) {
                    console.log(
                        '========> Có sự thay đổi trên NODE USERS hoặc mount component Chat.js ================',
                    );
                    // Lấy được toàn bộ data của USERS
                    // CÁI NÀY LÀ RENDER BẢNG TIN GỒM TẤT CẢ MỌI NGƯỜI
                    let snapshotObject = snapshot.val();

                    // console.log(
                    //     'snapshotObject ALL USER: ',
                    //     JSON.stringify(snapshotObject),
                    // );
                    const myUserId = auth.currentUser.uid;
                    const myObject = snapshotObject[myUserId];
                    setMyObject(myObject);
                    const listUsers = Object.keys(snapshotObject)
                        .filter(eachKeyObj => eachKeyObj != myUserId) // lọc bản thân mk ra
                        .map(eachKeyObj => {
                            let eachObjectDetail = snapshotObject[eachKeyObj];
                            let urlUS = eachObjectDetail.showUrl;
                            if (urlUS == null || urlUS == undefined) {
                                urlUS = texts.urlDefault;
                            }
                            return {
                                url: urlUS,
                                name: eachObjectDetail.displayName
                                    ? eachObjectDetail.displayName
                                    : eachObjectDetail.email,
                                email: eachObjectDetail.email,
                                numberOfUnreadMessages: 0,
                                userId: eachKeyObj,
                                message: 'Feature can not be used (codding...)',
                                numberOfUnreadMessages: 6,
                            };
                        });
                    // console.log('listUsers :', listUsers);
                    setUsers(listUsers);
                } else {
                    console.log('No data available');
                }
            },
        );
    }, []);

    const onPressRightIcon = () => {
        Alert.alert('codding...');
    };

    const onPressLeftIcon = () => {
        Alert.alert('myData:', JSON.stringify(myObject));
    };

    const handleTrash = () => {
        setIsVisibleNoti(false);
    };

    const {navigation, route} = props;
    const {navigate, goBack} = navigation;
    return (
        <View style={{flexDirection: 'column'}}>
            {/* ===== HEADER ====== */}
            <HeaderChat
                title={texts.NAME_APP}
                leftIconName={urlImg}
                rightIconName={images.search}
                onPressRightIcon={onPressRightIcon}
                onPressLeftIcon={onPressLeftIcon}
            />

            {/* ===== NOTI + TRASH ====== */}
            {isVisibleNoti && (
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 10,
                        // paddingVertical: 7,
                        backgroundColor: 'rgba(0,0,0,0.1)',
                    }}>
                    <Text
                        style={{
                            color: colors.LETTER,
                            fontSize: sizeFont.h4,
                            alignSelf: 'center',
                        }}>
                        6 tin nhắn mới! (codding...)
                    </Text>
                    <TouchableOpacity
                        style={{
                            // backgroundColor: 'red',
                            padding: 5,
                            paddingHorizontal: 7,
                        }}
                        onPress={handleTrash}>
                        <Image source={images.trash}></Image>
                    </TouchableOpacity>
                </View>
            )}

            {/* ===== FLATLISST ====== */}
            <FlatList
                style={styles.flatContainer}
                data={users}
                renderItem={({item}) => {
                    return (
                        <ChatItem
                            user={item}
                            key={item.url}
                            onPress={() => {
                                navigate('Messenger', {
                                    user: item,
                                    myUserObject: myObject,
                                });
                            }}
                        />
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    flatContainer: {
        // flex: 1,
        // backgroundColor: 'yellow',
        // height: 400,
    },
});
export default Chat;
