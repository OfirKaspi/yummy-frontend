import { useSelector } from "react-redux"
import { StarIcon } from "lucide-react"
import { StarFilledIcon } from "@radix-ui/react-icons"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip"
import { selectFavoriteRestaurants, selectUserLoading } from "@/store/user/userSelectors"

type Props = {
  onClick: () => void
  restaurantId: string
}

const FavoriteStar = ({ onClick, restaurantId }: Props) => {
  const favoriteRestaurants = useSelector(selectFavoriteRestaurants)
  const isUserLoading = useSelector(selectUserLoading)
  const isFavorite = favoriteRestaurants.some((favResId) => favResId._id === restaurantId)

  let renderContent

  switch (true) {
    case isUserLoading:
      renderContent = {
        icon: <StarIcon className="text-muted-foreground w-6 h-6" />,
        text: "Loading..."
      }
      break
    case isFavorite:
      renderContent = {
        icon: <StarFilledIcon onClick={onClick} className="text-orange-500 w-6 h-6 cursor-pointer" />,
        text: "Remove from favorites"
      }
      break
    default:
      renderContent = {
        icon: <StarIcon onClick={onClick} className="text-orange-500 w-6 h-6 cursor-pointer" />,
        text: "Add to favorites"
      }
      break
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{renderContent.icon}</TooltipTrigger>
        <TooltipContent>
          <p>{renderContent.text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default FavoriteStar
