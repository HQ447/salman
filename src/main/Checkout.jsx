import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck, ShoppingBag, CreditCard, Banknote, ClipboardCheck } from 'lucide-react'
import { AppContext } from '../context/AppContext'
import { Button, Input, EmptyState } from '../components/UI'

function Checkout() {
    const { cart, currentUser, placeOrder } = useContext(AppContext)
    const navigate = useNavigate()

    // Form states prefilled from current simulated user
    const [shippingInfo, setShippingInfo] = useState({
        name: currentUser ? currentUser.name : '',
        phone: currentUser ? currentUser.phone : '',
        address: currentUser ? currentUser.address : ''
    })

    const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery')
    const [formErrors, setFormErrors] = useState({})

    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    const shippingFee = cart.length > 0 ? 8.00 : 0.00
    const total = subtotal + shippingFee

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setShippingInfo(prev => ({ ...prev, [name]: value }))
    }

    const handlePlaceOrder = (e) => {
        e.preventDefault()

        // Basic validation
        const errors = {}
        if (!shippingInfo.name.trim()) errors.name = "Full name is required."
        if (!shippingInfo.phone.trim()) errors.phone = "Phone number is required."
        if (!shippingInfo.address.trim()) errors.address = "Active shipping address is required."

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors)
            return
        }

        // Call placeOrder
        const orderId = placeOrder(shippingInfo, paymentMethod)
        navigate('/orders', { state: { latestOrderId: orderId } })
    }

    if (cart.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20">
                <EmptyState
                    title="No Items to Checkout"
                    description="Your shopping cart is currently empty. Add products to cart before accessing checkout."
                    actionText="Browse Products"
                    onAction={() => navigate('/categories')}
                    icon={ShoppingBag}
                />
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20 space-y-8">

            {/* Page Title */}
            <div className="text-left -mt-6">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-text-dark tracking-tight">Checkout Details</h1>
                <p className="text-xs sm:text-sm text-muted-gray mt-1">
                    Finalize your delivery parameters and confirm the spot purchase.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Left Column: Form */}
                <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-6 text-left">

                    {/* Shipping Card */}
                    <div className="bg-white border border-border-custom p-6 sm:p-8 rounded-xl shadow-xs space-y-5">
                        <h2 className="text-base font-extrabold text-text-dark pb-3 border-b border-border-custom uppercase tracking-wider">
                            1. Delivery Information
                        </h2>

                        <div className="space-y-4">
                            <Input
                                label="Full Legal Name"
                                name="name"
                                required
                                value={shippingInfo.name}
                                onChange={handleInputChange}
                                error={formErrors.name}
                                placeholder="e.g. Salim Rahman"
                            />
                            <Input
                                label="Active Contact Phone"
                                name="phone"
                                required
                                value={shippingInfo.phone}
                                onChange={handleInputChange}
                                error={formErrors.phone}
                                placeholder="e.g. +92 300 1234567"
                            />
                            <div>
                                <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1">
                                    Full Shipping Address <span className="text-danger-custom">*</span>
                                </label>
                                <textarea
                                    name="address"
                                    required
                                    rows={3}
                                    value={shippingInfo.address}
                                    onChange={handleInputChange}
                                    placeholder="Street Address, House No, Sector/Area, City, Pakistan"
                                    className={`w-full rounded-lg border ${formErrors.address ? 'border-danger-custom focus:ring-danger-custom' : 'border-border-custom focus:ring-primary'
                                        } px-3 py-2 text-sm focus:outline-none focus:ring-2 bg-white transition-all`}
                                />
                                {formErrors.address && <p className="mt-1 text-xs text-danger-custom">{formErrors.address}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Payment Method Selection Card */}
                    <div className="bg-white border border-border-custom p-6 sm:p-8 rounded-xl shadow-xs space-y-5">
                        <h2 className="text-base font-extrabold text-text-dark pb-3 border-b border-border-custom uppercase tracking-wider">
                            2. Shariah-Approved Payment Choice
                        </h2>

                        <div className="space-y-3.5">

                            {/* Option 1: Cash on Delivery */}
                            <label className={`flex items-start p-4 border rounded-xl cursor-pointer transition ${paymentMethod === 'Cash on Delivery'
                                ? 'border-primary bg-primary/5'
                                : 'border-border-custom hover:bg-bg-custom'
                                }`}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="Cash on Delivery"
                                    checked={paymentMethod === 'Cash on Delivery'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="sr-only"
                                />
                                <Banknote className="w-5 h-5 text-primary shrink-0 mr-3 mt-0.5" />
                                <div className="flex-1">
                                    <p className="font-extrabold text-sm text-text-dark">Cash on Delivery (CoD)</p>
                                    <p className="text-3xs text-muted-gray leading-normal mt-0.5">
                                        Recommended. Transfer money upon physical checking of the parcel. Fulfills the parameters of hand-to-hand (Yadan bi Yad) verification prior to asset receipt.
                                    </p>
                                </div>
                            </label>

                            {/* Option 2: Pre-Paid Cash Transfer */}
                            <label className={`flex items-start p-4 border rounded-xl cursor-pointer transition ${paymentMethod === 'Islamic Debit Transfer'
                                ? 'border-primary bg-primary/5'
                                : 'border-border-custom hover:bg-bg-custom'
                                }`}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="Islamic Debit Transfer"
                                    checked={paymentMethod === 'Islamic Debit Transfer'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="sr-only"
                                />
                                <CreditCard className="w-5 h-5 text-primary shrink-0 mr-3 mt-0.5" />
                                <div className="flex-1">
                                    <p className="font-extrabold text-sm text-text-dark">Islamic Debit Card Transfer</p>
                                    <p className="text-3xs text-muted-gray leading-normal mt-0.5">
                                        Pre-payment routed directly from your Shariah account. Free of index fees, conversion margins, or interest components. Guaranteed safety escrow terms.
                                    </p>
                                </div>
                            </label>

                        </div>
                    </div>

                </form>

                {/* Right Column: Order Review */}
                <div className="lg:col-span-5 bg-white border border-border-custom p-6 rounded-xl shadow-xs text-left space-y-6">
                    <h2 className="text-base font-extrabold text-text-dark pb-3 border-b border-border-custom uppercase tracking-wider">
                        Review Order Items
                    </h2>

                    <div className="divide-y divide-border-custom/50 max-h-60 overflow-y-auto pr-2">
                        {cart.map((item) => (
                            <div key={item.product.id} className="py-3 flex items-center justify-between text-xs gap-3">
                                <div className="flex items-center space-x-2.5 min-w-0">
                                    <img
                                        src={item.product.image}
                                        alt={item.product.name}
                                        className="w-10 h-10 rounded object-cover border border-border-custom shrink-0"
                                    />
                                    <div className="truncate">
                                        <p className="font-bold text-text-dark truncate">{item.product.name}</p>
                                        <p className="text-3xs text-muted-gray">Qty: {item.quantity} × {item.product.vendorName}</p>
                                    </div>
                                </div>
                                <span className="font-bold text-text-dark shrink-0">${(item.product.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    {/* Pricing totals */}
                    <div className="space-y-3 pt-4 border-t border-border-custom text-xs">
                        <div className="flex justify-between">
                            <span className="text-muted-gray font-semibold">Subtotal</span>
                            <span className="font-bold text-text-dark">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-gray font-semibold">Verified Shipping</span>
                            <span className="font-bold text-text-dark">${shippingFee.toFixed(2)}</span>
                        </div>
                        <div className="border-t border-border-custom pt-3 flex justify-between text-sm">
                            <span className="font-extrabold text-text-dark">Total Spot Cost</span>
                            <span className="font-extrabold text-primary-dark">${total.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="bg-primary/5 rounded-xl border border-primary/20 p-3.5 flex items-start space-x-2">
                        <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <p className="text-3xs text-muted-gray leading-normal">
                            <strong>Islamic Pricing Model:</strong> Cost is strictly final. We guarantee zero late payment fees, no penalty accumulation, and absolute transparency in product pricing.
                        </p>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="w-full font-bold cursor-pointer"
                        onClick={handlePlaceOrder}
                        icon={ClipboardCheck}
                    >
                        Confirm & Place Spot Order
                    </Button>

                </div>

            </div>

        </div>
    )
}

export default Checkout