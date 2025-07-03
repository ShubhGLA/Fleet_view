// src/hooks/useLatestPOIData.ts

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export type LatestItem = {
  table_name: string;
  time_stamp: string;
  power_kw?: number;
  soc?: number;
  performance?: number;
  availability?: number;
};

type Status = 'idle' | 'loading' | 'success' | 'error';

export const useLatestPOIData = (keys: string[], types: string) => {
  const [data, setData] = useState<LatestItem[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const keysRef = useRef(keys);
  useEffect(() => {
    keysRef.current = keys;
  }, [keys]);

  const fetchData = async () => {
    if (keys.length === 0) {
      setData([]);
      setStatus('success');
      return;
    }

    setStatus('loading');

    try {
      const response = await axios.get(
        `http://localhost:5189/plant_1/latest/${types}`,
        {
          params: { keys: keys.join(',') },
        }
      );
      setData(response.data);
      setStatus('success');
    } catch (err: any) {
      console.error('Error fetching latest POI data:', err);
      setError(err.message || 'Failed to fetch latest data');
      setStatus('error');
    }
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(fetchData, 60000); 

    return () => clearInterval(intervalId);
  }, [types, keys.join(',')]);

  return { data, status, error };
};
