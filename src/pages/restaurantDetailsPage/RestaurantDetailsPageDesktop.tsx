import { MenuItem as MenuItemType, Restaurant, CartItem } from "@/types"
import { Card, CardFooter } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"

import MenuItem from "@/components/MenuItem"
import RestaurantInfo from "@/components/RestaurantInfo"
import OrderSummary from "@/components/order/OrderSummary"
import CheckoutButton from "@/components/order/CheckoutButton"
import { UserFormData } from "@/forms/user-profile-form/UserDetailsOrderForm"

type Props = {
    restaurant: Restaurant
    cartItems: CartItem[]
    addToCart: (menuItem: MenuItemType) => void
    onCheckout: (userFormData: UserFormData) => void
    isCheckoutLoading: boolean
    adjustItemQuantity: (cartItem: CartItem, newQuantity: number) => void
    removeFromCart: (cartItem: CartItem) => void
}


const RestaurantDetailsPageDesktop = ({
    restaurant,
    cartItems,
    addToCart,
    onCheckout,
    isCheckoutLoading,
    adjustItemQuantity,
    removeFromCart,
}: Props) => {
    return (
        <div className="flex flex-col gap-10">
            <AspectRatio ratio={16 / 5}>
                <img src={restaurant?.imageUrl} className="rounded-md object-cover h-full w-full" />
            </AspectRatio>
            <div className="grid md:grid-cols-[4fr_2fr] gap-5 lg:px-32">
                <div className="flex flex-col gap-4">
                    <RestaurantInfo restaurant={restaurant} />
                    <span className="text-2xl font-bold tracking-tight">Menu</span>
                    {restaurant.menuItems.map((menuItem) => (
                        <MenuItem key={menuItem._id} menuItem={menuItem} addToCart={() => addToCart(menuItem)} />
                    ))}
                </div>
                <div>
                    <Card className="md:sticky md:top-5">
                        <OrderSummary
                            restaurant={restaurant}
                            cartItems={cartItems}
                            removeFromCart={removeFromCart}
                            adjustItemQuantity={adjustItemQuantity}
                        />
                        <CardFooter>
                            <CheckoutButton
                                disabled={cartItems.length === 0}
                                onCheckout={onCheckout}
                                isLoading={isCheckoutLoading}
                            />
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default RestaurantDetailsPageDesktop