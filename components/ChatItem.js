import React, {useState, useEffect} from 'react';
import {
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Keyboard,
} from 'react-native';
import {
    images,
    icons,
    texts,
    colors,
    numbers,
    frontSize as sizeFont,
} from '../constants/index';

function ChatItem(props) {
    let {name, url, message, numberOfUnreadMessages, userId} = props.user; //destructuring an object
    const {onPress} = props;
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                height: 80,
                paddingTop: 20,
                paddingStart: 5,
                flexDirection: 'row',
            }}>
            <View>
                <Image
                    style={{
                        width: 50,
                        height: 50,
                        resizeMode: 'cover',
                        borderRadius: 25,
                        marginRight: 15,
                        marginStart: 10,
                    }}
                    source={{
                        uri: url,
                    }}
                />
                {numberOfUnreadMessages > 0 && (
                    <Text
                        style={{
                            backgroundColor: colors.MAIN_COLOR,
                            position: 'absolute',
                            right: 10,
                            fontSize: sizeFont.h6 * 0.9,
                            borderRadius: 10,
                            paddingHorizontal:
                                numberOfUnreadMessages > 9 ? 2 : 4,
                            color: 'white',
                        }}>
                        {numberOfUnreadMessages}
                    </Text>
                )}
            </View>
            <View
                style={{
                    flexDirection: 'column',
                }}>
                <Text
                    style={{
                        color: colors.LETTER,
                        fontSize: sizeFont.h5 * 1.1,
                        fontWeight: 'bold',
                        paddingTop: 2,
                    }}>
                    {name}
                </Text>
                <Text
                    style={{
                        color: colors.LETTER,
                        fontSize: sizeFont.h6,
                        // color: colors.inactive,
                    }}>
                    {message}
                </Text>
            </View>
            <View
                style={{
                    flexDirection: 'column',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                }}>
                <Text
                    style={{
                        color: colors.LETTER,
                        fontSize: sizeFont.h6 * 0.8,
                        marginRight: 10,
                    }}>
                    Leave? codding...
                </Text>
            </View>
        </TouchableOpacity>
        // <View>
        //     <Text style={{color: 'red'}}>jii</Text>
        // </View>
    );
}
export default ChatItem;
