import { Link } from 'react-router-dom'
import { Restaurant, RestaurantCart } from '@/types'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'

type Props = {
    cart: RestaurantCart
    restaurant: Restaurant
}

const GlobalCartItem = ({ restaurant, cart }: Props) => {
    return (
        <div className="grid grid-cols-[80px_1fr] items-center gap-5">
            <AspectRatio ratio={1 / 1}>
                <img src={restaurant.imageUrl} className="rounded-lg object-cover h-full w-full" />
            </AspectRatio>
            <div className='space-y-1'>
                <div className="flex items-center justify-between">
                    <span className="font-medium text-lg">{restaurant.restaurantName}</span>
                    <span className="text-gray-600 text-xs">
                        {cart.cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
                    </span>
                </div>
                <div className="flex flex-col gap-1 text-xs text-gray-600">
                    <span>
                        Total: $
                        {(
                            cart.cartItems.reduce((total, item) => total + (item.price * item.quantity) / 100, 0) +
                            (restaurant.deliveryPrice / 100)
                        ).toFixed(2)}
                    </span>
                    <Link to={`/details/${restaurant._id}`} className="text-orange-500 underline">
                        View Restaurant
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default GlobalCartItem