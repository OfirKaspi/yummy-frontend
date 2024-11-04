import { Home, ShoppingBag, Star, User, Utensils } from 'lucide-react'

export const navLinks = [
    { to: '/', icon: Home, tooltip: 'Home Page', label: 'Home' },
    { to: '/my-orders', icon: ShoppingBag, tooltip: 'Order Status', label: 'My Orders' },
    { to: '/my-restaurant', icon: Utensils, tooltip: 'Manage Restaurant', label: 'My Restaurant' },
    { to: '/my-profile', icon: User, tooltip: 'User Profile', label: 'My Profile' },
    { to: '/my-favorites', icon: Star, tooltip: 'Favorite Restaurants', label: 'My Favorites' },
]