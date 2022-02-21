import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { userLogout } from '../store/actionCreators';

export default function NavbarForProfile() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <View style={styles.nav}>
      <View>
        <Image
          source={require('../assets/logo_black.png')}
          style={{
            width: 140,
            height: 54,
            resizeMode: 'contain',
            marginLeft: 10,
          }}
        />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={{ flexDirection: 'row' }}
          onPress={() => dispatch(userLogout())}
          // onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        >
          <Text
            style={{
              paddingTop: 19,
              paddingRight: 13,
              fontSize: 16,
              color: 'red',
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    backgroundColor: 'white',
    width: '100%',
    height: 63,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E7E7E7',
  },
  nav_text: {
    padding: 15,
    fontWeight: 'bold',
    color: '#03B200',
    fontSize: 16,
  },
});
