import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { Search, ShieldCheck, MapPin, Mail, Phone, Filter } from 'lucide-react'
import { Badge, Rating } from '../components/UI'

function AdminVendors() {
    const { vendors, products } = useContext(AppContext)
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')

    const filteredVendors = vendors.filter(vendor => {
        const matchesSearch =
            vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vendor.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vendor.contactEmail.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus =
            statusFilter === 'all' ||
            (statusFilter === 'verified' && vendor.verified) ||
            (statusFilter === 'fiqh' && vendor.fiqhCertified) ||
            (statusFilter === 'pending' && !vendor.verified)
        return matchesSearch && matchesStatus
    })

    const getVendorProductCount = (vendorId) =>
        products.filter(p => p.vendorId === vendorId).length

    return (
        <div className="space-y-5 font-inter">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-bold text-text-dark">Vendor Registry</h2>
                    <p className="text-sm text-muted-gray mt-0.5">
                        {vendors.length} registered merchants · {vendors.filter(v => v.verified).length} verified
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    {['all', 'verified', 'fiqh', 'pending'].map(filter => (
                        <button
                            key={filter}
                            onClick={() => setStatusFilter(filter)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition border ${
                                statusFilter === filter
                                    ? 'bg-primary text-white border-primary'
                                    : 'bg-white text-muted-gray border-border-custom hover:border-primary/30'
                            }`}
                        >
                            {filter === 'fiqh' ? 'Fiqh Certified' : filter}
                        </button>
                    ))}
                </div>
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-gray" />
                <input
                    type="text"
                    placeholder="Search vendors by name, owner, or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-custom bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredVendors.map(vendor => {
                    const actualProducts = getVendorProductCount(vendor.id)
                    return (
                        <div
                            key={vendor.id}
                            className="bg-white rounded-2xl border border-border-custom shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                        >
                            <div className="h-24 sm:h-28 relative">
                                <img
                                    src={vendor.banner}
                                    alt={vendor.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                <img
                                    src={vendor.logo}
                                    alt={vendor.name}
                                    className="absolute -bottom-6 left-4 w-14 h-14 rounded-xl object-cover border-4 border-white shadow-md"
                                />
                            </div>

                            <div className="pt-9 px-4 sm:px-5 pb-5">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="min-w-0">
                                        <h3 className="text-sm font-bold text-text-dark truncate">{vendor.name}</h3>
                                        <p className="text-xs text-muted-gray mt-0.5">{vendor.owner}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-1 shrink-0">
                                        {vendor.verified && <Badge variant="success">Verified</Badge>}
                                        {vendor.fiqhCertified && (
                                            <Badge variant="secondary">
                                                <ShieldCheck className="w-3 h-3 mr-0.5" /> Fiqh
                                            </Badge>
                                        )}
                                    </div>
                                </div>

                                <p className="text-xs text-muted-gray mt-3 line-clamp-2 leading-relaxed">{vendor.description}</p>

                                <div className="flex items-center gap-3 mt-3">
                                    <Rating rating={vendor.rating} />
                                    <span className="text-[10px] text-muted-gray">
                                        {actualProducts || vendor.productsCount} products
                                    </span>
                                </div>

                                <div className="mt-4 space-y-2 pt-4 border-t border-border-light">
                                    <div className="flex items-center gap-2 text-xs text-muted-gray">
                                        <Mail className="w-3.5 h-3.5 shrink-0" />
                                        <span className="truncate">{vendor.contactEmail}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-muted-gray">
                                        <Phone className="w-3.5 h-3.5 shrink-0" />
                                        <span>{vendor.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-muted-gray">
                                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                                        <span className="truncate">{vendor.address}</span>
                                    </div>
                                </div>

                                <div className="flex gap-2 mt-4">
                                    <Link
                                        to={`/admin/vendors/${vendor.id}`}
                                        className="flex-1 py-2 rounded-lg text-xs font-semibold bg-primary text-white hover:bg-primary-dark transition text-center"
                                    >
                                        View Details
                                    </Link>
                                    <button className="flex-1 py-2 rounded-lg text-xs font-semibold border border-border-custom text-muted-gray hover:bg-bg-custom transition">
                                        Audit Log
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {filteredVendors.length === 0 && (
                <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-border-custom">
                    <Filter className="w-10 h-10 text-muted-gray mx-auto mb-3 opacity-50" />
                    <p className="text-sm font-semibold text-text-dark">No vendors match your filters</p>
                    <p className="text-xs text-muted-gray mt-1">Try adjusting your search or filter criteria</p>
                </div>
            )}
        </div>
    )
}

export default AdminVendors
