import React, {Component} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  Button,
  StyleSheet,
  Dimensions,
  Animated,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {updateLocation} from '../../../actions/shop';
import {connect} from 'react-redux';

import {
  Item,
  Icon,
  Input,
  ActionSheet,
  Button as Button_,
  Content,
  Root,
  List,
  ListItem,
  Body,
  Form,
} from 'native-base';
import MapView from 'react-native-maps';
const AnimatedIcon = Animated.createAnimatedComponent(Icon);
class AddressPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      region: {
        latitude: 10,
        longitude: 10,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      },
      isHeightAnimating: false,
      isMapReady: false,
      marginTop: 1,
      userLocation: '',
      regionChangeProgress: false,
      candidates: [],
      typing: false,
    };
    this.textInputRef = React.createRef();
  }

  changeRegion = (lat, lng) => {
    this.decreaseHeightOfContainer();
    const region = {
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.0035,
      longitudeDelta: 0.0035,
    };
    this.setState({
      region: region,
      loading: false,
      error: null,
    });
  };

  increasedHeightOfContainer = async () => {
    await this.setState({isHeightAnimating: true});
    Animated.parallel([
      Animated.timing(this.bottomContainerHeight, {
        toValue: 200,
        timing: 500,
      }),
      Animated.timing(this.changeTextOpacity, {
        toValue: 1,
        timing: 500,
      }),
      Animated.timing(this.wrongButtonOpacity, {
        toValue: 1,
        timing: 500,
      }),
      Animated.timing(this.InputBoxHeight, {
        toValue: 1,
        timing: 500,
      }),
      Animated.timing(this.ListContainerHeight, {
        toValue: 1,
        timing: 500,
      }),
    ]).start();
  };

  decreaseHeightOfContainer = async () => {
    Keyboard.dismiss();
    Animated.parallel([
      Animated.timing(this.bottomContainerHeight, {
        toValue: 0,
        timing: 500,
      }),
      Animated.timing(this.changeTextOpacity, {
        toValue: 0,
        timing: 500,
      }),
      Animated.timing(this.wrongButtonOpacity, {
        toValue: 0,
        timing: 500,
      }),
      Animated.timing(this.InputBoxHeight, {
        toValue: 0,
        timing: 500,
      }),
      Animated.timing(this.ListContainerHeight, {
        toValue: 0,
        timing: 500,
      }),
    ]).start(async () => {
      await this.setState({isHeightAnimating: false});
    });
  };

  componentWillMount() {
    (this.bottomContainerHeight = new Animated.Value(0)),
      (this.changeTextOpacity = new Animated.Value(0)),
      (this.wrongButtonOpacity = new Animated.Value(0));
    this.InputBoxHeight = new Animated.Value(0);
    this.ListContainerHeight = new Animated.Value(0);
    navigator.geolocation.getCurrentPosition(
      position => {
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0035,
          longitudeDelta: 0.0035,
        };
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
  }

  onChangeClick = () => {};

  onMapReady = () => {
    this.setState({isMapReady: true, marginTop: 0});
  };

  fetchAddressOnInputChange = text => {
    this.setState({typing: true});
    fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${text}&inputtype=textquery&fields=formatted_address,geometry&key=AIzaSyBRYqiA-p-B_zdWU5N4ac7DgEDWFWmZFlM`,
    )
      .then(res => res.json())
      .then(data => {
        this.setState({candidates: data.candidates, typing: false});
      })
      .catch(err => console.log(err));
  };

  fetchAddress = () => {
    fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        this.state.region.latitude +
        ',' +
        this.state.region.longitude +
        '&key=' +
        'AIzaSyBRYqiA-p-B_zdWU5N4ac7DgEDWFWmZFlM',
    )
      .then(response => response.json())
      .then(responseJson => {
        const userLocation = responseJson.results[0].formatted_address;
        this.setState({
          userLocation: userLocation,
          regionChangeProgress: false,
        });
      });
  };

  onRegionChange = region => {
    this.setState(
      {
        region,
        regionChangeProgress: true,
      },
      () => this.fetchAddress(),
    );
  };

  onLocationSelect = () => {
    this.props.updateLocation(this.state.region, this.state.userLocation);
    this.props.navigation.goBack();
  };

  render() {
    let height = Dimensions.get('screen').height;
    const bottomContainerHeight = this.bottomContainerHeight.interpolate({
      inputRange: [0, 200],
      outputRange: [150, height * 0.8],
    });

    const changeTextOpacity = this.changeTextOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });

    const animatedFontSize = this.changeTextOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 0],
    });

    const textHeight = this.changeTextOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 0],
    });

    const wrongButtonOpacity = this.wrongButtonOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    const InputBoxHeight = this.InputBoxHeight.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 70],
    });

    const ListContainerHeight = this.ListContainerHeight.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 500],
    });

    if (this.state.loading) {
      return (
        <View style={styles.spinnerView}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={{flex: 2}}>
            {!!this.state.region.latitude && !!this.state.region.longitude && (
              <MapView
                style={{...styles.map, marginTop: this.state.marginTop}}
                initialRegion={this.state.region}
                region={this.state.region}
                showsUserLocation={true}
                onMapReady={this.onMapReady}
                onRegionChangeComplete={this.onRegionChange}></MapView>
            )}

            <View style={styles.mapMarkerContainer}>
              <Icon
                name="pin"
                style={{
                  color: '#ad1f1f',
                  fontSize: 40,
                }}
              />
            </View>
          </View>
          <Animated.View
            style={[
              styles.deatilSection,
              {
                height: this.state.isHeightAnimating
                  ? bottomContainerHeight
                  : null,
              },
            ]}>
            <View
              style={{
                flex: 0.1,
                height: 30,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  fontFamily: 'roboto',
                }}>
                Move map for location
              </Text>

              <Animated.View>
                <TouchableWithoutFeedback
                  onPress={() =>
                    this.state.isHeightAnimating
                      ? this.decreaseHeightOfContainer()
                      : this.increasedHeightOfContainer()
                  }>
                  <Animated.View>
                    <AnimatedIcon
                      name="close"
                      size={60}
                      style={{opacity: wrongButtonOpacity}}
                    />
                  </Animated.View>
                </TouchableWithoutFeedback>
              </Animated.View>
            </View>
            <Animated.View
              style={{
                height: InputBoxHeight,
                opacity: wrongButtonOpacity,
              }}>
              <Form>
                <Item>
                  <Icon active name="search" />
                  <Input
                    ref={this.textInputRef}
                    onChangeText={text => {
                      this.fetchAddressOnInputChange(text);
                    }}
                    placeholder="Search Location"
                  />
                </Item>
              </Form>
            </Animated.View>
            <Animated.View
              style={{
                height: ListContainerHeight,
                opacity: 1,
              }}>
              {this.state.typing ? (
                <Text
                  style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>
                  Loading...
                </Text>
              ) : (
                <></>
              )}
              <ScrollView keyboardShouldPersistTaps="handled">
                {this.state.candidates.length === 0 ? (
                  <></>
                ) : (
                  this.state.candidates.map((item, index) => {
                    return (
                      <TouchableWithoutFeedback
                        onPress={() => {
                          this.changeRegion(
                            item.geometry.location.lat,
                            item.geometry.location.lng,
                          );
                        }}>
                        <ListItem style={{width: '100%'}}>
                          <Body>
                            <Text style={{fontWeight: 'bold'}}>
                              {item.formatted_address.split(',')[0]}
                            </Text>
                            <Text note>{item.formatted_address}</Text>
                          </Body>
                        </ListItem>
                      </TouchableWithoutFeedback>
                    );
                  })
                )}
              </ScrollView>
            </Animated.View>
            <Animated.View style={{opacity: changeTextOpacity}}>
              <View
                style={{
                  flex: 0.2,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontSize: 10, color: '#999'}}>LOCATION</Text>
                <TouchableWithoutFeedback
                  onPress={() => this.increasedHeightOfContainer()}>
                  <Text style={{color: 'green'}}>Change</Text>
                </TouchableWithoutFeedback>
              </View>
              <View
                style={{
                  flex: 0.1,
                  flexDirection: 'row',
                  opacity: 1,
                }}>
                <Text
                  numberOfLines={2}
                  style={{
                    fontSize: 14,
                    paddingVertical: 5,
                    width: '100%',
                    borderBottomColor: 'black',
                    borderBottomWidth: 0.5,
                  }}>
                  {!this.state.regionChangeProgress
                    ? this.state.userLocation
                    : 'Identifying Location...'}
                </Text>
              </View>
              <View style={styles.btnContainer}>
                <Button
                  title="PICK THIS LOCATION"
                  disabled={this.state.regionChangeProgress}
                  onPress={this.onLocationSelect}></Button>
              </View>
            </Animated.View>
          </Animated.View>
        </View>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    latlng: {
      latitude: state.shop.shopOwner.region.latitude,
      longitude: state.shop.shopOwner.region.longitude,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateLocation: (region, address) =>
      dispatch(updateLocation(region, address)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressPicker);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
  map: {
    flex: 1,
  },
  mapMarkerContainer: {
    left: '47%',
    position: 'absolute',
    top: '45%',
  },
  mapMarker: {
    fontSize: 40,
    color: 'red',
  },
  deatilSection: {
    backgroundColor: '#fff',
    padding: 10,
    bottom: 75,
    position: 'absolute',
  },
  spinnerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    width: Dimensions.get('window').width - 20,
    flex: 1,
    top: 10,
    bottom: 30,
  },
});
