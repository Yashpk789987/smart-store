import {baseurl} from '../../baseurl';

export const moveToSecondStep = (shopName, ownerName) => ({
  type: 'MOVE_TO_SECOND_STEP',
  currentIndex: 1,
  payload: {
    shopName: shopName,
    ownerName: ownerName,
  },
});

export const moveToThirdStep = (mobileNo, email, password) => ({
  type: 'MOVE_TO_THIRD_STEP',
  currentIndex: 2,
  payload: {
    mobileNo: mobileNo,
    email: email,
    password: password,
  },
});

export const moveToFourthStep = () => ({
  type: 'MOVE_TO_FOURTH_STEP',
  currentIndex: 3,
});

export const updateLocation = (region, address) => ({
  type: 'UPDATE_LOCATION',
  payload: {
    region,
    address,
  },
});

export const moveBack = () => ({
  type: 'MOVE_BACK',
});

export const register = data1 => {
  return async (dispatch, getState) => {
    dispatch({type: 'UPLOADING_DATA'});
    try {
      let res = await fetch(`${baseurl}/shop_owner/submit`, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(data1),
      });
      let data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
};
