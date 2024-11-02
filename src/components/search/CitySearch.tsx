import { useState } from 'react'
import { useCitySearch } from '@/hooks/useCitySearch'
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import SearchBar from '@/components/search/SearchBar'
import CityList from './CityList'
import { showToast } from '@/utils/showToast'

type SearchForm = {
    searchQuery: string
}

const CitySearchBar = () => {
    const navigate = useNavigate()
    const [selectedCity, setSelectedCity] = useState<string | null>(null)
    const [searchCityTerm, setSearchCityTerm] = useState<string>('')

    const { cities, isLoading, isError } = useCitySearch(searchCityTerm)

    const form = useForm<SearchForm>({
        defaultValues: {
            searchQuery: '',
        },
    })

    const handleSearchSubmit: SubmitHandler<SearchForm> = (data) => {
        const { searchQuery } = data
        if (searchQuery === selectedCity) {
            navigate(`/search/${searchQuery}`)
        } else {
            showToast("Please select a valid city from the suggestions.", 'info')
        }
    }

    const handleReset = () => {
        form.reset({ searchQuery: '' })
        setSearchCityTerm('')
        setSelectedCity(null)
    }

    const handleCitySelect = (cityName: string) => {
        setSelectedCity(cityName)
        form.setValue('searchQuery', cityName)
        navigate(`/search/${cityName}`)
    }

    return (
        <div className='relative flex-1'>
            <SearchBar
                form={form}
                onSubmit={handleSearchSubmit}
                placeHolder="Search cities..."
                handleReset={handleReset}
                isInputFilled={!!searchCityTerm}
                onSearchChange={setSearchCityTerm}
            />

            {searchCityTerm.length > 2 && (
                <CityList
                    cities={cities}
                    isLoading={isLoading}
                    isError={isError}
                    debouncedTerm={searchCityTerm}
                    onCitySelect={handleCitySelect}
                />
            )}

        </div>
    )
}

export default CitySearchBar
