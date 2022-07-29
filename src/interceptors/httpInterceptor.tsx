import axios, { AxiosResponse } from "axios";

const httpInterceptor = () => {
  axios.interceptors.request.use(
    (config: any) => {
      if (config.url.includes("rest.coinapi.io")) {
        config.headers["X-CoinAPI-Key"] = `${process.env.REACT_APP_API_KEY}`;
      }
      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    },
    { synchronous: true }
  );

  axios.interceptors.response.use((response: AxiosResponse) => {
    return response;
  });
};

export default httpInterceptor;
