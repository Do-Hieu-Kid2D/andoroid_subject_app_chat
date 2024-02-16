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
import UIHeader from '../navigation/UIHeader';
import ChatItem from '../components/ChatItem';

function Chat(props) {
    const {numberOfStar} = props;
    const [users, setUsers] = useState([
        // {
        //     url: 'https://randomuser.me/api/portraits/men/67.jpg',
        //     name: 'Trần Văn Nam',
        //     message: 'Hello, How are you?',
        //     numberOfUnreadMessages: 9,
        // }
    ]);

    useEffect(() => {
        // Hàm lắng nghe thay đổi trong cây user
        onValue(
            firebaseDatabaseRef(firebaseDatabase, 'users'),
            async snapshot => {
                // debugger;
                if (snapshot.exists()) {
                    console.log(
                        '========> Có sự thay đổi trên cây USERS hoặc mount componet Chat.js ================',
                    );
                    let snapshotObject = snapshot.val();
                    let stringUser = await AsyncStorage.getItem('user');
                    let myUserId = JSON.parse(stringUser).uid;
                    const listUsers = Object.keys(snapshotObject)
                        .filter(eachKeyObj => eachKeyObj != myUserId) // lọc bản thân mk ra
                        .map(eachKeyObj => {
                            let eachObjectDetail = snapshotObject[eachKeyObj];
                            return {
                                url: 'https://randomuser.me/api/portraits/men/67.jpg',
                                name: eachObjectDetail['email'],
                                email: eachObjectDetail.email,
                                accessToken: eachObjectDetail.accessToken,
                                numberOfUnreadMessages: 0,
                                userId: eachKeyObj,
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
        Alert.alert('onPressRightIcon');
    };

    const onPressLeftIcon = () => {
        Alert.alert('onPressLeftIcon khả năng cho nút đăng xuất');
    };

    const handleTrash = () => {
        alert('trash');
    };

    const {navigation, route} = props;
    const {navigate, goBack} = navigation;
    return (
        <View style={{flexDirection: 'column'}}>
            {/* ===== HEADER ====== */}
            <UIHeader
                title={texts.NAME_APP}
                leftIconName={images.left_arrow}
                rightIconName={images.search}
                onPressRightIcon={onPressRightIcon}
                onPressLeftIcon={onPressLeftIcon}
            />

            {/* ===== NOTI + TRASH ====== */}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                    // paddingVertical: 7,
                    backgroundColor: 'green',
                }}>
                <Text
                    style={{
                        color: colors.LETTER,
                        fontSize: sizeFont.h4,
                        alignSelf: 'center',
                    }}>
                    6 tin nhắn mới!
                </Text>
                <TouchableOpacity
                    style={{
                        backgroundColor: 'red',
                        padding: 5,
                        paddingHorizontal: 7,
                    }}
                    onPress={handleTrash}>
                    <Image source={images.trash}></Image>
                </TouchableOpacity>
            </View>

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
                                navigate('Messenger', {user: item});
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
