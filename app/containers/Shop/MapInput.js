import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

function MapInput(props) {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      minLength={2}
      autoFocus={true}
      returnKeyType={'search'}
      listViewDisplayed={false}
      fetchDetails={true}
      onPress={(data, details = null) => {
        props.notifyChange(details.geometry.location);
      }}
      query={{
        key: 'AIzaSyDDR-xoWe0-zL16rALIliha5LBwGOAmMns',
        language: 'en',
      }}
      nearbyPlacesAPI="GooglePlacesSearch"
      debounce={300}
    />
  );
}
export default MapInput;
