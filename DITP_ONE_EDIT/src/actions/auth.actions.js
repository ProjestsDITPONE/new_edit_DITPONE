import {fetchApi, fetchApifromData} from '../service/api';
import {Platform} from 'react-native';

export const loginUser = payload => {
  return async dispatch => {

    // dispatch({
    //   type: 'INCREMENT',
    //   score: 1,
    // });
    
    const response = await fetchApi(
      '/getinfo',
      'get',
      '',
      'SSO',
      payload.token,
    );

    const dataNoti = {
      device_uuid: payload.notification,
      sso_id: response.res_result.ssoid,
      sso_iden: response.res_result.naturalId,
      sso_email:
        response.res_result.member != undefined
          ? response.res_result.member.email
          : response.res_result.sub_member.email,
      device_platform: Platform.OS == 'android' ? '1' : '2',
      device_login_status: '1',
    };
    fetchApi('/regisnoti', 'POST', dataNoti, 'DITPONE', payload.token);


    // setTimeout(() => {
    //   dispatch({
    //     type: 'DECREMENT',
    //     score: 1,
    //   });
    // }, 500);
 

    if (response.res_code === '00') {
      await dispatch({
        type: 'AUTH_USER_SUCCESS',
        token: payload.token,
      });
      dispatch({
        type: 'GET_USER_SUCCESS',
        payload: response,
      });
      dispatch({
        type: 'GET_TYPE_SUCCESS',
        payload: response.res_result.type,
      });
      return response;
    } else {
      dispatch({
        type: 'AUTH_USER_FAIL',
      });
      dispatch({
        type: 'GET_USER_FAIL',
      });
      return response;
    }
  };
};

export const logoutUser = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const xx = await fetchApi(
        '/logout',
        'POST',
        {device_uuid: payload.device_uuid},
        'DITPONE',
        payload.token,
      );
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);

      dispatch({
        type: 'AUTH_USER_FAIL',
      });
      dispatch({
        type: 'GET_USER_FAIL',
      });
      dispatch({
        type: 'GET_IMAGEPROFILE_FAIL',
      });
      return;
    } catch (e) {
      // console.log(e);
    }
  };
};
export const SendQuestion = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });

      const response = await fetchApi(
        '/member_questionnaire',
        'POST',
        payload.results,
        'DITPONE',
        payload.token,
      );
      // console.log(response, 'SEND');
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      if ((response.res_code = '00')) {
        dispatch({
          type: 'SEND_QUESTION_SUCCESS',
          payload: response.results,
        });
        return response;
      } else {
        dispatch({
          type: 'SEND_QUESTION_FAIL',
          payload: response.res_text,
        });
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const DeleteBasket = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        payload.type == 6 ? '/authorities_del_basket' : '/del_basket',
        'POST',
        payload.results,
        'DITPONE',
        payload.token,
      );
      // console.log(payload.results, payload.token);
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);

      if ((response.res_code = '00')) {
        // console.log('auth.action => DELETE_BASKET_SUCCESS  ', response.result);
        dispatch({
          type: 'DELETE_BASKET_SUCCESS',
          payload: response.result,
        });
        return response;
      } else {
        dispatch({
          type: 'DELETE_BASKET_FAIL',
          payload: response.res_text,
        });
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const SendAssessment = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });

      const response = await fetchApi(
        '/assess_satisfaction',
        'POST',
        payload.results,
        'DITPONE',
        payload.token,
      );
      // console.log(response.results, 'SEND');
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      if ((response.res_code = '00')) {
        dispatch({
          type: 'SEND_AESSESSMENT_SUCCESS',
          payload: response.results,
        });
        return response;
      } else {
        dispatch({
          type: 'SEND_AESSESSMENT_FAIL',
          payload: response.res_text,
        });
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const SendReteChat = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });

      const response = await fetchApi(
        '/assess_satisfaction_chat',
        'POST',
        payload.results,
        'DITPONE',
        payload.token,
      );
      // console.log(response.results, 'SEND');
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      if ((response.res_code = '00')) {
        dispatch({
          type: 'SEND_REATECHAT_SUCCESS',
          payload: response.results,
        });
        return response;
      } else {
        dispatch({
          type: 'SEND_REATECHAT_FAIL',
          payload: response.res_text,
        });
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const SendHomeMenu = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      // console.log(payload.results);
      const response = await fetchApi(
        payload.type == 6 ? '/sort_menu_authorities' : '/sort_menu',
        'POST',
        payload.results,
        'DITPONE',
        payload.token,
      );
      // console.log(response, 'SEND');
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      if ((response.res_code = '00')) {
        dispatch({
          type: 'SEND_HOMEMENU_SUCCESS',
          payload: response.results,
        });
        return response;
      } else {
        dispatch({
          type: 'SEND_HOMEMENU_FAIL',
          payload: response.res_text,
        });
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const SendBasket = payload => {
  return async dispatch => {
    try {
      const response = await fetchApi(
        payload.type === 6 ? '/authorities_add_basket' : '/add_basket',
        'POST',
        payload.results,
        'DITPONE',
        payload.token,
      );
      // console.log( payload.results, 'SEND');

      if ((response.res_code = '00')) {
        dispatch({
          type: 'SEND_BASKET_SUCCESS',
          payload: response.results,
        });
        return response;
      } else {
        dispatch({
          type: 'SEND_BASKET_FAIL',
          payload: response.res_text,
        });
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const SendNoteMem = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        payload.type == 6 ? '/authorities_add_member_note' : '/add_member_note',
        'POST',
        payload.results,
        'DITPONE',
        payload.token,
      );
      // console.log(response, 'SEND');
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 200);
      if ((response.res_code = '00')) {
        dispatch({
          type: 'SEND_NOTE_SUCCESS',
          payload: response.results,
        });
        return response;
      } else {
        dispatch({
          type: 'SEND_NOTE_FAIL',
          payload: response.res_text,
        });
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const getBanner = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi('/banner', 'POST', ' ', 'DITPONE');
      // console.log(response, 'DATA');
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 200);
      if ((response.res_code = '00')) {
        dispatch({
          type: 'GET_BANNER_SUCCESS',
          payload: response.results,
        });
        return response;
      } else {
        dispatch({
          type: 'GET_BANNER_FAIL',
          payload: response.res_text,
        });
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const getstatustQues = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        '/status_questionnaire',
        'POST',
        ' ',
        'DITPONE',
        payload.token,
      );

      // console.log(response, 'DATA');
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 200);
      if ((response.res_code = '00')) {
        dispatch({
          type: 'GET_STAS_SUCCESS',
          payload: response.results,
        });
        return response;
      } else {
        dispatch({
          type: 'GET_BANNER_FAIL',
          payload: response.res_text,
        });
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const SendCancelmember = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });

      const response = await fetchApi(
        '/cancel_member',
        'POST',
        payload.results,
        'DITPONE',
        payload.token,
      );
      // console.log(response, 'SEND');
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 1000);
      if ((response.res_code = '00')) {
        dispatch({
          type: 'SEND_CANCELM_SUCCESS',
          payload: response.results,
        });
        return response;
      } else {
        dispatch({
          type: 'SEND_CANCELM_FAIL',
          payload: response.res_text,
        });
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const refreshtoken = payload => {
  return async dispatch => {
    try {
      const response = await fetchApi(
        '/createtoken',
        'get',
        '',
        'SSO',
        payload.token,
      );
      // console.log('refreshtoken', response);
      dispatch({
        type: 'AUTH_USER_SUCCESS',
        token: response.res_result.code,
      });
      return response;
    } catch (e) {
      // console.log(e);
    }
  };
};

export const getimgprofile = payload => {
  return async dispatch => {
    try {
      const response = await fetchApi(
        '/get_profile',
        'POST',
        ' ',
        'DITPONE',
        payload.token,
      );
      // console.log(response.response.res_result, 'DATA');

      if ((response.res_code = '00')) {
        dispatch({
          type: 'GET_IMAGEPROFILE_SUCCESS',
          payload: response.response.res_result,
        });
        return response;
      } else {
        dispatch({
          type: 'GET_IMAGEPROFILE_FAIL',
          payload: response.res_text,
        });
        return response.res_text;
      }
    } catch (e) {
      // console.log(e);
    }
  };
};

export const loginauthorities = payload => {
  return async dispatch => {
    dispatch({
      type: 'INCREMENT',
      score: 1,
    });
    const response = await fetchApi(
      '/login',
      'POST',
      payload.result,
      'DITPONE',
    );
    setTimeout(() => {
      dispatch({
        type: 'DECREMENT',
        score: 1,
      });
    }, 200);
    console.log('auth', response);
    if (response.res_code === '00') {
      await dispatch({
        type: 'AUTH_USER_SUCCESS',
        token: response,
      });
      return response;
    } else {
      dispatch({
        type: 'AUTH_USER_FAIL',
        res_text: response,
      });
      return response;
    }
  };
};

export const getinfoAuth = payload => {
  return async dispatch => {
    dispatch({
      type: 'INCREMENT',
      score: 1,
    });
    const response = await fetchApi(
      '/details',
      'POST',
      ' ',
      'DITPONE',
      payload.Authorization,
    );
    if (response.res_code == '00') {
      dispatch({
        type: 'GET_IMAGEPROFILE_SUCCESS',
        payload: response.res_result.profile,
      });
      dispatch({
        type: 'GET_TYPE_SUCCESS',
        payload: response.res_result.type,
      });
    }

    setTimeout(() => {
      dispatch({
        type: 'DECREMENT',
        score: 1,
      });
    }, 200);
    // console.log(response);
    if (response.res_code === '00') {
      await dispatch({
        type: 'GET_USER_SUCCESS',
        payload: response,
      });
      return response;
    } else {
      dispatch({
        type: 'GET_USER_FAIL',
      });
      return response;
    }
  };
};

export const SendMemberBuy = payload => {
  return async dispatch => {
    try {
      // dispatch({
      //   type: 'INCREMENT',
      //   score: 1,
      // });
      // console.log(payload.results);
      const response = await fetchApi(
        payload.typep === 6 ? '/authorities_add_member' : '/add_member',
        'POST',
        payload.results,
        'DITPONE',
        payload.token,
      );
      return response;
      // console.log(response, 'SEND');
      // setTimeout(() => {
      //   dispatch({
      //     type: 'DECREMENT',
      //     score: 1,
      //   });
      // }, 500);
      // if ((response.res_code = '00')) {
      //   dispatch({
      //     type: 'SEND_MEMBERBUYER_SUCCESS',
      //     payload: response.results,
      //   });
      //   return response;
      // } else {
      //   dispatch({
      //     type: 'SEND_MEMBERBUYER_FAIL',
      //     payload: response.res_text,
      //   });
      //   return response.res_text;
      // }
    } catch (e) {
      console.log(e);
    }
  };
};

export const SendCancle = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        '/cancel_cancel_member',
        'POST',
        ' ',
        'DITPONE',
        payload.token,
      );
      // console.log(response, 'SENDCan');
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 200);
      if ((response.res_code = '00')) {
        dispatch({
          type: 'SEND_CANCLE_SUCCESS',
          payload: response.results,
        });
        return response;
      } else {
        dispatch({
          type: 'SEND_CANCLE_FAIL',
          payload: response.res_text,
        });
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const authNotification = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'GET_NOTIFICATION_SUCCESS',
        payload: payload,
      });
      return '';
    } catch (e) {
      // console.log(e);
    }
  };
};

export const CountNotification = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'GET_COUNTNOTIFICATION_SUCCESS',
        payload: payload,
      });
      return '';
    } catch (e) {
      // console.log(e);
    }
  };
};

export const EditeProfile = payload => {
  return async dispatch => {
    try {
      // console.log('ส่งไป', payload.result);
      const response = await fetchApi(
        '/member_update',
        'POST',
        payload.result,
        'SSO',
      );
      return response;
     

      // if ((response.res_code = '00')) {
      //   dispatch({
      //     type: 'GET_USER_SUCCESS',
      //     payload: response,
      //   });
      //   return response;
      // } else {
      //   dispatch({
      //     type: 'GET_USER_FAIL',
      //   });
      //   return response.res_text;
      // }
    } catch (e) {}
  };
};

export const getInfo = payload => {
  return async dispatch => {
    const response = await fetchApi(
      '/getinfo',
      'get',
      '',
      'SSO',
      payload.token,
    );

    if (response.res_code === '00') {
      dispatch({
        type: 'GET_USER_SUCCESS',
        payload: response,
      });
      return response;
    
    }

  };
};

export const ForeUpdate = payload => {
  return async dispatch => {
    const response = await fetchApi(
      '/checkVersionUpdate',
      'POST',
      payload.res,
      'DITPONE',
    );

    if (response.res_code === '00') {
      dispatch({
        type: 'GET_FOREUPDTE_SUSESS',
        payload: response,
      });
      return response;
    } else {
      dispatch({
        type: 'GET_FOREUPDTE_FAIL',
        payload: response,
      });
      return response;
    }
  };
};

export const GetChatCount = payload => {
  return async dispatch => {
    // console.log(payload);
    const response = await fetchApi(
      '/num_chat',
      'POST',
      ' ',
      'DITPONE',
      payload.token,
    );
    // console.log('มาาาา', response);
    dispatch({
      type: 'GET_COUNTCHAT_SUSESS',
      payload: response,
    });
    return response;
  };
};

export const UpdateCountChat = payload => {
  return async dispatch => {
    // console.log(payload);
    const response = await fetchApi(
      '/update_num_chat',
      'POST',
      ' ',
      'DITPONE',
      payload.token,
    );

    return response;
  };
};
export const testMoc = payload => {
  return async dispatch => {
    // console.log(payload);
    const response = await fetchApi(
      '/moc_id',
      'POST',
      '',
      'SSO',
      payload.result,
    );
    console.log(response);
    dispatch({
      
      payload: response,
    });

    return response;
  };
};

