import { Restaurant, RestaurantCart } from '@/types'
import { Link } from 'react-router-dom'

type Props = {
    cart: RestaurantCart
    restaurant: Restaurant
}

const GlobalCartItem = ({ restaurant, cart }: Props) => {
    return (
        <div key={restaurant._id} className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
                <img
                    src={restaurant.imageUrl}
                    alt={restaurant.restaurantName}
                    className="object-cover w-20 h-20 rounded-xl"
                />
                <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="font-medium text-lg">{restaurant.restaurantName}</span>
                        <span className="text-gray-600 text-xs">
                            {cart.cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
                        </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600">
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
        </div>
    )
}

export default GlobalCartItem