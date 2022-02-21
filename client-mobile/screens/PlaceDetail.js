import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Input, Icon, Stack, Center, Button } from 'native-base';
import NavbarForPlaceDetail from '../components/NavbarForPlaceDetail';
const windowWidth = Dimensions.get('window').width;
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import TrendingPost2 from '../components/Post';

const images = [
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  'https://images.unsplash.com/photo-1585518419759-7fe2e0fbf8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80',
  'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
];

export default function PlaceDetail() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <NavbarForPlaceDetail />
      </View>
      <ScrollView>
        <View>
          <ScrollView>
            <View style={styles.placeContainer}>
              <View
                style={{
                  backgroundColor: 'white',
                  paddingHorizontal: 16,
                  paddingBottom: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={styles.placeDetailName}>Kitchen & Coffee</Text>
                <Image
                  source={{
                    uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
                  }}
                  style={{
                    width: 33,
                    height: 33,
                    resizeMode: 'contain',
                    marginVertical: 6,
                  }}
                />
              </View>
              <View style={{ flex: 1, backgroundColor: 'white' }}>
                <SwiperFlatList
                  autoplay
                  autoplayDelay={6}
                  autoplayLoop
                  index={0}
                  showPagination
                  paginationStyle={{ height: 13 }}
                  paginationStyleItem={{
                    width: 10,
                    height: 10,
                    borderRadius: 10 / 2,
                    marginHorizontal: 6,
                  }}
                  data={images}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        width: windowWidth,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Image
                        style={{
                          width: windowWidth * 0.93,
                          height: 320,
                          resizeMode: 'cover',
                          borderRadius: 13,
                        }}
                        source={{
                          uri: item,
                        }}
                      />
                    </View>
                  )}
                />
              </View>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 5,
                  paddingTop: 12,
                  flexDirection: 'row',
                }}
              >
                <Ionicons
                  name="location-sharp"
                  size={34}
                  color="#929292"
                  style={{ paddingHorizontal: 10 }}
                />
                <Text style={{ fontSize: 17, paddingTop: 5 }}>
                  16, Jl. Denpasar Raya No.109, RT.16/RW.4...
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            paddingBottom: 20,
            backgroundColor: 'white',
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
            Related Posts
          </Text>
        </View>
        {/* 
        {
          posts.map((post) => (
            <TrendingPost2 post={post} key={post.id} />
          ))
        } */}
      </ScrollView>
    </SafeAreaView>
  );
}

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

const posts = [
  {
    id: 1,
    imageUrl: [
      'https://images.pexels.com/photos/3779791/pexels-photo-3779791.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80',
      'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80',
    ],
    user: {
      name: 'Bambang',
      profilePicture:
        'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651__340.png',
    },
    likes: 781019389,
    place: 'Pizza Hut',
    createdAt: 'February 16, 2022',
    caption: 'Enak bangett!',
    comments: [
      {
        user: 'Daniel',
        comment: 'Bener bangett!',
      },
      {
        user: 'Devina',
        comment: 'Setuju!',
      },
      {
        user: 'Rafi',
        comment: 'Harus coba sih..',
      },
      {
        user: 'Bima',
        comment: 'Jadi pengen..',
      },
    ],
  },
  {
    id: 2,
    imageUrl: [
      'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80',
      'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80',
      'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80',
      'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80',
    ],
    user: {
      name: 'Jefri',
      profilePicture:
        'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651__340.png',
    },
    likes: 7810,
    place: 'Holy Cow',
    createdAt: 'February 12, 2022',
    caption: 'Enak bangett!',
    comments: [
      {
        user: 'Daniel',
        comment: 'Bener bangett!',
      },
      {
        user: 'Devina',
        comment: 'Setuju!',
      },
      {
        user: 'Rafi',
        comment: 'Harus coba sih..',
      },
      {
        user: 'Bima',
        comment: 'Jadi pengen..',
      },
    ],
  },
];
