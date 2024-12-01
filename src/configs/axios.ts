import axios from "axios";
import { env } from "./env";
const ApiClient = () => {
  const instance = axios.create({
    baseURL: env.api.base_url,
  });

  return instance;
};

const api = ApiClient();

export { api };
