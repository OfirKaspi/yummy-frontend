import { useCreateMyRestaurant } from "@/hooks/myRestaurant/useCreateMyRestaurant"
import { useUpdateMyRestaurant } from "@/hooks/myRestaurant/useUpdateMyRestaurant"
import { useGetMyRestaurant } from "@/hooks/myRestaurant/useGetMyRestaurant"
import useDeviceType from "@/hooks/useDeviceType"
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm"
import MyRestaurantOrders from "@/components/order/MyRestaurantOrders"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const MyRestaurantPage = () => {
    const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant()
    const { restaurant } = useGetMyRestaurant()
    const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateMyRestaurant()
    const { isMobile } = useDeviceType()

    const isEditing = !!restaurant

    return (
        <div className="space-y-5">
            <Tabs defaultValue="orders" className="space-y-5">
                <TabsList className={`${isMobile && 'flex'}`}>
                    <TabsTrigger value="orders" className={`${isMobile && 'flex-1'}`}>Orders</TabsTrigger>
                    <TabsTrigger value="manage-restaurant" className={`${isMobile && 'flex-1'}`}>Manage Restaurant</TabsTrigger>
                </TabsList>
                <Separator />
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

export default MyRestaurantPage