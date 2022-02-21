import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Navbar from '../components/Navbar';
import UserPost from '../components/UserPost';
import PostButton from '../components/PostButton';
import { useNavigation } from '@react-navigation/native';

export default function OtherUserProfile() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Navbar />
      </View>
      <View>
        <ScrollView>
          <View style={styles.profileContainer}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
                style={{ width: '43%', paddingHorizontal: 12 }}
              >
                <Ionicons name="arrow-back" size={34} color="#929292" />
              </TouchableOpacity>
              <Text style={styles.myProfileText}>Profile</Text>
            </View>
            <View style={{ alignItems: 'center', marginVertical: 10 }}>
              <Image
                style={styles.profilePic}
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/236/236832.png',
                }}
              />
              <Text style={styles.profileName}>Dummy</Text>
              <Text style={{ color: 'gray' }}>dummy@email.com</Text>
            </View>
            <View style={styles.post}>
              <View style={{ width: '35%' }}>
                <Text style={{ alignSelf: 'center', fontSize: 16 }}>Posts</Text>
                <Text style={styles.postsCount}>100</Text>
              </View>
              <View style={{ width: '35%' }}>
                <Text style={{ alignSelf: 'center', fontSize: 16 }}>
                  Liked Posts
                </Text>
                <Text style={styles.likesCount}>100</Text>
              </View>
            </View>
          </View>
          <View style={styles.postsTextContainer}>
            <View>
              <Text style={styles.postsText}>Posts</Text>
            </View>
          </View>
          <ScrollView horizontal={true} style={{ marginBottom: 80 }}>
            <UserPost />
          </ScrollView>
        </ScrollView>
      </View>
      <PostButton />
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
  profileContainer: {
    marginTop: 10,
    backgroundColor: 'white',
    flexDirection: 'column',
    paddingBottom: 20,
    width: '100%',
    borderBottomWidth: 2,
    borderColor: '#E1E1E1',
  },
  profilePic: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 100 / 2,
    borderWidth: 1,
    borderColor: '#D1D1D1',
  },
  myProfileText: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 8,
  },
  post: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    paddingTop: 5,
  },
  postsCount: {
    alignSelf: 'center',
    paddingVertical: 6,
    fontSize: 20,
    fontWeight: 'bold',
  },
  likesCount: {
    alignSelf: 'center',
    paddingVertical: 6,
    fontSize: 20,
    fontWeight: 'bold',
  },
  postsTextContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    marginTop: 5,
    marginBottom: 15,
  },
  postsText: {
    fontSize: 24,
    fontWeight: 'bold',
    alignItems: 'center',
  },
});
