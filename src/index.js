import axios from 'axios';
import moment from 'moment';
import * as RNLocalize from 'react-native-localize';
import 'moment/min/locales';

// init stuff
import 'react-native-gesture-handler';
import './app/redux';

const axiosInstance = axios.create();

try {
  const locale = RNLocalize.getLocales()[0].languageTag;
  moment.locale(locale);

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (err) => {
      if (err.response.status === 401) {
        // redux.dispatch(AuthActions.cleanAuth());
      }
      return Promise.reject(err);
    },
  );
}
catch (err) {
  // Redirect to error page
}

export default {
  axiosInstance,
};
