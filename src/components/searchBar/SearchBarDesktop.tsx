import { Search } from "lucide-react"
import { Form, FormControl, FormField, FormItem } from "../ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchForm } from "@/components/searchBar/SearchBar"
import { UseFormReturn } from "react-hook-form"

type Props = {
    form: UseFormReturn<SearchForm>
    handleReset: () => void
    onSubmit: (formData: SearchForm) => void,
    placeHolder: string,
}

const SearchBarDesktop = ({
    form,
    handleReset,
    onSubmit,
    placeHolder,
}: Props) => {
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={`flex items-center gap-3 justify-between flex-row border-2 rounded-full p-3 
                    ${form.formState.errors.searchQuery && "border-red-500"}
                `}
            >
                <Search strokeWidth={2.5} size={30} className="ml-1 text-orange-500 hidden md:block" />
                <FormField
                    control={form.control}
                    name="searchQuery"
                    render={({ field }) =>
                        <FormItem className="flex-1">
                            <FormControl>
                                <Input
                                    {...field}
                                    className="border-none shadow-none text-xl focus-visible:ring-0"
                                    placeholder={placeHolder}
                                />
                            </FormControl>
                        </FormItem>
                    }
                />
                <Button
                    onClick={handleReset}
                    type="button"
                    variant="outline"
                    className="rounded-full"
                >
                    Reset
                </Button>
                <Button type="submit" className="rounded-full bg-orange-500" >
                    Search
                </Button>
            </form>
        </Form>
    )
}

export default SearchBarDesktop