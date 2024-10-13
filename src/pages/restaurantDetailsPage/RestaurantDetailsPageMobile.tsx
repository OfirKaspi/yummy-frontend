import { MenuItem as MenuItemType } from "@/types"
import { ShoppingBag } from "lucide-react"
import { Restaurant } from "@/types"
import { CartItem } from "./RestaurantDetailsPage"
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useEffect, useState } from "react"
import RestaurantDetailsNavMobile from "@/components/restaurantDetailsPageMobile/RestaurantDetailsNavMobile"
import RestaurantDetailsDescriptionMobile from "@/components/restaurantDetailsPageMobile/RestaurantDetailsDescriptionMobile"
import RestaurantDetailsCuisinesMobile from "@/components/restaurantDetailsPageMobile/RestaurantDetailsCuisinesMobile"
import RestaurantDetailsMenuItemsListMobile from "@/components/restaurantDetailsPageMobile/RestaurantDetailsMenuItemsListMobile"
import OrderSummary from "@/components/OrderSummary"
import CheckoutButton from "@/components/CheckoutButton"

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
    const [isAtBottom, setIsAtBottom] = useState(false)

    const handleScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight
        const windowHeight = document.documentElement.scrollHeight

        if (scrollPosition >= windowHeight - 50) {
            setIsAtBottom(true)
        } else {
            setIsAtBottom(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className="space-y-5 pb-20">
            <RestaurantDetailsNavMobile restaurantImg={restaurant.imageUrl} />
            <RestaurantDetailsDescriptionMobile restaurant={restaurant} />
            <RestaurantDetailsCuisinesMobile
                cuisines={restaurant.cuisines}
                handleFoodSection={handleFoodSection}
                checkedFoodSection={checkedFoodSection}
            />
            <RestaurantDetailsMenuItemsListMobile
                menuItems={restaurant.menuItems}
                addToCart={addToCart}
            />

            {/* <RestaurantDetailsOrderMobile
                restaurant={restaurant}
                cartItems={cartItems}
                onCheckout={onCheckout}
                isCheckoutLoading={isCheckoutLoading}
                adjustItemQuantity={adjustItemQuantity}
                removeFromCart={removeFromCart}
            /> */}

            <Sheet>
                <SheetTrigger asChild className={`fixed bottom-5 right-5 z-50`}>
                    <div
                        className={`flex items-center justify-center 
                                ${isAtBottom ? 'w-[calc(100%-2rem)] h-16' : 'w-12 h-12'} 
                                bg-slate-900 text-white transition-all duration-300 rounded-full`}
                    >
                        {isAtBottom ? (
                            <>
                                <div className="relative">
                                    <span className="absolute bottom-3 left-3 w-7 h-7 flex items-center justify-center font-medium bg-orange-500 rounded-full">
                                        {totalQuantity}
                                    </span>
                                    <ShoppingBag />
                                </div>
                                <span className="ml-5 font-bold">Go to check out</span>
                            </>
                        ) : (
                            <>
                                <ShoppingBag />
                                <span className="absolute bottom-6 left-6 w-7 h-7 flex items-center justify-center font-medium bg-orange-500 rounded-full">
                                    {totalQuantity}
                                </span>
                            </>
                        )}
                    </div>
                </SheetTrigger>
                <SheetContent side="bottom" className="rounded-t-3xl">
                    <div>
                        <OrderSummary
                            restaurant={restaurant}
                            cartItems={cartItems}
                            removeFromCart={removeFromCart}
                            adjustItemQuantity={adjustItemQuantity}
                        />
                        <div className="px-6">
                            <CheckoutButton
                                disabled={cartItems.length === 0}
                                onCheckout={onCheckout}
                                isLoading={isCheckoutLoading}
                            />
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div >
    )
}

export default RestaurantDetailsPageMobile;
