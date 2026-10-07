import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios({
        url,
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      })
      setData(response.data)
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [url, JSON.stringify(options)])

  useEffect(() => {
    if (options.skip) {
      setLoading(false)
      return
    }
    fetchData()
  }, [fetchData, options.skip])

  const refetch = useCallback(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch }
}

export const useMutation = (url, options = {}) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const mutate = useCallback(async (payload = {}) => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios({
        url,
        method: options.method || 'POST',
        data: payload,
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      })
      setData(response.data)
      return response.data
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Something went wrong'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [url, JSON.stringify(options)])

  return { mutate, data, loading, error }
}