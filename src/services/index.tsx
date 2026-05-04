import axios, { AxiosResponse } from 'axios';

const BASE_URL = import.meta.env.VITE_API_BFF_URL ?? '';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': import.meta.env.VITE_API_KEY_BFF ?? '',
    Accept: '*/*',
  },
});

const controllers: Record<string, AbortController> = {};

const createAbortController = (id?: string): AbortSignal => {
  const reqId = id || Math.random().toString(36).substring(7);
  if (controllers[reqId]) {
    controllers[reqId].abort();
  }
  controllers[reqId] = new AbortController();
  return controllers[reqId].signal;
};

const Services = {
  get: async (
    url: string,
    id?: string,
  ): Promise<AxiosResponse> => {
    const signal = createAbortController(id);

    return instance.get(url, { signal }).catch((error) => {
      if (axios.isCancel(error)) {
        return Promise.reject(error);
      }
      const { response } = error;
      if (response?.data) {
        return Promise.reject({
          message: response.data.message,
          status: response.status,
          originalError: error,
        });
      }
      return Promise.reject(error);
    });
  },
};

export default Services;
