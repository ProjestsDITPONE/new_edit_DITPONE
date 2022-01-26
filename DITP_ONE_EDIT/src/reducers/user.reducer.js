import {combineReducers} from 'redux';

const getUser = (state = {}, action) => {
  // console.log(action.payload, 'USER');
  switch (action.type) {
    case 'GET_USER_SUCCESS':
      return {
        isError: false,
        isSuccess: true,
        userDetails: action.payload,
        errors: null,
      };

    case 'GET_USER_FAIL':
      return {
        isError: true,
        isSuccess: false,
        userDetails: null,
        errors: action.payload,
      };

    default:
      return state;
  }
};

const filterCounty = (state = {}, action) => {
  switch (action.type) {
    case 'GET_REGION_SUCCESS':
      console.log(action.payload, '15556156');
      return {
        isError: false,
        isSuccess: true,
        data: action.payload,
        errors: null,
      };

    case 'GET_REGION_FAIL':
      return {
        isError: true,
        isSuccess: false,
        data: null,
        errors: action.payload,
      };

    default:
      return state;
  }
};
const getType = (state = {}, action) => {
  // console.log(action.payload, 'USER');
  switch (action.type) {
    case 'GET_TYPE_SUCCESS':
      return {
        isError: false,
        isSuccess: true,
        type: action.payload,
        errors: null,
      };

    case 'GET_TYPE_FAIL':
      return {
        isError: true,
        isSuccess: false,
        type: null,
        errors: action.payload,
      };

    default:
      return state;
  }
};

const getRefresh = (state = {}, action) => {
  // console.log(action.payload, 'USER');
  switch (action.type) {
    case 'GET_REFRESH_SUCCESS':
      return {
        isSuccess: true,
      };

    case 'GET_REFRESH_FAIL':
      return {
        isSuccess: false,
      };

    default:
      return state;
  }
};

export default combineReducers({
  getUser,
  filterCounty,
  getType,
  getRefresh,
});
