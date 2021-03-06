import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Dimensions } from 'react-native';
import { Box, Center, Flex, Image, Input, Pressable, ScrollView, StatusBar, Text, TextArea, Modal } from 'native-base';
import { Feather } from '@expo/vector-icons';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function CreatePostScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [place, setPlace] = useState('');
  const [foundPlaces, setFoundPlaces] = useState([]);
  const [pickedPlace, setPickedPlace] = useState('');
  const [loadingPlaces, setLoadingPlaces] = useState(false);
  const [caption, setCaption] = useState('');
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState('');
  const [postLoading, setPostLoading] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  const { access_token } = useSelector((state) => state.user);
  const [token, setToken] = useState(null);
  const [showModalNotFood, setShowModalNotFood] = useState(false);

  const checkAccessToken = async () => {
    try {
      return await AsyncStorage.getItem('access_token');
    } catch (e) {
      return 'error reading access_token';
    }
  };

  useEffect(() => {
    checkAccessToken()
      .then((tokenStorage) => {
        setToken(tokenStorage)
      })
      .catch((err) => console.log(err))
  }, [access_token])

  // Functions:
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      if (!image) {
        setImage([result.uri]);
      } else {
        setImage([...image, result.uri]);
      }
    }
  };
  const handleUploadPhoto = async () => {
    const SERVER_POSTS_URL = 'https://hacktiv8-instafood.herokuapp.com/posts';
    // setPostLoading(true);
    try {
      if (!image) return;
      if (!pickedPlace) return;
      if (!caption) return;

      setPostLoading(true);

      // Upload the image using the fetch and FormData APIs
      let formData = new FormData();

      image.forEach(el => {
        // ImagePicker saves the taken photo to disk and returns a local URI to it
        let localUri = el;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : 'image';

        // Assume "photo" is the name of the form field the server expects
        formData.append('images', { uri: localUri, name: filename, type });
      });

      if (tags.length > 0) {
        tags.forEach((el) => {
          formData.append('tags', el)
        })
      }

      formData.append('place_id', pickedPlace.place.place_id);
      formData.append('caption', caption);

      await fetch('https://hacktiv8-instafood.herokuapp.com/posts/images-lables', {
        method: 'POST',
        body: formData,
        headers: {
          access_token: token,
        },
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            return Promise.reject('something went wrong!');
          }
        })
        .then(result => {
          let isFoodFlag = [];
          let foodScannerValid = true;

          result.forEach((el) => {
            let foundFood = false;

            el.forEach((el2, i) => {

              if (el2.name === 'Food') {
                if (+el2.score >= 0.9) {
                  foundFood = true;
                  isFoodFlag.push(true);
                } else {
                  isFoodFlag.push(false);
                  foundFood = false;
                }
              }

              if (i === el2.length - 1 && !foundFood) {
                isFoodFlag.push(false);
              }
            })

            if (!foundFood) {
              isFoodFlag.push(false);
            }
          })

          isFoodFlag.forEach((el) => {
            if (!el) {
              foodScannerValid = false
            }
          })

          if (foodScannerValid) {
            fetch(SERVER_POSTS_URL, {
              method: 'POST',
              body: formData,
              headers: {
                access_token: token,
              },
            })
              .then(response => {
                if (response.ok) {
                  return response.json();
                } else {
                  return Promise.reject('something went wrong!');
                }
              })
              .then(response => {
                console.log('response', response);
                setPostLoading(false);
                navigation.goBack();
              })
              .catch(error => {
                console.log('error', error);
              });
          } else {
            setPostLoading(false);
            setShowModalNotFood(true);
          }
        })
        .catch(err => console.log('error ' + err))
    } catch (err) {
      console.log(err);
    }
  };
  const handleCancelImage = imageUri => {
    let images = image.filter(el => el !== imageUri);

    if (images.length === 0) {
      setImage(null);
    } else {
      setImage(images);
    }
  };
  const handlePlaceInputChange = async (input) => {
    setPlace(input);
  }
  const handleSearchPlace = async () => {
    const SERVER_PLACES_URL = `https://hacktiv8-instafood.herokuapp.com/places?name=${place}`;

    setLoadingPlaces(true);

    await fetch(SERVER_PLACES_URL)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject('something went wrong!');
        }
      })
      .then(response => {
        setFoundPlaces(response);
        setLoadingPlaces(false);
      })
      .catch(error => {
        console.log('error', error);
      });
  }
  const handlePickPlace = (placePick) => {
    setPickedPlace(placePick)
  }
  const handleClearPlaceSearch = () => {
    setPickedPlace('');
    setFoundPlaces([]);
    setPlace('');
  }
  const handleCaptionChange = (caption) => {
    setCaption(caption);
  }
  const handleClearCaption = () => {
    setCaption('');
  }
  const handleClearSearch = () => {
    setPlace('');
    setFoundPlaces([]);
  }
  const handleTagInputChange = (tagInput) => {
    setTag(tagInput);
  }
  const handleAddTag = () => {
    if (tag) {
      setTags([...tags, tag]);
      setTag('');
    }
  }
  const handleCancelTag = (tagCancel) => {
    let newTags = tags.filter((el) => el !== tagCancel);

    setTags(newTags);
  }

  // Components:
  const AddButton = () => {
    if (image) {
      if (image.length < 5) {
        return (
          <Center
            onTouchEnd={pickImage}
            bg={'#be5960'}
            height={'1/6'}
            borderBottomRadius={'lg'}
          >
            <Text color={'white'} fontWeight={'bold'} fontSize={'md'}>
              Add More
            </Text>
          </Center>
        );
      }

      return (
        <Center bg={'gray.500'} height={'1/6'} borderBottomRadius={'lg'}>
          <Text color={'white'} fontWeight={'bold'} fontSize={'md'}>
            Maximum Image Quantity
          </Text>
        </Center>
      );
    }

    return (
      <Center
        onTouchEnd={pickImage}
        bg={'#ef4444'}
        height={'1/6'}
        borderBottomRadius={'lg'}
      >
        <Text color={'white'} fontWeight={'bold'} fontSize={'md'}>
          Add Image
        </Text>
      </Center>
    );
  };

  return (
    <Box flex={1} safeArea bg={'white'}>
      <StatusBar></StatusBar>
      <Flex direction='row' justifyContent={'space-between'} width={'full'} height={'16'} borderBottomWidth={'1'} borderColor={'gray.100'}>
        <Center onTouchEnd={() => navigation.goBack()} px={'4'}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </Center>
        <Center px={'4'}>
          <Pressable onPress={handleUploadPhoto}>
            <Text fontSize={'lg'} fontWeight={'bold'} color={'#ef4444'}>POST</Text>
          </Pressable>
        </Center>
      </Flex>
      {
        postLoading ? (
          <Flex>
            <Modal isOpen={postLoading} pb={100}>
              <Modal.Content maxWidth="400px">
                <Modal.Body>
                  <Center py={10}>
                    <Flex alignItems={'center'} width={'full'} height={'20'} mb={'4'}>
                      <Image mb={2} resizeMode={'contain'} height={'20'} source={require('../assets/loading.gif')} alt={'alternate'} />
                      <Text fontSize={'lg'}>Posting..</Text>
                    </Flex>
                  </Center>
                </Modal.Body>
              </Modal.Content>
            </Modal>
          </Flex>

        ) : null
      }
      {
        showModalNotFood ? (
          <Flex>
            <Modal isOpen={showModalNotFood} onClose={() => setShowModalNotFood(false)} size="lg" pb={100}>
              <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Body>
                  <Center py={10}>
                    <Flex alignItems={'center'} width={'full'} height={'40'} mb={'4'}>
                      <Image mb={1} resizeMode={'contain'} height={'24'} source={require('../assets/robot.png')} alt={'alternate'} />
                      <Text fontSize={'2xl'} fontWeight={'bold'} mb={1} color={'muted.900'}>Ooops..</Text>
                      <Text fontSize={'lg'} textAlign={'center'} color={'muted.700'}>Our app detect that some of your images are not related to food...</Text>
                    </Flex>
                  </Center>
                </Modal.Body>
              </Modal.Content>
            </Modal>
          </Flex>
        ) : null
      }
      <ScrollView>
        {/* Images */}
        <Box width={'full'} height={'80'} px={'4'} pt={'4'} mb={'4'}>
          <Flex
            justifyContent={'space-between'}
            width={'full'}
            height={'full'}
            bg={'gray.100'}
            borderRadius={'lg'}
          >
            <Box height={'5/6'} p={'4'}>
              <Flex
                direction="row"
                wrap="wrap"
                alignItems={'center'}
                justifyContent={'center'}
                height={'full'}
              >
                {image ? (
                  image.map((el, i) => (
                    <Box key={i} mx={'2'} mt={'2'} shadow={'5'}>
                      <Center
                        onTouchEnd={() => handleCancelImage(el)}
                        position={'absolute'}
                        zIndex={10}
                        right={'0'}
                        size={'10'}
                      >
                        <Feather name="delete" size={24} color="white" />
                      </Center>
                      <Image
                        source={{ uri: el }}
                        width={100}
                        height={100}
                        borderRadius={'lg'}
                        alt={'alternate'}
                      />
                    </Box>
                  ))
                ) : (
                  <Center
                    bg={'gray.400'}
                    width={'80'}
                    height={'16'}
                    position={'absolute'}
                    top={'40%'}
                    borderRadius={'lg'}
                  >
                    <Text color={'white'} fontWeight={'bold'} fontSize={'md'}>
                      Pick an Image
                    </Text>
                  </Center>
                )}
              </Flex>
            </Box>
            <AddButton />
          </Flex>
        </Box>

        {/* Place Search */}
        {
          pickedPlace ? null : (
            <Box width={'full'} height={'20'} px={'4'} pt={'4'}>
              <Flex alignItems={'center'} direction='row' width={'full'} height={'full'} bg={'gray.100'} px="2" py={'1'} borderRadius={'lg'}>
                {
                  place || foundPlaces.length > 0 ? (
                    <Center
                      onTouchEnd={handleClearSearch}
                      position={'absolute'}
                      zIndex={10}
                      right={'24'}
                      bottom={'1'}
                      height={'full'}
                    >
                      <Text color={'red.500'}>Clear Search</Text>
                    </Center>
                  ) : null
                }
                <Input onChangeText={handlePlaceInputChange} value={place} width={'5/6'} height={'5/6'} bg={'white'} borderWidth={'0'} borderRadius={'none'} borderLeftRadius={'md'} fontSize={'md'} placeholder={'Search a place..'}></Input>
                <Pressable onPress={handleSearchPlace} width={'1/6'} height={'5/6'} bg={'#ef4444'} _pressed={{
                  bg: 'rgba(190, 89, 96, 0.70)'
                }} borderRightRadius={'md'}>
                  <Center width={'full'} height={'full'}>
                    <Text fontSize={'md'} fontWeight={'bold'} color={'white'}>Search</Text>
                  </Center>
                </Pressable>
              </Flex>
            </Box>
          )
        }

        {/* Place List */}
        <Flex width={'full'} px={'4'} pt={'4'} mb={'4'}>
          {
            pickedPlace ? (
              (
                <Flex direction='row' width={'full'} height={'20'} mt={'2'} mb={'4'} borderBottomWidth={'1'}>
                  <Center
                    onTouchEnd={() => handleClearPlaceSearch()}
                    position={'absolute'}
                    zIndex={10}
                    right={'0'}
                    size={'10'}
                  >
                    <Feather name="delete" size={24} color="black" />
                  </Center>
                  <Box>
                    <Image borderRadius={'lg'} width={'16'} height={'16'} source={{
                      uri: pickedPlace.photoRef
                    }} alt={'alternate'} />
                  </Box>
                  <Box ml={'4'} mt={'4'}>
                    <Text fontWeight={'bold'}>{pickedPlace.place.name}</Text>
                    <Text>{pickedPlace.place.address.slice(0, 50)}</Text>
                  </Box>
                </Flex >
              )
            ) : (
              foundPlaces.length > 0 && loadingPlaces === false ? foundPlaces.map((el, i) => {

                let photoRef = '';

                if (el.photo_reference) {
                  photoRef = `https://hacktiv8-instafood.herokuapp.com/places/photo?ref=${el.photo_reference}`;
                } else {
                  photoRef = el.icon
                }

                return (
                  <Pressable onPress={() => handlePickPlace({
                    photoRef, place: el
                  })} key={i} _pressed={{
                    bg: 'gray.100'
                  }} height={'20'} borderBottomWidth={'1'}>
                    <Flex direction='row' width={'full'} height={'20'} my={'2'}>
                      <Box>
                        <Image borderRadius={'lg'} width={'16'} height={'16'} source={{
                          uri: photoRef
                        }} alt={'alternate'} />
                      </Box>
                      <Box ml={'4'} mt={'4'}>
                        <Text fontWeight={'bold'}>{el.name}</Text>
                        <Text>{el.address.slice(0, 50)}</Text>
                      </Box>
                    </Flex >
                  </Pressable>
                )

              }) : (
                loadingPlaces ? (
                  <Flex alignItems={'center'} width={'full'} height={'20'} mb={'4'}>
                    <Image resizeMode={'contain'} height={'20'} source={require('../assets/loading.gif')} alt={'alternate'} />
                    <Text fontSize={'md'}>Searching places..</Text>
                  </Flex>
                ) : null
              )
            )
          }
        </Flex>

        {/* Caption */}
        <Box width={'full'} height={'32'} px={'4'} mb={'4'}>
          <Box alignItems="center" w="full" bg={'gray.100'} borderRadius={'lg'} p={'2'}>
            <TextArea h={'full'} placeholder="Write your post caption here.." w="full" borderWidth={'0'} fontSize={'md'} bg={'white'} value={caption} onChangeText={handleCaptionChange} />
            {
              caption ? (
                <Center
                  onTouchEnd={handleClearCaption}
                  position={'absolute'}
                  zIndex={10}
                  right={'3'}
                  bottom={'0'}
                  size={'10'}
                >
                  <Text color={'red.500'}>Clear</Text>
                </Center>
              ) : null
            }
          </Box>
        </Box>

        {/* Tags */}
        <Box width={'full'} height={'20'} px={'4'} pt={'4'}>
          <Flex alignItems={'center'} direction='row' width={'full'} height={'full'} bg={'gray.100'} px="2" py={'1'} borderRadius={'lg'}>
            <Input onChangeText={handleTagInputChange} value={tag} width={'5/6'} height={'5/6'} bg={'white'} borderWidth={'0'} borderRadius={'none'} borderLeftRadius={'md'} fontSize={'md'} placeholder={'(Optional) Add tags..'}></Input>
            <Pressable onPress={handleAddTag} width={'1/6'} height={'5/6'} bg={'#ef4444'} _pressed={{
              bg: 'rgba(190, 89, 96, 0.70)'
            }} borderRightRadius={'md'}>
              <Center width={'full'} height={'full'}>
                <Text fontSize={'md'} fontWeight={'bold'} color={'white'}>Add</Text>
              </Center>
            </Pressable>
          </Flex>
        </Box>

        {/* Tag List */}
        <Box width={windowWidth} height={'20'} px={'4'} pt={'4'} >
          <Flex direction='row' wrap='wrap'>
            <ScrollView horizontal>
              {
                tags.length > 0 ? tags.map((el, i) => (
                  <Flex direction='row' justifyContent={'center'} alignItems={'center'} minHeight={'12'} key={i} bg={'gray.100'} mr={'3'} mb={'3'} p={'4'} borderRadius={'md'}>
                    <Text mr={'1'} fontSize={'md'}>#{el}</Text>
                    <Center
                      onTouchEnd={() => handleCancelTag(el)}
                      size={'6'}
                    >
                      <Feather name="delete" size={20} color="black" />
                    </Center>
                  </Flex>
                )) : null
              }
            </ScrollView>
          </Flex>
        </Box>
      </ScrollView>
    </Box >
  );
}
