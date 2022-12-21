import { useState, useEffect } from 'react';

// Helpers
import axios from 'axios';

// endpoints
import Endpoints from '../constants/APIs';


const useQuestions = (query = '') => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const axiosCancelToken = axios.CancelToken.source();

    const getData = async () => {
      try {
        setIsLoading(true);
        setError(false);

        const { data: questions } = await axios.get(
          Endpoints.getQuestions(`title_like=${query}`),
          // { cancelToken: axiosCancelToken.token }
        );
        setIsLoading(false);
        setData(questions);

      } catch (e) {
        setError(true);
        setIsLoading(false);
      }
    };

    getData();

    return () => {
      axiosCancelToken.cancel('Request Cancel');
    }
  }, [query]);

  return {
    data: {
      questions: data,
      total: data.length
    },
    isLoading,
    error
  }
};

export default useQuestions;
