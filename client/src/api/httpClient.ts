import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async createUser(email: string, password: string) {
    const response = await axios.post(`${this.baseUrl}/createUser`, {
      email,
      password,
    });

    return response;
  }
}

const httpClient = new HttpClient(apiBaseUrl);

export default httpClient;
