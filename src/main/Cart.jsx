import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Trash2, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react'
import { AppContext } from '../context/AppContext'
import { Button, EmptyState } from '../components/UI'

function Cart() {
    const { cart, updateCartQty, removeFromCart } = useContext(AppContext)
    const navigate = useNavigate()

    // Mathematical totals
    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    const shippingFee = cart.length > 0 ? 8.00 : 0.00 // Standard flat rate transparent delivery fee
    const total = subtotal + shippingFee

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20 space-y-8">

            {/* Page Title */}
            <div className="text-left -mt-6">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-text-dark tracking-tight">Shopping Cart</h1>
                <p className="text-xs sm:text-sm text-muted-gray mt-1">
                    Review your selection prior to spot purchase contract signature.
                </p>
            </div>

            {cart.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Left Column: Items List */}
                    <div className="lg:col-span-8 space-y-4">
                        <div className="bg-white border border-border-custom rounded-xl shadow-xs overflow-hidden">
                            <div className="divide-y divide-border-custom">
                                {cart.map((item) => (
                                    <div key={item.product.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">

                                        {/* Item Info */}
                                        <div className="flex items-center space-x-4 flex-1">
                                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-bg-custom border border-border-custom flex-shrink-0">
                                                <img
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <Link to={`/products/${item.product.id}`} className="font-extrabold text-sm text-text-dark hover:text-primary transition-colors line-clamp-1">
                                                    {item.product.name}
                                                </Link>
                                                <p className="text-3xs text-muted-gray uppercase tracking-wider font-semibold">
                                                    Category: {item.product.categoryName}
                                                </p>
                                                <p className="text-3xs text-primary font-bold">
                                                    Merchant: {item.product.vendorName}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Quantity Selector & Price */}
                                        <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto">

                                            {/* Price */}
                                            <div className="text-left sm:text-right">
                                                <span className="text-xs text-muted-gray block leading-none mb-0.5">Spot Price</span>
                                                <span className="text-sm font-bold text-text-dark">${item.product.price.toFixed(2)}</span>
                                            </div>

                                            {/* Quantity Controller */}
                                            <div className="flex items-center border border-border-custom rounded-lg bg-bg-custom/50">
                                                <button
                                                    onClick={() => updateCartQty(item.product.id, item.quantity - 1)}
                                                    className="px-2.5 py-1 text-text-dark/70 hover:text-black font-extrabold cursor-pointer"
                                                >
                                                    -
                                                </button>
                                                <span className="px-2 text-xs font-extrabold text-text-dark">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateCartQty(item.product.id, item.quantity + 1)}
                                                    className="px-2.5 py-1 text-text-dark/70 hover:text-black font-extrabold cursor-pointer"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            {/* Line Item Total */}
                                            <div className="text-right hidden sm:block min-w-[70px]">
                                                <span className="text-xs text-muted-gray block leading-none mb-0.5">Subtotal</span>
                                                <span className="text-sm font-extrabold text-primary-dark">
                                                    ${(item.product.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>

                                            {/* Remove */}
                                            <button
                                                onClick={() => removeFromCart(item.product.id)}
                                                className="p-2 text-muted-gray hover:text-danger-custom hover:bg-red-50 rounded-lg transition"
                                                title="Remove product"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>

                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Disclaimer on refund terms */}
                        <div className="bg-bg-custom border border-border-custom p-4 rounded-xl flex items-start space-x-2 text-left">
                            <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <p className="text-3xs text-muted-gray leading-normal">
                                By pursuing checkout, you acknowledge that all orders are subject to Shariah commercial principles. You hold the option to cancel at any time prior to shipment or review options for defect returns (Khayar al-Ayb).
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-4 bg-white border border-border-custom rounded-xl p-6 shadow-xs text-left space-y-6">
                        <h2 className="text-base font-extrabold text-text-dark pb-3 border-b border-border-custom uppercase tracking-wider">
                            Order Summary
                        </h2>

                        <div className="space-y-3.5 text-xs">
                            <div className="flex justify-between">
                                <span className="text-muted-gray font-semibold">Subtotal ({cart.reduce((a, c) => a + c.quantity, 0)} items)</span>
                                <span className="font-bold text-text-dark">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-gray font-semibold">Verified Shipping</span>
                                <span className="font-bold text-text-dark">${shippingFee.toFixed(2)}</span>
                            </div>
                            <div className="border-t border-border-custom pt-3.5 flex justify-between text-sm">
                                <span className="font-extrabold text-text-dark">Grand Total</span>
                                <span className="font-extrabold text-primary-dark">${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="bg-green-50/50 border border-primary/20 rounded-lg p-3 text-[10px] text-muted-gray leading-relaxed flex items-start gap-1">
                            <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span>Flat shipping rates calculated dynamically to prevent uncertainty pricing (Gharar). No hidden administrative markups.</span>
                        </div>

                        <Button
                            variant="primary"
                            size="lg"
                            className="w-full font-bold cursor-pointer"
                            onClick={() => navigate('/checkout')}
                            icon={ArrowRight}
                        >
                            Proceed to Checkout
                        </Button>

                        <Link
                            to="/categories"
                            className="block text-center text-xs font-semibold text-primary hover:underline hover:text-primary-dark transition"
                        >
                            Continue Spot Shopping
                        </Link>
                    </div>

                </div>
            ) : (
                <EmptyState
                    title="Your Cart is Empty"
                    description="You have not selected check-in products yet. Visit our halal marketplace directory to explore items."
                    actionText="Start Shopping"
                    onAction={() => navigate('/categories')}
                    icon={ShoppingBag}
                />
            )}

        </div>
    )
}

export default Cart