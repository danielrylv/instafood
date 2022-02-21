import React from 'react';
import { Center, Pressable } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export default function PostButton() {
  const navigation = useNavigation();
  const { access_token } = useSelector(state => state.user);

  return (
    <Center
      onTouchEnd={() => {
        if (access_token) {
          navigation.navigate('CreatePostScreen');
        } else {
          navigation.navigate('Login');
        }
      }}
      position={'absolute'}
      right={'5'}
      bottom={'5'}
      size={'16'}
      borderRadius={'full'}
    >
      <Pressable
        _pressed={{
          bg: 'red.600',
        }}
        bg={'red.500'}
        borderRadius={'full'}
        size={'full'}
        shadow={'5'}
      >
        <Center size={'full'}>
          <AntDesign name="plus" size={30} color="white" />
        </Center>
      </Pressable>
    </Center>
  );
}
