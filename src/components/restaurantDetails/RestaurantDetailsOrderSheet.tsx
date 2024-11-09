import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Restaurant, CartItem } from "@/types"
import OrderSummary from "@/components/order/OrderSummary"
import CheckoutButton from "@/components/order/CheckoutButton"
import ShoppingCartCmp from "@/components/ShoppingCartCmp"
import useScrollPosition from "@/hooks/useScrollPosition"
import { Button } from "../ui/button"
import useCheckout from "@/hooks/order/useCheckout"

type Props = {
    restaurant: Restaurant
    cartItems: CartItem[]
    handleCartAction: (cartItem: CartItem, action: "add" | "update" | "remove") => void
}

const RestaurantDetailsOrderSheet = ({
    restaurant,
    cartItems,
    handleCartAction,
}: Props) => {
    const { onCheckout, isCheckoutLoading } = useCheckout(restaurant, cartItems)
    const isAtBottom = useScrollPosition()
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0)

    return (
        <Sheet>
            <SheetTrigger asChild className={`fixed bottom-5 right-5 z-50 h-12 ${isAtBottom ? 'w-[calc(100%-2rem)]' : 'w-12'}`}>
                <Button
                    className="flex items-center justify-center bg-slate-900 dark:bg-cyan-700 text-white transition-all duration-300 rounded-full hover:bg-primary"
                >
                    <ShoppingCartCmp totalQuantity={totalQuantity} />
                    {isAtBottom && <span className={`${totalQuantity > 0 && 'ml-2'} font-medium`}>Go to check out</span>}
                </Button>
            </SheetTrigger>

            <SheetContent side="bottom" className="rounded-t-3xl">
                <OrderSummary
                    restaurant={restaurant}
                    cartItems={cartItems}
                    handleCartAction={handleCartAction}
                />
                <div className="px-6">
                    <CheckoutButton
                        disabled={cartItems.length === 0}
                        onCheckout={onCheckout}
                        isLoading={isCheckoutLoading}
                    />
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default RestaurantDetailsOrderSheet
