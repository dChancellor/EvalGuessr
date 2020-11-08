import { useState, useEffect } from 'react';

const usePostRequest = (url, req) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    let prevent = false;
    const fetchData = async () => {
        try {
          setLoading(true);
          let response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(req),
          });
          if (!prevent) setData(await response.json());
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
    };
    if (req) {
    fetchData();
    }
    return () => {
      prevent = true;
    };
  }, [url, req]);
  return { data, loading, error };
};

export default usePostRequest;
