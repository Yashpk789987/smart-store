import React from 'react';
import {Dimensions} from 'react-native';
import {
  Text,
  Button,
  Container,
  Content,
  Left,
  Right,
  Body,
  Icon,
} from 'native-base';
import {connect} from 'react-redux';
import MapView, {Marker} from 'react-native-maps';
import {updateLocation, moveToFourthStep} from '../../../actions/shop';

class Screen3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      },
    };
  }

  componentDidMount = async () => {
    navigator.geolocation.getCurrentPosition(
      async position => {
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        };
        let res = await fetch(
          'https://maps.googleapis.com/maps/api/geocode/json?address=' +
            region.latitude +
            ',' +
            region.longitude +
            '&key=' +
            'AIzaSyBRYqiA-p-B_zdWU5N4ac7DgEDWFWmZFlM',
        );
        let data = await res.json();
        let address = data.results[0].formatted_address;

        this.props.updateLocation(region, address);
        this.setState({
          region: region,
          loading: false,
          error: null,
        });
      },
      error => {
        alert(error);
        this.setState({
          error: error.message,
          loading: false,
        });
      },
      {enableHighAccuracy: false, timeout: 200000, maximumAge: 5000},
    );
  };

  onRegionChange = region => {
    this.setState({region});
  };

  render() {
    let height = Dimensions.get('screen').height;
    return (
      <Container style={{height: height}}>
        <MapView
          liteMode={true}
          showsUserLocation={false}
          style={{height: height * 0.57}}
          region={this.props.region}
          onRegionChange={this.onRegionChange}>
          <Marker
            coordinate={{
              latitude: this.props.region.latitude,
              longitude: this.props.region.longitude,
            }}
            title={this.props.address.split(',')[0]}
            description={this.props.address}
          />
        </MapView>
        <Button
          onPress={() => this.props.moveToFourthStep()}
          large
          success
          style={{
            height: height * 0.07,
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
        <Button
          onPress={() => this.props.navigation.navigate('AddressPicker')}
          style={{
            marginTop: '1%',
            backgroundColor: '#5cb85c',
            height: height * 0.07,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
            Choose Location
          </Text>
        </Button>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    shop: state.shop,
    region: state.shop.shopOwner.region,
    address: state.shop.shopOwner.address,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateLocation: (region, address) =>
      dispatch(updateLocation(region, 'Your Present Location')),
    moveToFourthStep: () => dispatch(moveToFourthStep()),
  };
}

Screen3 = connect(mapStateToProps, mapDispatchToProps)(Screen3);
export default Screen3;
