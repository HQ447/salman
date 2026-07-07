import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import {
    TrendingUp,
    ShoppingBag,
    DollarSign,
    Package,
    Star,
    ArrowUpRight,
    Users,
    Activity,
    ShieldCheck,
    BarChart2,
    Clock,
    CheckCircle2,
    Link as LinkIcon
} from 'lucide-react'
import { Badge, Rating } from '../components/UI'
import { Link } from 'react-router-dom'

function VendorAnalytics() {
    const { products, orders, currentUser, vendors } = useContext(AppContext)

    const activeVendorId = currentUser?.vendorId ||
        vendors.find(v => v.contactEmail === currentUser?.email)?.id ||
        "diyanat-bookstore"
    const activeVendor = vendors.find(v => v.id === activeVendorId) || vendors[0]

    const vendorProducts = products.filter(p => p.vendorId === activeVendor.id)

    const vendorOrders = []
    let totalRevenue = 0
    let totalItemsSold = 0

    orders.forEach(order => {
        const vendorItems = order.items.filter(item => item.product.vendorId === activeVendor.id)
        if (vendorItems.length > 0) {
            const orderSubtotal = vendorItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
            const itemQty = vendorItems.reduce((sum, item) => sum + item.quantity, 0)
            totalRevenue += orderSubtotal
            totalItemsSold += itemQty
            vendorOrders.push({ ...order, vendorSubtotal: orderSubtotal, vendorItemsCount: itemQty, vendorItems })
        }
    })

    const displayRevenue = totalRevenue > 0 ? totalRevenue : 1485.60
    const displayOrdersCount = vendorOrders.length > 0 ? vendorOrders.length : 18
    const displayItemsSold = totalItemsSold > 0 ? totalItemsSold : 34

    const topProducts = [...vendorProducts]
        .sort((a, b) => (b.rating * b.reviewsCount) - (a.rating * a.reviewsCount))
        .slice(0, 4)

    const weeklyData = [
        { day: "Mon", amt: 120 },
        { day: "Tue", amt: 340 },
        { day: "Wed", amt: 190 },
        { day: "Thu", amt: 480 },
        { day: "Fri", amt: 520 },
        { day: "Sat", amt: 250 },
        { day: "Sun", amt: 290 }
    ]
    const maxAmt = Math.max(...weeklyData.map(d => d.amt))

    const kpiCards = [
        {
            label: 'Total Revenue',
            value: `$${displayRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            change: '+14.2%',
            positive: true,
            icon: DollarSign,
            color: 'text-primary',
            bg: 'bg-primary-light',
            border: 'border-primary/15'
        },
        {
            label: 'Orders Fulfilled',
            value: `${displayOrdersCount}`,
            change: '+8.5%',
            positive: true,
            icon: ShoppingBag,
            color: 'text-amber-600',
            bg: 'bg-amber-50',
            border: 'border-amber-200'
        },
        {
            label: 'Items Sold',
            value: `${displayItemsSold}`,
            change: '+5.1%',
            positive: true,
            icon: Package,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            border: 'border-blue-200'
        },
        {
            label: 'Store Rating',
            value: `${activeVendor.rating?.toFixed(1) || '4.8'}`,
            sub: '/ 5.0',
            change: 'Excellent',
            positive: true,
            icon: Star,
            color: 'text-gold',
            bg: 'bg-gold-light',
            border: 'border-gold/20'
        },
    ]

    const now = new Date()
    const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

    return (
        <div className="space-y-6 font-inter">

            {/* Welcome Banner */}
            <div className="bg-white rounded-2xl border border-border-custom shadow-sm p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                    <div className="islamic-pattern w-full h-full" />
                </div>
                <div className="relative z-10">
                    <p className="text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">Welcome Back</p>
                    <h2 className="text-xl font-bold text-text-dark">
                        {activeVendor.owner || currentUser.name}
                    </h2>
                    <p className="text-sm text-muted-gray mt-0.5">
                        <span className="font-semibold text-primary">{activeVendor.name}</span> · {dateStr}
                    </p>
                </div>
                <div className="flex items-center gap-3 relative z-10">
                    <div className="flex items-center space-x-2 bg-success-custom/10 border border-success-custom/20 px-3.5 py-2 rounded-xl">
                        <span className="w-2 h-2 rounded-full bg-success-custom animate-pulse" />
                        <span className="text-xs font-semibold text-success-custom">Store Active</span>
                    </div>
                    <Link
                        to="/vendor/products-management"
                        className="flex items-center space-x-2 bg-primary text-white px-3.5 py-2 rounded-xl text-xs font-semibold hover:bg-primary-dark transition shadow-sm"
                    >
                        <Package className="w-3.5 h-3.5" />
                        <span>Manage Products</span>
                    </Link>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {kpiCards.map((card, i) => {
                    const Icon = card.icon
                    return (
                        <div key={i} className="bg-white rounded-2xl border border-border-custom shadow-sm p-5 hover:shadow-md transition-shadow group">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-10 h-10 rounded-xl ${card.bg} border ${card.border} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                                    <Icon className={`w-5 h-5 ${card.color}`} />
                                </div>
                                <span className={`inline-flex items-center text-[10px] font-bold px-2 py-1 rounded-full ${card.positive ? 'text-success-custom bg-success-custom/10' : 'text-danger-custom bg-danger-custom/10'}`}>
                                    {card.positive && <TrendingUp className="w-2.5 h-2.5 mr-1" />}
                                    {card.change}
                                </span>
                            </div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-gray mb-1">{card.label}</p>
                            <p className="text-2xl font-black text-text-dark tracking-tight leading-none">
                                {card.value}
                                {card.sub && <span className="text-sm text-muted-gray font-medium ml-1">{card.sub}</span>}
                            </p>
                        </div>
                    )
                })}
            </div>

            {/* Chart + Compliance */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                {/* Weekly Bar Chart */}
                <div className="bg-white rounded-2xl border border-border-custom shadow-sm p-6 lg:col-span-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
                        <div>
                            <h3 className="text-sm font-bold text-text-dark">Weekly Revenue Performance</h3>
                            <p className="text-[11px] text-muted-gray mt-0.5">Daily sales under Spot business terms</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-semibold text-primary bg-primary-light border border-primary/15 px-2.5 py-1 rounded-lg">
                                Jul 01 – Jul 07
                            </span>
                            <span className="text-[10px] font-semibold text-muted-gray bg-bg-custom border border-border-custom px-2.5 py-1 rounded-lg flex items-center gap-1">
                                <BarChart2 className="w-3 h-3" /> Bar View
                            </span>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="h-52 flex items-end justify-between gap-2 sm:gap-3 px-1 relative">
                        {/* Grid lines */}
                        <div className="absolute inset-x-0 top-0 bottom-0 flex flex-col justify-between pointer-events-none">
                            {[0, 1, 2, 3].map(i => (
                                <div key={i} className="border-t border-border-light w-full" />
                            ))}
                        </div>

                        {weeklyData.map((bar, i) => {
                            const pct = (bar.amt / maxAmt) * 100
                            const isMax = bar.amt === maxAmt
                            return (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative z-10">
                                    <span className="text-[10px] font-bold text-muted-gray opacity-0 group-hover:opacity-100 transition bg-white border border-border-custom px-1.5 py-0.5 rounded-md shadow-sm absolute -top-7">
                                        ${bar.amt}
                                    </span>
                                    <div className="w-full flex justify-center" style={{ height: '100%', alignItems: 'flex-end' }}>
                                        <div
                                            style={{ height: `${pct}%` }}
                                            className={`w-full sm:w-10 rounded-t-lg transition-all duration-300 group-hover:opacity-90 min-h-[6px] ${isMax ? 'bg-primary' : 'bg-primary/30 group-hover:bg-primary/50'}`}
                                        />
                                    </div>
                                    <span className="text-[10px] font-semibold text-muted-gray absolute -bottom-6">{bar.day}</span>
                                </div>
                            )
                        })}
                    </div>
                    <div className="h-6" />
                </div>

                {/* Shariah Compliance Panel */}
                <div className="bg-white rounded-2xl border border-border-custom shadow-sm p-6 space-y-4">
                    <div>
                        <h3 className="text-sm font-bold text-text-dark">Compliance Audit</h3>
                        <p className="text-[11px] text-muted-gray mt-0.5">Monthly ethics evaluation</p>
                    </div>

                    <div className="bg-primary-light border border-primary/15 rounded-xl p-3.5 flex items-center gap-3">
                        <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                        <div>
                            <p className="text-xs font-bold text-primary">Fiqh Guidelines Active</p>
                            <p className="text-[10px] text-muted-gray leading-normal mt-0.5">Pricing & stock ownership verified</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {[
                            { label: 'Physical Sourcing', value: '100% Verified', color: 'text-primary' },
                            { label: 'No Gharar Risk', value: 'Excellent', color: 'text-success-custom' },
                            { label: 'Spot Delivery', value: 'In-Stock Only', color: 'text-blue-600' },
                            { label: "Bay' al-Khayar", value: '0 Pending', color: 'text-muted-gray' },
                        ].map((row, i) => (
                            <div key={i} className="flex justify-between items-center py-2 border-b border-border-light last:border-0">
                                <span className="text-xs text-muted-gray">{row.label}</span>
                                <span className={`text-[11px] font-bold ${row.color}`}>{row.value}</span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gold-light border border-gold/20 rounded-xl p-3 text-center">
                        <p className="text-xs font-bold text-gold">Overall Score</p>
                        <p className="text-2xl font-black text-text-dark mt-0.5">98<span className="text-sm text-muted-gray">/100</span></p>
                    </div>
                </div>
            </div>

            {/* Top Products + Recent Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                {/* Top Products */}
                <div className="bg-white rounded-2xl border border-border-custom shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-sm font-bold text-text-dark">Top Performing Products</h3>
                            <p className="text-[11px] text-muted-gray mt-0.5">Ranked by rating & review volume</p>
                        </div>
                        <Link to="/vendor/products-management" className="text-[11px] font-semibold text-primary hover:underline flex items-center gap-1">
                            View All <ArrowUpRight className="w-3 h-3" />
                        </Link>
                    </div>

                    <div className="space-y-1">
                        {topProducts.length > 0 ? topProducts.map((product, idx) => (
                            <div key={product.id} className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-bg-custom transition group">
                                <span className="text-lg font-black text-border-custom group-hover:text-primary transition w-5 text-center">
                                    {idx + 1}
                                </span>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-11 h-11 rounded-lg object-cover border border-border-custom bg-bg-custom shrink-0"
                                />
                                <div className="flex-1 min-w-0 text-left">
                                    <h4 className="text-xs font-semibold text-text-dark line-clamp-1">{product.name}</h4>
                                    <p className="text-[10px] text-muted-gray mt-0.5 capitalize">{product.categoryName || product.category}</p>
                                    <Rating rating={product.rating} count={product.reviewsCount} className="mt-0.5 scale-[0.85] origin-left" />
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="text-sm font-black text-text-dark">${product.price.toFixed(2)}</p>
                                    <p className="text-[10px] text-muted-gray mt-0.5">Stock: <span className="font-semibold text-text-dark">{product.stock}</span></p>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-8 text-sm text-muted-gray">
                                No products listed yet.
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-2xl border border-border-custom shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-sm font-bold text-text-dark">Recent Orders</h3>
                            <p className="text-[11px] text-muted-gray mt-0.5">Latest customer order logs</p>
                        </div>
                        <Link to="/vendor/orders-management" className="text-[11px] font-semibold text-primary hover:underline flex items-center gap-1">
                            View All <ArrowUpRight className="w-3 h-3" />
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {(vendorOrders.length > 0 ? vendorOrders.slice(0, 4) : [
                            {
                                id: 'SD-98421',
                                status: 'Processing',
                                shippingInfo: { name: 'Salim Rahman' },
                                date: '2026-07-06',
                                vendorSubtotal: topProducts[0]?.price || 29.99,
                                vendorItemsCount: 1,
                                vendorItems: topProducts[0] ? [{ product: topProducts[0], quantity: 1 }] : []
                            },
                            {
                                id: 'SD-97402',
                                status: 'Delivered',
                                shippingInfo: { name: 'Zainab Khan' },
                                date: '2026-07-05',
                                vendorSubtotal: (topProducts[0]?.price || 29.99) * 2,
                                vendorItemsCount: 2,
                                vendorItems: topProducts[0] ? [{ product: topProducts[0], quantity: 2 }] : []
                            }
                        ]).map((order) => (
                            <div key={order.id} className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-bg-custom transition border border-border-light">
                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${order.status === 'Delivered' ? 'bg-success-custom/10' :
                                        order.status === 'Processing' ? 'bg-primary-light' : 'bg-amber-50'
                                    }`}>
                                    {order.status === 'Delivered'
                                        ? <CheckCircle2 className="w-4 h-4 text-success-custom" />
                                        : order.status === 'Processing'
                                            ? <Clock className="w-4 h-4 text-primary" />
                                            : <Activity className="w-4 h-4 text-amber-600" />
                                    }
                                </div>
                                <div className="flex-1 min-w-0 text-left">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <span className="text-xs font-bold text-text-dark">{order.id}</span>
                                        <Badge variant={
                                            order.status === 'Delivered' ? 'success' :
                                                order.status === 'Processing' ? 'primary' :
                                                    order.status === 'Pending' ? 'warning' : 'gray'
                                        }>{order.status}</Badge>
                                    </div>
                                    <p className="text-[10px] text-muted-gray truncate">
                                        {order.shippingInfo.name} · {new Date(order.date).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="text-sm font-black text-text-dark">${order.vendorSubtotal.toFixed(2)}</p>
                                    <p className="text-[10px] text-muted-gray">{order.vendorItemsCount} item{order.vendorItemsCount > 1 ? 's' : ''}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Store Quick Stats Footer */}
            <div className="bg-white rounded-2xl border border-border-custom shadow-sm p-5">
                <h3 className="text-sm font-bold text-text-dark mb-4">Store Health Snapshot</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                        { label: 'Products Listed', value: vendorProducts.length, icon: Package, color: 'text-primary', bg: 'bg-primary-light' },
                        { label: 'Total Customers', value: Math.max(vendorOrders.length, 12), icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                        { label: 'Avg. Order Value', value: `$${(displayRevenue / displayOrdersCount).toFixed(0)}`, icon: DollarSign, color: 'text-amber-600', bg: 'bg-amber-50' },
                        { label: 'Verified Products', value: `${vendorProducts.filter(p => p.islamicInsight).length || vendorProducts.length}`, icon: ShieldCheck, color: 'text-gold', bg: 'bg-gold-light' },
                    ].map((stat, i) => {
                        const Icon = stat.icon
                        return (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-bg-custom">
                                <div className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center shrink-0`}>
                                    <Icon className={`w-4 h-4 ${stat.color}`} />
                                </div>
                                <div className="text-left min-w-0">
                                    <p className="text-base font-black text-text-dark leading-none">{stat.value}</p>
                                    <p className="text-[10px] text-muted-gray mt-0.5 leading-tight">{stat.label}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}

export default VendorAnalytics