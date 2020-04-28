import StepIndicator from 'react-native-step-indicator';
import React from 'react';
import {connect} from 'react-redux';

const labels = ['Basic Details', 'Contact Details', 'Set Address', 'Documents'];

class Wizard extends React.Component {
  render() {
    return (
      <StepIndicator
        stepCount={4}
        currentPosition={this.props.wizardStep}
        labels={labels}
      />
    );
  }
}

function mapStateToProps(state) {
  return {wizardStep: state.shop.shopOwner.wizardStep};
}

export default connect(mapStateToProps, null)(Wizard);
