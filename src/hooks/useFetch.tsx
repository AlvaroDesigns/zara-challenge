import Services from '@/services';
import { useCallback, useState } from 'react';

const useFetch = () => {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async (url: string, id?: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await Services.get(url, id);
      setData(response.data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : String(err);
      setError(message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetch };
};

export default useFetch;
