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

export default YesNoModal = ({visible, onConfirm, onCancel, content}) => {
    const [yesNoModal, setYesNoModalVisible] = useState(false);
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
                        {content}
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
