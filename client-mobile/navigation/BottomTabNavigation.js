import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Highlights from '../screens/Highlights';
import Discover from '../screens/Discover';
import Profile from '../screens/Profile';
import Login from '../screens/LoginPage';
import CommentSection from '../screens/CommentSection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PostDetail from '../screens/PostDetail';
import OtherUserProfile from '../screens/OtherUserProfile';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  const { access_token } = useSelector(state => state.user);
  const [token, setToken] = useState(null);

  const checkAccessToken = async () => {
    try {
      return await AsyncStorage.getItem('access_token');
    } catch (e) {
      return 'error reading access_token';
    }
  };

  useEffect(() => {
    checkAccessToken()
      .then(access_token => {
        setToken(access_token);
      })
      .catch(err => {
        console.log(err);
      });
  }, [access_token, token]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Highlights') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Discover') {
            iconName = focused ? 'ios-search' : 'ios-search';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Login') {
            iconName = focused ? 'ios-log-in' : 'ios-log-in-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ef4444',
        tabBarInactiveTintColor: '#616161',
        tabBarHideOnKeyboard: true,
        tabBarStyle: { paddingBottom: 5, height: 60 },
      })}
    >
      <Tab.Screen
        name="Highlights"
        component={Highlights}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{ headerShown: false }}
      />

      {token ? (
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
      ) : (
        <Tab.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
      )}
    </Tab.Navigator>
  );
}
