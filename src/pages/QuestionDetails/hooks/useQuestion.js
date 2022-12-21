import { useState, useEffect, useRef } from 'react';

// Helpers
import axios from 'axios';

// endpoints
import Endpoints from '../../../constants/APIs';


const useQuestion = (id) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [votes, setVotes] = useState(0);
  const hasAlreadyVoted = useRef(false);

  const handleUpvote = async () => {
    try {
      await axios.patch(Endpoints.getQuestionById(data.id), { rate: { up: data.rate.up + 1, down: data.rate.down, total: data.rate.total + 1 } });
      if (!hasAlreadyVoted.current) setVotes((currentVote) => currentVote + 1);
      else alert('You already voted');
    } catch (e) {

    }
  }

  const handleDownvote = async () => {
    try {
      await axios.patch(Endpoints.getQuestionById(data.id), { rate: { up: data.rate.up, down: data.rate.down + 1, total: data.rate.total + 1 } });
      if (!hasAlreadyVoted.current) setVotes((currentVote) => currentVote - 1);
      else alert('You already voted');
    } catch (e) {
      
    }
  }

  useEffect(() => {
    const trackView = async () => {
      try {
        await axios.patch(Endpoints.getQuestionById(data.id), { views: data.views + 1 });
      } catch (e) {
        
      }
    }

    trackView();
  }, [data?.id]);

  useEffect(() => {
    if (votes !== data?.rate?.up - data?.rate?.down) hasAlreadyVoted.current = true;
  }, [votes, data?.rate]);

  useEffect(() => {
    const axiosCancelToken = axios.CancelToken.source();

    const getData = async () => {
      try {
        setIsLoading(true);
        setError(false);

        const { data: questionDetails } = await axios.get(
          Endpoints.getQuestionById(id),
          // { cancelToken: axiosCancelToken.token }
        );
        setIsLoading(false);
        setData(questionDetails);
        setVotes(questionDetails?.rate?.up - questionDetails?.rate?.down);
        hasAlreadyVoted.current = false;

      } catch (e) {
        setError(true);
        setIsLoading(false);
      }
    };

    if (id) getData();

    return () => {
      axiosCancelToken.cancel('Request Cancel');
    }
  }, [id]);

  return {
    data,
    isLoading,
    error,
    votes,
    handleUpvote,
    handleDownvote
  }
};

export default useQuestion;
