import React, { useEffect, useState } from "react";
import axios from "axios";

export function useAxiosPost(url, SentData) {
  const [request, setRequest] = useState({
    loading: false,
    data: null,
    error: false,
  });

  useEffect(() => {
    setRequest({
      loading: true,
      data: null,
      error: false,
    });
    axios
      .post(url, SentData)
      .then((result) => {
        setRequest({ loading: true, data: result.data, error: false });
      })

      .catch(() => {
        setRequest({ loading: true, data: null, error: false });
      });
  }, [url]);
  return request;
}
