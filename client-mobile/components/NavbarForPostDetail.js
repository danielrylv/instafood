import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function NavbarForPostDetail() {
  const navigation = useNavigation();
  return (
    <View style={styles.nav}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{ paddingVertical: 10, paddingHorizontal: 13 }}
        >
          <Ionicons name="arrow-back" size={34} color="#929292" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 23,
            fontWeight: 'bold',
            paddingTop: 13,
            paddingHorizontal: 5,
          }}
        >
          Post Details
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}></View>
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
