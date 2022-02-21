import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input, Icon, Stack, Text, Button } from 'native-base';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../store/actionCreators';

const windowHeight = Dimensions.get('window').height;

export default function Login() {
  const navigation = useNavigation();
  const [show, setShow] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const dispatch = useDispatch();

  const handleClick = () => setShow(!show);

  const handleEmailInputChange = (emailInput) => {
    setEmail(emailInput);
  }

  const handlePasswordInputChange = (passwordInput) => {
    setPassword(passwordInput);
  }

  const handleLogin = () => {
    dispatch(userLogin({ email, password }))
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ position: 'absolute', top: 0 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{ paddingVertical: 10, paddingHorizontal: 13 }}>
          <Ionicons name="arrow-back" size={34} color="#929292" />
        </TouchableOpacity>
      </View>
      <Image
        source={require('../assets/logo_black_small_textonly.png')}
        style={{
          width: 300,
          height: 180,
          resizeMode: 'contain',
          alignSelf: 'center',
        }}
      />
      <Stack space={6} w="100%" alignItems="center">
        <Input
          onChangeText={handleEmailInputChange}
          value={email}
          borderWidth={2}
          borderColor="muted.300"
          borderRadius="xl"
          w={{ base: '80%', md: '20%' }}
          InputLeftElement={
            <Icon
              as={<MaterialIcons name="email" />}
              size={6}
              ml="2"
              color="muted.500"
            />
          }
          placeholder="email address"
        />
        <Input
          onChangeText={handlePasswordInputChange}
          value={password}
          borderWidth={2}
          borderColor="muted.300"
          borderRadius="xl"
          type={show ? 'text' : 'password'}
          w={{ base: '80%', md: '20%' }}
          InputRightElement={
            <Icon
              as={<MaterialIcons name="visibility-off" onPress={handleClick} />}
              size={6}
              mr="2"
              color="muted.500"
            />
          }
          placeholder="Password"
        />
        <Text>{email}</Text>
        <Text>{password}</Text>
        <Button
          onPress={handleLogin}
          colorScheme="red"
          w={{ base: '80%', md: '20%' }}
          h={12}
          borderRadius="lg"
        >
          <Text fontWeight="bold" color={'white'} fontSize={17}>
            Log In
          </Text>
        </Button>
      </Stack>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
          flexDirection: 'row',
        }}
      >
        <Text style={{ fontSize: 15 }}>Don\'t have an account? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Register');
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>Sign Up.</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: windowHeight,
    justifyContent: 'center',
    paddingBottom: windowHeight / 5.5,
  },
});
