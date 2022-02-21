import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Box } from 'native-base';

export default function TrendingPlacesCard({ places }) {
  const [placeDetails, setPlaceDetails] = useState('');
  const [placeImages, setPlaceImages] = useState('');
  useEffect(() => {
    fetch(`https://hacktiv8-instafood.herokuapp.com/places/${places.place_id}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject('something went wrong!');
        }
      })
      .then(response => {
        setPlaceDetails(response);
      })
      .catch(error => {
        console.log('error', error);
      });
  }, []);

  return (
    <Box>
      <TouchableOpacity style={styles.cardContainer}>
        <Image
          style={styles.imageStyle}
          source={{
            uri: `https://hacktiv8-instafood.herokuapp.com/places/photo?ref=${placeDetails.photos[0]}`,
          }}
        />
        <View style={styles.bottomTextContainer}>
          <Box
            style={{
              position: 'absolute',
              bottom: 0,
              alignSelf: 'center',
              height: 150,
              width: '100%',
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
            }}
            bg={{
              linearGradient: {
                colors: ['black', 'transparent'],
                start: [0, 1],
                end: [0, 0],
              },
            }}
          />
          <Text style={styles.textStyle}>{placeDetails.name}</Text>
        </View>
      </TouchableOpacity>

    </Box>




  );
}

const styles = StyleSheet.create({
  cardContainer: { height: 240, width: 232, marginLeft: 10, borderRadius: 10 },
  imageStyle: {
    height: 240,
    width: 232,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  bottomTextContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    alignSelf: 'center',
    borderRadius: 6,
    width: '100%',
  },
  textStyle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 3,
    bottom: 17,
    left: 6,
  },
});
