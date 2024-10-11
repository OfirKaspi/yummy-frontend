import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useEffect } from "react"

// Zod validation schema for the search form
const formSchema = z.object({
    searchQuery: z.string().min(1, "Restaurant name is required")
})

export type SearchForm = z.infer<typeof formSchema>

type Props = {
    searchQuery?: string
    onSubmit: (formData: SearchForm) => void,
    placeHolder?: string
}

const SearchSection = ({ searchQuery, onSubmit, placeHolder = "Search dishes, restaurant" }: Props) => {
    const form = useForm<SearchForm>({
        resolver: zodResolver(formSchema),
        defaultValues: { searchQuery }
    })

    useEffect(() => {
        form.reset({ searchQuery })
    }, [form, searchQuery])

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={`bg-slate-100 shadow-lg rounded-lg flex items-center py-3 pl-5 
                    ${form.formState.errors.searchQuery && "border-red-500"}`}
            >
                <button type="submit">
                    <Search className="text-gray-400" />
                </button>
                <FormField
                    control={form.control}
                    name="searchQuery"
                    render={({ field }) =>
                        <FormItem className="flex-1">
                            <FormControl>
                                <Input
                                    {...field}
                                    className="border-none shadow-none text-gray-600 text-md focus-visible:ring-0"
                                    placeholder={placeHolder}
                                />
                            </FormControl>
                        </FormItem>
                    }
                />
            </form>
        </Form>
    )
}

export default SearchSection
