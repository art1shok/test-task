import axios from 'axios';

class ApiService {
  instance = axios.create({
    baseURL: 'https://front-test.beta.aviasales.ru/'
  });

  getSearchId = () => {
    return this.instance.get('search').then(res => res.data);
  };

  getTickets = (data: string) => {
    return this.instance.get(`tickets?searchId=${data}`).then(res => res.data);
  };
}

export const apiService = new ApiService();
