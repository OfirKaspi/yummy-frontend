// CHANGE THE JSX INTO A GENERIC SEARCH CMP

import { useState } from 'react'
import { useCitySearch } from '@/hooks/useCitySearch'
import { debounce } from '@/utils/debounce'
import { Eraser, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface SearchForm {
    searchQuery: string
}

const CitySearchBar = () => {
    const navigate = useNavigate()
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

    const onSearchChange = (value: string) => {
        debouncedSearch(value)
    }

    const handleSubmit: SubmitHandler<SearchForm> = (data) => {
        navigate(`/search/${data.searchQuery}`)
    }

    const handleReset = () => {
        form.reset({ searchQuery: '' })
        setDebouncedTerm('')
    }

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="bg-slate-100 shadow-lg rounded-lg flex items-center p-3"
                >
                    <button type="submit" className="text-gray-400 px-2">
                        <Search />
                    </button>
                    <FormField
                        control={form.control}
                        name="searchQuery"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Search by city"
                                        onChange={(e) => {
                                            field.onChange(e)
                                            onSearchChange(e.target.value)
                                        }}
                                        className="border-none text-md shadow-none focus-visible:ring-0"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {debouncedTerm && (
                        <button
                            type="button"
                            className="text-gray-400 px-2"
                            onClick={handleReset}
                        >
                            <Eraser />
                        </button>
                    )}
                </form>
            </Form>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Failed to load cities. Please try again.</p>}
            <ul>
                {cities.map((city) => (
                    <li key={city.id}>{city.name}</li>
                ))}
            </ul>
        </>
    )
}

export default CitySearchBar
