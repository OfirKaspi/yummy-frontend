import { useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant } from "@/api/MyRestaurantApi"
import MainNavMobile from "@/components/navigation/MainNavMobile"
import MyRestaurantOrders from "@/components/order/MyRestaurantOrders"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm"
import useDeviceType from "@/hooks/useDeviceType"

const ManageRestaurantPage = () => {
    const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant()
    const { restaurant } = useGetMyRestaurant()
    const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateMyRestaurant()
    const { isMobile } = useDeviceType()

    const isEditing = !!restaurant

    return (
        <div className="space-y-5">
            {isMobile &&
                <MainNavMobile>
                    My Restaurant
                </MainNavMobile>
            }
            <Tabs defaultValue="orders" className="space-y-5">
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
        </div>
    )
}

export default ManageRestaurantPage