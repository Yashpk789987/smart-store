let initialState = {
  name: '',
  password: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'Register':
      return {...state, name: action.name};
  }
  return state;
};

export default user;
