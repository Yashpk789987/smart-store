import React, {useEffect} from 'react';

import {Text} from 'react-native';

export default function LoadingScreen(props) {
  useEffect(() => {
    props.navigation.navigate('Register');
  });
  return <Text>Loading ... </Text>;
}
