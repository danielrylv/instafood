import React from 'react';
import { Box, Center, Flex, Text } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SearchButton() {
  const navigation = useNavigation();

  return (
    <Box onTouchEnd={() => navigation.navigate('SearchScreen')} px={'4'} py={'3'} position={'relative'} mb={'1'}>
      <Flex direction={'row'} bg={'gray.100'} borderRadius={'xl'} height={'12'} alignItems={'center'} borderWidth={1} borderColor={'muted.300'}>
        <Center px={'3'}>
          <AntDesign name="search1" size={20} color="black" />
        </Center>
        <Text fontSize={'lg'} color={'gray.500'}>Search</Text>
      </Flex>
    </Box>
  )
}