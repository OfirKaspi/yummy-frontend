import { useForm } from "react-hook-form"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import LoadingButton from "@/components/LoadingButton"
import { Button } from "@/components/ui/button"
import CityList from "@/components/search/CityList"
import { useCitySearch } from "@/hooks/useCitySearch"
import { showToast } from "@/utils/showToast"
import { User } from "@/types"

const formSchema = z.object({
    email: z.string().default(""),
    name: z.string().min(1, "Name is required"),
    addressLine1: z.string().min(1, "Address Line 1 is required"),
    country: z.string().min(1, "Country is required").default("Israel"),
    city: z.string().min(1, "City is required"),
})

export type UserFormData = z.infer<typeof formSchema>

type Props = {
    currentUser: User
    onSave: (userProfileData: UserFormData) => void
    isLoading: boolean
    title?: string
    buttonText?: string
}

const UserProfileForm = ({
    currentUser,
    onSave,
    isLoading,
    title = "Confirm Delivery Details",
    buttonText = "Continue to payment"
}: Props) => {
    const { name, email, addresses } = currentUser
    const initialAddress = addresses?.[0] || { addressLine1: "", city: "", country: "Israel" }

    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: name || "",
            email: email || "",
            addressLine1: initialAddress.addressLine1,
            city: initialAddress.city,
            country: initialAddress.country || "Israel",
        },
    })

    const [searchCityTerm, setSearchCityTerm] = useState("")
    const [selectedCity, setSelectedCity] = useState<string | null>(null)
    const { cities, isLoading: isCityLoading, isError } = useCitySearch(searchCityTerm)

    const handleCitySelect = (cityName: string) => {
        form.setValue("city", cityName)
        setSelectedCity(cityName)
        setSearchCityTerm("")
    }

    const handleSubmit = (data: UserFormData) => {
        if (data.city === selectedCity || (initialAddress.city && data.city === initialAddress.city)) {
            onSave(data)
        } else {
            showToast("Please select a valid city from the suggestions.", "info")
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 rounded-lg lg:p-10">
                <div>
                    <h2 className="text-2xl font-medium">{title}</h2>
                </div>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} disabled />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-col md:flex-row gap-4">
                    <FormField
                        control={form.control}
                        name="addressLine1"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Address Line 1</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem className="flex-1 relative">
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        onChange={(e) => {
                                            field.onChange(e)
                                            setSelectedCity(null)
                                            setSearchCityTerm(e.target.value)
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                                {searchCityTerm.length > 2 && (
                                    <CityList
                                        cities={cities}
                                        isLoading={isCityLoading}
                                        isError={isError}
                                        onCitySelect={handleCitySelect}
                                        debouncedTerm={searchCityTerm}
                                    />
                                )}
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                {isLoading ? (
                    <LoadingButton />
                ) : (
                    <Button type="submit" className="bg-orange-500 dark:text-white dark:hover:bg-orange-400">
                        {buttonText}
                    </Button>
                )}
            </form>
        </Form>
    )
}

export default UserProfileForm
