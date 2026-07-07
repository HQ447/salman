import React, { createContext, useState, useEffect } from 'react'
import productsData from '../data/products.json'
import categoriesData from '../data/categories.json'
import vendorsData from '../data/vendors.json'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
    // Load data initially
    const [products] = useState(productsData)
    const [categories] = useState(categoriesData)
    const [vendors] = useState(vendorsData)

    // User state
    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = localStorage.getItem('diyanat_user')
        return savedUser ? JSON.parse(savedUser) : {
            name: "Salim Rahman",
            email: "salim.customer@diyanat.com",
            role: "Customer",
            phone: "+92 300 9876543",
            address: "House 14, Street 3, Sector F-11/1, Islamabad, Pakistan",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop"
        }
    })

    // Cart state
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('diyanat_cart')
        return savedCart ? JSON.parse(savedCart) : []
    })

    // Orders state
    const [orders, setOrders] = useState(() => {
        const savedOrders = localStorage.getItem('diyanat_orders')
        return savedOrders ? JSON.parse(savedOrders) : [
            {
                id: "SD-98421",
                date: "2026-07-06T15:30:00.000Z",
                items: [
                    {
                        product: productsData[0], // Tajweed Quran
                        quantity: 1
                    },
                    {
                        product: productsData[2], // Royal Oud Attar
                        quantity: 2
                    }
                ],
                subtotal: 99.99,
                shippingFee: 5.00,
                total: 104.99,
                status: "Processing",
                shippingInfo: {
                    name: "Salim Rahman",
                    phone: "+92 300 9876543",
                    address: "House 14, Street 3, Sector F-11/1, Islamabad, Pakistan"
                },
                paymentMethod: "Cash on Delivery",
                timeline: [
                    { status: "Pending", time: "2026-07-06T15:30:00.000Z", completed: true },
                    { status: "Processing", time: "2026-07-06T18:15:00.000Z", completed: true },
                    { status: "Packed", time: "2026-07-06T19:15:00.000Z", completed: true },
                    { status: "Shipped", time: null, completed: false },
                    { status: "Delivered", time: null, completed: false }
                ]
            }
        ]
    })

    // Persist user
    useEffect(() => {
        if (currentUser) {
            localStorage.setItem('diyanat_user', JSON.stringify(currentUser))
        } else {
            localStorage.removeItem('diyanat_user')
        }
    }, [currentUser])

    // Persist cart
    useEffect(() => {
        localStorage.setItem('diyanat_cart', JSON.stringify(cart))
    }, [cart])

    // Persist orders
    useEffect(() => {
        localStorage.setItem('diyanat_orders', JSON.stringify(orders))
    }, [orders])

    // Cart operations
    const addToCart = (product, quantity = 1) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.product.id === product.id)
            if (existingItem) {
                return prevCart.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
                        : item
                )
            } else {
                return [...prevCart, { product, quantity }]
            }
        })
    }

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.product.id !== productId))
    }

    const updateCartQty = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId)
            return
        }
        setCart(prevCart =>
            prevCart.map(item =>
                item.product.id === productId
                    ? { ...item, quantity: Math.min(quantity, item.product.stock) }
                    : item
            )
        )
    }

    const clearCart = () => {
        setCart([])
    }

    // Order Placement
    const placeOrder = (shippingInfo, paymentMethod) => {
        const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
        const shippingFee = 8.00 // Standard fixed transparent shipping fee
        const total = subtotal + shippingFee
        const orderId = `SD-${Math.floor(10000 + Math.random() * 90000)}`

        const newOrder = {
            id: orderId,
            date: new Date().toISOString(),
            items: [...cart],
            subtotal: parseFloat(subtotal.toFixed(2)),
            shippingFee,
            total: parseFloat(total.toFixed(2)),
            status: "Pending",
            shippingInfo,
            paymentMethod,
            timeline: [
                { status: "Pending", time: new Date().toISOString(), completed: true },
                { status: "Processing", time: null, completed: false },
                { status: "Packed", time: null, completed: false },
                { status: "Shipped", time: null, completed: false },
                { status: "Delivered", time: null, completed: false }
            ]
        }

        setOrders(prevOrders => [newOrder, ...prevOrders])
        clearCart()
        return orderId
    }

    // Profile operations
    const updateProfile = (updatedInfo) => {
        setCurrentUser(prevUser => ({
            ...prevUser,
            ...updatedInfo
        }))
    }

    // Authentication simulator
    const loginUser = (email, password, role = "Customer") => {
        // Basic verification simulation
        if (email && password) {
            const defaultAvatar = role === "Vendor"
                ? "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop"
                : role === "Admin"
                    ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
                    : "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop"

            setCurrentUser({
                name: email.split('@')[0].replace('.', ' ').toUpperCase(),
                email,
                role,
                phone: "+92 300 0000000",
                address: "Simulated Address, Pakistan",
                avatar: defaultAvatar
            })
            return true
        }
        return false
    }

    const logoutUser = () => {
        setCurrentUser(null)
    }

    return (
        <AppContext.Provider value={{
            products,
            categories,
            vendors,
            cart,
            orders,
            currentUser,
            addToCart,
            removeFromCart,
            updateCartQty,
            clearCart,
            placeOrder,
            updateProfile,
            loginUser,
            logoutUser
        }}>
            {children}
        </AppContext.Provider>
    )
}
