import axios from 'axios'

const VITE_RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY

type City = {
    id: string
    name: string
}

type GetCitiesParams = {
    countryIds: string
    minPopulation: number
    namePrefix: string
    limit: number
}

const geoApiOptions = {
    baseURL: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
    headers: {
        'x-rapidapi-key': VITE_RAPIDAPI_KEY,
        'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
    },
}

export const getCitiesRequest = async (params: GetCitiesParams): Promise<City[]> => {
    try {
        const response = await axios.get('', {
            ...geoApiOptions,
            params,
        })

        return response.data.data
    } catch (error) {
        console.error("Error getting cities:", error)
        throw new Error("Failed to get cities")
    }
}
