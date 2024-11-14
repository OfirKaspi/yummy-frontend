import { CartItem, Restaurant } from "@/types"
import RestaurantDetailsMenuItemsList from "@/components/restaurantDetails/RestaurantDetailsMenuItemsList"
import RestaurantDetailsCategoriesSelection from "@/components/restaurantDetails/RestaurantDetailsCategoriesSelection"
import useCheckedFoodSection from "@/hooks/useCheckedFoodSection"

type Props = {
  cartItems: CartItem[]
  restaurant: Restaurant
  handleCartAction: (cartItem: CartItem, action: "add" | "update" | "remove") => void
}

const RestaurantDetailsMenuCategoriesList = ({ cartItems, restaurant, handleCartAction }: Props) => {
  const { checkedFoodSection, handleFoodSection } = useCheckedFoodSection(restaurant)

  return (
    <section className="space-y-2">
      <h2 className="text-xl">Restaurant Menu</h2>
      <div className="space-y-5">
        <RestaurantDetailsCategoriesSelection categories={restaurant.menuCategories} checkedFoodSection={checkedFoodSection} handleFoodSection={handleFoodSection} />
        <RestaurantDetailsMenuItemsList
          cartItems={cartItems}
          menuItems={checkedFoodSection?.menuItems}
          handleCartAction={handleCartAction}
        />
      </div>
    </section>
  )
}

export default RestaurantDetailsMenuCategoriesList