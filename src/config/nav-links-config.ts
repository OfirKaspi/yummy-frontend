import { Home, ShoppingBag, User, Utensils } from 'lucide-react'

export const navLinks = [
    { to: '/', icon: Home, tooltip: 'Home Page', label: 'Home' },
    { to: '/my-orders', icon: ShoppingBag, tooltip: 'Order Status', label: 'Order Status' },
    { to: '/my-restaurant', icon: Utensils, tooltip: 'Manage Restaurant', label: 'Manage Restaurant' },
    { to: '/my-profile', icon: User, tooltip: 'User Profile', label: 'User Profile' },
]