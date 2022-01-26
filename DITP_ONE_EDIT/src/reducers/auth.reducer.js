import { combineReducers } from 'redux';

const authData = (state = {}, action) => {
  // console.log(action.token);
  switch (action.type) {
    case 'AUTH_USER_SUCCESS':
      return {
        // isType: action.response,
        token: action.token,
        isLoggedIn: true,
        res_text: null,
      };

    case 'AUTH_USER_FAIL':
      return {
        token: null,
        isLoggedIn: false,
        res_text: action.res_text,
      };

    default:
      return state;
  }
};

const authDataAuth = (state = {}, action) => {
  // console.log(action.token);
  switch (action.type) {
    case 'LOGIN_AUTH_SUCCESS':
      return {
        token: action.token,
        isLoggedIn: true,
      };

    case 'LOGIN_AUTH_FAIL':
      return {
        token: null,
        isLoggedIn: false,
      };

    default:
      return state;
  }
};

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

const getImg = (state = {}, action) => {
  // console.log(action.payload, 'USER');
  switch (action.type) {
    case 'GET_IMAGEPROFILE_SUCCESS':
      return {
        isError: false,
        isSuccess: true,
        img: action.payload,
        errors: null,
      };

    case 'GET_IMAGEPROFILE_FAIL':
      return {
        isError: true,
        isSuccess: false,
        img: '',
        errors: action.payload,
      };

    default:
      return state;
  }
};

const CheckTerm = (state = {}, action) => {
  switch (action.type) {
    case 'GET_CHECKTERM_SUCCESS':
      return {
        isError: false,
        isSuccess: true,
        errors: null,
        Check: action.payload,
      };

    case 'GET_CHECKTERM_FAIL':
      return {
        isError: true,
        isSuccess: false,
        errors: null,
        Check: false,
      };

    default:
      return state;
  }
};

const getNotification = (state = {}, action) => {
  // console.log(action.payload, 'USER++++++++++');
  switch (action.type) {
    case 'GET_NOTIFICATION_SUCCESS':
      // console.log(action.payload, 'USER/////////');
      return {
        isError: false,
        isSuccess: true,
        tokenNotification: action.payload,
        errors: null,
      };

    case 'GET_NOTIFICATION_FAIL':
      return {
        isError: true,
        isSuccess: false,
        tokenNotification: null,
        errors: action.payload,
      };

    default:
      return state;
  }
};

const getCountNotification = (state = {}, action) => {
  // console.log(action.payload)
  switch (action.type) {
    case 'GET_COUNTNOTIFICATION_SUCCESS':
      return {
        isError: false,
        isSuccess: true,
        CountNotification: action.payload,
        errors: null,
      };

    case 'GET_COUNTNOTIFICATION_FAIL':
      return {
        isError: true,
        isSuccess: false,
        CountNotification: null,
        errors: action.payload,
      };

    default:
      return state;
  }
};

const getForeUpdate = (state = {}, action) => {
  switch (action.type) {
    case 'GET_FOREUPDTE_SUSESS':
      return {
        isError: false,
        isSuccess: true,
        foreupdate: action.payload,
        errors: null,
      };

    case 'GET_FOREUPDTE_FAIL':
      return {
        isError: true,
        isSuccess: false,
        foreupdate: null,
        errors: action.payload,
      };

    default:
      return state;
  }
};

const ChangLang = (state = {}, action) => {
  switch (action.type) {
    case 'GET_LOCAL_SUSESS':
      return {
        isError: false,
        isSuccess: true,
        // foreupdate: action.payload,
        // errors: null,
        local: action.payload,
      };

    // case 'GET_FOREUPDTE_FAIL':
    //   return {
    //     isError: true,
    //     isSuccess: false,
    //     foreupdate: null,
    //     errors: action.payload,
    //   };

    default:
      return state;
  }
};

const getCountChat = (state = {}, action) => {
  switch (action.type) {
    case 'GET_COUNTCHAT_SUSESS':
      return {
        isError: false,
        isSuccess: true,
        Countchat: action.payload,
        errors: null,
      };

    case 'GET_COUNTCHAT_FAIL':
      return {
        isError: true,
        isSuccess: false,
        Countchat: null,
        errors: action.payload,
      };

    default:
      return state;
  }
};

export default combineReducers({
  authData,
  getUser,
  getImg,
  authDataAuth,
  getNotification,
  getCountNotification,
  getForeUpdate,
  ChangLang,
  CheckTerm,
  getCountChat
});
