import { useState } from 'react'
import { useCitySearch } from '@/hooks/useCitySearch'
import { debounce } from '@/utils/debounce'
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import SearchBarMobile from '@/components/searchBar/SearchBarMobile'
import CityList from './CityList'
import { showToast } from '@/utils/showToast'

type SearchForm = {
    searchQuery: string
}

const CitySearchBar = () => {
    const navigate = useNavigate()
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [debouncedTerm, setDebouncedTerm] = useState<string>('')
    const { cities, isLoading, isError } = useCitySearch(debouncedTerm)

    const form = useForm<SearchForm>({
        defaultValues: {
            searchQuery: '',
        },
    })

    const debouncedSearch = debounce((value: string) => {
        if (value.length > 2) {
            setDebouncedTerm(value)
        } else {
            setDebouncedTerm('')
        }
    }, 1000)

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
        setDebouncedTerm('')
        setSelectedCity(null)
    }

    const handleCitySelect = (cityName: string) => {
        navigate(`/search/${cityName}`)
    };

    return (
        <div className='relative'>
            <SearchBarMobile
                form={form}
                onSubmit={handleSearchSubmit}
                placeHolder="Search cities..."
                handleReset={handleReset}
                isInputFilled={!!debouncedTerm}
                onSearchChange={debouncedSearch}
            />

            {debouncedTerm.length > 0 && (
                <CityList
                    cities={cities}
                    isLoading={isLoading}
                    isError={isError}
                    debouncedTerm={debouncedTerm}
                    onCitySelect={handleCitySelect}
                />
            )}
        </div>
    )
}

export default CitySearchBar
