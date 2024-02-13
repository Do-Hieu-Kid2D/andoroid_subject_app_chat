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

function Chat(props) {
    const {numberOfStar} = props;
    const onPressRightIcon = () => {
        Alert.alert('onPressRightIcon');
    };

    const onPressLeftIcon = () => {
        Alert.alert('onPressLeftIcon');
    };

    return (
        <View style={{flexDirection: 'column'}}>
            <UIHeader
                title={'Noti ddd'}
                leftIconName={images.left_arrow}
                rightIconName={images.search}
                onPressRightIcon={onPressRightIcon}
                onPressLeftIcon={onPressLeftIcon}></UIHeader>

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                <Text
                    style={{
                        color: colors.LETTER,
                        fontSize: sizeFont.h4,
                    }}>
                    6 tin nhắn mới!
                </Text>
                <TouchableOpacity
                    style={{
                        backgroundColor: 'red',
                    }}>
                    <Image source={images.trash}></Image>
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default Chat;
