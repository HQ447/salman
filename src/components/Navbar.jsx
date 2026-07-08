import React, { useContext, useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, User, Menu, X, Search, Landmark, ChevronDown, LogOut, CheckCircle2 } from 'lucide-react'
import { AppContext } from '../context/AppContext'

function Navbar() {
    const { cart, currentUser, logoutUser } = useContext(AppContext)
    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [scrolled, setScrolled] = useState(false)
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
    const navigate = useNavigate()

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0)

    // Track scroll position for header shadow effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`/categories?search=${encodeURIComponent(searchQuery.trim())}`)
            setSearchQuery('')
        }
    }

    const handleMobileNavClick = (path) => {
        navigate(path)
        setIsOpen(false)
    }

    const handleLogout = () => {
        logoutUser()
        setProfileDropdownOpen(false)
        navigate('/')
    }

    return (
        <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-border-custom shadow-sm'
            : 'bg-white border-b border-border-custom'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 sm:h-20">

                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2.5 flex-shrink-0">
                        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shadow-md relative overflow-hidden">
                            <Landmark className="text-gold w-6 h-6 z-10" />
                            <div className="absolute inset-0 bg-primary-dark/30 opacity-70 transform rotate-45 scale-125" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-bold tracking-tight text-primary-dark">
                                Souq Diyanat
                            </span>
                            <span className="text-xs font-urdu font-semibold tracking-wide text-gold -mt-1 scale-y-110">
                                شوق دیانت
                            </span>
                        </div>
                    </Link>

                    {/* Search Bar - Hidden on mobile */}
                    <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-8 relative">
                        <input
                            type="text"
                            placeholder="Search halal products, sellers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-bg-custom text-text-dark text-sm rounded-lg pl-10 pr-4 py-2 border border-border-custom focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                        <Search className="w-4 h-4 text-muted-gray absolute left-3 top-1/2 transform -translate-y-1/2" />
                    </form>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `text-sm font-semibold tracking-wide transition-colors ${isActive ? 'text-primary' : 'text-text-dark/80 hover:text-primary'}`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/categories"
                            className={({ isActive }) =>
                                `text-sm font-semibold tracking-wide transition-colors ${isActive ? 'text-primary' : 'text-text-dark/80 hover:text-primary'}`
                            }
                        >
                            Categories
                        </NavLink>
                        <NavLink
                            to="/vendors"
                            className={({ isActive }) =>
                                `text-sm font-semibold tracking-wide transition-colors ${isActive ? 'text-primary' : 'text-text-dark/80 hover:text-primary'}`
                            }
                        >
                            Vendors
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                `text-sm font-semibold tracking-wide transition-colors ${isActive ? 'text-primary' : 'text-text-dark/80 hover:text-primary'}`
                            }
                        >
                            About Us
                        </NavLink>
                        <NavLink
                            to="/contact"
                            className={({ isActive }) =>
                                `text-sm font-semibold tracking-wide transition-colors ${isActive ? 'text-primary' : 'text-text-dark/80 hover:text-primary'}`
                            }
                        >
                            Contact
                        </NavLink>
                    </nav>

                    {/* Right Side Controls */}
                    <div className="flex items-center space-x-4">

                        {/* Cart Icon - Hidden for Vendors & Admins */}
                        {currentUser?.role !== 'Vendor' && currentUser?.role !== 'Admin' && (
                            <Link to="/cart" className="relative p-2 text-text-dark/80 hover:text-primary hover:bg-bg-custom rounded-full transition-all">
                                <ShoppingCart className="w-6 h-6" />
                                {cartCount > 0 && (
                                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-2xs font-bold leading-none text-white transform translate-x-1/3 -translate-y-1/3 bg-gold rounded-full shadow-sm">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        )}

                        {/* Profile Dropdown or Auth Button */}
                        {currentUser ? (
                            <div className="relative">
                                <button
                                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                    className="flex items-center space-x-2 p-1 rounded-full hover:bg-bg-custom transition-all"
                                >
                                    <img
                                        src={currentUser.avatar}
                                        alt={currentUser.name}
                                        className="w-8 h-8 rounded-full object-cover border border-primary/20"
                                    />
                                    <span className="hidden md:block text-xs font-semibold text-text-dark/95">
                                        {currentUser.name}
                                    </span>
                                    <ChevronDown className="w-3.5 h-3.5 text-muted-gray hidden md:block" />
                                </button>

                                <AnimatePresence>
                                    {profileDropdownOpen && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-10"
                                                onClick={() => setProfileDropdownOpen(false)}
                                            />
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                className="absolute right-0 mt-2.5 w-52 bg-white border border-border-custom rounded-xl shadow-lg z-20 py-2"
                                            >
                                                <div className="px-4 py-2 border-b border-border-custom mb-1">
                                                    <p className="text-xs text-muted-gray">Logged in as</p>
                                                    <p className="text-sm font-bold text-text-dark truncate">
                                                        {currentUser.name}
                                                    </p>
                                                    <span className="inline-flex items-center px-1.5 py-0.2 rounded bg-primary/10 text-primary-dark font-semibold text-2xs mt-1">
                                                        {currentUser.role}
                                                    </span>
                                                </div>

                                                <Link
                                                    to="/profile"
                                                    onClick={() => setProfileDropdownOpen(false)}
                                                    className="flex items-center px-4 py-2.5 text-sm text-text-dark/80 hover:text-primary hover:bg-bg-custom transition"
                                                >
                                                    <User className="w-4 h-4 mr-2.5 text-muted-gray" />
                                                    My Profile
                                                </Link>

                                                {/* Customer specific: Track Orders */}
                                                {(!currentUser || currentUser.role === 'Customer') && (
                                                    <Link
                                                        to="/orders"
                                                        onClick={() => setProfileDropdownOpen(false)}
                                                        className="flex items-center px-4 py-2.5 text-sm text-text-dark/80 hover:text-primary hover:bg-bg-custom transition"
                                                    >
                                                        <CheckCircle2 className="w-4 h-4 mr-2.5 text-muted-gray" />
                                                        Track Orders
                                                    </Link>
                                                )}

                                                {/* Vendor Dashboard Link */}
                                                {currentUser?.role === 'Vendor' && (
                                                    <Link
                                                        to="/vendor"
                                                        onClick={() => setProfileDropdownOpen(false)}
                                                        className="flex items-center px-4 py-2.5 text-sm font-bold text-primary hover:bg-primary/5 transition border-t border-border-custom/50 mt-1"
                                                    >
                                                        <Landmark className="w-4 h-4 mr-2.5 text-primary animate-pulse" />
                                                        Vendor Dashboard
                                                    </Link>
                                                )}

                                                {/* Admin Dashboard Link */}
                                                {currentUser?.role === 'Admin' && (
                                                    <Link
                                                        to="/admin"
                                                        onClick={() => setProfileDropdownOpen(false)}
                                                        className="flex items-center px-4 py-2.5 text-sm font-bold text-amber-700 hover:bg-amber-500/5 transition border-t border-border-custom/50 mt-1"
                                                    >
                                                        <Landmark className="w-4 h-4 mr-2.5 text-amber-600 animate-pulse" />
                                                        Admin Dashboard
                                                    </Link>
                                                )}

                                                <button
                                                    onClick={handleLogout}
                                                    className="flex w-full items-center px-4 py-2.5 text-sm text-danger-custom hover:bg-red-50 transition border-t border-border-custom mt-1 text-left"
                                                >
                                                    <LogOut className="w-4 h-4 mr-2.5" />
                                                    Sign Out
                                                </button>
                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="hidden lg:flex items-center space-x-3">
                                <Link
                                    to="/login"
                                    className="text-sm font-semibold text-primary hover:text-primary-dark px-3 py-2 transition"
                                >
                                    Log In
                                </Link>
                                <Link
                                    to="/user-registration"
                                    className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark transition shadow-sm"
                                >
                                    Register
                                </Link>
                            </div>
                        )}

                        {/* Mobile Hamburger Menu Toggle */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden p-2 text-text-dark hover:text-primary focus:outline-none hover:bg-bg-custom rounded-lg transition"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>

                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/30  lg:hidden z-30"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.25 }}
                            className="fixed top-0 right-0 h-screen w-4/5 max-w-sm p-8 bg-white shadow-2xl border-l border-border-custom z-40 flex flex-col lg:hidden"
                        >
                            <div className="space-y-6">
                                {/* Header inside drawer */}
                                <div className="flex items-center justify-between border-b border-border-custom pb-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                                            <Landmark className="text-gold w-4 h-4" />
                                        </div>
                                        <span className="font-bold text-primary-dark text-base">Souq Diyanat</span>
                                    </div>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-1 rounded-lg hover:bg-bg-custom text-muted-gray hover:text-text-dark"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Mobile Search */}
                                <form onSubmit={handleSearchSubmit} className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-bg-custom text-text-dark text-sm rounded-lg pl-9 pr-4 py-2 border border-border-custom focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                                    />
                                    <Search className="w-4 h-4 text-muted-gray absolute left-3 top-1/2 transform -translate-y-1/2" />
                                </form>

                                {/* Navigation Links */}
                                <nav className="flex flex-col space-y-4">
                                    <button
                                        onClick={() => handleMobileNavClick('/')}
                                        className="text-left py-2 font-semibold text-text-dark/90 hover:text-primary transition"
                                    >
                                        Home
                                    </button>
                                    <button
                                        onClick={() => handleMobileNavClick('/categories')}
                                        className="text-left py-2 font-semibold text-text-dark/90 hover:text-primary transition"
                                    >
                                        Categories
                                    </button>
                                    <button
                                        onClick={() => handleMobileNavClick('/vendors')}
                                        className="text-left py-2 font-semibold text-text-dark/90 hover:text-primary transition"
                                    >
                                        Vendors
                                    </button>
                                    <button
                                        onClick={() => handleMobileNavClick('/about')}
                                        className="text-left py-2 font-semibold text-text-dark/90 hover:text-primary transition"
                                    >
                                        About Us
                                    </button>
                                    <button
                                        onClick={() => handleMobileNavClick('/contact')}
                                        className="text-left py-2 font-semibold text-text-dark/90 hover:text-primary transition"
                                    >
                                        Contact
                                    </button>
                                </nav>
                            </div>

                            {/* Bottom Actions inside drawer */}
                            <div className="border-t border-border-custom pt-6 space-y-4">
                                {currentUser ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <img
                                                src={currentUser.avatar}
                                                alt={currentUser.name}
                                                className="w-10 h-10 rounded-full object-cover border border-primary/20"
                                            />
                                            <div>
                                                <p className="text-sm font-bold text-text-dark leading-tight">{currentUser.name}</p>
                                                <p className="text-xs text-muted-gray">{currentUser.email}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <button
                                                onClick={() => handleMobileNavClick('/profile')}
                                                className="w-full text-center px-4 py-2 border border-border-custom rounded-lg text-xs font-semibold hover:bg-bg-custom transition text-text-dark"
                                            >
                                                Profile
                                            </button>
                                            {(!currentUser || currentUser.role === 'Customer') && (
                                                <button
                                                    onClick={() => handleMobileNavClick('/orders')}
                                                    className="w-full text-center px-4 py-2 border border-border-custom rounded-lg text-xs font-semibold hover:bg-bg-custom transition text-text-dark"
                                                >
                                                    Orders
                                                </button>
                                            )}
                                        </div>

                                        {currentUser?.role === 'Vendor' && (
                                            <button
                                                onClick={() => handleMobileNavClick('/vendor')}
                                                className="w-full text-center px-4 py-2 bg-primary text-white border border-transparent rounded-lg text-xs font-bold hover:bg-primary-dark transition mt-2 shadow-2xs"
                                            >
                                                Vendor Dashboard
                                            </button>
                                        )}

                                        {currentUser?.role === 'Admin' && (
                                            <button
                                                onClick={() => handleMobileNavClick('/admin')}
                                                className="w-full text-center px-4 py-2 bg-amber-600 text-white border border-transparent rounded-lg text-xs font-bold hover:bg-amber-700 transition mt-2 shadow-2xs"
                                            >
                                                Admin Dashboard
                                            </button>
                                        )}

                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center justify-center py-2.5 border border-red-200 text-danger-custom rounded-lg text-xs font-bold hover:bg-red-50 transition"
                                        >
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Sign Out
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col space-y-2">
                                        <button
                                            onClick={() => handleMobileNavClick('/login')}
                                            className="w-full py-2.5 border border-primary/20 text-primary text-center rounded-lg text-sm font-semibold hover:bg-primary/5 transition"
                                        >
                                            Log In
                                        </button>
                                        <button
                                            onClick={() => handleMobileNavClick('/user-registration')}
                                            className="w-full py-2.5 bg-primary text-white text-center rounded-lg text-sm font-semibold hover:bg-primary-dark transition shadow-sm"
                                        >
                                            Register
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    )
}

export default Navbar