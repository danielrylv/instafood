import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from '../components/Navbar';
import TrendingPlacesCard from '../components/TrendingPlacesCard';
import TrendingTags from '../components/TrendingTags';
import PostButton from '../components/PostButton';
import TrendingPost2 from '../components/TrendingPost2';

export default function Highlights() {
  const [trendPlaces, setTrendingPlaces] = useState([]);

  useEffect(() => {
    fetch('https://hacktiv8-instafood.herokuapp.com/trending/places')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject('something went wrong!');
        }
      })
      .then(response => {
        setTrendingPlaces(response);
      })
      .catch(error => {
        console.log('error', error);
      });
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Navbar />
      </View>
      <ScrollView>
        <View style={styles.trendingPlaces}>
          <View>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
              Trending Places
            </Text>
          </View>
          {/* <TouchableOpacity style={{ marginRight: 5, marginTop: 5 }}>
            <Text style={{ color: '#FF8F00', fontSize: 18 }}>see all</Text>
          </TouchableOpacity> */}
        </View>
        <View
          style={{ backgroundColor: 'white', height: 260, paddingVertical: 10 }}
        >
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingEnd: 13 }}>
            {trendPlaces.length > 0 ?
              trendPlaces.map((places, index) => (
                <TrendingPlacesCard places={places} key={index} />
              )) : null
            }
          </ScrollView>
        </View>
        <View style={styles.trendingTags}>
          <View>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
              Trending Tags
            </Text>
          </View>
          {/* <TouchableOpacity style={{ marginRight: 5, marginTop: 5 }}>
            <Text style={{ color: '#FF8F00', fontSize: 18 }}>see all</Text>
          </TouchableOpacity> */}
        </View>
        <View style={{ backgroundColor: 'white', height: 65, marginBottom: 7 }}>
          <TrendingTags />
        </View>
        <View style={styles.trendingPosts}>
          <View>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
              Trending Posts
            </Text>
          </View>
          {/* <TouchableOpacity style={{ marginRight: 5, marginTop: 5 }}>
            <Text style={{ color: '#FF8F00', fontSize: 18 }}>see all</Text>
          </TouchableOpacity> */}
        </View>

        <View style={styles.trendingPostContainer}>
          {posts.map(post => (
            <TrendingPost2 post={post} key={post.id} />
          ))}
        </View>
      </ScrollView>
      <PostButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  trendingPlaces: {
    marginTop: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  trendingPostContainer: {
    width: '100%',
    backgroundColor: 'white',
  },
  trendingTags: {
    marginTop: 12,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  trendingPosts: {
    marginTop: 6,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 15,
  },
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
