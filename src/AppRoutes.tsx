import { Navigate, Route, Routes } from 'react-router-dom'

import Layout from '@/layouts/Layout'
import HomePage from '@/pages/homePage/HomePage'
import AuthCallbackPage from '@/pages/AuthCallbackPage'
import UserProfilePage from '@/pages/UserProfilePage'
import ProtectedRoute from '@/auth/ProtectedRoute'
import ManageRestaurantPage from '@/pages/ManageRestaurantPage'
import SearchPage from '@/pages/searchPage/SearchPage'
import RestaurantDetailsPage from '@/pages/restaurantDetailsPage/RestaurantDetailsPage'
import OrderStatusPage from '@/pages/orderStatus/OrderStatusPage'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout showHero><HomePage /></Layout>} />
            <Route path='/auth-callback' element={<AuthCallbackPage />} />
            <Route path='/search/:city' element={<Layout><SearchPage /></Layout>} />
            <Route path='/details/:restaurantId' element={<Layout><RestaurantDetailsPage /></Layout>} />
            <Route element={<ProtectedRoute />}>
                <Route path='/order-status' element={<Layout><OrderStatusPage /></Layout>} />
                <Route path='/user-profile' element={<Layout><UserProfilePage /></Layout>} />
                <Route path='/manage-restaurant' element={<Layout><ManageRestaurantPage /></Layout>} />
            </Route>
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}

export default AppRoutes