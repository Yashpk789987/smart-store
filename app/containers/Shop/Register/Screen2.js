import React, {useState} from 'react';
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
import {moveToThirdStep} from '../../../actions/shop';

function Screen2(props) {
  let [mobileNo, setMobileNo] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [message, setMessage] = useState('');

  const submitContactDetails = () => {
    if (mobileNo === '' || email === '' || password === '') {
      setMessage('Please Fill All Fields');
    } else {
      setMessage('');
      props.moveToThirdStep(mobileNo, email, password);
    }
  };
  return (
    <Content>
      <Text style={{textAlign: 'center', paddingTop: '5%'}}>
        Contact Details
      </Text>
      <Form style={{paddingTop: '10%', paddingLeft: '5%', paddingRight: '5%'}}>
        <TextInput
          keyboardType={'phone-pad'}
          onChangeText={text => setMobileNo(text)}
          label="Mobile No"
          mode="outlined"
          style={{width: '100%', paddingBottom: '5%', paddingTop: '5%'}}
        />
        <TextInput
          keyboardType={'email-address'}
          onChangeText={text => setEmail(text)}
          label="Email"
          mode="outlined"
          style={{width: '100%', paddingBottom: '5%', paddingTop: '5%'}}
        />
        <TextInput
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
          label="Password"
          mode="outlined"
          style={{width: '100%', paddingBottom: '10%', paddingTop: '5%'}}
        />
        <Button
          onPress={submitContactDetails}
          large
          success
          style={{
            flex: 0.1,
            marginTop: '5%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Left></Left>
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
    moveToThirdStep: (mobileNo, email, password) =>
      dispatch(moveToThirdStep(mobileNo, email, password)),
  };
}

function mapStateToProps(state) {
  return {shopOwner: state.shop.shopOwner};
}

Screen2 = connect(mapStateToProps, mapDispatchToProps)(Screen2);
export default Screen2;
