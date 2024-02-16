import React, {useState} from 'react';
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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    auth,
    onAuthStateChanged,
    firebaseDatabaseRef,
    firebaseSet,
    firebaseDatabase,
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
    const [typedText, setTypedText] = useState('');
    const [chatHistory, setChatHistory] = useState([
        {
            url: 'https://randomuser.me/api/portraits/men/70.jpg',
            showUrl: true,
            isSender: true,
            messenger: 'Hello',
            timestamp: 1641654238000,
        },
        {
            url: 'https://randomuser.me/api/portraits/men/70.jpg',
            showUrl: true,
            isSender: false,
            messenger: 'How are you ?',
            timestamp: 1641654298000,
        },
    ]);

    const {url, name, userId} = props.route.params.user;
    const {navigate, goBack} = props.navigation;

    const onPressRightIcon = () => {
        Alert.alert('onPressRightIcon');
    };
    const onPressLeftIcon = () => {
        goBack();
    };

    const handleSend = async () => {
        // Alert.alert(typedText);
        if (typedText.trim().length == 0) {
            return;
        }
        //"My id send - Guest id receive": {messenger send}
        let newMessengerObject = {
            url: 'https://randomuser.me/api/portraits/men/78.jpg',
            showUrl: true,
            // isSender: true,
            messenger: typedText,
            timestamp: new Date().getTime(),
        };
        // stringUser user đang đăng nhập nè , lưu local khi login
        let stringUser = await AsyncStorage.getItem('user');
        let myUserId = JSON.parse(stringUser).uid;
        // let myFriendUserId = props.route.params.user.userId;
        // lấy từ prop từ componet chat render trong flatlisst
        let myFriendUserId = userId;
        console.log(
            '=====> New chat: ',
            myUserId,
            ' ----vs---- ',
            myFriendUserId,
        );
        // Save mess to firebase
        firebaseSet(
            firebaseDatabaseRef(
                firebaseDatabase,
                `chats/${myUserId}-vs-${myFriendUserId}`,
            ),
            newMessengerObject,
        ).then(() => {
            setTypedText('');
            // Keyboard.dismiss();
        });
    };

    return (
        <View style={{flexDirection: 'column', flex: 1}}>
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
            </View> */}

            {/* ===== FLATLISST ====== */}
            <FlatList
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
                    backgroundColor: 'green',
                }}>
                <TextInput
                    onChangeText={typedText => {
                        setTypedText(typedText);
                    }}
                    style={{
                        color: colors.LETTER,
                        paddingStart: 12,
                    }}
                    placeholder="Enter your message here"
                    value={typedText}
                    placeholderTextColor={colors.placeholder}
                />
                <TouchableOpacity
                    style={{
                        padding: 10,
                        // backgroundColor: 'red',
                        paddingLeft: 15,
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
    );
}

const styles = StyleSheet.create({});
export default Messenger;
