import { UseFormReturn } from "react-hook-form"
import { SearchForm } from "@/components/searchBar/SearchBar"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Eraser, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

type Props = {
    form: UseFormReturn<SearchForm>
    onSubmit: (formData: SearchForm) => void,
    placeHolder: string,
    handleReset: () => void
    isInputFilled: boolean
}

const SearchBarMobile = ({
    form,
    onSubmit,
    placeHolder,
    handleReset,
    isInputFilled
}: Props) => {
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={`bg-slate-100 shadow-lg rounded-lg flex items-center p-3
                    ${form.formState.errors.searchQuery && "border-red-500"}`}
            >
                <button type="submit" className="text-gray-400 px-2" >
                    <Search />
                </button>
                <FormField
                    control={form.control}
                    name="searchQuery"
                    render={({ field }) =>
                        <FormItem className="flex-1">
                            <FormControl>
                                <Input
                                    {...field}
                                    className="border-none text-gray-600 text-md focus-visible:ring-0"
                                    placeholder={placeHolder}
                                />
                            </FormControl>
                        </FormItem>
                    }
                />
                {isInputFilled &&
                    <button
                        className="text-gray-400 px-2"
                        onClick={handleReset}
                    >
                        <Eraser />
                    </button>
                }
            </form>
        </Form>
    )
}

export default SearchBarMobile