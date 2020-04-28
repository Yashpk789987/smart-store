import React from 'react';
import Geocoder from 'react-native-geocoding';
import {Provider} from 'react-redux';
import {StyleProvider} from 'native-base';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import store from './store';
import App from './containers';
import getTheme from './native-base-theme/components';
import custom from './native-base-theme/variables/custom.js';
Geocoder.init('AIzaSyBRYqiA-p-B_zdWU5N4ac7DgEDWFWmZFlM');
navigator.geolocation = require('@react-native-community/geolocation');
console.disableYellowBox = true;

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

export default class Root extends React.Component {
  componentWillMount() {}
  render() {
    return (
      <PaperProvider theme={theme}>
        <StyleProvider style={getTheme()}>
          <Provider store={store}>
            <App />
          </Provider>
        </StyleProvider>
      </PaperProvider>
    );
  }
}

// import React, {Component} from 'react';

// import {Text, TouchableHighlight, View} from 'react-native';

// import RNHTMLtoPDF from 'react-native-html-to-pdf';

// export default class Root extends Component {
//   async createPDF() {
//     let options = {
//       html: '<h1>PDF TEST</h1>',
//       fileName: 'test',
//       directory: 'smart/test',
//     };

//     let file = await RNHTMLtoPDF.convert(options);
//     console.log(file);
//     alert(file.filePath);
//   }

//   render() {
//     return (
//       <View>
//         <TouchableHighlight onPress={this.createPDF}>
//           <Text>Create PDF</Text>
//         </TouchableHighlight>
//       </View>
//     );
//   }
// }
