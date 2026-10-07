import { useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'

// Generic fetch hook
export const useFetch = (apiCall, dependencies = [], options = {}) => {
    const [data, setData] = useState(options.initialData || null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchData = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await apiCall()
            setData(response.data.data)
        } catch (err) {
            const message = err.response?.data?.message || err.message
            setError(message)
            if (!options.silent) toast.error(message)
        } finally {
            setLoading(false)
        }
    }, [apiCall, options.silent])

    useEffect(() => {
        if (!options.skip) fetchData()
    }, dependencies)

    return { data, loading, error, refetch: fetchData }
}

// List hook for table pages
export const useList = (apiCall, initialFilters = {}) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState(initialFilters)
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 50,
        total: 0,
        pages: 0,
    })

    const fetchData = useCallback(async () => {
        try {
            setLoading(true)
            const response = await apiCall(filters)
            setData(response.data.data || [])
            if (response.data.pagination) {
                setPagination(response.data.pagination)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to load data')
            setData([])
        } finally {
            setLoading(false)
        }
    }, [apiCall, filters])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const updateFilter = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }))
    }

    const refresh = () => fetchData()

    return {
        data,
        loading,
        filters,
        setFilters,
        updateFilter,
        pagination,
        setPagination,
        refresh,
    }
}

// Mutation hook for create/update/delete
export const useMutation = (apiCall, options = {}) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const mutate = useCallback(
        async (...args) => {
            try {
                setLoading(true)
                setError(null)
                const response = await apiCall(...args)

                if (options.successMessage) {
                    toast.success(options.successMessage)
                }

                if (options.onSuccess) {
                    options.onSuccess(response.data)
                }

                return response.data
            } catch (err) {
                const message = err.response?.data?.message || err.message
                setError(message)
                toast.error(message)

                if (options.onError) {
                    options.onError(err)
                }

                throw err
            } finally {
                setLoading(false)
            }
        },
        [apiCall, options]
    )

    return { mutate, loading, error }
}