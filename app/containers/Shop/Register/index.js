import React, {useEffect, useRef} from 'react';
import {TouchableOpacity, BackHandler, View} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import AddressPicker from './AddressPicker';
import {connect} from 'react-redux';
import {
  Header,
  Title,
  Left,
  Right,
  Icon,
  Body,
  Text,
  Container,
} from 'native-base';

import Screen1 from './Screen1';
import Screen2 from './Screen2';
import Screen3 from './Screen3';
import Screen4 from './Screen4';
import ViewPager from '@react-native-community/viewpager';
import Wizard from './Wizard';

function Index(props) {
  let pager = useRef(null);
  useEffect(() => {
    if (pager !== null) {
      pager.setPage(props.wizardStep);
    }
  });
  return (
    <Container>
      <Header style={{backgroundColor: '#5cb85c'}}>
        <Left>
          <TouchableOpacity onPress={() => BackHandler.exitApp()}>
            <Icon style={{color: 'white'}} name="arrow-back" />
          </TouchableOpacity>
        </Left>
        <Body>
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            Vendor Registration
          </Text>
        </Body>
      </Header>
      <View style={{paddingTop: '5%'}}>
        <Wizard />
      </View>
      <ViewPager
        ref={page => {
          pager = page;
        }}
        scrollEnabled={false}
        style={{flex: 1}}
        initialPage={0}>
        <Screen1 />
        <Screen2 />
        <Screen3 navigation={props.navigation} />
        <Screen4 />
      </ViewPager>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    wizardStep: state.shop.shopOwner.wizardStep,
  };
}

function dispatchToProps(dispatch) {
  return {
    moveToSecondStep: () =>
      dispatch({type: 'MOVE_TO_SECOND_STEP', currentIndex: 1}),
  };
}

Index = connect(mapStateToProps, dispatchToProps)(Index);

const RegisterStackNavigator = createStackNavigator(
  {
    Index: {
      screen: Index,
    },
    AddressPicker: {
      screen: AddressPicker,
    },
  },
  {
    headerMode: 'none',
  },
);

export default RegisterStackNavigator;
