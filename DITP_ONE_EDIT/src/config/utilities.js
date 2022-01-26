import {Platform} from 'react-native';
export const getDeepLink = (path = '') => {
  const scheme = 'ditpone';
  const prefix =
    Platform.OS == 'android' ? `${scheme}://my-host/` : `${scheme}://`;
  return prefix + path;
};

export const getDeepLinkAct = (path = '') => {
  const scheme =
    '%e0%b8%ab%e0%b8%99%e0%b9%89%e0%b8%b2%e0%b8%ab%e0%b8%a5%e0%b8%b1%e0%b8%81';
  const prefix =
    Platform.OS == 'android' ? `${scheme}://my-host/` : `${scheme}`;
  return prefix + path;
};

export const getDeepLinkCheang = (path = '') => {
  const scheme = 'https%3A%2F%2Fsso.ditp.go.th%2Fsso%2Ftest2.php';
  const prefix =
    Platform.OS == 'android' ? `${scheme}://my-host/` : `${scheme}://`;
  return prefix + path;
};

export const getDeepLinkAutoMem = (path = '') => {
  const scheme =
    '%E0%B8%AA%E0%B8%A1%E0%B8%B1%E0%B8%84%E0%B8%A3%E0%B8%AA%E0%B8%A1%E0%B8%B2%E0%B8%8A%E0%B8%B4%E0%B8%81%E0%B8%81%E0%B8%A3%E0%B8%A1';
  const prefix =
    Platform.OS == 'android' ? `${scheme}://my-host/` : `${scheme}`;
  return prefix + path;
};
