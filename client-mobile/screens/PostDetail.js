import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Box, Flex, Image, Text, Button, Center, Modal } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import NavbarForPostDetail from '../components/NavbarForPostDetail';
const windowWidth = Dimensions.get('window').width;
import { SwiperFlatList } from 'react-native-swiper-flatlist';

const images = [
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  'https://images.unsplash.com/photo-1585518419759-7fe2e0fbf8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80',
  'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
];

const comments = [
  {
    id: '62105604b36a64d38945f57f',
    comment: 'hello',
    user: {
      id: '621054ef0837fb236cd55b7c',
      username: 'user.one',
      profilePicture:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png',
    },
  },
  {
    id: '62105604b36a64d38945f57t',
    comment: 'hello',
    user: {
      id: '621054ef0837fb236cd55b7x',
      username: 'user.two',
      profilePicture:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png',
    },
  },
];

export default function PostDetail() {
  const [showModal, setShowModal] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <NavbarForPostDetail />
      </View>
      <ScrollView>
        <Box w={windowWidth}>
          <Box
            style={{ paddingHorizontal: 14 }}
            mb={'4'}
            borderColor={'gray.200'}
          >
            <Box>
              <View style={{ backgroundColor: 'white' }}>
                <SwiperFlatList
                  index={0}
                  style={{ overflow: 'hidden' }}
                  showPagination
                  paginationActiveColor={'blue'}
                  paginationStyleItem={{
                    width: 9,
                    height: 9,
                    borderRadius: 9 / 2,
                    marginHorizontal: 5,
                    marginTop: 53,
                  }}
                  data={images}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        width: windowWidth * 0.9467,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Image
                        alt="img"
                        style={{
                          width: '100%',
                          resizeMode: 'cover',
                          borderTopLeftRadius: 12,
                          borderTopRightRadius: 12,
                          height: 470,
                        }}
                        source={{
                          uri: item,
                        }}
                      />
                    </View>
                  )}
                />
              </View>
            </Box>
            <Box
              borderColor={'gray.300'}
              borderWidth={'1'}
              borderBottomRadius={'xl'}
            >
              <Flex direction="row" justify={'space-between'}>
                <Flex direction="row" px={'3'} py={'2'}>
                  <Box mr={'4'}>
                    <AntDesign name="like2" size={30} color="#929292" />
                  </Box>
                  <Box>
                    <FontAwesome name="comment-o" size={30} color="#929292" />
                  </Box>
                </Flex>
                <Flex direction="row" px={'2'} py={'3'}>
                  <TouchableOpacity mr={'4'} onPress={() => setShowModal(true)}>
                    <Ionicons name="trash-outline" size={31} color="#9B9B9B" />
                  </TouchableOpacity>
                  <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Content maxWidth="400px">
                      <Modal.CloseButton />
                      <Modal.Body>
                        <Center pt={10}>
                          <Text style={{ fontSize: 20 }}>
                            Are you sure, you want to delete this post?
                          </Text>
                        </Center>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button.Group space={2}>
                          <Button
                            variant="ghost"
                            colorScheme="blueGray"
                            onPress={() => {
                              setShowModal(false);
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            px={6}
                            colorScheme="red"
                            onPress={() => {
                              setShowModal(false);
                            }}
                          >
                            Yes
                          </Button>
                        </Button.Group>
                      </Modal.Footer>
                    </Modal.Content>
                  </Modal>
                </Flex>
              </Flex>
              <Box px={'3'}>
                <Text fontSize={'md'} fontWeight={'bold'}>
                  {likesFormat(10000)} likes
                </Text>
              </Box>
              <Flex direction="row" px={'3'} mt={'3'} mb={'1'}>
                <Box size={'12'} borderRadius={'full'} borderColor={'gray.200'}>
                  <Image
                    width={'full'}
                    height={'full'}
                    resizeMode={'cover'}
                    borderRadius={'full'}
                    source={{
                      uri: 'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651__340.png',
                    }}
                    alt={'alternate picture'}
                  />
                </Box>
                <Box ml={'3'}>
                  <Text fontSize={'md'} fontWeight={'bold'}>
                    John Doe
                  </Text>
                  <Flex direction="row">
                    <Text fontSize={'md'}>Enakkks</Text>
                  </Flex>
                </Box>
              </Flex>
              <Box px={'3'} mt={'1'} mb={'4'}>
                <Text fontSize={'xs'} color={'gray.400'}>
                  February 16, 2022
                </Text>
              </Box>
              {/*  */}
              {comments.map(comment => {
                return (
                  <Flex
                    key={comment.id}
                    direction="row"
                    px={'3'}
                    mt={'3'}
                    mb={'6'}
                  >
                    <Box
                      size={'12'}
                      borderRadius={'full'}
                      borderColor={'gray.200'}
                    >
                      <Image
                        width={'full'}
                        height={'full'}
                        resizeMode={'cover'}
                        borderRadius={'full'}
                        source={{
                          uri:
                            comment.user.profilePicture ||
                            'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651__340.png',
                        }}
                        alt={'alternate picture'}
                      />
                    </Box>
                    <Box ml={'3'}>
                      <Text fontSize={'md'} fontWeight={'bold'}>
                        {comment.user.username}
                      </Text>
                      <Flex direction="row">
                        <Text fontSize={'md'}>{comment.comment}</Text>
                      </Flex>
                    </Box>
                  </Flex>
                );
              })}

              {/*  */}
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}

const likesFormat = likes => {
  let stringifiedLikes = likes + '';
  stringifiedLikes = stringifiedLikes.split('').reverse();
  let formattedLikes = '';

  stringifiedLikes.forEach((el, i) => {
    if ((i + 1) % 3 === 0 && i !== stringifiedLikes.length - 1) {
      formattedLikes += el + ',';
    } else {
      formattedLikes += el;
    }
  });

  return formattedLikes.split('').reverse();
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    flex: 1,
  },
  placeContainer: {
    marginTop: 10,
    backgroundColor: 'white',
    flexDirection: 'column',
    paddingBottom: 20,
    width: '100%',
    borderBottomWidth: 2,
    borderColor: '#E1E1E1',
  },
  placeDetailName: {
    fontSize: 35,
    fontWeight: 'normal',
    paddingLeft: 1,
  },
  containerSwiper: { flex: 1, backgroundColor: 'white', margin: 18 },
});
