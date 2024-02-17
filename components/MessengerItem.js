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
    Dimensions,
} from 'react-native';
import {
    images,
    colors,
    icons,
    frontSize as fontSizes,
    numbers,
} from '../constants/index';

function MessengerItem(props) {
    const {onPress} = props;
    const {url, isSender, messenger, timestamp, showUrl} = props.item;

    return isSender == false ? (
        <TouchableOpacity
            onPress={onPress}
            style={{
                marginTop: 5,
                flexDirection: 'row',
                alignItems: 'center',
                // marginRight: 45,
                marginStart: 55,
            }}>
            {/* CÓ SHOW HÌNH ẢNH K */}
            {showUrl == true ? (
                <Image
                    style={{
                        width: 40,
                        height: 40,
                        resizeMode: 'cover',
                        borderRadius: 20,
                        marginRight: 15,
                        marginStart: 10,
                        position: 'absolute',
                        top: 0,
                        // right: 10
                        left: -55,
                    }}
                    source={{
                        uri: url,
                    }}
                />
            ) : (
                <View
                // style={{
                //     width: 40,
                //     height: 40,
                //     marginRight: 15,
                //     marginStart: 10,
                // }}
                />
            )}

            <View
                style={{
                    width: numbers.DEVICE_WIDTH * 0.7,
                    flexDirection: 'row',
                    // backgroundColor: 'red',
                    marginBottom: 6,
                }}>
                <View>
                    <Text
                        style={{
                            color: 'black',
                            fontSize: fontSizes.h5 * 1.1,
                            paddingVertical: 5,
                            paddingHorizontal: 7,
                            backgroundColor: colors.MY_MESSAGE,
                            borderRadius: 10,
                        }}>
                        {messenger}
                    </Text>
                </View>
                <View style={{width: 20}}></View>
            </View>
            {/* isSender = true */}
        </TouchableOpacity>
    ) : (
        <TouchableOpacity
            onPress={onPress}
            style={{
                marginTop: 5,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
            }}>
            {/* isSender = false */}
            <View
                style={{
                    // flex: 1,
                    // flexDirection: 'column',
                    justifyContent: 'flex-end',
                    maxWidth: numbers.DEVICE_WIDTH * 0.7,
                    marginEnd: 50,
                    // backgroundColor: 'green',
                    marginBottom: 6,
                }}>
                {/* <View style={{width: 40, backgroundColor: 'yellow'}}></View> */}
                <View>
                    <Text
                        style={{
                            color: 'black',
                            fontSize: fontSizes.h5 * 1.1,
                            paddingVertical: 5,
                            paddingHorizontal: 7,
                            backgroundColor: colors.OTHER_MESSAGE,
                            maxWidth: numbers.DEVICE_WIDTH * 0.7,
                            borderRadius: 10,
                            // textAlign: 'right',
                            // backgroundColor: 'yellow',
                        }}>
                        {messenger}
                    </Text>
                </View>
            </View>
            {showUrl == true ? (
                <Image
                    style={{
                        width: 40,
                        height: 40,
                        resizeMode: 'cover',
                        borderRadius: 20,
                        marginRight: 15,
                        marginStart: 10,
                        position: 'absolute',
                        top: 0,
                        // right: 10
                    }}
                    source={{
                        uri: url,
                    }}
                />
            ) : (
                <View
                // style={{
                //     width: 40,
                //     height: 40,
                //     marginRight: 15,
                //     marginStart: 10,
                // }}
                />
            )}
        </TouchableOpacity>
    );
}
export default MessengerItem;
