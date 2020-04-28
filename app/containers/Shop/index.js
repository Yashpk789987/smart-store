// import React, {useEffect} from 'react';

// import {Text} from 'native-base';

// import {View} from 'react-native';
// import MapContainer from './MapContainer';
// import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
// import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

// const homePlace = {
//   description: 'Home',
//   geometry: {location: {lat: 48.8152937, lng: 2.4597668}},
// };
// const workPlace = {
//   description: 'Work',
//   geometry: {location: {lat: 48.8496818, lng: 2.2940881}},
// };

// import {connect} from 'react-redux';

// function Shop(props) {
//   useEffect(() => {
//     console.log(props.shop);
//   });
//   return (
//     // <MapView
//     //   provider={PROVIDER_GOOGLE}
//     //   style={{flex: 1}}
//     //   region={{
//     //     latitude: 37.78825,
//     //     longitude: -122.4324,
//     //     latitudeDelta: 0.015,
//     //     longitudeDelta: 0.0121,
//     //   }}>
//     //   <Marker
//     //     draggable
//     //     coordinate={{latitude: 37.78825, longitude: -122.4324}}
//     //     onDragEnd={e => console.log(e.nativeEvent.coordinate)}
//     //   />
//     // </MapView>
//     <MapContainer />
//     // <View style={{flex: 1}}>
//     //   <LocationView
//     //     apiKey={'AIzaSyDDR-xoWe0-zL16rALIliha5LBwGOAmMns'}
//     //     initialLocation={{
//     //       latitude: 26.218771951984213,
//     //       longitude: 78.2023847848177,
//     //     }}
//     //   />
//     // </View>
//     // <GooglePlacesAutocomplete
//     //   placeholder="Search"
//     //   minLength={2}
//     //   autoFocus={false}
//     //   returnKeyType={'search'}
//     //   listViewDisplayed="auto"
//     //   fetchDetails={true}
//     //   onPress={(data, details = null) => {
//     //     console.log(data, details);
//     //     console.log(details.geometry.location);
//     //   }}
//     //   query={{
//     //     key: 'AIzaSyDDR-xoWe0-zL16rALIliha5LBwGOAmMns',
//     //     language: 'en',
//     //   }}
//     //   //nearbyPlacesAPI="GooglePlacesSearch"
//     //   debounce={200}
//     //   renderRightButton={() => <Text>Custom text after the input</Text>}
//     // />
//   );
// }

// function mapStateToProps(state) {
//   return {shop: state};
// }

// export default connect(mapStateToProps, null)(Shop);

import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Home from './Home';
import Register from './Register/index.js';
import Login from './Login';
import LoadingScreen from './LoadingScreen';

import {
  Text,
  View,
  ActivityIndicator,
  Button,
  StyleSheet,
  Dimensions,
  Easing,
  Animated,
} from 'react-native';

import {Icon} from 'native-base';
import MapView from 'react-native-maps';

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
  },
  {
    headerMode: 'none',
  },
);

const SwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  Login: Login,
  Register: Register,
  Home: HomeStack,
});

const Shop = createAppContainer(SwitchNavigator);

export default Shop;

// export default class Shop extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loading: true,
//       region: {
//         latitude: 10,
//         longitude: 10,
//         latitudeDelta: 0.001,
//         longitudeDelta: 0.001,
//       },
//       isMapReady: false,
//       marginTop: 1,
//       userLocation: '',
//       regionChangeProgress: false,
//     };
//   }

//   componentWillMount() {
//     navigator.geolocation.getCurrentPosition(
//       position => {
//         const region = {
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//           latitudeDelta: 0.001,
//           longitudeDelta: 0.001,
//         };
//         this.setState({
//           region: region,
//           loading: false,
//           error: null,
//         });
//       },
//       error => {
//         alert(error);
//         this.setState({
//           error: error.message,
//           loading: false,
//         });
//       },
//       {enableHighAccuracy: false, timeout: 200000, maximumAge: 5000},
//     );
//   }

//   onMapReady = () => {
//     this.setState({isMapReady: true, marginTop: 0});
//   };

//   // Fetch location details as a JSON from google map API
//   fetchAddress = () => {
//     fetch(
//       'https://maps.googleapis.com/maps/api/geocode/json?address=' +
//         this.state.region.latitude +
//         ',' +
//         this.state.region.longitude +
//         '&key=' +
//         'AIzaSyBRYqiA-p-B_zdWU5N4ac7DgEDWFWmZFlM',
//     )
//       .then(response => response.json())
//       .then(responseJson => {
//         const userLocation = responseJson.results[0].formatted_address;
//         this.setState({
//           userLocation: userLocation,
//           regionChangeProgress: false,
//         });
//       });
//   };

//   onRegionChange = region => {
//     this.setState(
//       {
//         region,
//         regionChangeProgress: true,
//       },
//       () => this.fetchAddress(),
//     );
//   };

//   onLocationSelect = () => alert(this.state.userLocation);

//  render() {
// if (this.state.loading) {
//   return (
//     <View style={styles.spinnerView}>
//       <ActivityIndicator size="large" color="#0000ff" />
//     </View>
//   );
// } else {
//   return (
//     <View style={styles.container}>
//       <View style={{flex: 2}}>
//         {!!this.state.region.latitude && !!this.state.region.longitude && (
//           <MapView
//             style={{...styles.map, marginTop: this.state.marginTop}}
//             initialRegion={this.state.region}
//             showsUserLocation={true}
//             onMapReady={this.onMapReady}
//             onRegionChangeComplete={this.onRegionChange}></MapView>
//         )}

//         <View style={styles.mapMarkerContainer}>
//           <Icon
//             name="pin"
//             style={{
//               color: '#ad1f1f',
//               size: 42,
//             }}
//           />
//         </View>
//       </View>
//       <View style={styles.deatilSection}>
//         <Text
//           style={{
//             fontSize: 16,
//             fontWeight: 'bold',
//             fontFamily: 'roboto',
//             marginBottom: 20,
//           }}>
//           Move map for location
//         </Text>
//         <Text style={{fontSize: 10, color: '#999'}}>LOCATION</Text>
//         <Text
//           numberOfLines={2}
//           style={{
//             fontSize: 14,
//             paddingVertical: 10,
//             borderBottomColor: 'silver',
//             borderBottomWidth: 0.5,
//           }}>
//           {!this.state.regionChangeProgress
//             ? this.state.userLocation
//             : 'Identifying Location...'}
//         </Text>
//         <View style={styles.btnContainer}>
//           <Button
//             title="PICK THIS LOCATION"
//             disabled={this.state.regionChangeProgress}
//             onPress={this.onLocationSelect}></Button>
//         </View>
//       </View>
//     </View>
//   );
// }
//     return <Register />;
//   }
// }

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
    top: '42%',
  },
  mapMarker: {
    fontSize: 40,
    color: 'red',
  },
  deatilSection: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    display: 'flex',
    justifyContent: 'flex-start',
  },
  spinnerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    width: Dimensions.get('window').width - 20,
    position: 'absolute',
    bottom: 100,
    left: 10,
  },
});
