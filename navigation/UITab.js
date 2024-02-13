import * as React from 'react';
import {Text, View, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
    Login,
    MainScreen,
    Test,
    Register,
    Chat,
    Setting,
} from '../screens/index';
import {images, icons, texts, colors, numbers} from '../constants/index';

const Tab = createBottomTabNavigator();

const screenOptions = ({route}) => ({
    headerShown: false,
    tabBarActiveTintColor: 'white',
    tabBarInactiveTintColor: 'black',
    tabBarActiveBackgroundColor: colors.MAIN_COLOR,
    tabBarInactiveBackgroundColor: colors.MAIN_COLOR,
    tabBarLabelStyle: {fontSize: 13},
    tabBarIcon: ({focused, color, size}) => {
        let iconSource;
        if (route.name === 'Chat') {
            iconSource = focused ? icons.chatActive : icons.chat;
        } else if (route.name === 'Setting') {
            iconSource = focused ? icons.settingActive : icons.setting;
        }
        return (
            <Image source={iconSource} style={{width: size, height: size}} />
        );
    },
});
function UITab() {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name={'Chat'} component={Chat} />
            <Tab.Screen name={'Setting'} component={Setting} />
        </Tab.Navigator>
    );
}

export default UITab;
