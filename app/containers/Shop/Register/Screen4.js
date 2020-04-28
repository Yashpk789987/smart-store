import React, {useState, useEffect} from 'react';
import {Text, View, Icon, Content, Button, Body} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import {connect} from 'react-redux';
import {TouchableOpacity, Image} from 'react-native';
import {register} from '../../../actions/shop';
function Screen4(props) {
  let [adhar, setAdhar] = useState('');
  let [shopLicense, setShopLicense] = useState('');
  function openImagePicker(type) {
    ImagePicker.openPicker({
      width: 345,
      height: 250,
      cropping: true,
    }).then(image => {
      console.log(image);
      if (type === 'shopLicense') {
        setShopLicense(image);
      } else if (type === 'adhar') {
        setAdhar(image);
      }
    });
  }
  return (
    <View>
      <Content>
        <TouchableOpacity
          style={{paddingTop: '10%', paddingRight: '2%', paddingLeft: '2%'}}
          onPress={() => openImagePicker('adhar')}>
          <Text style={{textAlign: 'center', marginBottom: '5%'}}>
            ADHAR CARD
          </Text>
          {adhar === '' ? (
            <View
              style={{
                height: 250,
                width: 345,
                borderStyle: 'dashed',
                borderWidth: 5,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon style={{fontSize: 150}} name="add" />
              <Text>Tap To Choose Image</Text>
            </View>
          ) : (
            <Image
              source={{uri: adhar.path}}
              style={{
                height: 250,
                width: 345,
              }}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{paddingTop: '10%', paddingRight: '2%', paddingLeft: '2%'}}
          onPress={() => openImagePicker('shopLicense')}>
          <Text style={{textAlign: 'center', marginBottom: '5%'}}>
            Shop License
          </Text>
          {shopLicense === '' ? (
            <View
              style={{
                height: 250,
                width: 345,
                borderStyle: 'dashed',
                borderWidth: 5,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon style={{fontSize: 150}} name="add" />
              <Text>Tap To Choose File</Text>
            </View>
          ) : (
            <Image
              source={{uri: shopLicense.path}}
              style={{
                height: 250,
                width: 345,
              }}
            />
          )}
        </TouchableOpacity>
        <Button
          onPress={() => props.register(props.shopOwner)}
          large
          success
          style={{
            flex: 0.1,
            marginTop: '5%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Body>
            <Text
              style={{
                color: 'white',
                marginTop: '5%',
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              Register
            </Text>
          </Body>
        </Button>
      </Content>
    </View>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    register: data => dispatch(register(data)),
  };
}

function mapStateToProps(state) {
  return {
    shopOwner: state.shop.shopOwner,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Screen4);
