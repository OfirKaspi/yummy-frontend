import { useFormContext } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CityList from "@/components/search/CityList"
import { useCitySearch } from "@/hooks/useCitySearch"
import { useState } from "react"

const DetailsSection = () => {
    const { control, setValue } = useFormContext()
    const [searchTerm, setSearchTerm] = useState<string>("")
    const { cities, isLoading: isCityLoading, isError } = useCitySearch(searchTerm)

    const handleCitySelect = (cityName: string) => {
        setValue("city", cityName)
        setSearchTerm("")
    }

    return (
        <div className="space-y-2">
            <div className="space-y-2">
                <h2 className="text-2xl font-medium">Details</h2>
                <FormDescription>Enter the details about your restaurant</FormDescription>
            </div>
            <FormField
                control={control}
                name="restaurantName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className="space-y-2 sm:space-y-0 sm:flex sm:gap-4">
                <FormField
                    control={control}
                    name="city"
                    render={({ field }) => (
                        <FormItem className="flex-1 relative">
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e)
                                        setSearchTerm(e.target.value)
                                    }}
                                    value={field.value}
                                    className="bg-white"
                                />
                            </FormControl>
                            <FormMessage />
                            {searchTerm.length > 2 && (
                                <CityList
                                    cities={cities}
                                    isLoading={isCityLoading}
                                    isError={isError}
                                    debouncedTerm={searchTerm}
                                    onCitySelect={handleCitySelect}
                                />
                            )}
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="country"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                                <Input {...field} value="Israel" disabled className="bg-gray-200" />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>
            <FormField
                control={control}
                name="estimatedDeliveryTime"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Estimated Delivery Time (minutes)</FormLabel>
                        <FormControl className="w-[5rem]">
                            <Input
                                {...field}
                                type="number"
                                step="1"
                                value={field.value ?? ""}
                                placeholder="30"
                                className="bg-white no-arrows"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="deliveryPrice"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Delivery Price ($)</FormLabel>
                        <FormControl className="w-[5rem]">
                            <Input
                                {...field}
                                type="number"
                                step="0.01"
                                value={field.value ?? ""}
                                placeholder="1.50"
                                className="bg-white no-arrows"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}

export default DetailsSection
