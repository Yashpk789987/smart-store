import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'native-base';

export default function LaunchingScreen(props) {
  return (
    <View
      style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
      <TouchableOpacity onPress={() => props.navigation.replace('Shop')}>
        <Text>Shop</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.replace('DeliveryBoy')}>
        <Text>DeliveryBoy</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.replace('User')}>
        <Text>User</Text>
      </TouchableOpacity>
    </View>
  );
}
