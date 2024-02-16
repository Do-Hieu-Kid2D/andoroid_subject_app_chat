import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
    const [user, setUser] = useState('');

    useEffect(() => {
        const getUserFromStorage = async () => {
            try {
                const stringUser = await AsyncStorage.getItem('user');
                setUser(stringUser);
            } catch (error) {
                console.log('Error getting user from AsyncStorage:', error);
            }
        };

        getUserFromStorage();
    }, []); // Passing an empty array as the second argument ensures that the effect runs only once when the component mounts

    return <Text style={{color: 'red'}}>{user}</Text>;
}
