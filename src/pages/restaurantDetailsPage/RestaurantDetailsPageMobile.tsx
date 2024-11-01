import { MenuItem as MenuItemType } from "@/types"
import { Restaurant, CartItem } from "@/types"
import { UserFormData } from "@/forms/user-profile-form/UserDetailsOrderForm"
import RestaurantDetailsNavMobile from "@/components/restaurantDetailsPageMobile/RestaurantDetailsNavMobile"
import RestaurantDetailsDescriptionMobile from "@/components/restaurantDetailsPageMobile/RestaurantDetailsDescriptionMobile"
import RestaurantDetailsCuisinesMobile from "@/components/restaurantDetailsPageMobile/RestaurantDetailsCuisinesMobile"
import RestaurantDetailsMenuItemsListMobile from "@/components/restaurantDetailsPageMobile/RestaurantDetailsMenuItemsListMobile"
import RestaurantDetailsOrderSheetMobile from "@/components/restaurantDetailsPageMobile/RestaurantDetailsOrderSheetMobile"

type Props = {
    restaurant: Restaurant
    cartItems: CartItem[]
    addToCart: (menuItem: MenuItemType) => void
    handleFoodSection: (foodSection: string) => void
    checkedFoodSection: string
    onCheckout: (userFormData: UserFormData) => void
    isCheckoutLoading: boolean
    adjustItemQuantity: (cartItem: CartItem, newQuantity: number) => void
    removeFromCart: (cartItem: CartItem) => void
}

const RestaurantDetailsPageMobile = ({
    restaurant,
    cartItems,
    addToCart,
    handleFoodSection,
    checkedFoodSection,
    onCheckout,
    isCheckoutLoading,
    adjustItemQuantity,
    removeFromCart
}: Props) => {

    return (
        <div className="space-y-5 p-5 pb-24">
            <RestaurantDetailsNavMobile restaurantImg={restaurant.imageUrl} />
            <RestaurantDetailsDescriptionMobile restaurant={restaurant} />
            <RestaurantDetailsCuisinesMobile
                cuisines={restaurant.cuisines}
                handleFoodSection={handleFoodSection}
                checkedFoodSection={checkedFoodSection}
            />
            <RestaurantDetailsMenuItemsListMobile
                cartItems={cartItems}
                menuItems={restaurant.menuItems}
                addToCart={addToCart}
            />
            <RestaurantDetailsOrderSheetMobile
                restaurant={restaurant}
                cartItems={cartItems}
                isCheckoutLoading={isCheckoutLoading}
                onCheckout={onCheckout}
                adjustItemQuantity={adjustItemQuantity}
                removeFromCart={removeFromCart}
            />
        </div>
    )
}

export default RestaurantDetailsPageMobile
