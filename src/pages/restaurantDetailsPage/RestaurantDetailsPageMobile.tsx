import { MenuItem as MenuItemType } from "@/types"
import { ChevronLeft, LucideHeart, Plus, ShoppingBag } from "lucide-react"
import RestaurantStats from "@/components/RestaurantStats"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { Card, CardFooter } from "@/components/ui/card"
import OrderSummary from "@/components/OrderSummary"
import CheckoutButton from "@/components/CheckoutButton"
import { Restaurant } from "@/types"
import { CartItem } from "./RestaurantDetailsPage"
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useEffect, useState } from "react"

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
    const [isAtBottom, setIsAtBottom] = useState(false);

    // Function to check if the user has scrolled to the bottom
    const handleScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight;
        const windowHeight = document.documentElement.scrollHeight;

        // Check if the user is near the bottom of the page
        if (scrollPosition >= windowHeight - 50) { // 50 can be adjusted for a threshold
            setIsAtBottom(true);
        } else {
            setIsAtBottom(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="space-y-5 pb-20">
            <div
                className="flex justify-between -mt-5 -mx-5 p-5 h-80 rounded-b-3xl bg-cover bg-center"
                style={{ backgroundImage: `url('https://www.announcementconverters.com/media/catalog/product/S/-/S-ILG11F_9.JPG')` }}
            >
                <div className="bg-slate-100 rounded-full w-12 h-12 flex items-center justify-center">
                    <ChevronLeft className="text-gray-600" />
                </div>
                <div className="bg-slate-100 rounded-full w-12 h-12 flex items-center justify-center">
                    <LucideHeart className="text-gray-600" />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <RestaurantStats restaurant={restaurant} />
                <span className="text-xl font-medium">{restaurant.restaurantName}</span>
                <p className="text-gray-600 text-sm">
                    At {restaurant.restaurantName}, enjoy a vibrant dining experience with a diverse
                    menu featuring fresh ingredients and creative dishes.
                    Whether you’re here for a casual lunch or a special dinner,
                    our welcoming atmosphere and attentive service make every meal memorable.
                </p>
            </div>

            <div className="flex gap-2 overflow-x-auto whitespace-nowrap px-4 -mx-4">
                {restaurant.cuisines.map((cuisine) => (
                    <div
                        key={cuisine}
                        className={`border-2 border-slate-100 rounded-full py-2 px-4
                            ${checkedFoodSection === cuisine ? 'bg-orange-500 text-white' : 'border-2 border-slate-100'}
                            `}
                        onClick={() => handleFoodSection(cuisine)}
                    >
                        {cuisine}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-5">
                {restaurant.menuItems.map((menuItem) => (
                    <div key={menuItem._id} className="flex flex-col rounded-xl shadow-lg p-3 gap-1">
                        <AspectRatio ratio={5 / 3}>
                            <img
                                src="https://www.announcementconverters.com/media/catalog/product/S/-/S-ILG11F_9.JPG"
                                alt={menuItem.name}
                                className="object-cover w-full h-full rounded-xl"
                            />
                        </AspectRatio>
                        <span className="font-medium">{menuItem.name}</span>
                        <div className="flex justify-between items-center">
                            <span>${(menuItem.price / 100).toFixed(2)}</span>
                            <span
                                className="flex items-center justify-center rounded-full bg-orange-500 text-white w-7 h-7"
                                onClick={() => addToCart(menuItem)}
                            >
                                <Plus size={16} />
                            </span>
                        </div>
                    </div>
                ))}
            </div>

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
                                        3
                                    </span>
                                    <ShoppingBag />
                                </div>
                                <span className="ml-5 font-bold">Go to check out</span>
                            </>
                        ) : (
                            <>
                                <ShoppingBag />
                                <span className="absolute bottom-6 left-6 w-7 h-7 flex items-center justify-center font-medium bg-orange-500 rounded-full">
                                    3
                                </span>
                            </>
                        )}
                    </div>
                </SheetTrigger>
                <SheetContent side="bottom">
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
                </SheetContent>
            </Sheet>
        </div >
    )
}

export default RestaurantDetailsPageMobile;
