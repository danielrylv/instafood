import React, { useEffect, useState } from 'react';
import { Box, FlatList, ScrollView, StatusBar, Text } from 'native-base';
import Post from '../components/Post';
import PostButton from '../components/PostButton';
import SearchButton from '../components/SearchButton';
import { useDispatch, useSelector } from 'react-redux';

export default function Discover() {
  const [posts, setPosts] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const { access_token } = useSelector(state => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch('https://hacktiv8-instafood.herokuapp.com/posts')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject('something went wrong!');
        }
      })
      .then(response => {
        setPosts(response.items);
      })
      .catch(error => {
        console.log('error', error);
      });
  }, [access_token]);

  const handleRefresh = () => {
    setRefetch(true);

    fetch('https://hacktiv8-instafood.herokuapp.com/posts')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject('something went wrong!');
        }
      })
      .then(response => {
        setPosts(response.items);
        setRefetch(false);
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  return (
    <Box bg={'white'} flex={1} safeAreaTop>
      <StatusBar />
      <SearchButton />
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post post={item} key={item.id} />}
        keyExtractor={item => item.id}
        refreshing={refetch}
        onRefresh={handleRefresh}
      />
      <PostButton />
    </Box>
  );
}
