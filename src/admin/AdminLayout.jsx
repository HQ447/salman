import React, { useState, useContext } from 'react'
import { Outlet, useLocation, Navigate, Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import AdminSidebar from './AdminSidebar'
import { Menu, Bell, ShieldCheck, HelpCircle } from 'lucide-react'

function AdminLayout() {
    const { currentUser } = useContext(AppContext)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const location = useLocation()

    if (!currentUser || currentUser.role !== 'Admin') {
        return <Navigate to="/login" replace />
    }

    const getPageTitle = () => {
        const path = location.pathname
        if (path.includes('vendors')) return 'Vendor Management'
        if (path.includes('products')) return 'Product Catalog'
        if (path.includes('orders')) return 'Order Oversight'
        if (path.includes('categories')) return 'Category Management'
        return 'Platform Analytics'
    }

    const getBreadcrumb = () => {
        const path = location.pathname
        if (path.includes('vendors')) return 'Admin Console / Vendors'
        if (path.includes('products')) return 'Admin Console / Products'
        if (path.includes('orders')) return 'Admin Console / Orders'
        if (path.includes('categories')) return 'Admin Console / Categories'
        return 'Admin Console / Overview'
    }

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

    return (
        <div className="flex h-screen overflow-hidden bg-bg-custom font-inter">
            <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex flex-col flex-1 min-w-0 overflow-y-auto">
                <header className="sticky top-0 z-30 flex h-16 sm:h-18 w-full items-center justify-between border-b border-border-custom bg-white px-4 sm:px-6 py-8 md:py-10 shadow-sm">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                        <button
                            onClick={toggleSidebar}
                            className="text-muted-gray lg:hidden hover:bg-border-light p-1.5 rounded-lg transition"
                            aria-label="Toggle sidebar"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <div className="text-left">
                            <h1 className="text-base font-bold text-text-dark tracking-tight leading-tight">
                                {getPageTitle()}
                            </h1>
                            <p className="hidden sm:block text-[10px] font-medium text-muted-gray uppercase tracking-widest">
                                {getBreadcrumb()}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-primary/30 bg-primary-light text-primary text-[10px] font-bold">
                            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                            <span>Shariah Governance</span>
                        </div>

                        <button className="relative p-2 text-muted-gray hover:text-text-dark hover:bg-bg-custom rounded-lg transition border border-border-custom">
                            <Bell className="w-4 h-4" />
                            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-primary animate-ping" />
                            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-primary" />
                        </button>

                        <Link
                            to="/about"
                            className="hidden sm:flex p-2 text-muted-gray hover:text-text-dark hover:bg-bg-custom rounded-lg transition border border-border-custom items-center justify-center"
                            title="Platform guidelines"
                        >
                            <HelpCircle className="w-4 h-4" />
                        </Link>

                        <div className="flex items-center space-x-2 sm:space-x-2.5 border-l border-border-custom pl-3 sm:pl-4">
                            <div className="hidden sm:flex flex-col text-right">
                                <span className="text-xs font-semibold text-text-dark leading-tight">{currentUser.name}</span>
                                <span className="text-[10px] text-primary font-semibold">Administrator</span>
                            </div>
                            <img
                                src={currentUser.avatar}
                                alt={currentUser.name}
                                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-primary/30 shadow-sm"
                            />
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AdminLayout
