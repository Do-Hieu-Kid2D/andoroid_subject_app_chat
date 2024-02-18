import * as React from 'react';

import {Login, MainScreen, Test, Register, Messenger} from '../screens/index';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
import UITab from './UITab';
import {UserProvider} from '../context/userContext';

function App() {
    return (
        <UserProvider>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="MainScreen"
                    screenOptions={{headerShown: false}}>
                    <Stack.Screen name={'MainScreen'} component={MainScreen} />
                    <Stack.Screen name={'Login'} component={Login} />
                    <Stack.Screen name={'Register'} component={Register} />
                    <Stack.Screen name={'UITab'} component={UITab} />
                    <Stack.Screen name={'Messenger'} component={Messenger} />
                </Stack.Navigator>
            </NavigationContainer>
        </UserProvider>
    );
}
// npx react-native build-android --mode=release

export default App;
