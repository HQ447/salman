import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import {
    Clock,
    Truck,
    CheckCircle2,
    ChevronDown,
    ChevronUp,
    Search,
    MapPin,
    Phone,
    User,
    CreditCard,
    Calendar,
    ChevronRight,
    PackageCheck,
    ShoppingBag
} from 'lucide-react'
import { Badge } from '../components/UI'

function OrdersManagement() {
    const { orders, currentUser, vendors, products } = useContext(AppContext)

    const activeVendorId = currentUser?.vendorId ||
        vendors.find(v => v.contactEmail === currentUser?.email)?.id ||
        "diyanat-bookstore"
    const activeVendor = vendors.find(v => v.id === activeVendorId) || vendors[0]

    const [localOrders, setLocalOrders] = useState([])
    const [expandedOrder, setExpandedOrder] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState('All')
    const [successToast, setSuccessToast] = useState(null)

    useEffect(() => {
        const vendorRelatedOrders = []
        orders.forEach(order => {
            const vendorItems = order.items.filter(item => item.product.vendorId === activeVendor.id)
            if (vendorItems.length > 0) {
                const subtotal = vendorItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)
                const qty = vendorItems.reduce((acc, item) => acc + item.quantity, 0)
                vendorRelatedOrders.push({ ...order, vendorItems, vendorSubtotal: subtotal, vendorItemsCount: qty })
            }
        })

        if (vendorRelatedOrders.length === 0) {
            const vendorProducts = products.filter(p => p.vendorId === activeVendor.id)
            const demoProduct = vendorProducts[0] || products[0]
            setLocalOrders([{
                id: "SD-98421",
                date: "2026-07-06T15:30:00.000Z",
                items: [{ product: demoProduct, quantity: 2 }],
                vendorItems: [{ product: demoProduct, quantity: 2 }],
                subtotal: demoProduct.price * 2,
                vendorSubtotal: demoProduct.price * 2,
                shippingFee: 5.00,
                total: (demoProduct.price * 2) + 5.00,
                status: "Processing",
                shippingInfo: { name: "Salim Rahman", phone: "+92 300 9876543", address: "House 14, Street 3, Sector F-11/1, Islamabad, Pakistan" },
                paymentMethod: "Cash on Delivery",
                timeline: [
                    { status: "Pending", time: "2026-07-06T15:30:00.000Z", completed: true },
                    { status: "Processing", time: "2026-07-06T18:15:00.000Z", completed: true },
                    { status: "Packed", time: null, completed: false },
                    { status: "Shipped", time: null, completed: false },
                    { status: "Delivered", time: null, completed: false }
                ]
            }])
        } else {
            setLocalOrders(vendorRelatedOrders)
        }
    }, [orders, activeVendor.id, products])

    useEffect(() => {
        if (successToast) {
            const timer = setTimeout(() => setSuccessToast(null), 3500)
            return () => clearTimeout(timer)
        }
    }, [successToast])

    const toggleExpandOrder = (id) => setExpandedOrder(expandedOrder === id ? null : id)

    const handleStatusAdvance = (orderId, nextStatus) => {
        setLocalOrders(prevOrders =>
            prevOrders.map(order => {
                if (order.id === orderId) {
                    const nowString = new Date().toISOString()
                    const statusesOrder = ["Pending", "Processing", "Packed", "Shipped", "Delivered"]
                    const nextIdx = statusesOrder.indexOf(nextStatus)
                    const updatedTimeline = order.timeline.map(step => {
                        const stepIdx = statusesOrder.indexOf(step.status)
                        if (step.status === nextStatus) return { ...step, time: nowString, completed: true }
                        if (stepIdx < nextIdx) return { ...step, completed: true, time: step.time || nowString }
                        return step
                    })
                    setSuccessToast(`Order ${orderId} updated to "${nextStatus}"`)
                    return { ...order, status: nextStatus, timeline: updatedTimeline }
                }
                return order
            })
        )
    }

    const filteredOrders = localOrders.filter(order => {
        const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.shippingInfo.name.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === 'All' || order.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const statusOptions = ["Pending", "Processing", "Packed", "Shipped", "Delivered"]

    const statusCounts = statusOptions.reduce((acc, s) => ({ ...acc, [s]: localOrders.filter(o => o.status === s).length }), {})

    return (
        <div className="space-y-5 font-inter">

            {/* Toast */}
            {successToast && (
                <div className="fixed bottom-6 right-6 z-50 flex items-center bg-primary text-white px-5 py-3 rounded-xl shadow-xl gap-3 animate-bounce">
                    <PackageCheck className="w-4 h-4" />
                    <span className="text-xs font-semibold">{successToast}</span>
                </div>
            )}

            {/* Header */}
            <div className="bg-white rounded-2xl border border-border-custom shadow-sm p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-base font-bold text-text-dark">Order Fulfillment Center</h2>
                    <p className="text-xs text-muted-gray mt-0.5">Track orders, update statuses, and manage customer deliveries.</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-gray">
                    <ShoppingBag className="w-4 h-4 text-primary" />
                    <span><span className="font-bold text-text-dark">{localOrders.length}</span> total orders</span>
                </div>
            </div>

            {/* Search + Filter Tabs */}
            <div className="bg-white rounded-2xl border border-border-custom shadow-sm overflow-hidden">
                {/* Search */}
                <div className="p-4 border-b border-border-custom">
                    <div className="relative">
                        <Search className="w-4 h-4 text-muted-gray absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search by Order ID or customer name…"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full text-text-dark text-xs rounded-xl pl-10 pr-4 py-2.5 border border-border-custom focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                        />
                    </div>
                </div>

                {/* Status Tabs */}
                <div className="flex overflow-x-auto border-b border-border-custom">
                    {['All', ...statusOptions].map(status => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`flex items-center gap-1.5 px-4 py-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-all cursor-pointer shrink-0 ${statusFilter === status
                                ? 'border-primary text-primary bg-primary-light/30'
                                : 'border-transparent text-muted-gray hover:text-text-dark hover:bg-bg-custom'
                                }`}
                        >
                            {status === 'All' ? 'All Orders' : status}
                            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${statusFilter === status ? 'bg-primary text-white' : 'bg-border-custom text-muted-gray'}`}>
                                {status === 'All' ? localOrders.length : (statusCounts[status] || 0)}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Order List */}
                <div className="divide-y divide-border-light">
                    {filteredOrders.length > 0 ? filteredOrders.map(order => {
                        const isExpanded = expandedOrder === order.id
                        return (
                            <div key={order.id} className={`transition-all ${isExpanded ? 'bg-bg-custom/50' : 'hover:bg-bg-custom/30'}`}>
                                {/* Order Summary Row */}
                                <div
                                    className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none"
                                    onClick={() => toggleExpandOrder(order.id)}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${order.status === 'Delivered' ? 'bg-success-custom/10' :
                                                order.status === 'Shipped' ? 'bg-blue-50' :
                                                    order.status === 'Processing' ? 'bg-primary-light' : 'bg-amber-50'
                                            }`}>
                                            {order.status === 'Delivered' ? <CheckCircle2 className="w-5 h-5 text-success-custom" /> :
                                                order.status === 'Shipped' ? <Truck className="w-5 h-5 text-blue-600" /> :
                                                    order.status === 'Processing' ? <Clock className="w-5 h-5 text-primary" /> :
                                                        <PackageCheck className="w-5 h-5 text-amber-600" />}
                                        </div>
                                        <div className="text-left">
                                            <div className="flex items-center gap-2.5 flex-wrap">
                                                <span className="text-sm font-bold text-text-dark">{order.id}</span>
                                                <Badge variant={
                                                    order.status === 'Delivered' ? 'success' :
                                                        order.status === 'Processing' ? 'primary' :
                                                            order.status === 'Pending' ? 'warning' : 'gray'
                                                }>{order.status}</Badge>
                                            </div>
                                            <div className="flex items-center gap-4 mt-1 text-[11px] text-muted-gray">
                                                <span className="flex items-center gap-1">
                                                    <User className="w-3 h-3" /> {order.shippingInfo.name}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" /> {new Date(order.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between md:justify-end gap-6 md:gap-8">
                                        <div className="text-right">
                                            <p className="text-[10px] text-muted-gray font-medium uppercase tracking-wide">Vendor Earnings</p>
                                            <p className="text-base font-black text-text-dark">${order.vendorSubtotal.toFixed(2)}</p>
                                            <p className="text-[10px] text-muted-gray">{order.vendorItemsCount} item{order.vendorItemsCount > 1 ? 's' : ''}</p>
                                        </div>
                                        <div className="text-muted-gray">
                                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded Detail Panel */}
                                {isExpanded && (
                                    <div className="px-4 pb-5 space-y-4">
                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                                            {/* Items */}
                                            <div className="lg:col-span-2">
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-gray mb-2">Order Items</p>
                                                <div className="rounded-xl border border-border-custom overflow-hidden bg-white">
                                                    {order.vendorItems.map((item, idx) => (
                                                        <div key={idx} className="flex items-center gap-3 p-3 border-b border-border-light last:border-0">
                                                            <img
                                                                src={item.product.image}
                                                                alt={item.product.name}
                                                                className="w-11 h-11 rounded-lg object-cover border border-border-custom bg-bg-custom shrink-0"
                                                            />
                                                            <div className="flex-1 min-w-0 text-left">
                                                                <span className="text-xs font-semibold text-text-dark line-clamp-1">{item.product.name}</span>
                                                                <span className="text-[10px] text-muted-gray block capitalize mt-0.5">{item.product.categoryName || item.product.category}</span>
                                                            </div>
                                                            <div className="text-right shrink-0">
                                                                <p className="text-xs font-bold text-text-dark">${item.product.price.toFixed(2)}</p>
                                                                <p className="text-[10px] text-muted-gray">×{item.quantity}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Shipping Info */}
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-gray mb-2">Delivery Details</p>
                                                <div className="rounded-xl border border-border-custom overflow-hidden bg-white p-4 space-y-3">
                                                    <div className="flex items-start gap-2.5">
                                                        <MapPin className="w-3.5 h-3.5 text-muted-gray shrink-0 mt-0.5" />
                                                        <span className="text-[11px] text-text-body leading-relaxed font-medium">{order.shippingInfo.address}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2.5 border-t border-border-light pt-3">
                                                        <Phone className="w-3.5 h-3.5 text-muted-gray shrink-0" />
                                                        <span className="text-[11px] font-semibold text-text-dark">{order.shippingInfo.phone}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2.5 border-t border-border-light pt-3">
                                                        <CreditCard className="w-3.5 h-3.5 text-primary shrink-0" />
                                                        <span className="text-[11px] font-semibold text-primary">{order.paymentMethod}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Timeline + Status Picker */}
                                        <div className="bg-white rounded-xl border border-border-custom p-4 flex flex-col md:flex-row md:items-center gap-4 justify-between">
                                            <div className="flex flex-wrap items-center gap-1.5">
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-gray mr-2">Progress:</p>
                                                {order.timeline.map((step, idx) => {
                                                    const isDone = step.completed
                                                    return (
                                                        <React.Fragment key={idx}>
                                                            <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold border ${isDone ? 'bg-primary-light border-primary/20 text-primary' : 'bg-bg-custom border-border-custom text-muted-gray'}`}>
                                                                <CheckCircle2 className={`w-3 h-3 ${isDone ? 'text-primary' : 'text-muted-gray/40'}`} />
                                                                {step.status}
                                                            </div>
                                                            {idx < order.timeline.length - 1 && <ChevronRight className="w-3 h-3 text-muted-gray/30" />}
                                                        </React.Fragment>
                                                    )
                                                })}
                                            </div>

                                            {order.status !== 'Delivered' && (
                                                <div className="flex items-center gap-2.5 shrink-0">
                                                    <span className="text-[10px] font-bold uppercase tracking-wide text-muted-gray whitespace-nowrap">Advance to:</span>
                                                    <select
                                                        onChange={(e) => { if (e.target.value) handleStatusAdvance(order.id, e.target.value) }}
                                                        value={order.status}
                                                        className="text-xs rounded-lg border border-border-custom px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary/30 text-text-dark font-semibold cursor-pointer bg-white"
                                                    >
                                                        {statusOptions.map((stOption) => {
                                                            const currentIdx = statusOptions.indexOf(order.status)
                                                            const stOptionIdx = statusOptions.indexOf(stOption)
                                                            return (
                                                                <option key={stOption} value={stOption} disabled={stOptionIdx <= currentIdx}>
                                                                    {stOptionIdx <= currentIdx ? `✓ ${stOption}` : `→ ${stOption}`}
                                                                </option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    }) : (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center mb-3">
                                <PackageCheck className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-sm font-bold text-text-dark mb-1">No Orders Found</h3>
                            <p className="text-xs text-muted-gray">No orders match your current filters.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default OrdersManagement