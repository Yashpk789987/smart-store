import React, {useEffect} from 'react';
import {Text} from 'react-native';

export default function Home(props) {
  useEffect(() => {
    props.navigation.replace('Register');
  });
  return <Text style={{color: 'black'}}>Home</Text>;
}
