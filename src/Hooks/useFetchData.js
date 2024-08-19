import axios from 'axios';
import { useCallback, useEffect, useState } from 'react'

const useFetchData = (url, initialData = []) => {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(url);
            setData(response.data.data)
        }
        catch (error) {
            setError(false)
        }
        finally {
            setLoading(false)
        }
    }, [url])

    useEffect(() => {
        fetchData()
    }, [fetchData])
  return {data, loading, error}
}

export default useFetchData