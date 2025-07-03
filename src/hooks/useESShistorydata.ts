// src/hooks/useESShistorydata.ts

import { useState, useEffect } from 'react';
import axios from 'axios';

export type HistoryItem = {
  ts: string;
  value: number;
  tableName: string;
};

export type HistoryResponse = Record<string, HistoryItem[]>;

type Status = 'idle' | 'loading' | 'success' | 'error';

export const useESSHistory = (
  keys: string[],
  startTs: string,
  endTs: string
) => {
  const [data, setData] = useState<HistoryResponse | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!startTs || !endTs || keys.length === 0) {
      setData({});
      setStatus('success');
      return;
    }

    setStatus('loading');

    try {
      const params = new URLSearchParams({
        keys: keys.join(','),
        startTs,
        endTs,
      });

      const response = await axios.get<HistoryResponse>(
        `http://localhost:5189/plant_1/history/ess_ess_?${params}`
      );

      setData(response.data);
      setStatus('success');
    } catch (err: any) {
      console.error('Error fetching ESS history:', err);
      setError(err.message || 'Failed to fetch ESS history');
      setStatus('error');
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 60000);
    return () => clearInterval(intervalId);
  }, [startTs, endTs, keys.join(',')]); 

  return { data, status, error };
};
