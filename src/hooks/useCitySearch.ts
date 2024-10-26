import { useQuery } from 'react-query'
import { getCitiesRequest } from '@/api/cityAPI'

export const useCitySearch = (searchTerm: string) => {
    const { data: cities = [], isLoading, isError } = useQuery(
        ['citySearch', searchTerm],
        () => getCitiesRequest({
            countryIds: 'IL',
            minPopulation: 20000,
            namePrefix: searchTerm,
            limit: 10,
        }),
        {
            enabled: searchTerm.length > 2,
            staleTime: 5000,
            retry: false,
        }
    )

    return { cities, isLoading, isError }
}
