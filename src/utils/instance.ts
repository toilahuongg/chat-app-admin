import axios from 'axios';
import HEADERS from '@server/utils/headers';
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
});

if (typeof window !== undefined) {
  instance.interceptors.request.use(
    (config) => {
      if (config.headers) {
        const accessToken = window.localStorage.getItem('accessToken');
        const clientId = window.localStorage.getItem('clientId');
        if (accessToken) config.headers[HEADERS.AUTHORIZATION] = 'Bearer ' + accessToken;
        if (clientId) config.headers[HEADERS.CLIENT_ID] = clientId;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (originalConfig?.url !== `${process.env.NEXT_PUBLIC_APP_URL}/accounts/login` && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            const refreshToken = window.localStorage.getItem('refreshToken');
            const clientId = window.localStorage.getItem('clientId');
            const deviceId = window.localStorage.getItem('deviceId');
            const rs = await axios.post(
              `${process.env.NEXT_PUBLIC_APP_URL}/accounts/refresh-token`,
              {
                refreshToken: refreshToken,
              },
              {
                headers: {
                  [HEADERS.REFRESH_TOKEN]: refreshToken,
                  [HEADERS.CLIENT_ID]: clientId,
                  [HEADERS.DEVICE_ID]: deviceId,
                },
              },
            );
            const { accessToken } = rs.data.metadata;
            window.localStorage.setItem('accessToken', accessToken);
            return instance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }
      return Promise.reject(err);
    },
  );
}

export default instance;
