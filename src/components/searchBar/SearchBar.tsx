import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEffect, useState } from "react"
import useDeviceType from "@/hooks/useDeviceType"
import SearchBarDesktop from "./SearchBarDesktop"
import SearchBarMobile from "./SearchBarMobile"

const formSchema = z.object({
    searchQuery: z.string({
        required_error: "Restaurant name is required"
    })
})

export type SearchForm = z.infer<typeof formSchema>

type Props = {
    searchQuery?: string
    onSubmit: (formData: SearchForm) => void,
    placeHolder: string,
    onReset?: () => void
}

const SearchBar = ({ searchQuery, onSubmit, placeHolder, onReset }: Props) => {
    const { isDesktop, isMobile } = useDeviceType()
    const [isInputFilled, setIsInputFilled] = useState(false);

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

    const handleReset = () => {
        form.reset({
            searchQuery: ""
        })

        if (onReset) {
            onReset()
        }
    }

    return (
        <>
            {isMobile &&
                <SearchBarMobile
                    form={form}
                    handleReset={handleReset}
                    onSubmit={onSubmit}
                    placeHolder={placeHolder}
                    isInputFilled={isInputFilled}
                />}
            {isDesktop &&
                <SearchBarDesktop
                    form={form}
                    handleReset={handleReset}
                    onSubmit={onSubmit}
                    placeHolder={placeHolder}
                />}
        </>
    )
}

export default SearchBar