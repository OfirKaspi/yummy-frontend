import { UseFormReturn } from "react-hook-form"
import { SearchForm } from "@/components/search/RestaurantSearch"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Eraser, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

type Props = {
    form: UseFormReturn<SearchForm>
    onSubmit: (formData: SearchForm) => void
    placeHolder: string
    handleReset: () => void
    isInputFilled: boolean
    onSearchChange?: (value: string) => void
}

const SearchBar = ({
    form,
    onSubmit,
    placeHolder,
    handleReset,
    isInputFilled,
    onSearchChange,
}: Props) => {
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={`border-2 rounded-lg flex items-center p-2 md:h-full md:p-0
                    ${form.formState.errors.searchQuery && "border-red-500"}`}
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
                                    placeholder={placeHolder}
                                    onChange={(e) => {
                                        field.onChange(e)
                                        if (onSearchChange) onSearchChange(e.target.value)
                                    }}
                                    className="border-none text-gray-800 dark:text-gray-200 text-md shadow-none focus-visible:ring-0"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                {isInputFilled && (
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
    )
}

export default SearchBar
