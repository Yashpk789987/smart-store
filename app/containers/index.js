import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import LaunchingScreen from './LaunchingScreen';
import Shop from './Shop';
import DeliveryBoy from './DeliveryBoy';
import User from './User';

const StackNavigator = createStackNavigator(
  {
    Home: {
      screen: LaunchingScreen,
    },
    Shop: {
      screen: Shop,
    },
    DeliveryBoy: {
      screen: DeliveryBoy,
    },
    User: {
      screen: User,
    },
  },
  {
    headerMode: 'none',
  },
);

const App = createAppContainer(StackNavigator);

export default App;
