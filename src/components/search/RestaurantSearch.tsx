import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEffect, useState } from "react"
import SearchBar from "@/components/search/SearchBar"
import { useDispatch, useSelector } from "react-redux"
import { resetSearch, selectSearchQuery, setSearchQuery } from "@/store/search/searchSlice"
import { useLocation, useNavigate } from "react-router-dom"

const formSchema = z.object({
    searchQuery: z.string({
        required_error: "Restaurant name is required"
    })
})

export type SearchForm = z.infer<typeof formSchema>

type Props = {
    placeHolder: string,
}

const RestaurantSearch = ({ placeHolder }: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const searchQuery = useSelector(selectSearchQuery)
    const [isInputFilled, setIsInputFilled] = useState(false);

    const handleSetSearchQuery = (searchFormData: SearchForm) => {
        if (location.pathname === "/") {
            navigate(`/search/${searchFormData.searchQuery}`)
        } else {
            dispatch(setSearchQuery(searchFormData.searchQuery))
        }
    }

    const handleResetSearch = () => {
        dispatch(resetSearch())
    }

    const form = useForm<SearchForm>({
        resolver: zodResolver(formSchema),
        defaultValues: { searchQuery }
    })

    const searchQueryValue = form.watch("searchQuery")

    useEffect(() => {
        setIsInputFilled(!!searchQueryValue)
    }, [searchQueryValue]);

    useEffect(() => {
        form.reset({ searchQuery })
    }, [form, searchQuery])

    useEffect(() => {
        if (location.pathname === "/") {
            dispatch(resetSearch())
        }
    }, [location.pathname, dispatch])

    return <SearchBar
        form={form}
        handleReset={handleResetSearch}
        onSubmit={handleSetSearchQuery}
        placeHolder={placeHolder}
        isInputFilled={isInputFilled}
    />
}

export default RestaurantSearch