import { City } from '@/types'
import { Card, CardContent } from '@/components/ui/card'

type Props = {
    cities: City[]
    isLoading: boolean
    isError: boolean
    debouncedTerm: string
    onCitySelect: (cityName: string) => void
}

const CityList = ({ cities, isLoading, isError, debouncedTerm, onCitySelect }: Props) => {
    let statusMessage: JSX.Element | null = null

    if (isLoading) {
        statusMessage = <>Loading...</>
    } else if (isError) {
        statusMessage = <>Failed to load cities. Please try again.</>
    } else if (debouncedTerm && cities.length === 0) {
        statusMessage = <>City not found, please type again.</>
    }

    return (
        <div className="absolute mt-2 z-20">
            <Card className="shadow-lg rounded-md overflow-hidden">
                <CardContent className='p-4'>
                    <ul>
                        {statusMessage ? (
                            <li className={`p-2  ${isError ? 'text-red-500' : 'text-gray-800 dark:text-gray-200'}`}>
                                {statusMessage}
                            </li>
                        ) : (
                            cities.map((city, index) => (
                                <li
                                    key={city.id}
                                    onClick={() => onCitySelect(city.name)}
                                    className={`p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md cursor-pointer ${index !== 0 && "border-t-2"}`}
                                >
                                    {city.name}
                                </li>
                            ))
                        )}
                    </ul>
                </CardContent>
            </Card>
        </div>
    )
}

export default CityList
