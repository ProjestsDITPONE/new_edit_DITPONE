import {fetchApi} from '../service/api';

export const getTerms = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi('/termsofuse', 'GET', '', 'DITPCARE');
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      if ((response.res_code = '00')) {
        dispatch({
          type: 'GET_TERMS_SUCCESS',
          payload: response.res_result,
        });
        return response;
      } else {
        dispatch({
          type: 'GET_TERMS_FAIL',
          payload: response.res_text,
        });
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const getQuestion = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        '/questionnaire',
        'POST',
        ' ',
        'DITPONE',
        payload.token,
      );

      // console.log( payload.token);
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      if ((response.res_code = '00')) {
        dispatch({
          type: 'GET_QUESTION_SUCCESS',
          payload: response.results,
        });
        return response;
      } else {
        dispatch({
          type: 'GET_QUESTION_FAIL',
          payload: response.res_text,
        });
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const getStatistics = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        '/statistics_export',
        'POST',
        payload.result,
        'DITP',
      );
      console.log(response);
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);

      return response;
    } catch (e) {
      console.log(e);
    }
  };
};
export const getViewStatistics = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        '/statistics_V2',
        'POST',
        payload.results,
        'DITPONE',
        payload.token,
      );

      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      return response;
    } catch (e) {
      console.log(e);
    }
  };
};

export const getMarketData = payload => {
  return async dispatch => {
    try {
      const response = await fetchApi(
        payload.typep == 6 ? '/authorities_market_list' : '/market_list',
        'POST',
        payload,
        'DITPONE',
        payload.token,
      );

      return response;
    } catch (e) {
      console.log(e);
    }
  };
};
export const getSearchMarketData = payload => {
  return async dispatch => {
    try {
      console.log("authorities_market_list"+JSON.stringify(payload.res) );
      const response = await fetchApi(
        payload.typep == 6 ? '/authorities_market_list' : '/market_list',
        'POST',
        payload.res,
        'DITPONE',
        payload.token,
      );
      return response;
    } catch (e) {
      console.log(e);
    }
  };
};

export const getAllactivities = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        '/activity_all',
        'POST',
        ' ',
        'DITPONE',
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
          type: 'GET_ACTIVITY_SUCCESS',
          payload: response.results,
        });
        return response;
      } else {
        dispatch({
          type: 'GET_ACTIVITY_FAIL',
          payload: response.res_text,
        });
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const getRegion = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi('/uat/region', 'POST', ' ', 'DITPONE');
      console.log(response, 'DATA');
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 200);
      if ((response.res_code = '00')) {
        // dispatch({
        //   type: 'GET_REGION_SUCCESS',
        //   payload: response.res_results,
        // });
        return response;
      } else {
        // dispatch({
        //   type: 'GET_REGION_FAIL',
        //   payload: response.res_text,
        // });
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};
export const SeachRegion = payload => {
  return async dispatch => {
    try {
      // dispatch({
      //   type: 'INCREMENT',
      //   score: 1,
      // });
      const response = await fetchApi(
        '/region',
        'POST',
        payload.results,
        'DITPONE',
      );
      // console.log(response.res_results, 'DATA');
      // setTimeout(() => {
      //   dispatch({
      //     type: 'DECREMENT',
      //     score: 1,
      //   });
      // }, 200);
      if ((response.res_code = '00')) {
        dispatch({
          type: 'SEACH_REGION_SUCCESS',
          // payload: response.results,
        });
        return response;
      } else {
        dispatch({
          type: 'SEACH_REGION_FAIL',
          // payload: response.res_text,
        });
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const getCountry = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi('/continents', 'POST', ' ', 'DITPONE');
      // console.log(response, 'DATA');
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 200);
      if ((response.res_code = '00')) {
        dispatch({
          type: 'GET_COUNTRYSEARCH_SUCCESS',
          payload: response.results,
        });
        return response;
      } else {
        dispatch({
          type: 'GET_COUNTRYSEARCH_FAIL',
          payload: response.res_text,
        });
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const getDataSearchAdvaned = payload => {
  return async dispatch => {
    try {
      const response = await fetchApi(
        '/activity_advanced_search/1',
        'POST',
        payload.result,
        'DITPONE',
        payload.token,
      );
      if ((response.res_code = '00')) {
        dispatch({
          type: 'GET_DATETOP_SUCCESS',
          payload: response.result,
        });
        return response;
      } else {
        dispatch({
          type: 'GET_DATETOP_FAIL',
          payload: response.res_text,
        });
        return response.res_text;
      }
    } catch (error) {}
  };
};
export const getDataSearchAdvanedDevelop = payload => {
  return async dispatch => {
    try {
      const response = await fetchApi(
        '/activity_advanced_search/2',
        'POST',
        payload.result,
        'DITPONE',
        payload.token,
      );
      if ((response.res_code = '00')) {
        dispatch({
          type: 'GET_DATETOP_SUCCESS',
          payload: response.result,
        });
        return response;
      } else {
        dispatch({
          type: 'GET_DATETOP_FAIL',
          payload: response.res_text,
        });
        return response.res_text;
      }
    } catch (error) {}
  };
};


export const getDetailactivities = payload => {
  return async dispatch => {
    try {
      console.log(payload.list);
      const response = await fetchApi(
        payload.type === 6
          ? '/authorities_activity_list/' + payload.list
          : '/activity_list/' + payload.list,
        'POST',
        payload.results,
        'DITPONE',
        payload.token,
      );
    //  alert(JSON.stringify(response))
      return response;
    } catch (e) {
      console.log(e);
    }
  };
};

export const getActivity = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        '/uat/member_activity',
        'POST',
        ' ',
        'DITPONE',
        payload.token,
      );
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 200);
      if ((response.res_code = '00')) {
        dispatch({
          type: 'GET_PACTIVITY_SUCCESS',
          payload: response.results,
        });
        return response;
      } else {
        dispatch({
          type: 'GET_PACTIVITY_FAIL',
          payload: response.res_text,
        });
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const ScoreLogin = payload => {
  return async dispatch => {
    try {
      const response = await fetchApi(
        '/member_log',
        'POST',
        ' ',
        'DITPONE',
        payload.token,
      );
// alert(JSON.stringify(response))
      if ((response.res_code = '00')) {
        dispatch({
          type: 'SEND_SCORELOGIN_SUCCESS',
          payload: response.results,
        });
        return response;
      } else {
        dispatch({
          type: 'SEND_SCORELOGIN_FAIL',
          payload: response.res_text,
        });
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const getMenuHome = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        payload.type == 6 ? '/menu_authorities' : '/menu',
        'POST',
        ' ',
        'DITPONE',
        payload.token,
      );
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 100);
      if ((response.res_code = '00')) {
        dispatch({
          type: 'GET_MENUHOME_SUCCESS',
          payload: response.result,
        });
        return response;
      } else {
        dispatch({
          type: 'GET_MENUHOME_FAIL',
          payload: response.res_text,
        });
        return response.res_text;
      }
    } catch (e) {
      // console.log(e);
    }
  };
};

export const getBasket = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });

      const response = await fetchApi(
        payload.typee == 6
          ? '/authorities_basket_list' + payload.type
          : '/basket_list' + payload.type,
        'POST',
        ' ',
        'DITPONE',
        payload.token,
      );

      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      if ((response.res_code = '00')) {
        dispatch({
          type: 'GET_BASKET_SUCCESS',
          payload: response.res_result,
        });
        return response;
      } else {
        dispatch({
          type: 'GET_BASKET__FAIL',
          payload: response.res_text,
        });
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};


export const getBasketNewsAI = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });

      const response = await fetchApi(
        payload.typee == 6
          ? '/authorities_basket_list' + payload.type
          : '/basket_list' + payload.type,
        'POST',
        ' ',
        'DITPONE',
        payload.token,
      );

      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      if ((response.res_code = '00')) {
        dispatch({
          type: 'GET_BASKET_SUCCESS',
          payload: response.res_result,
        });
        return response;
      } else {
        dispatch({
          type: 'GET_BASKET__FAIL',
          payload: response.res_text,
        });
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const getChat = payload => {
  return async dispatch => {
    console.log(payload);
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        '/getChatHistoryNew',
        'POST',
        payload,
        'DITPONE',
      );
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      // console.log('apichat', response);
      return response;
    } catch (e) {
      console.log(e);
    }
  };
};

export const createTokenChat = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi('/uat/getAccessToken', 'POST', 'DITPONE');
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);

      return response;
    } catch (e) {
      console.log(e);
    }
  };
};

export const chatCreateOld = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });

      const response = await fetchApi('/chat', 'POST', payload, 'DITPONE');

      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      return response;
    } catch (e) {
      console.log(e);
    }
  };
};
export const chatCreate = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      //เส้นเก่า
      // const response = await fetchApi('/chat', 'POST', payload, 'DITPONE');
      // เส้นใหม่
      //  const response = await fetchApi('/getTokenChat', 'POST', payload, 'DITPONE');
      const response = await fetchApi('/chatRaw', 'POST', payload, 'DITPONE');
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      return response;
    } catch (e) {
      console.log(e);
    }
  };
};

export const chatActiveBot = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      //เส้นเก่า
      // const response = await fetchApi('/chat', 'POST', payload, 'DITPONE');
      // เส้นใหม่
      const response = await fetchApi('/uat/activeBot', 'POST', payload, 'DITPONE');
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      return response;
    } catch (e) {
      console.log(e);
    }
  };
};
export const getHistoryChat = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      //เส้นเก่า
      // const response = await fetchApi('/chat', 'POST', payload, 'DITPONE');
      // เส้นใหม่
      const response = await fetchApi(
        '/uat/ChatHistory',
        'POST',
        payload,
        'DITPONE',
      );
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      return response;
    } catch (e) {
      console.log(e);
    }
  };
};

export const putRead = payload => {
  return async dispatch => {
    try {
      const response = await fetchApi(
        '/put_readPro',
        'POST',
        payload,
        'DITPALL',
      );
      return response;
    } catch (e) {
      console.log(e);
    }
  };
};

export const chatRate = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        '/rate_chatPro',
        'POST',
        payload,
        'DITPALL',
      );
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      return response;
    } catch (e) {
      console.log(e);
    }
  };
};

export const endchat = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi('/endchat', 'POST', payload, 'DITPONE');
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      return response;
    } catch (e) {
      console.log(e);
    }
  };
};

export const tbNotification = payload => {
  return async dispatch => {
    try {
      // console.log(payload);
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        '/tbNotification',
        'POST',
        payload,
        'DITPONE',
      );
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);

      return response;
    } catch (e) {
      console.log(e);
    }
  };
};

export const getcount = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        '/getcount',
        'POST',
        payload,
        'DITPONE',
        payload.token,
      );
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      return response;
    } catch (e) {
      console.log(e);
    }
  };
};

export const ReadNoti = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi('/readNoti', 'POST', payload, 'DITPONE');
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      return response;
    } catch (e) {
      console.log(e);
    }
  };
};

export const getStatus = payload => {
  return async dispatch => {
    try {
      // dispatch({
      //   type: 'INCREMENT',
      //   score: 1,
      // });
      const response = await fetchApi(
        '/status',
        'POST',
        ' ',
        'DITPONE',
        payload.token,
      );

      if ((response.res_code = '00')) {
        dispatch({
          type: 'GET_STATES_SUCCESS',
          payload: response.res_result,
        });
        return response;
      } else {
        dispatch({
          type: 'GET_STATES__FAIL',
          payload: response.res_text,
        });
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const getContect = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi('/ditp_info', 'POST', ' ', 'DITPONE');
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 200);

      if ((response.res_code = '00')) {
        dispatch({
          type: 'GET_CONTECT_SUCCESS',
          // payload: response.results,
        });
        return response;
      } else {
        dispatch({
          type: 'GET_CONTECT_FAIL',
          // payload: response.res_text,
        });
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const getActivitySme = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        '/member_sme',
        'POST',
        payload.result,
        'DITPONE',
        payload.token,
      );
      // console.log('api', payload.type, response);
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      if ((response.res_code = '00')) {
        dispatch({
          type: 'GET_SMEACTIVITY_SUCCESS',
        });
        return response;
      } else {
        dispatch({
          type: 'GET_SMEACTIVITY_FAIL',
        });
        return response.res_text;
      }
    } catch (e) {
      // console.log(e);
    }
  };
};

export const getToppic = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        '/activity_toppic_list/' + payload.list,
        'POST',
        ' ',
        'DITPONE',
        payload.token,
      );
      // console.log(response);
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      if ((response.res_code = '00')) {
        dispatch({
          type: 'GET_TOPPIC_SUCCESS',
        });
        return response;
      } else {
        dispatch({
          type: 'GET_TOPPIC_FAIL',
        });
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const getSmeauthority = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        '/sme_quota',
        'POST',
        ' ',
        'DITPONE',
        payload.token,
      );

      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 200);
      if ((response.res_code = '00')) {
        dispatch({
          type: 'GET_SMEAUTH_SUCCESS',
        });
        return response;
      } else {
        dispatch({
          type: 'GET_SMEAUTH_FAIL',
        });
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const getDateTop = payload => {
  return async dispatch => {
    try {
      const response = await fetchApi('/important_day', 'POST', ' ', 'DITPONE');

      if ((response.res_code = '00')) {
        dispatch({
          type: 'GET_DATETOP_SUCCESS',
        });
        return response;
      } else {
        dispatch({
          type: 'GET_DATETOP_FAIL',
        });
        return response.res_text;
      }
    } catch (e) {
      // console.log(e);
    }
  };
};
// activity_suggestion_list
export const getDatarecommend = payload => {
  return async dispatch => {
    try {
      const response = await fetchApi(
        payload.type == 6
          ? '/authorities_activity_training_list'
          : '/activity_suggestion_list/' + payload.list,
        'POST',
        payload.result,
        'DITPONE',
        payload.token,
      );
      // console.log(payload.list);
      if ((response.res_code = '00')) {
        dispatch({
          type: 'GET_DATETOP_SUCCESS',
        });
        return response;
      } else {
        dispatch({
          type: 'GET_DATETOP_FAIL',
        });
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};
//search Advanced Counttry
export const GetCountryGroup = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi('/countryActivity', 'POST', 'DITPONE');
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);

      if ((response.res_code = '00')) {
        return response;
      } else {
        return response.res_text;
      }
    } catch (e) {
      console.log('anuchitlog,' + e);
    }
  };
};
export const GetprovinceActivity = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi('/provinceActivity', 'POST', 'DITPONE');
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);

      if ((response.res_code = '00')) {
        return response;
      } else {
        return response.res_text;
      }
    } catch (e) {
      console.log('anuchitlog,' + e);
    }
  };
};

// search Advanced data Activity
export const GetActivityGroup = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi('/activity_type', 'POST', 'DITPONE');
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);

      if ((response.res_code = '00')) {
        return response;
      } else {
        return response.res_text;
      }
    } catch (e) {
      console.log('AnuchitActivuty' + e);
    }
  };
};
// search Advanced data Product
export const GetSearchproduct = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        '/suggestion_product/'+payload.type,
        'POST',
        payload.result,
        'DITPONE',
        payload.token,
      );
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);

      if (response.res_code === '00') {
        return response;
      } else {
        return response.res_text;
      }
    } catch (e) {
      console.log('AnuchitActivuty' + e);
    }
  };
};

// search Advanced data Need
export const GetSearchproductneed = payload => {
  // alert("What?"+JSON.stringify(payload) )
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        '/suggestion_Need/'+payload.type,
        'POST',
        payload.result,
        'DITPONE',
        payload.token,
      );
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);

      if ((response.res_code = '00')) {
        return response;
      } else {
        return response.res_text;
      }
    } catch (e) {
      console.log('AnuchitActivuty' + e);
    }
  };
};

export const Country = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi('/country', 'GET', '', 'DITPCARE');
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      if ((response.res_code = '00')) {
        return response;
      } else {
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const TypeComplaint = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi('/typeComplaint', 'GET', '', 'DITPCARE');
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      // console.log(response);
      if ((response.res_code = '00')) {
        return response;
      } else {
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const TypeProduct = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi('/typeProduct', 'GET', '', 'DITPCARE');
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      console.log(response);
      if ((response.res_code = '00')) {
        return response;
      } else {
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const IncorrectType = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi('/IncorrectType', 'GET', '', 'DITPCARE');
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      if ((response.res_code = '00')) {
        return response;
      } else {
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const Currency = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi('/currency', 'GET', '', 'DITPCARE');
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      if ((response.res_code = '00')) {
        return response;
      } else {
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const Province = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi('/province', 'GET', '', 'DITPCARE');
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      if ((response.res_code = '00')) {
        return response;
      } else {
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const Checkformset = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        '/checkformset',
        'POST',
        payload,
        'DITPCARE',
      );
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      return response;
    } catch (e) {
      console.log(e);
    }
  };
};

export const CompValidate = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        '/compValidate',
        'POST',
        payload,
        'DITPCARE',
      );
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      return response;
    } catch (e) {
      console.log(e);
    }
  };
};

export const Complaint = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        '/complaint',
        'POST',
        payload.res,
        'DITPCARE',
        payload.token,
      );

      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      return response;
    } catch (e) {
      console.log(e);
    }
  };
};
export const getAppealViewAll = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        // '/complaint' + '?offset=0&sort=-case_id&filter={"% caseDtl_title %":"78"}',
        '/complaint' + payload.res,
        'GET',
        '',
        'DITPCARE',
        payload.token,
      );
      // console.log('key', response);
      // console.log(response,'TedtData');
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      // console.log(response);
      // console.log(response.res_code, 'response.res_code');
      if ((response.res_code = '00')) {
        // console.log('if Data');
        dispatch({
          type: 'GET_APPEAlVIEWALL_SUCCESS',
          payload: response.res_result,
        });
        return response;
      } else {
        // console.log('else Data');
        dispatch({
          type: 'GET_APPEAlVIEWALL_FAIL',
          payload: response.res_text,
        });
        return response;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const getAppealHome = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        '/complaint2',
        'GET',
        '',
        'DITPCARE',
        payload.token,
      );
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 100);
      if ((response.res_code = '00')) {
        // console.log(response);
        dispatch({
          type: 'GET_APPEALHOME_SUCCESS',
          payload: response.res_result,
        });
        return response;
      } else {
        dispatch({
          type: 'GET_APPEAlHOME_FAIL',
          payload: response.res_text,
        });
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const DetailCare = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        '/complaint/' + payload.res,
        'GET',
        '',
        'DITPCARE',
        payload.token,
      );
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      return response;
    } catch (e) {
      console.log(e);
    }
  };
};

export const UpdateTerm = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        
        '/complaint/' + payload,
        'PUT',
        {},
        'DITPCARE',
      );
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      console.log("HHHHHHH",payload)
      return response;
    } catch (e) {
      console.log(e);
    }
  };
};

export const getExporterData = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });

      const response = await fetchApi(
        '/exporter_list',
        'POST',
        payload,
        'DITPONE',
        payload.Authorization,
      );
      // console.log('ค่า', response);
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 2000);
      return response;
    } catch (e) {
      console.log(e);
    }
  };
};

export const getExportlist = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });

      const response = await fetchApi(
        '/exporter_list_data',
        'POST',
        payload,
        'DITPONE',
        payload.Authorization,
      );
      // console.log('ค่า', response);
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      return response;
    } catch (e) {
      console.log(e);
    }
  };
};

export const getProductCategory = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        '/product_category',
        'POST',
        ' ',
        'DITPONE',
      );
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 2000);
      return response;
    } catch (e) {
      console.log(e);
    }
  };
};

export const getProductSubCategory = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      // console.log(response);
      const response = await fetchApi(
        '/product_sub_category/' + payload,
        'POST',
        ' ',
        'DITPONE',
      );
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      return response;
    } catch (e) {
      console.log(e);
    }
  };
};

export const getActivityAuthorities = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        '/activity_authorities',
        'POST',
        payload,
        'DITPONE',
      );
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 2000);
      return response;
    } catch (e) {
      console.log(e);
    }
  };
};

export const getViewpeople = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        '/activity_join_list',
        'POST',
        payload.body,
        'DITPONE',
        payload.token,
      );
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 200);
      // console.log(response);
      if (response.res_code == '00') {
        dispatch({
          type: 'GET_VIEWPEOPLE_SUCCESS',
          payload: response.results,
        });
        return response;
      } else {
        dispatch({
          type: 'GET_VIEWPEOPLE_FAIL',
          payload: response.res_text,
        });
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const SendEmail = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        '/authorities_forgot',
        'POST',
        payload.body,
        'DITPONE',
        '',
      );
      console.log(response, 'SEND');
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 200);
      if (response.res_code === '00') {
        dispatch({
          type: 'SEND_EMAIL_SUCCESS',
          payload: response.results,
        });
        return response;
      } else {
        dispatch({
          type: 'SEND_EMAIL_FAIL',
          payload: response.res_text,
        });
        return response;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const getPolicy = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi('/policy', 'POST', ' ', 'DITPONE');
      console.log(response, 'get');
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 200);
      if (response.res_code === '00') {
        dispatch({
          type: 'GET_POLICY_SUCCESS',
          payload: response.results,
        });
        return response;
      } else {
        dispatch({
          type: 'GET_POLICY_FAIL',
          payload: response.res_text,
        });
        return response;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const getinfoActivity = payload => {
  return async dispatch => {
    try {
      const response = await fetchApi(
        '/user_info',
        'POST',
        payload.result,
        'DITPONE',
        payload.Authorization,
      );
      // console.log('ค่า1', response);

      if ((response.res_code = '00')) {
        dispatch({
          type: 'GET_USERACT_SUCCESS',
          payload: response,
        });
        return response;
      } else {
        dispatch({
          type: 'GET_USERACT__FAIL',
          payload: response.res_text,
        });
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const SaveAct = payload => {
  return async dispatch => {
    try {
      const response = await fetchApi(
        '/activity_join_save',
        'POST',
        payload.result,
        'DITPONE',
        payload.Authorization,
      );
      // console.log('ค่า1', response);

      if ((response.res_code = '00')) {
        dispatch({
          type: 'SAVE_ACT_SUCCESS',
          payload: response,
        });
        return response;
      } else {
        dispatch({
          type: 'SAVE_ACT__FAIL',
          payload: response.res_text,
        });
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const product_cate = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        // '/product_cate',//true API
        '/uat/product_cate',
         'POST', 
         ' ', 
         'DITPONE');
      // console.log(response, 'DATA');
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 200);
      // console.log("DDDDDDD"+response)
      if ((response.res_code = '00')) {
        // dispatch({
        //   type: 'GET_REGION_SUCCESS',
        //   payload: response.res_results,
        // });
        return response;
      } else {
        // dispatch({
        //   type: 'GET_REGION_FAIL',
        //   payload: response.res_text,
        // });
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const getCountries = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi('/countries', 'POST', ' ', 'DITPONE');

      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 200);
      if ((response.res_code = '00')) {
        // dispatch({
        //   type: 'GET_REGION_SUCCESS',
        //   payload: response.results,
        // });
        return response;
      } else {
        // dispatch({
        //   type: 'GET_REGION_FAIL',
        //   payload: response.res_text,
        // });
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const getAwardType = payload => {
  console.log('IFIFIFI', payload);
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        '/qualificationuser?userid=' + payload,
        'GET',
        '',
        'DITPONE',
      );

      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 200);
      if ((response.res_code = '00')) {
        console.log('ASASASASASA', response);
        // dispatch({
        //   type: 'GET_REGION_SUCCESS',
        //   payload: response.results,
        // });
        return response;
      } else {
        // dispatch({
        //   type: 'GET_REGION_FAIL',
        //   payload: response.res_text,
        // });
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const regisFilternoti = payload => {
  console.log("selectContry"+JSON.stringify(payload) )
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        '/regisFilternoti',
        'POST',
        payload,
        'DITPONE',
      );
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      return response;
    } catch (e) {
      console.log(e);
    }
  };
};

export const disblaNoti = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        '/disblaNoti',
        'POST',
        payload,
        'DITPONE',
      );
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      return response;
    } catch (e) {
      console.log(e);
    }
  };
};

export const master_award = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        '/master_award?userid=' + payload,
        'POST',
        ' ',
        'DITPONE',
      );
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      return response;
    } catch (e) {
      console.log(e);
    }
  };
};
export const Cheackmaster_award = payload => {
  // alert(JSON.stringify( payload.result))
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        '/CheckTrustmark',
        'POST',
        payload.result,
        'DITPONE',
      );
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      return response;
    } catch (e) {
      console.log(e);
    }
  };
};

export const logApp = payload => {
  return async dispatch => {
    try {
      const response = await fetchApi('/logApp', 'POST', payload, 'DITPONE');
      return response;
    } catch (e) {
      console.log(e);
    }
  };
};
export const getAllDevelopElearning = payload => {
  // '/activity_training_list', old
  return async dispatch => {
    try {
      const response = await fetchApi(
        '/activity_list/43',
        'POST',
        payload.results,
        'DITPONE',
        payload.token,
      );

      console.log("GGTT"+JSON.stringify(response))

      if ((response.res_code = '00')) {
        dispatch({
          type: 'GET_TOPPIC_SUCCESS',
        });
        return response;
      } else {
        dispatch({
          type: 'GET_TOPPIC_FAIL',
        });
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const getAllDevelop = payload => {
  // '/activity_training_list', old
  return async dispatch => {
    try {
      const response = await fetchApi(
        '/activity_training_list',
        'POST',
        payload.results,
        'DITPONE',
        payload.token,
      );

      if ((response.res_code = '00')) {
        dispatch({
          type: 'GET_TOPPIC_SUCCESS',
        });
        return response;
      } else {
        dispatch({
          type: 'GET_TOPPIC_FAIL',
        });
        return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const getChatHistory = payload => {
  return async dispatch => {
    try {
      if (payload.loadding) {
        dispatch({
          type: 'INCREMENT',
          score: 1,
        });
      }

      const response = await fetchApi(
        '/getChatHistory',
        'POST',
        payload,
        'DITPONE',
      );
      // console.log(response);
      if (response.resultsRealtime.length > 0) {
        dispatch({
          type: 'Online',
        });
      } else {
        // console.log('TESTTTTTTTTTT');
        dispatch({
          type: 'Offline',
        });
      }
      if (payload.loadding) {
        setTimeout(() => {
          dispatch({
            type: 'DECREMENT',
            score: 1,
          });
        }, 500);
      }
      return response;
    } catch (e) {
      console.log(e);
    }
  };
};

export const getChatRealtime = payload => {
  return async dispatch => {
    try {
      if (payload.loadding) {
        dispatch({
          type: 'INCREMENT',
          score: 1,
        });
      }

      const response = await fetchApi(
        '/getChatHistoryRaw',
        'POST',
        payload,
        'DITPONE',
      );

      console.log('responseLLLLLLLLLLLL33333');
      console.log(response);
      if (response.resultsRealtime.length > 0) {
        dispatch({
          type: 'Online',
        });
      } else {
        // console.log('TESTTTTTTTTTT');
        dispatch({
          type: 'Offline',
        });
      }
      if (payload.loadding) {
        setTimeout(() => {
          dispatch({
            type: 'DECREMENT',
            score: 1,
          });
        }, 500);
      }
      return response;
    } catch (e) {
      console.log(e);
    }
  };
};

export const getChatHistoryNew = payload => {
  return async dispatch => {
    try {
      if (payload.loadding) {
        dispatch({
          type: 'INCREMENT',
          score: 1,
        });
      }
      console.log("payloadpayloadpayloadpayload===>"+JSON.stringify(payload) )

      const response = await fetchApi(
        '/getChatHistoryRaw',
        'POST',
        payload,
        'DITPONE',
      );

      console.log('responseLLLLLLLLLLLL+++++FUCK');
      console.log(response);
      if (response.resultsRealtime.length > 0) {
        dispatch({
          type: 'Online',
        });
      } else {
        // console.log('TESTTTTTTTTTT');
        dispatch({
          type: 'Offline',
        });
      }
      if (payload.loadding) {
        setTimeout(() => {
          dispatch({
            type: 'DECREMENT',
            score: 1,
          });
        }, 500);
      }
      return response;
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteChatHistory = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        '/deleteChatHistory',
        'POST',
        payload,
        'DITPONE',
      );
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      return response;
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteTbNotification = payload => {
  return async dispatch => {
    console.log('DE=>IDIDล่าสุด');
    console.log(payload);

    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        '/deleteTbNotification',
        'POST',
        payload,
        'DITPONE',
      );
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      console.log('COCNCOCOCO');
      console.log(response);
      return response;
    } catch (e) {
      console.log(e);
    }
  };
};

export const ReadNotiAll = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        '/ReadNotiAll',
        'POST',
        payload,
        'DITPONE',
      );
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      return response;
    } catch (e) {
      console.log(e);
    }
  };
};

export const getStatusChat = payload => {
  return async dispatch => {
    try {
      if (payload.loadding) {
        dispatch({
          type: 'INCREMENT',
          score: 1,
        });
      }

      const response = await fetchApi(
        '/getStatusChat',
        'POST',
        payload,
        'DITPONE',
      );
      if (payload.loadding) {
        setTimeout(() => {
          dispatch({
            type: 'DECREMENT',
            score: 1,
          });
        }, 500);
      }
      return response;
    } catch (e) {
      console.log(e);
    }
  };
};

export const getTokenQr = payload => {
  return async dispatch => {
    try {
      // console.log(payload);
      const response = await fetchApi(
        payload.type === 6 ? '/authorities_make_qrtoken' : '/make_qrtoken',
        'POST',
        ' ',
        'DITPONE',
        payload.token,
      );
      // console.log(response);
      if ((response.res_code = '00')) {
        dispatch({
          type: 'GET_TOKENQR_SUCCESS',
          payload: response,
        });
        return response;
      } else {
        dispatch({
          type: 'GET_TOKENQR_FAIL',
          payload: response,
        });
        return response.res_text;
      }
    } catch (error) {}
  };
};

export const getInfoQrcode = payload => {
  return async dispatch => {
    try {
      console.log(payload);
      const response = await fetchApi(
        payload.type === 6 ? '/authorities_get_qrcodedata' : '/get_qrcodedata',
        'POST',
        payload.res,
        'DITPONE',
        payload.token,
      );
      // console.log(response);
      return response;
    } catch (error) {}
  };
};

export const getmembertype = payload => {
  return async dispatch => {
    try {
      console.log(payload);
      const response = await fetchApi('/member_type', 'POST', ' ', 'DITPONE');
      // console.log('ค่าาาา', response);
      return response;
    } catch (error) {}
  };
};

export const getProductOSEC = payload => {
  return async dispatch => {
    try {
      // console.log(payload);
      const response = await fetchApi(
        '/itemexport/cat_export/' + payload.para1 + '/' + payload.key,
        'GET',
        '',
        'OSEC',
      );
      // console.log('ค่าาาา', response);
      return response;
    } catch (error) {}
  };
};
export const getlistOSEC = payload => {
  return async dispatch => {
    try {
      console.log("/itemexport/items_export/"+payload);
      const response = await fetchApi(
        '/itemexport/items_export/' + payload.para1 + '/' + payload.key,
        'GET',
        '',
        'OSEC',
      );
      // console.log('ค่าาาา', response);
      return response;
    } catch (error) {}
  };
};

export const DeleteNonti = payload => {
  return async dispatch => {
    try {
      console.log(payload);
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        '/readNotiSelect',
        'POST',
        payload,
        'DITPONE',
      );

      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 200);
      console.log(response);
      return response;
    } catch (error) {}
  };
};

export const UpdateViewMore = payload => {
  return async dispatch => {
    try {
      const response = await fetchApi(
        '/market_update_view',
        'POST',
        payload.result,
        'DITPONE',
        payload.token,
      );

      return response;
    } catch (error) {}
  };
};

export const SETID = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'SET_ID_SUCCESS',
        payload: payload,
      });
    } catch (e) {
      // console.log(e);
    }
  };
};

export const getDatarefer = payload => {
  return async dispatch => {
    try {
      const response = await fetchApi(
        '/curl_genform_businessinfo',
        'GET',
        '',
        'DITPONE',
        payload.token,
      );

      return response;
    } catch (error) {}
  };
};

export const getChooseMaket = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        '/exportmarket_getall',
        'GET',
        '',
        'DITPONE',
        payload.token,
      );

      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 100);

      return response;
    } catch (error) {}
  };
};
export const getCategoryProduct = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        '/getcategory_getall',
        'GET',
        '',
        'DITPONE',
        payload.token,
      );
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 200);

      return response;
    } catch (error) {}
  };
};

export const getCateProductsub = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });

      console.log(payload.result+'===>>????')

 
      const response = await fetchApi(
        '/ProductSubCategory',
        'POST',
        payload.result,
        'DITPONE',
        payload.token,
      );
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 200);

      return response;
    } catch (error) {}
  };
};

export const getCateProductdis = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });

      const response = await fetchApi(
        '/ProducGroupstCategory',
        'POST',
        payload.result,
        'DITPONE',
        payload.token,
      );

      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 200);

      return response;
    } catch (error) {}
  };
};

export const getPopupSys = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });

      const response = await fetchApi(
        '/popup',
        'POST',

        payload.result,
        'DITPONE',
        payload.token,
      );
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 200);

      console.log(response);
      return response;
    } catch (error) {}
  };
};

export const Getactivefrom = payload => {
  return async dispatch => {
    try {
      const response = await fetchApi(
        '/activity_form',
        'POST',
        payload.result,
        'DITPONE',
        payload.token,
      );
      console.log(" GGGGGGGGGG");
      console.log(response);
      return response;
    } catch (error) {}
  };
};

export const updateProfileNiti = payload => {
  return async dispatch => {
    console.log(' GGGGGGGGGG');
    console.log(payload.results);
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        '/update_TypeNiti',
        'POST',
        payload.results,
        'DITPONE',
        payload.token,
      );
      // console.log(" GGGGGGGGGG");
      // console.log(response);
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      return response;
    } catch (error) {}
  };
};

export const updateProfileNatural = payload => {
  return async dispatch => {
    console.log(' GGGGGGGGGG');
    console.log(payload.results);
    try {
      dispatch({
        type: 'INCREMENT',
        score: 1,
      });
      const response = await fetchApi(
        '/update_TypeNatural',
        'POST',
        payload.results,
        'DITPONE',
        payload.token,
      );
      // console.log(" GGGGGGGGGG");
      // console.log(response);
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);
      return response;
    } catch (error) {}
  };
};

export const CheckRegisterActivity = payload => {
  return async dispatch => {
    console.log(JSON.stringify(payload));
    dispatch({
      type: 'INCREMENT',
      score: 1,
    });
    const response = await fetchApi(
      '/check_activity_pid',
      'POST',
      payload.result,
      'DITPONE',
      payload.token,
    );
    // console.log(response);
    // dispatch({

    //   payload: response,
    // });
    setTimeout(() => {
      dispatch({
        type: 'DECREMENT',
        score: 1,
      });
    }, 500);

    return response;
  };
};
export const RegisterActivity = payload => {
  return async dispatch => {
    // dispatch({
    //   type: 'INCREMENT',
    //   score: 1,
    // });
    const response = await fetchApi(
      '/insert_pid',
      'POST',
      payload.result,
      'DITPONE',
    );
    // console.log(response);
    // dispatch({

    //   payload: response,
    // });
    // setTimeout(() => {
    //   dispatch({
    //     type: 'DECREMENT',
    //     score: 1,
    //   });
    // }, 200);

    return response;
  };
};

export const getdataprovince = payload => {
  return async dispatch => {
    // console.log(payload.token);
    const response = await fetchApi('/data_province', 'POST', ' ', 'DITPONE');
    // console.log("/data_province");
    // console.log(response);
    return response;
  };
};

export const getdatadistrict = payload => {
  return async dispatch => {
    // console.log(payload.token);
    const response = await fetchApi(
      '/data_district',
      'POST',
      payload.results,
      'DITPONE',
    );
    console.log('/data_district');
    console.log(response);
    return response;
  };
};

export const getdatasubdistrict = payload => {
  return async dispatch => {
    // console.log(payload.token);

    const response = await fetchApi('/data_subDistrict', 'POST', 'DITPONE');
    console.log('/data_subDistrict');
    console.log(response);
    return response;
  };
};

export const getdatacontry = payload => {
  return async dispatch => {
    // console.log(payload.token);
    const response = await fetchApi('/data_country', 'POST', ' ', 'DITPONE');
    // console.log("/data_country");
    // console.log(response);
    return response;
  };
};

export const getdatacontryCity = payload => {
  return async dispatch => {
    // console.log(payload.token);
    const response = await fetchApi('/data_city', 'POST', ' ', 'DITPONE');
    // console.log("/data_country");
    // console.log(response);
    return response;
  };
};

export const getDataNewsAi = payload => {
  return async dispatch => {
    try {
      // dispatch({
      //   type: 'INCREMENT',
      //   score: 1,
      // });
      const response = await fetchApi(
        // '/data_list',
        '/data_list_V2',
        'POST',
        payload.result,
        'DITPONE',
        payload.token,
      );
      // setTimeout(() => {
      //   dispatch({
      //     type: 'DECREMENT',
      //     score: 1,
      //   });
      // }, 500);

      if ((response.res_code = '00')) {
        //   dispatch({
        //     type: 'GET_DATETOP_SUCCESS',
        //   });
        return response;
        // } else {
        //   dispatch({
        //     type: 'GET_DATETOP_FAIL',
        //   });
        //   return response.res_text;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const getDataProductnews = payload => {
  return async dispatch => {
    try {

      const response = await fetchApi(
        '/products_news',
        'POST',
        payload.token,
        'DITPONE',
        payload.token,
      );
   
      if ((response.res_code ='00')) {
        
        console.log("uuiuiuiuiuiui"+ JSON.stringify(response) )
        return response;
       
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const getDataBusiness = payload => {
  return async dispatch => {
    dispatch({
      type: 'INCREMENT',
      score: 1,
    });
    // console.log(payload.token);
    const response = await fetchApi(
      '/business_type',
      'POST',
      payload.result,
      'DITPONE',
      payload.token,
    );
    setTimeout(() => {
      dispatch({
        type: 'DECREMENT',
        score: 1,
      });
    }, 200);
    // console.log("/business_type");
    if ((response.res_code = '00')) {
      // console.log(response);
      return response;
    }
  };
};

export const getDatamakets = payload => {
  return async dispatch => {
    dispatch({
      type: 'INCREMENT',
      score: 1,
    });
    // console.log(payload.token);
    const response = await fetchApi(
      '/interested_export_market',
      'POST',
      payload.result,
      'DITPONE',
      payload.token,
    );
    setTimeout(() => {
      dispatch({
        type: 'DECREMENT',
        score: 1,
      });
    }, 200);
    // console.log("/business_type");
    if ((response.res_code = '00')) {
      // console.log(response);
      return response;
    }
  };
};

export const getfromibusiness = payload => {
  return async dispatch => {
    const response = await fetchApi('/data_form', 'POST', 'DITPONE');

    if ((response.res_code = '00')) {
      return response;
    }
  };
};
export const getfromProduct = payload => {
  return async dispatch => {
    const response = await fetchApi('/product', 'POST', 'DITPONE');

    if ((response.res_code = '00')) {
      // console.log("KLKLKLKLKLKL"+JSON.stringify(response))
      return response;
    }
  };
};

export const sendDatabusiness = payload => {
  return async dispatch => {
    dispatch({
      type: 'INCREMENT',
      score: 1,
    });
    const response = await fetchApi(
      '/add_business_type',
      'POST',
      payload.result,
      'DITPONE',
      payload.token,
    );

    setTimeout(() => {
      dispatch({
        type: 'DECREMENT',
        score: 1,
      });
    }, 500);
    // console.log("/business_type");
    if ((response.res_code = '00')) {
      // console.log(response);
      return response;
    }
  };
};

export const sendDataMaket = payload => {
  return async dispatch => {
    dispatch({
      type: 'INCREMENT',
      score: 1,
    });
    const response = await fetchApi(
      '/add_interested_export_market',
      'POST',
      payload.result,
      'DITPONE',
      payload.token,
    );

    setTimeout(() => {
      dispatch({
        type: 'DECREMENT',
        score: 1,
      });
    }, 500);
    // console.log("/business_type");
    if ((response.res_code = '00')) {
      // console.log(response);
      return response;
    }
  };
};

export const deleteDatabusiness = payload => {
  return async dispatch => {
    dispatch({
      type: 'INCREMENT',
      score: 1,
    });
    const response = await fetchApi(
      '/del_interested_export_market',
      'POST',
      payload.result,
      'DITPONE',
      payload.token,
    );

    setTimeout(() => {
      dispatch({
        type: 'DECREMENT',
        score: 1,
      });
    }, 500);
    // console.log("/business_type");
    if ((response.res_code = '00')) {
      // console.log(response);
      return response;
    }
  };
};

export const geDataProducts = payload => {
  return async dispatch => {
    // console.log(payload.result)
    // console.log('payload.token')

    dispatch({
      type: 'INCREMENT',
      score: 1,
    });
    const response = await fetchApi(
      '/product_form',
      'POST',
      payload.results,
      'DITPONE',
      payload.token,
    );

    setTimeout(() => {
      dispatch({
        type: 'DECREMENT',
        score: 1,
      });
    }, 200);
    // console.log("/business_type");
    if ((response.res_code = '00')) {
      // console.log(response);
      return response;
    }
  };
};

export const getDataparticipant = payload => {
  return async dispatch => {
    // console.log(payload.result)
    console.log('payload.token');

    dispatch({
      type: 'INCREMENT',
      score: 1,
    });
    const response = await fetchApi(
      '/participant_form',
      'POST',
      payload.result,
      'DITPONE',
      payload.token,
    );

    setTimeout(() => {
      dispatch({
        type: 'DECREMENT',
        score: 1,
      });
    }, 500);
    // console.log("/business_type");
    if ((response.res_code = '00')) {
      // console.log(response);
      return response;
    }
  };
};
export const sendDeleteDataparticipant = payload => {
  return async dispatch => {
    // console.log(payload.result)
    console.log('payload.token');

    dispatch({
      type: 'INCREMENT',
      score: 1,
    });
    const response = await fetchApi(
      '/del_multi',
      'POST',
      payload.result,
      'DITPONE',
      payload.token,
    );

    setTimeout(() => {
      dispatch({
        type: 'DECREMENT',
        score: 1,
      });
    }, 500);
    // console.log("/business_type");
    if ((response.res_code = '00')) {
      // console.log(response);
      return response;
    }
  };
};

export const getSearchparticipantsearchspecific = payload => {
  return async dispatch => {
    // console.log(payload.result)
    console.log('payload.token');

    dispatch({
      type: 'INCREMENT',
      score: 1,
    });
    const response = await fetchApi(
      '/participant_search_specific',
      'POST',
      payload.result,
      'DITPONE',
      payload.token,
    );

    setTimeout(() => {
      dispatch({
        type: 'DECREMENT',
        score: 1,
      });
    }, 500);
    // console.log("/business_type");
    if ((response.res_code = '00')) {
      // console.log(response);
      return response;
    }
  };
};
export const getDataparticipantSearch = payload => {
  return async dispatch => {
    // console.log(payload.result)
    console.log('payload.token');

    dispatch({
      type: 'INCREMENT',
      score: 1,
    });
    const response = await fetchApi(
      '/participant_search',
      'POST',
      payload.result,
      'DITPONE',
      payload.token,
    );

    setTimeout(() => {
      dispatch({
        type: 'DECREMENT',
        score: 1,
      });
    }, 500);
    // console.log("/business_type");
    if ((response.res_code = '00')) {
      // console.log(response);
      return response;
    }
  };
};

export const sendAddmemberparticipantSearch = payload => {
  return async dispatch => {
    // console.log(payload.result)
    console.log('payload.token');

    dispatch({
      type: 'INCREMENT',
      score: 1,
    });
    const response = await fetchApi(
      '/add_participant',
      'POST',
      payload.result,
      'DITPONE',
      payload.token,
    );

    setTimeout(() => {
      dispatch({
        type: 'DECREMENT',
        score: 1,
      });
    }, 500);
    // console.log("/business_type");
    if ((response.res_code = '00')) {
      // console.log(response);
      return response;
    }
  };
};

export const sendCheckuserdrive = payload => {
  return async dispatch => {
    console.log('payload.token');

    dispatch({
      type: 'INCREMENT',
      score: 1,
    });
    const response = await fetchApi(
      '/getUserDrive',
      'POST',
      payload.result,
      'DITPONE',
      payload.token,
    );

    setTimeout(() => {
      dispatch({
        type: 'DECREMENT',
        score: 1,
      });
    }, 200);
    // console.log("/business_type");
    if ((response.res_code = '00')) {
      // console.log(response);
      return response;
    }
  };
};

export const sendCheckAddmember = payload => {
  return async dispatch => {
    console.log('payload.token');

    dispatch({
      type: 'INCREMENT',
      score: 1,
    });
    const response = await fetchApi(
      '/ck_participant_FormStep1',
      'POST',
      payload.result,
      'DITPONE',
      payload.token,
    );

    setTimeout(() => {
      dispatch({
        type: 'DECREMENT',
        score: 1,
      });
    }, 200);
    // console.log("/business_type");
    if ((response.res_code = '00')) {
      // console.log(response);
      return response;
    }
  };
};

export const SendAddprodutcs = payload => {
  return async dispatch => {
    // console.log(payload.result)
    dispatch({
      type: 'INCREMENT',
      score: 1,
    });
    const response = await fetchApi(
      '/add_products',
      'POST',
      payload.result,
      'DITPONE',
      payload.token,
    );

    setTimeout(() => {
      dispatch({
        type: 'DECREMENT',
        score: 1,
      });
    }, 500);
    // console.log("/business_type");
    if ((response.res_code = '00')) {
      // console.log(response);
      return response;
    }
  };
};

export const sendDeleteidProduct = payload => {
  return async dispatch => {
    // console.log(payload.result)
    dispatch({
      type: 'INCREMENT',
      score: 1,
    });
    const response = await fetchApi(
      '/del_product',
      'POST',
      payload.result,
      'DITPONE',
      payload.token,
    );

    setTimeout(() => {
      dispatch({
        type: 'DECREMENT',
        score: 1,
      });
    }, 500);
    // console.log("/business_type");
    if ((response.res_code = '00')) {
      // console.log(response);
      return response;
    }
  };
};

export const SendupdateDataProductedit = payload => {
  return async dispatch => {
    // console.log(payload.result)
    dispatch({
      type: 'INCREMENT',
      score: 1,
    });
    const response = await fetchApi(
      '/update_product',
      'POST',
      payload.results,
      'DITPONE',
      payload.token,
    );

    setTimeout(() => {
      dispatch({
        type: 'DECREMENT',
        score: 1,
      });
    }, 500);
    // console.log("/business_type");
    if ((response.res_code = '00')) {
      // console.log(response);
      return response;
    }
  };
};
export const SendupdateDataProduct = payload => {
  return async dispatch => {
    // console.log(payload.result)
    dispatch({
      type: 'INCREMENT',
      score: 1,
    });
    const response = await fetchApi(
      '/update_product',
      'POST',
      payload.results,
      'DITPONE',
      payload.token,
    );

    setTimeout(() => {
      dispatch({
        type: 'DECREMENT',
        score: 1,
      });
    }, 500);
    // console.log("/business_type");
    if ((response.res_code = '00')) {
      // console.log(response);
      return response;
    }
  };
};

export const sendsucessactive = payload => {
  return async dispatch => {
    console.log("send_activity"+JSON.stringify(payload.result))
    dispatch({
      type: 'INCREMENT',
      score: 1,
    });
    const response = await fetchApi(
      '/send_activity',
      'POST',
      payload.results,
      'DITPONE',
      payload.token,
    );

    setTimeout(() => {
      dispatch({
        type: 'DECREMENT',
        score: 1,
      });
    }, 500);
    // console.log("/business_type");
    if ((response.res_code = '00')) {
      // console.log(response);
      return response;
    }
  };
};

export const Sendaddnewmember = payload => {
  return async dispatch => {
    console.log(payload.result);
    dispatch({
      type: 'INCREMENT',
      score: 1,
    });
    const response = await fetchApi(
      '/add_new_participant',
      'POST',
      payload.results,
      'DITPONE',
      payload.token,
    );

    setTimeout(() => {
      dispatch({
        type: 'DECREMENT',
        score: 1,
      });
    }, 500);
    // console.log("/business_type");
    if ((response.res_code = '00')) {
      // console.log(response);
      return response;
    }
  };
};

export const GetdateDataCorporat = payload => {
  return async dispatch => {
    try {
      console.log(payload);
      console.log('payload.userId');
      const response = await fetchApi(
        '/getCorporate?pid=' + payload,
        'GET',
        '',
        'DITPONE',
      );

      return response;
    } catch (e) {
      console.log(e);
    }
  };
};

export const GetDataChatHome = payload => {
  return async dispatch => {
    try {
      // alert(payload.userId);
      console.log('payload.userId');
      const response = await fetchApi(
        '/LiveChat?user_ditpone=' + payload,
        'POST',
        
        'DITPONE',
      );
      return response;
    } catch (e) {
      console.log(e);
    }
  };
};

export const DeleteChatMessges = payload => {
  return async dispatch => {
    // alert(JSON.stringify(payload.userID))

    dispatch({
      type: 'INCREMENT',
      score: 1,
    });
    const response = await fetchApi(
      '/DeleteChat?user_ditpone=' +
        payload.userID+
        '&key_room='+
        payload.chatroom,
      'POST',
      'DITPONE',
    );

    setTimeout(() => {
      dispatch({
        type: 'DECREMENT',
        score: 1,
      });
    }, 500);
    // console.log(
    //   'http://one.ditp.go.th/api/DeleteChat' + JSON.stringify(response),
    // );
    if ((response.res_code = '01')) {
      console.log(response);
      return response;
    }
  };
};

export const getPersonCorporate = payload => {
  return async dispatch => {
   
    try {
      // alert("payload.pid"+payload.pid);
      console.log('payload.pid'+payload.pid);
      const response = await fetchApi(
        '/getCorporate?pid='+payload.pid,
        'GET',
        '',
        'DITPONE',
        
      );
     
      if ((response.res_code = '00')) {
        // console.log(response);
        return response;
      }
     
    } catch (e) {
      console.log(e);
    }
  };
};

export const SearchPersonCorporate = payload => {
  return async dispatch => {

    dispatch({
      type: 'INCREMENT',
      score: 1,
    });
   
    
      // alert("payload.pid"+JSON.stringify(payload.results));
      // console.log('payload.pid'+JSON.stringify(payload.results));
      const response = await fetchApi(
        '/PersonCorporate',
        'POST',
        payload.results,
        'DITPONE',
        
      );
     
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);

      if ((response.res_code = '00')) {
        // console.log(response);
        return response;
      }
     
   
  };
};

export const sendAddpersonCorparate = payload => {
  return async dispatch => {

    dispatch({
      type: 'INCREMENT',
      score: 1,
    });
   
    
      // alert("payload.pid"+JSON.stringify(payload.results));
      // console.log('payload.pid'+JSON.stringify(payload.results));
      const response = await fetchApi(
        '/SaveCorporate',
        'POST',
        payload.results,
        'DITPONE',
        
      );
     
      setTimeout(() => {
        dispatch({
          type: 'DECREMENT',
          score: 1,
        });
      }, 500);

      if ((response.res_code = '00')) {
        // console.log(response);
        return response;
      }
     
   
  };
};

export const Addperson = payload => {
  return async dispatch => {
    // console.log('token',payload.token)
    console.log('payload.token');

    dispatch({
      type: 'INCREMENT',
      score: 1,
    });
    const response = await fetchApi(
      '/add_member_nomal',
      'POST',
      payload.result,
      'DITPONE',
      payload.token,
    );

    setTimeout(() => {
      dispatch({
        type: 'DECREMENT',
        score: 1,
      });
    }, 500);
    // console.log("/business_type");
    if ((response.res_code = '00')) {
      console.log('response',response);
      return response;
    }
  };
};

export const Addjuristic = payload => {
  return async dispatch => {
    console.log('token',payload.token)
    console.log('payload.token');

    dispatch({
      type: 'INCREMENT',
      score: 1,
    });
    const response = await fetchApi(
      '/add_member_niti',
      'POST',
      payload.result,
      'DITPONE',
      payload.token,
    );

    setTimeout(() => {
      dispatch({
        type: 'DECREMENT',
        score: 1,
      });
    }, 500);
    // console.log("/business_type");
    if ((response.res_code = '00')) {
      console.log(response);
      return response;
    }
  };
};



