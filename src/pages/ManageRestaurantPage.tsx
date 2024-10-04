import { useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant } from "@/api/MyRestaurantApi"
import MyRestaurantOrders from "@/components/order/MyRestaurantOrders"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm"

const ManageRestaurantPage = () => {
    const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant()
    const { restaurant } = useGetMyRestaurant()
    const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateMyRestaurant()

    const isEditing = !!restaurant

    return (
        <Tabs defaultValue="orders">
            <TabsList>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
                <MyRestaurantOrders />
            </TabsContent>
            <TabsContent value="manage-restaurant">
                <ManageRestaurantForm
                    restaurant={restaurant}
                    onSave={isEditing ? updateRestaurant : createRestaurant}
                    isLoading={isCreateLoading || isUpdateLoading}
                />
            </TabsContent>
        </Tabs>
    )
}

export default ManageRestaurantPage