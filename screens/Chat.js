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
} from 'react-native';

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
        {
            url: 'https://randomuser.me/api/portraits/men/67.jpg',
            name: 'Trần Văn Nam',
            message: 'Hello, How are you?',
            firstMessage: 'Hello, How are you?',
            numberOfUnreadMessages: 9,
        },
        {
            url: 'https://randomuser.me/api/portraits/women/68.jpg',
            name: 'Nguyễn Thị Hằng',
            message: 'Hello, How are you?',
            firstMessage: 'Hello, How are you?',
            numberOfUnreadMessages: 19,
        },
        {
            url: 'https://randomuser.me/api/portraits/men/69.jpg',
            name: 'Hoàng Văn Hùng',
            firstMessage: 'Hello, How are you?',
            message: 'Hello, How are you?',
            numberOfUnreadMessages: 9,
        },
        {
            url: 'https://randomuser.me/api/portraits/women/70.jpg',
            name: 'Lê Thị Mai',
            message: 'Hello, How are you?',
            firstMessage: 'Hello, How are you?',
        },
        {
            url: 'https://randomuser.me/api/portraits/women/67.jpg',
            name: 'Vũ Thị Hà',
            message: 'Hello, How are you?',
            firstMessage: 'Hello, How are you?',
        },
    ]);

    const onPressRightIcon = () => {
        Alert.alert('onPressRightIcon');
    };

    const onPressLeftIcon = () => {
        Alert.alert('onPressLeftIcon');
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
                title={'Noti ddd'}
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
