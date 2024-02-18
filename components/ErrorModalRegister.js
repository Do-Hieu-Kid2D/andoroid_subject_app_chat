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

export default ErrorModalRegister = ({
    visible,
    onConfirm,
    content1,
    content2,
    onError,
    header,
}) => {
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
                            color: colors.LETTER,
                            fontSize: fontSizes.h4,
                        }}>
                        <Text>{content1}</Text>
                    </Text>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text
                            style={{
                                marginTop: -20,
                                color: colors.MAIN_COLOR,
                                fontSize: fontSizes.h2,
                                paddingBottom: 10,
                            }}>
                            <Text>{header}</Text>
                        </Text>
                    </View>

                    {content2 ? (
                        <Text
                            style={{
                                color: colors.LETTER,
                                fontSize: fontSizes.h4,
                            }}>
                            <Text>{content2}</Text>
                        </Text>
                    ) : (
                        <Text></Text>
                    )}

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 20,
                        }}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: colors.RED_BUTTON,
                                paddingHorizontal: 20,
                                paddingVertical: 7,
                                borderRadius: 10,
                            }}
                            onPress={onError}>
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: fontSizes.h4,
                                }}>
                                Oke! Try again!
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
