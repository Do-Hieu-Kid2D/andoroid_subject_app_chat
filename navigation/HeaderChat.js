import React, {Component} from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {colors, frontSize as sizeFont} from '../constants';

function HeaderChat(props) {
    const {
        title,
        leftIconName,
        rightIconName,
        onPressLeftIcon,
        onPressRightIcon,
    } = props;
    return (
        <View
            style={{
                height: 45,
                backgroundColor: colors.MAIN_COLOR,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
            {leftIconName != undefined ? (
                <TouchableOpacity
                    style={{
                        // backgroundColor: 'red',
                        padding: 5,
                        paddingLeft: 12,
                    }}
                    onPress={onPressLeftIcon}>
                    <Image
                        source={{uri: leftIconName}}
                        style={{
                            height: '100%',
                            width: 38,
                            borderRadius: 21,
                            borderColor: 'white',
                            borderWidth: 0.8,
                        }}
                    />
                </TouchableOpacity>
            ) : (
                <View style={{width: 45, height: 45}} />
            )}
            <Text
                style={{
                    fontSize: sizeFont.h3,
                    alignSelf: 'center',
                    lineHeight: 45,
                    color: 'white',
                }}>
                {title}
            </Text>
            {rightIconName != undefined ? (
                <TouchableOpacity
                    style={{
                        // backgroundColor: 'red',
                        padding: 5,
                        paddingRight: 13,
                    }}
                    onPress={onPressRightIcon}>
                    <Image source={rightIconName} />
                </TouchableOpacity>
            ) : (
                <View style={{width: 45, height: 45}} />
            )}
        </View>
    );
}
export default HeaderChat;
