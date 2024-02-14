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
import MessengerItem from '../components/MessengerItem';

function Messenger(props) {
    const {numberOfStar} = props;
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
            showUrl: false,
            isSender: true,
            messenger: 'How are you ?',
            timestamp: 1641654298000,
        },
        {
            url: 'https://randomuser.me/api/portraits/men/70.jpg',
            showUrl: false,
            isSender: true,
            messenger:
                'If you are new to mobile development, the easiest way to get started is with Expo Go',
            timestamp: 1641654538000,
        },
        {
            url: 'https://randomuser.me/api/portraits/men/50.jpg',
            showUrl: true,
            isSender: false,
            messenger:
                'Expo is a set of tools and services built around React Native and, while it has many features, the most relevant feature for us right now is that it can get you writing a React Native app within minutes',
            timestamp: 1641654598000,
        },
        {
            url: 'https://randomuser.me/api/portraits/men/50.jpg',
            showUrl: false,
            isSender: false,
            messenger: 'I am fine',
            timestamp: 1641654598000,
        },
        {
            url: 'https://randomuser.me/api/portraits/men/70.jpg',
            showUrl: true,
            isSender: true,
            messenger:
                'Expo is a set of tools and services built around React Native and, while it has many features, the most relevant feature for us right now is that it can get you writing a React Native app within minutes',
            timestamp: 1641654778000,
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
        </View>
    );
}

const styles = StyleSheet.create({});
export default Messenger;
