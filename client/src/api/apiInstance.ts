import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from 'axios';

class ApiInstance {
  private httpClient: AxiosInstance;

  constructor(baseURL: string) {
    this.httpClient = axios.create({
      baseURL,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.httpClient.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error)
    );
  }

  async request<T = any>(
    method: Method,
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse> {
    try {
      const response = await this.httpClient.request<T>({
        method,
        url,
        data: method === 'get' ? undefined : data,
        ...config,
        params: method === 'get' ? data : config.params,
      });

      return response;
    } catch (error: any) {
      if (error.response) {
        return error.response;
      }

      return {
        ...error,
        data: {
          message: 'Unable to access the network',
        },
      };
    }
  }

  async get(
    url: string,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse> {
    return this.request('get', url, {}, config);
  }

  async post(
    url: string,
    data = {},
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse> {
    return this.request('post', url, data, config);
  }

  async put(
    url: string,
    data = {},
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse> {
    return this.request('put', url, data, config);
  }

  async delete(
    url: string,
    data = {},
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse> {
    return this.request('delete', url, data, config);
  }
}

const api = new ApiInstance(import.meta.env.VITE_API_BASE_URL);

export default api;
