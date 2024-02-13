import {Alert} from 'react-native';
import axios from 'axios';

async function getDetailUser() {
    let url = 'https://jsonplaceholder.typicode.com/posts/1/comments';
    // Alert.alert('getDetailUser');
    try {
        let response = await axios.get(url);
        console.log(response.json());
        if(response.status != 200){
            throw "failed request"
        }
    } catch (err) {
        throw err;
    }
}

export default {
    getDetailUser,
};
