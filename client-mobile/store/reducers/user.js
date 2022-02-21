import { USER_LOGIN, USER_LOGOUT } from '../actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  access_token: null,
  userId: null,
};

function user(state = initialState, action) {
  if (action.type === USER_LOGIN) {
    const storeData = async value => {
      try {
        await AsyncStorage.setItem('access_token', value.access_token);
        await AsyncStorage.setItem('userId', value.id);
      } catch (e) {
        console.log('error access_token');
      }
    };

    storeData(action.payload);

    return {
      ...state,
      access_token: action.payload.access_token,
      userId: action.payload.id,
    };
  } else if (action.type === USER_LOGOUT) {
    const removeValue = async () => {
      try {
        await AsyncStorage.removeItem('access_token');
        await AsyncStorage.removeItem('userId');
      } catch (e) {
        console.log(e);
      }
    };

    removeValue();

    return {
      ...state,
      access_token: null,
      userId: null,
    };
  }

  return state;
}

export default user;
