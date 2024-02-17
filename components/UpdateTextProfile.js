import {
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    FlatList,
    ScrollView,
    Switch,
    SafeAreaView,
    Alert,
    Modal,
    Button,
    StyleSheet,
} from 'react-native';
import React, {useState, useContext} from 'react';

import {
    images,
    icons,
    texts,
    colors,
    numbers,
    frontSize as fontSizes,
} from '../constants/index';
import UserContext from '../context/userContext';

export default function UpdateTextProfile({
    visible,
    updateTextProfile,
    onCancel,
}) {
    const [isFocused, setIsFocused] = useState(false);
    const [isFocused1, setIsFocused1] = useState(false);
    const [isFocused2, setIsFocused2] = useState(false);
    const [isFocused3, setIsFocused3] = useState(false);
    const [isFocused4, setIsFocused4] = useState(false);
    const [phone, setPhone] = useState('');
    const [userName, setUserName] = useState('');
    const [gender, setGender] = useState('');
    const [wantSay, setWantSay] = useState('');
    const [address, setAddress] = useState('');

    // useState(() => {
    //     setInput(input);
    // }, [input]);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };
    const handleFocus1 = () => {
        setIsFocused1(true);
    };

    const handleBlur1 = () => {
        setIsFocused1(false);
    };
    const handleFocus2 = () => {
        setIsFocused2(true);
    };
    const handleBlur2 = () => {
        setIsFocused2(false);
    };
    const handleFocus3 = () => {
        setIsFocused3(true);
    };
    const handleBlur3 = () => {
        setIsFocused3(false);
    };
    const handleFocus4 = () => {
        setIsFocused4(true);
    };
    const handleBlur4 = () => {
        setIsFocused4(false);
    };
    const handleChangeUsername = text => {
        setUserName(text);
    };
    const handleChangePhone = text => {
        setPhone(text);
    };
    const handleChangeAddress = text => {
        setAddress(text);
    };
    const handleChangeGender = text => {
        setGender(text);
    };
    const handleChangeWantSay = text => {
        setWantSay(text);
    };
    const handleConfirm = () => {
        updateTextProfile({userName, phone, address, gender, wantSay});
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => onCancel()}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                }}>
                <View
                    style={{
                        backgroundColor: 'white',
                        padding: 20,
                        borderRadius: 10,
                        maxWidth: numbers.DEVICE_WIDTH * 0.85,
                        width: '100%',
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <View
                            style={{
                                height: 25,
                                width: 25,
                                padding: 15,
                                borderRadius: 14,
                                // backgroundColor: colors.GREEN_BUTTON,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Image
                                source={icons.pencil}
                                style={{
                                    height: 18,
                                    width: 18,
                                }}
                            />
                        </View>
                        <Text
                            style={{
                                color: colors.MAIN_COLOR,
                                fontSize: fontSizes.h2,
                                alignSelf: 'center',
                                marginBottom: 2,
                            }}>
                            Cập nhật thông tin
                        </Text>
                        <View
                            style={{
                                height: 25,
                                width: 25,
                                padding: 15,
                                borderRadius: 14,
                                // backgroundColor: colors.GREEN_BUTTON,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Image
                                source={icons.pencil}
                                style={{
                                    height: 18,
                                    width: 18,
                                }}
                            />
                        </View>
                    </View>
                    {/* 1 cục */}
                    <View>
                        <Text style={styles.lable}>UserName:</Text>
                        <TextInput
                            style={[
                                styles.inputText,
                                isFocused && {
                                    borderColor: colors.MAIN_COLOR,
                                    borderWidth: 2,
                                },
                            ]}
                            placeholder="Nhập tên của bạn"
                            // value=""
                            placeholderTextColor={colors.PLACEHOLDER}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChangeText={handleChangeUsername}
                        />
                    </View>
                    <View>
                        <Text style={styles.lable}>Slogan:</Text>
                        <TextInput
                            style={[
                                styles.inputText,
                                isFocused4 && {
                                    borderColor: colors.MAIN_COLOR,
                                    borderWidth: 2,
                                },
                            ]}
                            placeholder="What do you think?"
                            // value=""
                            placeholderTextColor={colors.PLACEHOLDER}
                            onFocus={handleFocus4}
                            onBlur={handleBlur4}
                            onChangeText={handleChangeWantSay}
                        />
                    </View>
                    <View>
                        <Text style={styles.lable}>Số điện thoai:</Text>
                        <TextInput
                            style={[
                                styles.inputText,
                                isFocused1 && {
                                    borderColor: colors.MAIN_COLOR,
                                    borderWidth: 2,
                                },
                            ]}
                            placeholder="Nhập SĐT của bạn"
                            keyboardType="numeric"
                            placeholderTextColor={colors.PLACEHOLDER}
                            onFocus={handleFocus1}
                            onBlur={handleBlur1}
                            onChangeText={handleChangePhone}
                        />
                    </View>
                    <View>
                        <Text style={styles.lable}>Địa chỉ:</Text>
                        <TextInput
                            style={[
                                styles.inputText,
                                isFocused2 && {
                                    borderColor: colors.MAIN_COLOR,
                                    borderWidth: 2,
                                },
                            ]}
                            placeholder="Nhập địa chỉ của bạn"
                            // value=""
                            placeholderTextColor={colors.PLACEHOLDER}
                            onFocus={handleFocus2}
                            onBlur={handleBlur2}
                            onChangeText={handleChangeAddress}
                        />
                    </View>
                    <View>
                        <Text style={styles.lable}>Giới tính:</Text>
                        <TextInput
                            style={[
                                styles.inputText,
                                isFocused3 && {
                                    borderColor: colors.MAIN_COLOR,
                                    borderWidth: 2,
                                },
                            ]}
                            placeholder="type anything :))"
                            // value=""
                            placeholderTextColor={colors.PLACEHOLDER}
                            onFocus={handleFocus3}
                            onBlur={handleBlur3}
                            onChangeText={handleChangeGender}
                        />
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            marginTop: 20,
                        }}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: colors.RED_BUTTON,
                                paddingHorizontal: 20,
                                paddingVertical: 5,
                                borderRadius: 10,
                            }}
                            onPress={onCancel}>
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: fontSizes.h4,
                                }}>
                                Quay lại
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: colors.GREEN_BUTTON,
                                paddingHorizontal: 20,
                                paddingVertical: 5,
                                borderRadius: 10,
                            }}
                            onPress={handleConfirm}>
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: fontSizes.h4,
                                }}>
                                Cập nhật
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
const styles = StyleSheet.create({
    inputText: {
        marginTop: 3,
        width: 'auto',
        height: 42,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: 'white',
        color: colors.LETTER,
        marginBottom: 2,
    },
    lable: {
        color: colors.LETTER,
        fontSize: fontSizes.h4,
        marginTop: 5,
    },
    genderButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        marginBottom: 10,
    },
    genderButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    selected: {
        backgroundColor: '#90caf9',
    },
    selectedGenderText: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
    },
});
