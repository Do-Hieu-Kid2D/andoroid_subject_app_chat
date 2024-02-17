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

export function UpdateProfileModal({
    visible,
    onConfirm,
    header,
    data,
    onCancel,
}) {
    const [isFocused, setIsFocused] = useState(false);
    const [input, setInput] = useState('');
    const {urlProfile, setUrlProfile} = useContext(UserContext);

    // useState(() => {
    //     setInput(input);
    // }, [input]);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleChangeInput = text => {
        setInput(text);
        setUrlProfile(text);
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
                    }}>
                    <Text
                        style={{
                            color: colors.MAIN_COLOR,
                            fontSize: fontSizes.h2,
                            alignSelf: 'center',
                            marginBottom: 5,
                        }}>
                        {header}
                    </Text>

                    <Text
                        style={{
                            color: colors.LETTER,
                            fontSize: fontSizes.h4,
                        }}>
                        {data}
                    </Text>
                    <TextInput
                        style={[
                            styles.inputText,
                            isFocused && {
                                borderColor: colors.MAIN_COLOR,
                                borderWidth: 2,
                            },
                        ]}
                        placeholder=""
                        // value=""
                        placeholderTextColor={colors.PLACEHOLDER}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChangeText={handleChangeInput}
                    />
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
                            onPress={onConfirm}>
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
        marginTop: 12,
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
});
