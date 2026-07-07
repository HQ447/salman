import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Package2, ChevronDown, ChevronUp, Clock, AlertCircle, ShoppingBag,
    MapPin, Banknote, ShieldCheck, XCircle, CheckCircle2
} from 'lucide-react'
import { AppContext } from '../context/AppContext'
import { Badge, Button, EmptyState } from '../components/UI'

function Orders() {
    const { orders, currentUser } = useContext(AppContext)
    const location = useLocation()

    // Track expanded order details
    const [expandedOrderId, setExpandedOrderId] = useState(() => {
        // Expand the latest placed order if redirected from checkout
        return location.state?.latestOrderId || null
    })

    // Simulated Cancel list - since we are storing in context, we will add local simulation state for cancellations
    const [localOrders, setLocalOrders] = useState(orders)

    const toggleExpand = (orderId) => {
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId)
    }

    const cancelOrder = (orderId) => {
        // Shariah entitlement - cancel order before shipping
        setLocalOrders(prev => prev.map(order => {
            if (order.id === orderId && order.status === 'Pending') {
                const updatedTimeline = order.timeline.map(t =>
                    t.status === 'Pending' ? { ...t, completed: true } : t
                )
                return {
                    ...order,
                    status: 'Cancelled',
                    timeline: [
                        { status: 'Cancelled', time: new Date().toISOString(), completed: true }
                    ]
                }
            }
            return order
        }))
    }

    // Helper to map status to color badge variants
    const getStatusVariant = (status) => {
        switch (status) {
            case 'Pending': return 'warning'
            case 'Processing': return 'primary'
            case 'Packed': return 'secondary'
            case 'Shipped': return 'info'
            case 'Delivered': return 'success'
            case 'Cancelled': return 'danger'
            default: return 'gray'
        }
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20 space-y-8">

            {/* Page Title */}
            <div className="text-left -mt-6">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-text-dark tracking-tight">Order Tracking & History</h1>
                <p className="text-xs sm:text-sm text-muted-gray mt-1">
                    Review status of your purchases, track packages, and manage cancellation rights.
                </p>
            </div>

            {localOrders.length > 0 ? (
                <div className="space-y-6">
                    {localOrders.map((order) => {
                        const isExpanded = expandedOrderId === order.id
                        const canCancel = order.status === 'Pending'

                        return (
                            <div
                                key={order.id}
                                className="bg-white border border-border-custom rounded-xl shadow-xs overflow-hidden transition-all text-left"
                            >
                                {/* Header Summary */}
                                <div
                                    onClick={() => toggleExpand(order.id)}
                                    className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer hover:bg-bg-custom/30 transition-colors"
                                >
                                    <div className="space-y-1">
                                        <div className="flex items-center space-x-2">
                                            <span className="font-extrabold text-sm text-text-dark">{order.id}</span>
                                            <Badge variant={getStatusVariant(order.status)}>
                                                {order.status}
                                            </Badge>
                                        </div>
                                        <p className="text-3xs text-muted-gray">Placed on: {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                    </div>

                                    <div className="flex items-center space-x-6 w-full sm:w-auto justify-between sm:justify-end self-stretch sm:self-center">
                                        <div>
                                            <span className="text-3xs text-muted-gray block leading-none mb-0.5">Total Value</span>
                                            <span className="text-sm font-extrabold text-primary-dark">${order.total.toFixed(2)}</span>
                                        </div>

                                        <div className="flex items-center text-primary-dark">
                                            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5 text-muted-gray" />}
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded Sections */}
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="border-t border-border-custom bg-bg-custom/10 overflow-hidden"
                                        >
                                            <div className="p-6 space-y-6">

                                                {/* Timeline Component */}
                                                <div className="space-y-4">
                                                    <h4 className="text-2xs font-extrabold uppercase tracking-wider text-text-dark flex items-center gap-1.5">
                                                        <Clock className="w-4 h-4 text-primary" />
                                                        Order Handling Timeline
                                                    </h4>

                                                    {order.status === 'Cancelled' ? (
                                                        <div className="bg-red-50 border border-red-200 text-danger-custom text-xs rounded-xl p-3.5 flex items-start gap-2">
                                                            <AlertCircle className="w-4.5 h-4.5 shrink-0 mt-0.2" />
                                                            <div>
                                                                <p className="font-bold">Transaction Cancelled</p>
                                                                <p className="text-3xs text-muted-gray mt-0.5">
                                                                    This contract was cancelled. All reserved funds have been reconciled under Islamic customer protection policies.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="grid grid-cols-5 text-center gap-2 relative">
                                                            {order.timeline.map((step, idx) => {
                                                                const isCurrent = order.status === step.status
                                                                return (
                                                                    <div key={idx} className="relative z-10 flex flex-col items-center">
                                                                        {/* Circle node */}
                                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border font-bold text-xs transition-all ${step.completed
                                                                                ? 'bg-primary border-primary text-white shadow-xs'
                                                                                : 'bg-white border-border-custom text-muted-gray'
                                                                            }`}>
                                                                            {step.completed ? '✓' : idx + 1}
                                                                        </div>
                                                                        <span className={`text-[10px] font-bold mt-2 ${step.completed ? 'text-primary-dark' : 'text-muted-gray'
                                                                            }`}>
                                                                            {step.status}
                                                                        </span>
                                                                    </div>
                                                                )
                                                            })}
                                                            {/* Horizontal connector line */}
                                                            <div className="absolute top-4 left-[10%] right-[10%] h-0.5 bg-border-custom -z-10" />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Items details table */}
                                                <div className="space-y-3">
                                                    <h4 className="text-2xs font-extrabold uppercase tracking-wider text-text-dark">Order Items</h4>

                                                    <div className="bg-white border border-border-custom rounded-xl overflow-hidden divide-y divide-border-custom/50 shadow-2xs">
                                                        {order.items.map((item) => (
                                                            <div key={item.product.id} className="p-4 flex items-center justify-between text-xs gap-4">
                                                                <div className="flex items-center space-x-3 min-w-0">
                                                                    <img
                                                                        src={item.product.image}
                                                                        alt={item.product.name}
                                                                        className="w-10 h-10 rounded object-cover border border-border-custom/50 shrink-0"
                                                                    />
                                                                    <div className="truncate">
                                                                        <p className="font-extrabold text-text-dark truncate leading-tight">{item.product.name}</p>
                                                                        <p className="text-[10px] text-muted-gray">Merchant: {item.product.vendorName}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="text-right">
                                                                    <span className="font-extrabold text-text-dark">${(item.product.price * item.quantity).toFixed(2)}</span>
                                                                    <span className="text-[10px] text-muted-gray block leading-none mt-0.5">Qty: {item.quantity}</span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Delivery address & Payment Choice */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-text-dark/80">

                                                    {/* Shipping details */}
                                                    <div className="bg-white border border-border-custom p-4 rounded-xl space-y-2 pb-5">
                                                        <h5 className="font-extrabold text-text-dark uppercase tracking-wider flex items-center gap-1">
                                                            <MapPin className="w-3.5 h-3.5 text-primary" />
                                                            Recipient & Address
                                                        </h5>
                                                        <div className="space-y-1 text-muted-gray leading-normal">
                                                            <p className="font-bold text-text-dark leading-none pb-0.5">{order.shippingInfo.name}</p>
                                                            <p>Phone: {order.shippingInfo.phone}</p>
                                                            <p>{order.shippingInfo.address}</p>
                                                        </div>
                                                    </div>

                                                    {/* Payment details */}
                                                    <div className="bg-white border border-border-custom p-4 rounded-xl space-y-2 pb-5">
                                                        <h5 className="font-extrabold text-text-dark uppercase tracking-wider flex items-center gap-1">
                                                            <Banknote className="w-3.5 h-3.5 text-primary" />
                                                            Payment Method Context
                                                        </h5>
                                                        <div className="space-y-1 text-muted-gray leading-normal">
                                                            <p className="font-bold text-text-dark leading-none pb-0.5">{order.paymentMethod}</p>
                                                            <p className="flex items-center text-[10px] text-primary italic">
                                                                <ShieldCheck className="w-3.5 h-3.5 mr-0.5" />
                                                                shariah-audited spot contract
                                                            </p>
                                                            <div className="pt-2 flex justify-between font-semibold border-t border-border-custom mt-2">
                                                                <span>Subtotal</span>
                                                                <span>${order.subtotal.toFixed(2)}</span>
                                                            </div>
                                                            <div className="flex justify-between font-semibold text-primary">
                                                                <span>Grand Total</span>
                                                                <span>${order.total.toFixed(2)}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                                {/* Customer option option (Khayar) */}
                                                {canCancel && (
                                                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between bg-yellow-50 border border-yellow-250 p-4 rounded-xl gap-4">
                                                        <div className="flex items-start space-x-2 text-warning-custom">
                                                            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                                            <p className="text-3xs text-muted-gray leading-normal">
                                                                <strong>Islamic Right of Option (Khayar al-Majlis):</strong> You have the absolute right to cancel the order anytime prior to compilation or dispatch by the merchant.
                                                            </p>
                                                        </div>
                                                        <Button
                                                            variant="danger"
                                                            className="font-bold shrink-0 text-xs py-1.5 px-3 cursor-pointer"
                                                            onClick={() => cancelOrder(order.id)}
                                                        >
                                                            Cancel Order
                                                        </Button>
                                                    </div>
                                                )}

                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <EmptyState
                    title="No Orders Logged"
                    description="We couldn't identify any previous purchases mapped to your simulated customer account profiles."
                    actionText="Go Shopping"
                    onAction={() => navigate('/categories')}
                    icon={ShoppingBag}
                />
            )}

        </div>
    )
}

export default Orders