import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import {
    Search,
    ChevronDown,
    ChevronUp,
    MapPin,
    Phone,
    User,
    CreditCard,
    Calendar,
    Package,
    Clock,
    CheckCircle2,
    Truck
} from 'lucide-react'
import { Badge } from '../components/UI'

function AdminOrders() {
    const { orders } = useContext(AppContext)
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState('All')
    const [expandedOrder, setExpandedOrder] = useState(null)

    const displayOrders = orders.length > 0 ? orders : [
        {
            id: 'SD-98421',
            date: '2026-07-06T15:30:00.000Z',
            items: [],
            subtotal: 99.99,
            shippingFee: 5.00,
            total: 104.99,
            status: 'Processing',
            shippingInfo: { name: 'Salim Rahman', phone: '+92 300 9876543', address: 'House 14, Street 3, Sector F-11/1, Islamabad' },
            paymentMethod: 'Cash on Delivery',
            timeline: [
                { status: 'Pending', time: '2026-07-06T15:30:00.000Z', completed: true },
                { status: 'Processing', time: '2026-07-06T18:15:00.000Z', completed: true },
                { status: 'Packed', time: null, completed: false },
            ],
        },
    ]

    const statusOptions = ['All', 'Pending', 'Processing', 'Packed', 'Shipped', 'Delivered']

    const filteredOrders = displayOrders.filter(order => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.shippingInfo.name.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === 'All' || order.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const statusCounts = statusOptions.slice(1).reduce((acc, s) => ({
        ...acc,
        [s]: displayOrders.filter(o => o.status === s).length,
    }), {})

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Delivered': return <CheckCircle2 className="w-4 h-4 text-success-custom" />
            case 'Shipped': return <Truck className="w-4 h-4 text-blue-600" />
            case 'Processing': return <Clock className="w-4 h-4 text-primary" />
            default: return <Package className="w-4 h-4 text-amber-600" />
        }
    }

    return (
        <div className="space-y-5 font-inter">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-bold text-text-dark">Order Oversight</h2>
                    <p className="text-sm text-muted-gray mt-0.5">
                        {displayOrders.length} total orders across all vendors
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {statusOptions.slice(1).map(status => (
                    <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`p-3 rounded-xl border text-center transition ${
                            statusFilter === status
                                ? 'bg-primary text-white border-primary shadow-sm'
                                : 'bg-white border-border-custom hover:border-primary/30'
                        }`}
                    >
                        <p className={`text-lg font-black ${statusFilter === status ? 'text-white' : 'text-text-dark'}`}>
                            {statusCounts[status] || 0}
                        </p>
                        <p className={`text-[10px] font-semibold mt-0.5 ${statusFilter === status ? 'text-white/80' : 'text-muted-gray'}`}>
                            {status}
                        </p>
                    </button>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-gray" />
                    <input
                        type="text"
                        placeholder="Search by order ID or customer name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-custom bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                    />
                </div>
                {statusFilter !== 'All' && (
                    <button
                        onClick={() => setStatusFilter('All')}
                        className="px-4 py-2.5 rounded-xl border border-border-custom bg-white text-xs font-semibold text-muted-gray hover:bg-bg-custom transition"
                    >
                        Clear Filter
                    </button>
                )}
            </div>

            <div className="space-y-3">
                {filteredOrders.map(order => (
                    <div key={order.id} className="bg-white rounded-2xl border border-border-custom shadow-sm overflow-hidden">
                        <button
                            onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                            className="w-full flex items-center gap-3 sm:gap-4 p-4 sm:p-5 hover:bg-bg-custom/50 transition text-left"
                        >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                order.status === 'Delivered' ? 'bg-success-custom/10' :
                                order.status === 'Processing' ? 'bg-primary-light' : 'bg-amber-50'
                            }`}>
                                {getStatusIcon(order.status)}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-sm font-bold text-text-dark">{order.id}</span>
                                    <Badge variant={
                                        order.status === 'Delivered' ? 'success' :
                                        order.status === 'Processing' ? 'primary' :
                                        order.status === 'Pending' ? 'warning' : 'gray'
                                    }>{order.status}</Badge>
                                </div>
                                <p className="text-xs text-muted-gray mt-0.5 truncate">
                                    {order.shippingInfo.name} · {order.items?.length || 0} items
                                </p>
                            </div>

                            <div className="text-right shrink-0 hidden sm:block">
                                <p className="text-sm font-black text-text-dark">${order.total.toFixed(2)}</p>
                                <p className="text-[10px] text-muted-gray flex items-center justify-end gap-1 mt-0.5">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(order.date).toLocaleDateString()}
                                </p>
                            </div>

                            {expandedOrder === order.id
                                ? <ChevronUp className="w-4 h-4 text-muted-gray shrink-0" />
                                : <ChevronDown className="w-4 h-4 text-muted-gray shrink-0" />
                            }
                        </button>

                        {expandedOrder === order.id && (
                            <div className="border-t border-border-light px-4 sm:px-5 pb-5 pt-4 bg-bg-custom/30">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <h4 className="text-xs font-bold text-text-dark uppercase tracking-wider">Customer Details</h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-xs text-muted-gray">
                                                <User className="w-3.5 h-3.5 shrink-0" />
                                                <span>{order.shippingInfo.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-muted-gray">
                                                <Phone className="w-3.5 h-3.5 shrink-0" />
                                                <span>{order.shippingInfo.phone}</span>
                                            </div>
                                            <div className="flex items-start gap-2 text-xs text-muted-gray">
                                                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                                                <span>{order.shippingInfo.address}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-muted-gray">
                                                <CreditCard className="w-3.5 h-3.5 shrink-0" />
                                                <span>{order.paymentMethod}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h4 className="text-xs font-bold text-text-dark uppercase tracking-wider">Order Summary</h4>
                                        <div className="space-y-1.5 text-xs">
                                            <div className="flex justify-between">
                                                <span className="text-muted-gray">Subtotal</span>
                                                <span className="font-semibold text-text-dark">${order.subtotal.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-gray">Shipping</span>
                                                <span className="font-semibold text-text-dark">${order.shippingFee.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between pt-1.5 border-t border-border-light">
                                                <span className="font-bold text-text-dark">Total</span>
                                                <span className="font-black text-primary">${order.total.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {order.items?.length > 0 && (
                                    <div className="mt-4 pt-4 border-t border-border-light">
                                        <h4 className="text-xs font-bold text-text-dark uppercase tracking-wider mb-3">Items</h4>
                                        <div className="space-y-2">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-3 p-2 rounded-lg bg-white border border-border-light">
                                                    <img
                                                        src={item.product.image}
                                                        alt={item.product.name}
                                                        className="w-10 h-10 rounded-lg object-cover border border-border-custom"
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs font-semibold text-text-dark truncate">{item.product.name}</p>
                                                        <p className="text-[10px] text-muted-gray">{item.product.vendorName}</p>
                                                    </div>
                                                    <div className="text-right shrink-0">
                                                        <p className="text-xs font-bold text-text-dark">×{item.quantity}</p>
                                                        <p className="text-[10px] text-muted-gray">${(item.product.price * item.quantity).toFixed(2)}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {order.timeline && (
                                    <div className="mt-4 pt-4 border-t border-border-light">
                                        <h4 className="text-xs font-bold text-text-dark uppercase tracking-wider mb-3">Timeline</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {order.timeline.map((step, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold ${
                                                        step.completed
                                                            ? 'bg-success-custom/10 text-success-custom'
                                                            : 'bg-bg-custom text-muted-gray border border-border-custom'
                                                    }`}
                                                >
                                                    {step.completed && <CheckCircle2 className="w-3 h-3" />}
                                                    {step.status}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {filteredOrders.length === 0 && (
                <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-border-custom">
                    <Package className="w-10 h-10 text-muted-gray mx-auto mb-3 opacity-50" />
                    <p className="text-sm font-semibold text-text-dark">No orders found</p>
                    <p className="text-xs text-muted-gray mt-1">Try adjusting your search or status filter</p>
                </div>
            )}
        </div>
    )
}

export default AdminOrders
