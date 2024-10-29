import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import CityList from "@/components/city/CityList"
import { useState, useEffect } from "react"
import { useCitySearch } from "@/hooks/useCitySearch"

const addressSchema = z.object({
    addressLine1: z.string().min(1, "Address Line is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required").default("Israel"),
})

type AddressFormData = z.infer<typeof addressSchema>

type Props = {
    address: AddressFormData
    onChange: (data: AddressFormData) => void
    onRemove: () => void
    onCitySelect: (cityName: string, index: number) => void
    index: number
}

const AddressFormItem = ({ address, onChange, onRemove, onCitySelect, index }: Props) => {
    const form = useForm<AddressFormData>({
        resolver: zodResolver(addressSchema),
        defaultValues: address,
    })

    const [searchCityTerm, setSearchCityTerm] = useState("")
    const { cities, isLoading: isCityLoading, isError } = useCitySearch(searchCityTerm)

    useEffect(() => {
        const subscription = form.watch((data) => onChange(data as AddressFormData))
        return () => subscription.unsubscribe()
    }, [form, onChange])

    const handleCitySelect = (cityName: string) => {
        form.setValue("city", cityName)
        onCitySelect(cityName, index)
        setSearchCityTerm("")
    }

    return (
        <Form {...form}>
            <form className="space-y-4 border p-4 rounded-lg">
                <FormField
                    control={form.control}
                    name="addressLine1"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address Line</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem className="relative">
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e)
                                        setSearchCityTerm(e.target.value)
                                    }}
                                    value={field.value}
                                    className="bg-white"
                                />
                            </FormControl>
                            <FormMessage />
                            {searchCityTerm.length > 2 && (
                                <CityList
                                    cities={cities}
                                    isLoading={isCityLoading}
                                    isError={isError}
                                    debouncedTerm={searchCityTerm}
                                    onCitySelect={handleCitySelect}
                                />
                            )}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                                <Input {...field} disabled className="bg-gray-100" value="Israel" />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="button" variant="outline" onClick={onRemove}>
                    Remove
                </Button>
            </form>
        </Form>
    )
}

export default AddressFormItem
