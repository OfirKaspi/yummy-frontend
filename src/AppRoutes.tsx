import { Navigate, Route, Routes } from 'react-router-dom'

import Layout from '@/components/layout/Layout'
import HomePage from '@/pages/HomePage'
import AuthCallbackPage from '@/pages/AuthCallbackPage'
import MyProfilePage from '@/pages/MyProfilePage'
import ProtectedRoute from '@/auth/ProtectedRoute'
import MyRestaurantPage from '@/pages/MyRestaurantPage'
import SearchPage from '@/pages/searchPage/SearchPage'
import RestaurantDetailsPage from '@/pages/restaurantDetailsPage/RestaurantDetailsPage'
import MyOrdersPage from '@/pages/MyOrdersPage'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout><HomePage /></Layout>} />
            <Route path='/auth-callback' element={<AuthCallbackPage />} />
            <Route path='/search/:city' element={<Layout><SearchPage /></Layout>} />
            <Route path='/details/:restaurantId' element={<RestaurantDetailsPage />} />
            <Route element={<ProtectedRoute />}>
                <Route path='/my-orders' element={<Layout><MyOrdersPage /></Layout>} />
                <Route path='/my-profile' element={<Layout><MyProfilePage /></Layout>} />
                <Route path='/my-restaurant' element={<Layout><MyRestaurantPage /></Layout>} />
            </Route>
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}

export default AppRoutes