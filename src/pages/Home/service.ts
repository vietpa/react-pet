import axios from "axios";
import { APP_CONFIG } from "../../utils/config";

export const getExchanges = async (params: any) => {
  return await axios.get(`${APP_CONFIG.BASE_API_LINK.EXCHANGES}`, { params });
};

export const getTickets = async () => {
  return await axios.get(`${APP_CONFIG.BASE_API_LINK.TICKETS}/24hr`);
};