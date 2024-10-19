import { useFormContext } from "react-hook-form"

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const DetailsSection = () => {
    const { control } = useFormContext()

    return (
        <div className="space-y-2">
            <div className="space-y-2">
                <h2 className="text-2xl font-medium">Details</h2>
                <FormDescription>
                    Enter the details about your restaurant
                </FormDescription>
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
                        <FormItem className="flex-1">
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage />
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
                                <Input {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage />
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
                    <FormItem >
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