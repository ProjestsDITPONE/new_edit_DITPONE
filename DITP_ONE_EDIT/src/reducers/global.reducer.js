import {combineReducers} from 'redux';

// const InitialState = {
//   state: 0,
// };
const LoadingCounters = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + action.score;
    case 'DECREMENT':
      return state - action.score;
    default:
      return state;
  }
};

const PopupCounter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT_SCORE':
      return state + action.score;
    // case 'DECREMENT':
    //   return state - action.score;
    default:
      return state;
  }
};
const HeaderBack = (state = {}, action) => {
  switch (action.type) {
    case 'HeaderBack_SUCCESS':
      return {
        abc: false,
      };
    // case 'DECREMENT':
    //   return state - action.score;
    default:
      return state;
  }
};

const CheckOnlineCheck = (state = false, action) => {
  switch (action.type) {
    case 'Online':
      return true;
    case 'Offline':
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  LoadingCounters,
  PopupCounter,
  HeaderBack,
  CheckOnlineCheck,
});
