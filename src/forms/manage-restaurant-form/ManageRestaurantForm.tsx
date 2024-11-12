import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Restaurant } from "@/types"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import LoadingButton from "@/components/LoadingButton"
import DetailsSection from "@/forms/manage-restaurant-form/DetailsSection"
import CuisinesSection from "@/forms/manage-restaurant-form/CuisinesSection"
import MenuSection from "@/forms/manage-restaurant-form/MenuCategories"
import ImageSection from "@/forms/manage-restaurant-form/ImageSection"
import { showToast } from "@/utils/showToast"
import { RestaurantFormValues, restaurantSchema } from "@/types/restaurantFormType"

type Props = {
    restaurant?: Restaurant
    onSave: (restaurantFormData: FormData) => void
    isLoading: boolean
}

const ManageRestaurantForm = ({ restaurant, onSave, isLoading }: Props) => {
    const form = useForm<RestaurantFormValues>({
        resolver: zodResolver(restaurantSchema),
        defaultValues: {
            country: "Israel",
            cuisines: [],
            menuCategories: [{ name: "", menuItems: [{ name: "", price: 0 }] }]
        }
    })

    const { reset } = form

    useEffect(() => {
        console.log(restaurant)
        if (restaurant) {
            reset({
                restaurantName: restaurant.restaurantName || "",
                city: restaurant.city || "",
                country: restaurant.country || "Israel",
                cuisines: restaurant.cuisines || [],
                deliveryPrice: restaurant.deliveryPrice || 0,
                estimatedDeliveryTime: restaurant.estimatedDeliveryTime || 0,
                imageUrl: restaurant.imageUrl || undefined,
                imageFile: undefined,
                menuCategories: restaurant.menuCategories?.map((category) => ({
                    name: category.name || "",
                    menuItems: category.menuItems.map((item) => ({
                        name: item.name || "",
                        price: item.price || 0,
                        imageUrl: item.imageUrl || undefined,
                        imageFile: undefined,
                    })),
                })) || [{ name: "", menuItems: [{ name: "", price: 0, imageFile: undefined }] }],
            });
        }
    }, [restaurant, reset]);

    const onSubmit = (data: RestaurantFormValues) => {
        if (!data.city) {
            showToast("Please select a valid city from the suggestions.", "info")
            return
        }

        const formData = new FormData()
        formData.append("restaurantName", data.restaurantName)
        formData.append("city", data.city)
        formData.append("country", data.country)
        formData.append("deliveryPrice", (data.deliveryPrice * 100).toString())
        formData.append("estimatedDeliveryTime", data.estimatedDeliveryTime.toString())

        data.cuisines.forEach((cuisine, index) => {
            formData.append(`cuisines[${index}]`, cuisine)
        })

        data.menuCategories.forEach((category, catIndex) => {
            formData.append(`menuCategories[${catIndex}][name]`, category.name);
            category.menuItems.forEach((item, itemIndex) => {
                formData.append(`menuCategories[${catIndex}][menuItems][${itemIndex}][name]`, item.name);
                formData.append(`menuCategories[${catIndex}][menuItems][${itemIndex}][price]`, (item.price * 100).toString());

                console.log("formDate", Object.fromEntries(formData.entries()));
                console.log("item", item);

                if (item.imageFile instanceof File) {
                    const formattedName = item.name.replace(/\s+/g, "");
                    formData.append(`menuItem_${formattedName}_image`, item.imageFile);
                }
            });
        });

        if (data.imageFile) {
            formData.append("imageFile", data.imageFile)
        }
        // console.log("formDate", Object.fromEntries(formData.entries()));


        onSave(formData)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
            >
                <DetailsSection />
                <Separator />
                <CuisinesSection />
                <Separator />
                <MenuSection />
                <Separator />
                <ImageSection />

                {isLoading ? <LoadingButton /> : <Button className="bg-orange-500 dark:text-white" type="submit">Submit</Button>}
            </form>
        </Form>
    )
}

export default ManageRestaurantForm
