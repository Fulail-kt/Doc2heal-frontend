import { useState } from 'react';
import  { AxiosResponse, AxiosError, Method } from 'axios';
import api from '../services/api';

interface ApiResponse<T> {
  data: T;
  error: AxiosError<Error> | null;
  loading: boolean;
  message: string;
}

const useApi = <T>(url: string, method: Method,user?:string) => {
  const [response, setResponse] = useState<ApiResponse<T>>({
    data: {} as T,
    error: null,
    loading: false,
    message: '',
  });

  const fetchData = async (body?:any) => {
    setResponse({ data: response.data, message: '', error: null, loading: true });

    console.log(user,"us");
    
    try {
      const queryParams = user ? `user=${encodeURIComponent(user)}` : '';
      const fullUrl = queryParams ? `${url}?${queryParams}` : url;

      const axiosConfig = {
        method,
        url: fullUrl,
        data: body,
      };

      const result: AxiosResponse<T> = await api(axiosConfig);

      setResponse({ data:result.data, message: 'Success!', loading: false, error: null  });
    } catch (error) {
      setResponse({ data: response.data, message: 'Error occurred.', error, loading: false });
      throw error; 
    }
  };

  return { ...response, fetchData };
};

export default useApi;