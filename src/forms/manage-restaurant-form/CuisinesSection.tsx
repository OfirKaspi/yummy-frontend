import { useFormContext } from "react-hook-form"

import { FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { cuisineListWithImgsCloudinary } from "@/config/restaurant-options-config"
import CuisineCheckbox from "./CuisineCheckbox"

const CuisinesSection = () => {
    const { control } = useFormContext()

    return (
        <div className="space-y-2">
            <div className="space-y-2">
                <h2 className="text-2xl font-medium">Cuisines</h2>
                <FormDescription>
                    Select the cuisines that your restaurant serve
                </FormDescription>
            </div>
            <FormField control={control} name="cuisines" render={({ field }) => (
                <FormItem>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-1">
                        {cuisineListWithImgsCloudinary.map((cuisine) => (
                            <CuisineCheckbox key={cuisine.name} cuisine={cuisine} field={field} />
                        ))}
                    </div>
                    <FormMessage />
                </FormItem>
            )} />
        </div>
    )
}

export default CuisinesSection