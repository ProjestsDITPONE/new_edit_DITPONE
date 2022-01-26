import {combineReducers} from 'redux';

const getTerms = (state = {}, action) => {
  switch (action.type) {
    case 'GET_TERMS_SUCCESS':
      return {
        isError: false,
        isSuccess: true,
        isResult: action.payload,
        errors: null,
      };

    case 'GET_TERMS_FAIL':
      return {
        isError: true,
        isSuccess: false,
        isResult: null,
        errors: action.payload,
      };

    default:
      return state;
  }
};

const getHome = (state = {}, action) => {
  // console.log(action.payload, 'MenuHome');
  switch (action.type) {
    case 'GET_MENUHOME_SUCCESS':
      return {
        isError: false,
        isSuccess: true,
        isResult: action.payload,
        errors: null,
      };

    case 'GET_MENUHOME_FAIL':
      return {
        isError: true,
        isSuccess: false,
        isResult: null,
        errors: action.payload,
      };

    default:
      return state;
  }
};

const getScore = (state = {}, action) => {

  // alert(action.type)
  
  switch (action.type) {
    case 'SEND_SCORELOGIN_SUCCESS':
      return {
        isError: false,
        isSuccess: true,
        isResult: action.payload,

        errors: null,
      };

    case 'SEND_SCORELOGIN_FAIL':
      return {
        isError: true,
        isSuccess: false,
        isResult: null,
        errors: action.payload,
      };

    default:
      return state;
  }
};
const getStatus = (state = {}, action) => {
  
  // console.log(action.payload, 'USER++++++++',action.type);
  switch (action.type) {
    case 'GET_STATES_SUCCESS':
      return {
        isError: false,
        isSuccess: true,
        isResult: action.payload,

        errors: null,
      };

    case 'GET_STATES__FAIL':
      return {
        isError: true,
        isSuccess: false,
        isResult: null,
        errors: action.payload,
      };

    default:
      return state;
  }
};

const getBasket = (state = {}, action) => {
  // console.log(action.payload, 'USER');
  switch (action.type) {
    case 'GET_BASKET_SUCCESS':
      return {
        isError: false,
        isSuccess: true,
        isResult: action.payload,

        errors: null,
      };

    case 'GET_BASKET__FAIL':
      return {
        isError: true,
        isSuccess: false,
        isResult: null,
        errors: action.payload,
      };

    default:
      return state;
  }
};

const getAppealViewAll = (state = {}, action) => {
  switch (action.type) {
    case 'GET_APPEAlVIEWALL_SUCCESS':
      // console.log('glg', action.payload);
      return {
        isError: false,
        isSuccess: true,
        isResult: action.payload,
        errors: null,
      };

    case 'GET_APPEAlVIEWALL_FAIL':
      return {
        isError: true,
        isSuccess: false,
        isResult: null,
        errors: action.payload,
      };

    default:
      return state;
  }
};

const getAppealHome = (state = {}, action) => {
  switch (action.type) {
    case 'GET_APPEALHOME_SUCCESS':
      // console.log("glg",action.payload)
      return {
        isError: false,
        isSuccess: true,
        isResult: action.payload,
        errors: null,
      };

    case 'GET_APPEAlHOME_FAIL':
      return {
        isError: true,
        isSuccess: false,
        isResult: null,
        errors: action.payload,
      };

    default:
      return state;
  }
};

const getViewpeople = (state = {}, action) => {
  switch (action.type) {
    case 'GET_VIEWPEOPLE_SUCCESS':
      // console.log("glg",action.payload)
      return {
        isError: false,
        isSuccess: true,
        isResult: action.payload,
        errors: null,
      };

    case 'GET_VIEWPEOPLE_FAIL':
      return {
        isError: true,
        isSuccess: false,
        isResult: null,
        errors: action.payload,
      };

    default:
      return state;
  }
};
const Number = (state = {}, action) => {
  switch (action.type) {
    case 'GET_ID_SUCCESS':
      return {
        isError: false,
        isSuccess: true,
        isResult: action.payload,
        errors: null,
      };

    case 'GET_ID_FAIL':
      return {
        isError: true,
        isSuccess: false,
        isResult: null,
        errors: action.payload,
      };

    default:
      return state;
  }
};

const getCid = (state = {}, action) => {
  switch (action.type) {
    case 'GET_CID_SUCCESS':
      return {
        isError: false,
        isSuccess: true,
        isResult: action.payload,
        errors: null,
      };

    case 'GET_CID_FAIL':
      return {
        isError: true,
        isSuccess: false,
        isResult: null,
        errors: action.payload,
      };

    default:
      return state;
  }
};

const getUserScan = (state = {}, action) => {
  switch (action.type) {
    case 'GET_USERACT_SUCCESS':
      return {
        isError: false,
        isSuccess: true,
        isResult: action.payload,
        errors: null,
      };

    case 'GET_USERACT__FAIL':
      return {
        isError: true,
        isSuccess: false,
        isResult: null,
        errors: action.payload,
      };

    default:
      return state;
  }
};

const getlocal = (state = {}, action) => {
  switch (action.type) {
    case 'GET_LOCAL_SUSESS':
      return {
        isError: false,
        isSuccess: true,
        // foreupdate: action.payload,
        // errors: null,
        local: action.payload,
      };

    case 'GET_LOCAL_FAIL':
      return {
        isError: true,
        isSuccess: false,
        // foreupdate: action.payload,
        // errors: null,
        local: action.payload,
      };

    default:
      return state;
  }
};

const getTokenQr = (state = {}, action) => {
  switch (action.type) {
    case 'GET_TOKENQR_SUCCESS':
      return {
        isError: false,
        isSuccess: true,
        // foreupdate: action.payload,
        // errors: null,
        TokenQr: action.payload,
      };

    case 'GET_TOKENQR_FAIL':
      return {
        isError: true,
        isSuccess: false,
        // foreupdate: action.payload,
        // errors: null,
        TokenQr: action.payload,
      };

    default:
      return state;
  }
};

const SetID = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ID_SUCCESS':
      return {
        ID: action.payload,
      };

    case 'SET_ID_FAIL':
      return {
        ID: null,
      };

    default:
      return state;
  }
};

export default combineReducers({
  getTerms,
  getHome,
  getScore,
  getStatus,
  getBasket,
  getAppealViewAll,
  getAppealHome,
  getViewpeople,
  Number,
  getCid,
  getUserScan,
  getlocal,
  getTokenQr,
  SetID
});
