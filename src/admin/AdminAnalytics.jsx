import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Link } from 'react-router-dom'
import {
    TrendingUp,
    ShoppingBag,
    DollarSign,
    Store,
    Users,
    Package,
    ArrowUpRight,
    ShieldCheck,
    BarChart2,
    Clock,
    CheckCircle2,
    Activity,
    AlertTriangle
} from 'lucide-react'
import { Badge, Rating } from '../components/UI'

function AdminAnalytics() {
    const { products, orders, vendors, categories, currentUser } = useContext(AppContext)

    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0) || 2847.50
    const totalOrders = orders.length || 24
    const verifiedVendors = vendors.filter(v => v.verified).length
    const fiqhCertified = vendors.filter(v => v.fiqhCertified).length
    const lowStockProducts = products.filter(p => p.stock < 15)

    const weeklyData = [
        { day: 'Mon', orders: 4, revenue: 320 },
        { day: 'Tue', orders: 7, revenue: 540 },
        { day: 'Wed', orders: 5, revenue: 410 },
        { day: 'Thu', orders: 9, revenue: 680 },
        { day: 'Fri', orders: 11, revenue: 820 },
        { day: 'Sat', orders: 6, revenue: 450 },
        { day: 'Sun', orders: 8, revenue: 590 },
    ]
    const maxRevenue = Math.max(...weeklyData.map(d => d.revenue))

    const kpiCards = [
        {
            label: 'Platform Revenue',
            value: `$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            change: '+18.4%',
            positive: true,
            icon: DollarSign,
            color: 'text-primary',
            bg: 'bg-primary-light',
            border: 'border-primary/15',
        },
        {
            label: 'Total Orders',
            value: `${totalOrders}`,
            change: '+12.1%',
            positive: true,
            icon: ShoppingBag,
            color: 'text-amber-600',
            bg: 'bg-amber-50',
            border: 'border-amber-200',
        },
        {
            label: 'Active Vendors',
            value: `${verifiedVendors}/${vendors.length}`,
            change: 'Verified',
            positive: true,
            icon: Store,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            border: 'border-blue-200',
        },
        {
            label: 'Products Listed',
            value: `${products.length}`,
            change: `${categories.length} categories`,
            positive: true,
            icon: Package,
            color: 'text-gold',
            bg: 'bg-gold-light',
            border: 'border-gold/20',
        },
    ]

    const recentOrders = orders.length > 0 ? orders.slice(0, 5) : [
        {
            id: 'SD-98421',
            status: 'Processing',
            shippingInfo: { name: 'Salim Rahman' },
            date: '2026-07-06T15:30:00.000Z',
            total: 104.99,
            items: [{ product: products[0], quantity: 1 }],
        },
        {
            id: 'SD-97402',
            status: 'Delivered',
            shippingInfo: { name: 'Zainab Khan' },
            date: '2026-07-05T10:00:00.000Z',
            total: 89.50,
            items: [{ product: products[1], quantity: 2 }],
        },
        {
            id: 'SD-96318',
            status: 'Pending',
            shippingInfo: { name: 'Omar Farooq' },
            date: '2026-07-04T14:20:00.000Z',
            total: 156.00,
            items: [{ product: products[2], quantity: 3 }],
        },
    ]

    const topVendors = [...vendors]
        .sort((a, b) => (b.rating * b.productsCount) - (a.rating * a.productsCount))
        .slice(0, 4)

    const now = new Date()
    const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

    return (
        <div className="space-y-6 font-inter">
            <div className="bg-white rounded-2xl border border-border-custom shadow-sm p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                    <div className="islamic-pattern w-full h-full" />
                </div>
                <div className="relative z-10">
                    <p className="text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">Governance Dashboard</p>
                    <h2 className="text-xl font-bold text-text-dark">
                        Welcome, {currentUser?.name || 'Administrator'}
                    </h2>
                    <p className="text-sm text-muted-gray mt-0.5">
                        Souq Diyanat Platform · {dateStr}
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 relative z-10">
                    <div className="flex items-center space-x-2 bg-success-custom/10 border border-success-custom/20 px-3 py-2 rounded-xl">
                        <span className="w-2 h-2 rounded-full bg-success-custom animate-pulse" />
                        <span className="text-xs font-semibold text-success-custom">All Systems Active</span>
                    </div>
                    <Link
                        to="/admin/vendors"
                        className="flex items-center space-x-2 bg-primary text-white px-3.5 py-2 rounded-xl text-xs font-semibold hover:bg-primary-dark transition shadow-sm"
                    >
                        <Store className="w-3.5 h-3.5" />
                        <span>Review Vendors</span>
                    </Link>
                </div>
            </div>

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
                            <p className="text-2xl font-black text-text-dark tracking-tight leading-none">{card.value}</p>
                        </div>
                    )
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="bg-white rounded-2xl border border-border-custom shadow-sm p-5 sm:p-6 lg:col-span-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
                        <div>
                            <h3 className="text-sm font-bold text-text-dark">Weekly Platform Activity</h3>
                            <p className="text-[11px] text-muted-gray mt-0.5">Orders & revenue across all vendors</p>
                        </div>
                        <span className="text-[10px] font-semibold text-primary bg-primary-light border border-primary/15 px-2.5 py-1 rounded-lg self-start">
                            Jul 01 – Jul 07
                        </span>
                    </div>

                    <div className="h-52 flex items-end justify-between gap-1.5 sm:gap-3 px-1 relative">
                        <div className="absolute inset-x-0 top-0 bottom-0 flex flex-col justify-between pointer-events-none">
                            {[0, 1, 2, 3].map(i => (
                                <div key={i} className="border-t border-border-light w-full" />
                            ))}
                        </div>
                        {weeklyData.map((bar, i) => {
                            const pct = (bar.revenue / maxRevenue) * 100
                            const isMax = bar.revenue === maxRevenue
                            return (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative z-10">
                                    <span className="text-[10px] font-bold text-muted-gray opacity-0 group-hover:opacity-100 transition bg-white border border-border-custom px-1.5 py-0.5 rounded-md shadow-sm absolute -top-7 whitespace-nowrap">
                                        ${bar.revenue} · {bar.orders} orders
                                    </span>
                                    <div className="w-full flex justify-center" style={{ height: '100%', alignItems: 'flex-end' }}>
                                        <div
                                            style={{ height: `${pct}%` }}
                                            className={`w-full sm:w-10 rounded-t-lg transition-all duration-300 min-h-[6px] ${isMax ? 'bg-primary' : 'bg-primary/30 group-hover:bg-primary/50'}`}
                                        />
                                    </div>
                                    <span className="text-[10px] font-semibold text-muted-gray absolute -bottom-6">{bar.day}</span>
                                </div>
                            )
                        })}
                    </div>
                    <div className="h-6" />
                </div>

                <div className="bg-white rounded-2xl border border-border-custom shadow-sm p-5 sm:p-6 space-y-4">
                    <div>
                        <h3 className="text-sm font-bold text-text-dark">Compliance Overview</h3>
                        <p className="text-[11px] text-muted-gray mt-0.5">Shariah governance metrics</p>
                    </div>

                    <div className="bg-primary-light border border-primary/15 rounded-xl p-3.5 flex items-center gap-3">
                        <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                        <div>
                            <p className="text-xs font-bold text-primary">Ethics Charter Active</p>
                            <p className="text-[10px] text-muted-gray leading-normal mt-0.5">{fiqhCertified} fiqh-certified vendors</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {[
                            { label: 'Verified Vendors', value: `${verifiedVendors}/${vendors.length}`, color: 'text-primary' },
                            { label: 'Fiqh Certified', value: `${fiqhCertified} stores`, color: 'text-success-custom' },
                            { label: 'Low Stock Alerts', value: `${lowStockProducts.length} products`, color: lowStockProducts.length > 0 ? 'text-warning-custom' : 'text-muted-gray' },
                            { label: 'Pending Reviews', value: '2 claims', color: 'text-muted-gray' },
                        ].map((row, i) => (
                            <div key={i} className="flex justify-between items-center py-2 border-b border-border-light last:border-0">
                                <span className="text-xs text-muted-gray">{row.label}</span>
                                <span className={`text-[11px] font-bold ${row.color}`}>{row.value}</span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gold-light border border-gold/20 rounded-xl p-3 text-center">
                        <p className="text-xs font-bold text-gold">Platform Health Score</p>
                        <p className="text-2xl font-black text-text-dark mt-0.5">96<span className="text-sm text-muted-gray">/100</span></p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="bg-white rounded-2xl border border-border-custom shadow-sm p-5 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-sm font-bold text-text-dark">Top Vendors</h3>
                            <p className="text-[11px] text-muted-gray mt-0.5">By rating & catalog size</p>
                        </div>
                        <Link to="/admin/vendors" className="text-[11px] font-semibold text-primary hover:underline flex items-center gap-1">
                            View All <ArrowUpRight className="w-3 h-3" />
                        </Link>
                    </div>

                    <div className="space-y-1">
                        {topVendors.map((vendor, idx) => (
                            <div key={vendor.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-bg-custom transition group">
                                <span className="text-lg font-black text-border-custom group-hover:text-primary transition w-5 text-center shrink-0">
                                    {idx + 1}
                                </span>
                                <img
                                    src={vendor.logo}
                                    alt={vendor.name}
                                    className="w-10 h-10 rounded-lg object-cover border border-border-custom shrink-0"
                                />
                                <div className="flex-1 min-w-0 text-left">
                                    <h4 className="text-xs font-semibold text-text-dark truncate">{vendor.name}</h4>
                                    <p className="text-[10px] text-muted-gray mt-0.5">{vendor.owner}</p>
                                    <Rating rating={vendor.rating} className="mt-0.5 scale-[0.85] origin-left" />
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="text-sm font-black text-text-dark">{vendor.productsCount}</p>
                                    <p className="text-[10px] text-muted-gray">products</p>
                                    {vendor.verified && (
                                        <Badge variant="success" className="mt-1 text-[9px]">Verified</Badge>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-border-custom shadow-sm p-5 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-sm font-bold text-text-dark">Recent Orders</h3>
                            <p className="text-[11px] text-muted-gray mt-0.5">Latest marketplace transactions</p>
                        </div>
                        <Link to="/admin/orders" className="text-[11px] font-semibold text-primary hover:underline flex items-center gap-1">
                            View All <ArrowUpRight className="w-3 h-3" />
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {recentOrders.map((order) => (
                            <div key={order.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-bg-custom transition border border-border-light">
                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                                    order.status === 'Delivered' ? 'bg-success-custom/10' :
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
                                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
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
                                    <p className="text-sm font-black text-text-dark">${order.total.toFixed(2)}</p>
                                    <p className="text-[10px] text-muted-gray">{order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-border-custom shadow-sm p-5">
                <h3 className="text-sm font-bold text-text-dark mb-4">Platform Snapshot</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    {[
                        { label: 'Categories', value: categories.length, icon: BarChart2, color: 'text-primary', bg: 'bg-primary-light' },
                        { label: 'Customers', value: Math.max(orders.length * 3, 48), icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                        { label: 'Avg. Order', value: `$${(totalRevenue / totalOrders).toFixed(0)}`, icon: DollarSign, color: 'text-amber-600', bg: 'bg-amber-50' },
                        { label: 'Stock Alerts', value: lowStockProducts.length, icon: AlertTriangle, color: 'text-warning-custom', bg: 'bg-warning-custom/10' },
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

export default AdminAnalytics
