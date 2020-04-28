import React, {useState, useEffect} from 'react';
import {
  Text,
  Container,
  Content,
  Item,
  Input,
  Form,
  Label,
  Button,
  Body,
  Right,
  Icon,
  Left,
} from 'native-base';
import {connect} from 'react-redux';

import {TextInput} from 'react-native-paper';

import {moveToSecondStep} from '../../../actions/shop';

function Screen1(props) {
  let [shopName, setShopName] = useState('');
  let [ownerName, setOwnerName] = useState('');
  let [message, setMessage] = useState('');
  const submitBasicDetails = () => {
    if (shopName === '' || ownerName === '') {
      setMessage('Please Fill All Fields');
    } else {
      setMessage('');
      props.moveToSecondStep(shopName, ownerName);
    }
  };

  return (
    <Content>
      <Text style={{textAlign: 'center', paddingTop: '5%'}}>Basic Details</Text>
      <Form style={{paddingTop: '10%', paddingLeft: '5%', paddingRight: '5%'}}>
        <TextInput
          value={shopName}
          onChangeText={text => setShopName(text)}
          label="SHOP NAME"
          mode="outlined"
          style={{width: '100%', paddingBottom: '5%', paddingTop: '5%'}}
        />
        <TextInput
          value={ownerName}
          onChangeText={text => setOwnerName(text)}
          label="OWNER NAME"
          mode="outlined"
          style={{width: '100%', paddingBottom: '5%', paddingTop: '5%'}}
        />
        <Button
          onPress={submitBasicDetails}
          large
          success
          style={{
            flex: 0.1,
            marginTop: '5%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Body>
            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
              Next
            </Text>
          </Body>
          <Right>
            <Icon
              name="arrow-forward"
              style={{color: 'white', paddingRight: '10%'}}
            />
          </Right>
        </Button>
        <Text style={{color: 'red'}}>{message}</Text>
      </Form>
    </Content>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    moveToSecondStep: (shopName, ownerName) =>
      dispatch(moveToSecondStep(shopName, ownerName)),
  };
}

function mapStateToProps(state) {
  return {shopOwner: state.shop.shopOwner};
}

Screen1 = connect(mapStateToProps, mapDispatchToProps)(Screen1);
export default Screen1;
