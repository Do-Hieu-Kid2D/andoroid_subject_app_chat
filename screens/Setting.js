import React, {useState, useEffect} from 'react';
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
} from 'react-native';
import {
    images,
    icons,
    texts,
    colors,
    numbers,
    frontSize as fontSizes,
} from '../constants/index';
import UIHeader from '../navigation/UIHeader';
import {
    auth,
    firebaseDatabase,
    firebaseDatabaseRef,
} from '../firebase/firebase';
import {StackActions} from '@react-navigation/native';

const LogoutConfirmationModal = ({visible, onConfirm, onCancel}) => {
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
                    }}>
                    <Text
                        style={{
                            color: colors.LETTER,
                            fontSize: fontSizes.h4,
                        }}>
                        Bạn có muốn đăng xuất ngay không?
                    </Text>
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
                            onPress={onConfirm}>
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: fontSizes.h4,
                                }}>
                                Yes
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: colors.GREEN_BUTTON,
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
                                No
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

function Settings(props) {
    const [isEnabledLockApp, setEnabledLockApp] = useState(true);
    const [isUseFingerprint, setUseFingerprint] = useState(false);
    const [isEnabledChangePassword, setEnabledChangePassword] = useState(true);

    const [logoutModalVisible, setLogoutModalVisible] = useState(false);

    const handleLogout = () => {
        setLogoutModalVisible(true);
    };

    const confirmLogout = () => {
        // Perform logout action
        auth.signOut();
        // // xóa tất cả màn hình khỏi stack đẩy về màn hình chính
        navigation.dispatch(StackActions.popToTop());
        setLogoutModalVisible(false);
    };

    const cancelLogout = () => {
        //
        setLogoutModalVisible(false);
    };

    //navigation
    const {navigation, route} = props;
    //functions of navigate to/back
    const {navigate, goBack} = navigation;
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: 'white',
            }}>
            <UIHeader title={'Settings'} />
            <ScrollView>
                {/* 1 */}
                <View>
                    <View
                        style={{
                            height: 40,
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            justifyContent: 'center',
                        }}>
                        <Text
                            style={{
                                fontSize: fontSizes.h4,
                                color: colors.MAIN_COLOR,
                                paddingStart: 10,
                            }}>
                            Common
                        </Text>
                    </View>
                    {/* 1.1 ========= con  */}
                    <View
                        style={{
                            flexDirection: 'row',
                            paddingVertical: 10,
                            alignItems: 'center',
                        }}>
                        <Image
                            source={icons.language}
                            style={{marginStart: 10, height: 21, width: 21}}
                        />
                        <Text
                            style={{
                                color: 'black',
                                fontSize: fontSizes.h5,
                                color: 'black',
                                paddingStart: 10,
                            }}>
                            Language
                        </Text>
                        <View style={{flex: 1}} />
                        <Text
                            style={{
                                color: 'black',
                                fontSize: fontSizes.h6 * 1.08,
                                color: 'black',
                                paddingEnd: 10,
                                opacity: 0.7,
                            }}>
                            English
                        </Text>
                        <Image
                            source={icons.right_arrow}
                            style={{marginEnd: 10, height: 21, width: 21}}
                        />
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            paddingVertical: 10,
                            alignItems: 'center',
                        }}>
                        <Image
                            source={icons.recycle}
                            style={{marginStart: 10, height: 21, width: 21}}
                        />
                        <Text
                            style={{
                                color: 'black',
                                fontSize: fontSizes.h5,
                                color: 'black',
                                paddingStart: 10,
                            }}>
                            Environment
                        </Text>
                        <View style={{flex: 1}} />
                        <Text
                            style={{
                                color: 'black',
                                fontSize: fontSizes.h6 * 1.08,
                                color: 'black',
                                paddingEnd: 10,
                                opacity: 0.7,
                            }}>
                            Production
                        </Text>
                        <Image
                            source={icons.right_arrow}
                            style={{marginEnd: 10, height: 21, width: 21}}
                        />
                    </View>
                </View>

                {/* 2 ======================== */}
                <View>
                    <View
                        style={{
                            height: 40,
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            justifyContent: 'center',
                        }}>
                        <Text
                            style={{
                                fontSize: fontSizes.h4,
                                color: colors.MAIN_COLOR,
                                paddingStart: 10,
                            }}>
                            Messenger color
                        </Text>
                    </View>
                    {/* 1.1 ========= con  */}
                    <View
                        style={{
                            flexDirection: 'row',
                            paddingVertical: 10,
                            alignItems: 'center',
                        }}>
                        <Image
                            source={icons.user}
                            style={{marginStart: 10, height: 21, width: 21}}
                        />
                        <Text
                            style={{
                                color: 'black',
                                fontSize: fontSizes.h5,
                                color: 'black',
                                paddingStart: 10,
                            }}>
                            My color
                        </Text>
                        <View style={{flex: 1}} />
                        <Text
                            style={{
                                color: 'black',
                                fontSize: fontSizes.h6 * 1.08,
                                color: 'black',
                                paddingEnd: 10,
                                opacity: 0.7,
                            }}>
                            Select
                        </Text>
                        <Image
                            source={icons.right_arrow}
                            style={{marginEnd: 10, height: 21, width: 21}}
                        />
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            paddingVertical: 10,
                            alignItems: 'center',
                        }}>
                        <Image
                            source={icons.guest}
                            style={{marginStart: 10, height: 21, width: 21}}
                        />
                        <Text
                            style={{
                                color: 'black',
                                fontSize: fontSizes.h5,
                                color: 'black',
                                paddingStart: 10,
                            }}>
                            Guest color
                        </Text>
                        <View style={{flex: 1}} />
                        <Text
                            style={{
                                color: 'black',
                                fontSize: fontSizes.h6 * 1.08,
                                color: 'black',
                                paddingEnd: 10,
                                opacity: 0.7,
                            }}>
                            Choose
                        </Text>
                        <Image
                            source={icons.right_arrow}
                            style={{marginEnd: 10, height: 21, width: 21}}
                        />
                    </View>
                </View>

                <View>
                    <View
                        style={{
                            height: 40,
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            justifyContent: 'center',
                        }}>
                        <Text
                            style={{
                                fontSize: fontSizes.h4,
                                color: colors.MAIN_COLOR,
                                paddingStart: 10,
                            }}>
                            Security
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            paddingVertical: 10,
                            alignItems: 'center',
                        }}>
                        <Image
                            source={icons.door}
                            style={{marginStart: 10, height: 20, width: 20}}
                        />
                        <Text
                            style={{
                                color: 'black',
                                fontSize: fontSizes.h5,
                                color: 'black',
                                paddingStart: 10,
                            }}>
                            Lock app in background
                        </Text>
                        <View style={{flex: 1}} />
                        <Switch
                            trackColor={{
                                false: 'gray',
                                true: colors.MAIN_COLOR_BLUR,
                            }}
                            thumbColor={
                                isEnabledLockApp
                                    ? colors.MAIN_COLOR_BLUR
                                    : 'gray'
                            }
                            //ios_backgroundColor="#3e3e3e"
                            onValueChange={() => {
                                setEnabledLockApp(!isEnabledLockApp);
                            }}
                            value={isEnabledLockApp}
                            style={{marginEnd: 10}}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            paddingVertical: 10,
                            alignItems: 'center',
                        }}>
                        <Image
                            source={icons.fingerprint}
                            style={{marginStart: 10, height: 20, width: 20}}
                        />
                        <Text
                            style={{
                                color: 'black',
                                fontSize: fontSizes.h5,
                                color: 'black',
                                paddingStart: 10,
                            }}>
                            Use fingerprint
                        </Text>
                        <View style={{flex: 1}} />
                        <Switch
                            trackColor={{
                                false: 'gray',
                                true: colors.MAIN_COLOR_BLUR,
                            }}
                            thumbColor={
                                isEnabledLockApp
                                    ? colors.MAIN_COLOR_BLUR
                                    : 'gray'
                            }
                            //ios_backgroundColor="#3e3e3e"
                            onValueChange={() => {
                                setEnabledLockApp(!isEnabledLockApp);
                            }}
                            value={isEnabledLockApp}
                            style={{marginEnd: 10}}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            paddingVertical: 10,
                            alignItems: 'center',
                        }}>
                        <Image
                            source={icons.lock}
                            style={{marginStart: 10, height: 20, width: 20}}
                        />
                        <Text
                            style={{
                                color: 'black',
                                fontSize: fontSizes.h5,
                                color: 'black',
                                paddingStart: 10,
                            }}>
                            Change password
                        </Text>
                        <View style={{flex: 1}} />
                        <Switch
                            trackColor={{
                                false: 'gray',
                                true: colors.MAIN_COLOR_BLUR,
                            }}
                            thumbColor={
                                isEnabledLockApp
                                    ? colors.MAIN_COLOR_BLUR
                                    : 'gray'
                            }
                            //ios_backgroundColor="#3e3e3e"
                            onValueChange={() => {
                                setEnabledLockApp(!isEnabledLockApp);
                            }}
                            value={isEnabledLockApp}
                            style={{marginEnd: 10}}
                        />
                    </View>
                </View>

                <View>
                    <View
                        style={{
                            height: 40,
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            justifyContent: 'center',
                        }}>
                        <Text
                            style={{
                                fontSize: fontSizes.h4,
                                color: colors.MAIN_COLOR,
                                paddingStart: 10,
                            }}>
                            Account
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            paddingVertical: 10,
                            alignItems: 'center',
                        }}
                        onPress={() => {
                            Alert.alert('codding...');
                        }}>
                        <Image
                            source={icons.email}
                            style={{marginStart: 10, height: 21, width: 21}}
                        />
                        <Text
                            style={{
                                color: 'black',
                                fontSize: fontSizes.h5,
                                color: 'black',
                                paddingStart: 10,
                            }}>
                            Email
                        </Text>
                        <View style={{flex: 1}} />
                        <Image
                            source={icons.right_arrow}
                            style={{marginEnd: 10, height: 21, width: 21}}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            paddingVertical: 10,
                            alignItems: 'center',
                        }}
                        onPress={() => {
                            Alert.alert('codding...');
                        }}>
                        <Image
                            source={icons.phone}
                            style={{marginStart: 10, height: 21, width: 21}}
                        />
                        <Text
                            style={{
                                color: 'black',
                                fontSize: fontSizes.h5,
                                color: 'black',
                                paddingStart: 10,
                            }}>
                            Phone number
                        </Text>
                        <View style={{flex: 1}} />
                        <Image
                            source={icons.right_arrow}
                            style={{marginEnd: 10, height: 21, width: 21}}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            paddingVertical: 10,
                            alignItems: 'center',
                        }}
                        onPress={() => {
                            // auth.signOut();
                            // // xóa tất cả màn hình khỏi stack đẩy về màn hình chính
                            // navigation.dispatch(StackActions.popToTop());
                            handleLogout();
                        }}>
                        <Image
                            source={icons.logout}
                            style={{marginStart: 10, height: 21, width: 21}}
                        />
                        <Text
                            style={{
                                color: 'black',
                                fontSize: fontSizes.h5,
                                color: 'black',
                                paddingStart: 10,
                            }}>
                            Sign out
                        </Text>
                        <View style={{flex: 1}} />
                        <Image
                            source={icons.right_arrow}
                            style={{marginEnd: 10, height: 21, width: 21}}
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <LogoutConfirmationModal
                    visible={logoutModalVisible}
                    onConfirm={confirmLogout}
                    onCancel={cancelLogout}
                />
            </View>
        </SafeAreaView>
    );
}
export default Settings;
