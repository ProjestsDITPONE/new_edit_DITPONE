import RNFetchBlob from 'rn-fetch-blob';
import { Alert } from 'react-native';
const BASE_URL = 'http://care.ditp.go.th/api/v3';
const SSO_URL = 'https://sso.ditp.go.th/sso/api';
const DITPALL_URL = 'http://ditpall.ibusiness.co.th/v7';
const DITPONE_URL = 'http://one.ditp.go.th/api';
const OSEC_URL = 'https://onestopservice.ditp.go.th/api';
let URLLoad = '';
export const api = async (
  url,
  method,
  body = null,
  headers = {},
  typeurl = '',
) => {
  try {
    if (typeurl === 'SSO') {
      URLLoad = SSO_URL;
    } else if (typeurl === 'DITPALL') {
      URLLoad = DITPALL_URL;
    } else if (typeurl === 'DITPCARE') {
      URLLoad = BASE_URL;
    } else if (typeurl === 'DITPONE') {
      URLLoad = DITPONE_URL;
    } else if (typeurl === 'OSEC') {
      URLLoad = OSEC_URL;
    }

    const endPoint = URLLoad.concat(url);
    const reqBody = body ? JSON.stringify(body) : null;
    const fetchParams = { method, headers };

    if ((method === 'POST' || method === 'PUT') && !reqBody) {
      throw new Error('Request body required');
    }
    if (reqBody) {
      if (typeurl === 'DITPALL' || typeurl === 'DITPCARE') {
        fetchParams.headers['Content-type'] =
          'application/x-www-form-urlencoded';
        fetchParams.body = body;
      } else {
        fetchParams.headers['Content-Type'] = 'application/json';

        fetchParams.body = reqBody;
      }
    }

    const fetchPromise = fetch(endPoint, fetchParams);
    const timeOutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('Request Timeout');
      }, 15000);
    });

    const response = await Promise.race([fetchPromise, timeOutPromise]);

    return response;
  } catch (e) {
    return e;
  }
};


export const fetchApi = async (
  url,
  method,
  body,
  typeurl,
  token = null,
  loader = false,
) => {
  try {
    const headers = {};
    const result = {
      token: null,
      success: false,
      responseBody: null,
    };
    if (token) {
      headers['token'] = token;
      headers['code'] = 'Bearer ' + token;
      if (typeurl === 'DITPCARE') {
        headers['Authorization'] = token;
      } else {
        headers['Authorization'] = 'Bearer ' + token;
      }
      headers['client_id'] = 'SS0047423';
    }

    const response = await api(url, method, body, headers, typeurl);

    if (response.status === 200) {
      let responseBody;
      const responseText = await response.text();

      try {
        responseBody = JSON.parse(responseText);
      } catch (e) {
        responseBody = responseText;
      }
      return responseBody;
    } else {
    }

    let errorBody;
    const errorText = await response.text();

    try {
      errorBody = JSON.parse(errorText);
    } catch (e) {
      errorBody = errorText;
    }

    result.responseBody = errorBody;

    throw result;
  } catch (error) {
    return error;
  }
};
