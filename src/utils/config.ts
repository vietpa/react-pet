export const APP_CONFIG: any = {
  BASE_API_LINK: {
    BASE: process.env.REACT_APP_API_URL,
    EXCHANGES: process.env.REACT_APP_API_URL + '/exchanges',
    TICKETS: process.env.REACT_APP_BINANCE_API_URL + '/api/v3/ticker'
  },
};
