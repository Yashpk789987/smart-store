import React from 'react';
import {Text, Button} from 'native-base';
import {register} from '../actions/shopOwner';
import {connect} from 'react-redux';

class App extends React.Component {
  render() {
    return (
      <>
        <Text>I am Smart Component</Text>
        <Text>{this.props.shopOwner.name}</Text>
        <Button onPress={() => this.props.register('Ashish Agrawal')}>
          <Text>Click Me To Register</Text>
        </Button>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    shopOwner: state.shopOwner,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    register: name => dispatch(register(name)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
