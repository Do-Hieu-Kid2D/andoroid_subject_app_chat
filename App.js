import {View, Text, StyleSheet} from 'react-native';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Login, MainScreen, Test, Register} from './screens/index';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Register"
                screenOptions={{
                    headerShown: false,
                }}>
                <Stack.Screen name={'MainScreen'} component={MainScreen} />
                <Stack.Screen name={'Login'} component={Login} />
                <Stack.Screen name={'Register'} component={Register} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

// const App = () => {
//     return <MainScreen />;
// };

export default App;
