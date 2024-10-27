import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getCitiesRequest } from '@/api/cityAPI'
import { debounce } from '@/utils/debounce'

export const useCitySearch = (searchTerm: string) => {
    const [debouncedTerm, setDebouncedTerm] = useState(searchTerm)

    useEffect(() => {
        const debouncedSearch = debounce((value: string) => {
            setDebouncedTerm(value)
        }, 500)

        debouncedSearch(searchTerm)

        return () => {
            debouncedSearch.cancel()
        }
    }, [searchTerm])

    const { data: cities = [], isLoading, isError } = useQuery(
        ['citySearch', debouncedTerm],
        () => getCitiesRequest({
            countryIds: 'IL',
            minPopulation: 20000,
            namePrefix: debouncedTerm,
            limit: 10,
        }),
        {
            enabled: debouncedTerm.length > 2,
            staleTime: 5000,
            retry: false,
        }
    )

    return { cities, isLoading, isError }
}
