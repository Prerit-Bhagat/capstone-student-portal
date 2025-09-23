import axios from "axios";

const BACKEND_URL = "http://localhost:4000";

const instance = axios.create({
  baseURL: BACKEND_URL as string,
  withCredentials: true,
});

export { instance as api };
