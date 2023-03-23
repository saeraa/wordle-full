import { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

const useAxios = (axiosParams: AxiosRequestConfig) => {
  const [response, setResponse] = useState<AxiosResponse>();
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(true);

 const fetchData = async (params: AxiosRequestConfig) => {
    try {
      const result = await axios.request(params);
      setResponse(result);
    } catch( err: any ) {
      setError(err);
    } finally {
      setLoading(false);
    }
 };

 useEffect(() => {
  if(axiosParams.method === "GET" || axiosParams.method === "get"){
    fetchData(axiosParams);
  }
},[]);

const sendData = () => {
  fetchData(axiosParams);
}

return { response, error, loading, sendData };
}

export default useAxios;