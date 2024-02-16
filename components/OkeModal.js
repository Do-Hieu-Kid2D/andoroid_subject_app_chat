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

export default OkeModal = ({
    visible,
    onConfirm,
    content1,
    content2,
    content3,
    content4,
    onOke,
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
                        <Text
                            style={{
                                color: colors.MAIN_COLOR,
                            }}>
                            {content2}
                        </Text>
                        <Text>{content3}</Text>
                    </Text>
                    <Text
                        style={{
                            color: colors.LETTER,
                            fontSize: fontSizes.h4,
                        }}>
                        <Text>=={`>`}XÁC NHẬN ĐĂNG NHẬP VÀ TRẢI NGHIỆM</Text>
                        <Text
                            style={{
                                color: colors.MAIN_COLOR,
                            }}>
                            {` `}
                            {texts.NAME_APP}
                        </Text>
                        <Text> NGAY THÔI hihi!</Text>
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 20,
                        }}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: colors.GREEN_BUTTON,
                                paddingHorizontal: 25,
                                paddingVertical: 10,
                                borderRadius: 10,
                            }}
                            onPress={onOke}>
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: fontSizes.h4,
                                }}>
                                Yes
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
