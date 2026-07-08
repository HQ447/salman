import React, { useContext } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import {
    BarChart3,
    Store,
    Package,
    ShoppingBag,
    Users,
    Settings,
    LogOut,
    Globe,
    Shield,
    X,
    ChevronRight
} from 'lucide-react'

function AdminSidebar({ isOpen, toggleSidebar }) {
    const { currentUser, logoutUser, vendors, products } = useContext(AppContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        logoutUser()
        navigate('/')
    }

    const navigationItems = [
        { name: 'Analytics', path: '/admin', icon: BarChart3, desc: 'Platform overview' },
        { name: 'Vendors', path: '/admin/vendors', icon: Store, desc: 'Merchant registry' },
        { name: 'Products', path: '/admin/products', icon: Package, desc: 'Catalog audit' },
        { name: 'Orders', path: '/admin/orders', icon: ShoppingBag, desc: 'Fulfillment logs' },
        { name: 'Administration', path: '/admin/administration', icon: Users, desc: 'User accounts' },
        { name: 'Settings', path: '/admin/settings', icon: Settings, desc: 'Platform config' },
    ]

    const pendingVendors = vendors.filter(v => !v.verified).length

    return (
        <>
            <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-white border-r border-border-custom transition-transform duration-300 lg:static lg:translate-x-0 shadow-sm ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex h-16 sm:h-18 items-center justify-between px-5 border-b border-border-custom">
                    <Link to="/admin" className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
                            <Shield className="text-white w-4 h-4" />
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="text-sm font-bold text-text-dark tracking-tight leading-tight">
                                Admin Console
                            </span>
                            <span className="text-[10px] font-medium text-muted-gray leading-none">
                                Souq Diyanat
                            </span>
                        </div>
                    </Link>
                    <button
                        onClick={toggleSidebar}
                        className="lg:hidden text-muted-gray hover:text-text-dark p-1 rounded-lg transition"
                        aria-label="Close sidebar"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="mx-4 mt-5 p-4 rounded-xl bg-primary-light border border-primary/15">
                    <div className="flex items-center space-x-3">
                        <img
                            src={currentUser?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"}
                            alt={currentUser?.name}
                            className="w-10 h-10 rounded-lg object-cover border border-primary/20"
                        />
                        <div className="flex-1 min-w-0 text-left">
                            <h4 className="text-xs font-bold text-text-dark truncate">
                                {currentUser?.name || "Administrator"}
                            </h4>
                            <p className="text-[10px] text-muted-gray truncate font-medium mt-0.5">{currentUser?.email}</p>
                            <span className="inline-flex items-center mt-1.5 px-1.5 py-0.5 rounded bg-primary/10 text-primary font-bold text-[9px]">
                                Platform Admin
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mx-4 mt-3 grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-lg bg-bg-custom border border-border-custom text-center">
                        <p className="text-sm font-black text-text-dark">{vendors.length}</p>
                        <p className="text-[9px] text-muted-gray font-medium">Vendors</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-bg-custom border border-border-custom text-center">
                        <p className="text-sm font-black text-text-dark">{products.length}</p>
                        <p className="text-[9px] text-muted-gray font-medium">Products</p>
                    </div>
                </div>

                <nav className="flex-1 space-y-1 px-3 mt-5 overflow-y-auto">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-muted-light px-3 mb-2">Navigation</p>
                    {navigationItems.map((item) => {
                        const Icon = item.icon
                        const badge = item.path === '/admin/vendors' && pendingVendors > 0 ? pendingVendors : null
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === '/admin'}
                                onClick={() => window.innerWidth < 1024 && toggleSidebar()}
                                className={({ isActive }) =>
                                    `flex items-center px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${isActive
                                        ? 'bg-primary text-white shadow-sm'
                                        : 'text-muted-gray hover:text-text-dark hover:bg-bg-custom'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center mr-3 shrink-0 ${isActive ? 'bg-white/20' : 'bg-bg-custom group-hover:bg-white'}`}>
                                            <Icon className="w-3.5 h-3.5" />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <div className={`leading-tight font-semibold ${isActive ? 'text-white' : 'text-text-dark'}`}>{item.name}</div>
                                            <div className={`text-[10px] leading-none mt-0.5 ${isActive ? 'text-white/70' : 'text-muted-gray'}`}>{item.desc}</div>
                                        </div>
                                        {badge && (
                                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-warning-custom/10 text-warning-custom'}`}>
                                                {badge}
                                            </span>
                                        )}
                                        {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/70" />}
                                    </>
                                )}
                            </NavLink>
                        )
                    })}
                </nav>

                <div className="p-3 border-t border-border-custom space-y-1.5">
                    <Link
                        to="/"
                        className="flex w-full items-center px-3 py-2.5 rounded-xl text-xs font-semibold text-primary hover:bg-primary-light transition border border-primary/20"
                    >
                        <Globe className="w-3.5 h-3.5 mr-2.5" />
                        Go to Marketplace
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center px-3 py-2.5 rounded-xl text-xs font-semibold text-danger-custom hover:bg-red-50 transition border border-transparent hover:border-red-100"
                    >
                        <LogOut className="w-3.5 h-3.5 mr-2.5" />
                        Sign Out
                    </button>

                    <div className="text-[9px] text-muted-gray text-center pt-1">
                        Souq Diyanat Admin v1.0
                    </div>
                </div>
            </aside>

            {isOpen && (
                <div
                    onClick={toggleSidebar}
                    className="fixed inset-0 z-40 bg-text-dark/20 backdrop-blur-sm lg:hidden"
                />
            )}
        </>
    )
}

export default AdminSidebar
