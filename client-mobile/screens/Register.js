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
import { useDispatch } from 'react-redux';
import { userRegister } from '../store/actionCreators';

const windowHeight = Dimensions.get('window').height;

export default function Register() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [show, setShow] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');

  const handleClick = () => setShow(!show);

  const handleInputEmailChange = (emailInput) => {
    setEmail(emailInput);
  }
  const handleInputUsernameChange = (usernameInput) => {
    setUsername(usernameInput);
  }
  const handleInputPasswordChange = (passwordInput) => {
    setPassword(passwordInput);
  }
  const handleRegister = () => {
    dispatch(userRegister({
      email,
      password,
      username
    }))
      .then(() => {
        navigation.goBack()
      })
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
        source={require('../assets/register_pic.png')}
        style={{
          width: 200,
          height: 200,
          resizeMode: 'contain',
          alignSelf: 'center',
          marginVertical: 24,
        }}
      />
      <Stack space={6} w="100%" alignItems="center">
        <Input
          value={email}
          onChangeText={handleInputEmailChange}
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
          value={username}
          onChangeText={handleInputUsernameChange}
          borderWidth={2}
          borderColor="muted.300"
          borderRadius="xl"
          w={{ base: '80%', md: '20%' }}
          InputLeftElement={
            <Icon
              as={<MaterialIcons name="person" />}
              size={6}
              ml="2"
              color="muted.500"
            />
          }
          placeholder="username"
        />
        <Input
          value={password}
          onChangeText={handleInputPasswordChange}
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
        <Text>{username}</Text>
        <Text>{password}</Text>
        <Button
          onPress={handleRegister}
          colorScheme="red"
          w={{ base: '80%', md: '20%' }}
          h={12}
          borderRadius="lg"
        >
          <Text fontWeight="bold" color={'white'} fontSize={17}>
            Register
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
        <Text style={{ fontSize: 15 }}>Already have an account? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>Sign in.</Text>
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
