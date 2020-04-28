let initialState = {
  name: '',
  ownerName: '',
  mobileNo: '',
  email: '',
  password: '',
  region: {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  },
  address: 'Your Present Location',
  wizardStep: 0,
  uploading: false,
};

const shopOwner = (state = initialState, action) => {
  switch (action.type) {
    case 'SwitchStep':
      return {...state, wizardStep: action.updatedStep};

    case 'MOVE_TO_SECOND_STEP':
      return {
        ...state,
        wizardStep: action.currentIndex,
        name: action.payload.shopName,
        ownerName: action.payload.ownerName,
      };

    case 'MOVE_TO_THIRD_STEP':
      return {
        ...state,
        wizardStep: action.currentIndex,
        mobileNo: action.payload.mobileNo,
        email: action.payload.email,
        password: action.payload.password,
      };

    case 'UPDATE_LOCATION':
      return {
        ...state,
        region: action.payload.region,
        address: action.payload.address,
      };

    case 'MOVE_TO_FOURTH_STEP':
      return {
        ...state,
        wizardStep: action.currentIndex,
      };

    case 'MOVE_BACK':
      return {...state, wizardStep: state.wizardStep - 1};

    case 'UPLOADING_DATA':
      return {...state, uploading: true};

    default:
      return state;
  }
};

export default shopOwner;
