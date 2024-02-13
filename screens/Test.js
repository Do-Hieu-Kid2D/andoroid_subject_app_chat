import React from 'react';
import {
    TouchableWithoutFeedback,
    Keyboard,
    View,
    TextInput,
    StyleSheet,
} from 'react-native';

const Test = () => {
    const handlePress = () => {
        Keyboard.dismiss(); // Ẩn bàn phím khi người dùng chạm vào vùng không phải là TextInput
    };

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập thông tin"
                    placeholderTextColor="gray"
                    keyboardType="default"
                    secureTextEntry={false}
                />
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    input: {
        width: '80%',
        height: 50,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: 'white',
    },
});

export default Test;
