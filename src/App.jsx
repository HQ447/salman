import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './main/MainLayout'
import Home from './main/Home'
import About from './main/About'
import Contact from './main/Contact'
import Categories from './main/Categories'
import Vendors from './main/Vendors'
import Cart from './main/Cart'
import Orders from './main/Orders'
import Profile from './main/Profile'
import Login from './auth/Login'
import UserRegistration from './auth/UserRegistration'
import VendorRegistration from './auth/VendorRegistration'
import AdminLayout from './admin/AdminLayout'
import AdminAnalytics from './admin/AdminAnalytics'
import AdminVendors from './admin/AdminVendors'
import AdminVendorDetails from './admin/AdminVendorDetails'
import AdminProducts from './admin/AdminProducts'
import AdminOrders from './admin/AdminOrders'
import AdminAdministration from './admin/AdminAdministration'
import AdminSettings from './admin/AdminSettings'
import VendorLayout from './vendor/VendorLayout'
import VendorAnalytics from './vendor/VendorAnalytics'
import ProductsManagement from './vendor/ProductsManagement'
import OrdersManagement from './vendor/OrdersManagement'
import VendorCategories from './vendor/VendorCategories'
import StoreSettings from './vendor/StoreSettings'
import VendorDetails from './main/VendorDetails'
import ProductDetails from './main/ProductDetails'
import Checkout from './main/Checkout'

function App() {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />} >
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="categories" element={<Categories />} />
          <Route path="vendors" element={<Vendors />} />
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
          <Route path="vendors/:vendorId" element={<VendorDetails />} />
          <Route path="products/:productId" element={<ProductDetails />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/vendor-registration" element={<VendorRegistration />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />} >
          <Route index element={<AdminAnalytics />} />
          <Route path="vendors" element={<AdminVendors />} />
          <Route path="vendors/:vendorId" element={<AdminVendorDetails />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="administration" element={<AdminAdministration />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Vendor Routes */}
        <Route path="/vendor" element={<VendorLayout />} >
          <Route index element={<VendorAnalytics />} />
          <Route path="products-management" element={<ProductsManagement />} />
          <Route path="orders-management" element={<OrdersManagement />} />
          <Route path="categories" element={<VendorCategories />} />
          <Route path="store-settings" element={<StoreSettings />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App