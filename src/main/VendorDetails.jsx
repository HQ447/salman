import React, { useContext, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Store, ShieldCheck, Mail, Phone, MapPin, Grid, Info, Award } from 'lucide-react'
import { AppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard'
import { Badge, EmptyState } from '../components/UI'

function VendorDetails() {
    const { vendorId } = useParams()
    const { vendors, products } = useContext(AppContext)
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('products')

    const vendor = vendors.find(v => v.id === vendorId)
    const vendorProducts = products.filter(p => p.vendorId === vendorId)

    if (!vendor) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20">
                <EmptyState
                    title="Store Not Vetted"
                    description="The vendor store directory link does not exist or has been flagged for compliance audit reviews."
                    actionText="Go Back"
                    onAction={() => navigate('/vendors')}
                    icon={Store}
                />
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20 space-y-10">

            {/* 1. Header Banner & Identity */}
            <div className="bg-white border border-border-custom rounded-xl shadow-xs overflow-hidden text-left">
                {/* Banner */}
                <div className="h-44 sm:h-60 bg-bg-custom relative">
                    <img
                        src={vendor.banner}
                        alt={vendor.name}
                        className="w-full h-full object-cover"
                    />
                    {vendor.verified && (
                        <div className="absolute top-4 right-4">
                            <Badge variant="primary" className="bg-primary/95 text-white border-none shadow-sm text-xs font-semibold px-3 py-1">
                                Verified Vendor Partner
                            </Badge>
                        </div>
                    )}
                </div>

                {/* Profile Details Area */}
                <div className="px-6 pb-6 pt-12 relative flex flex-col md:flex-row md:items-end justify-between gap-6">
                    {/* Logo overlapping the banner */}
                    <div className="absolute -top-12 left-6 w-24 h-24 rounded-2xl border-2 border-white bg-white shadow-md overflow-hidden">
                        <img
                            src={vendor.logo}
                            alt={vendor.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="space-y-2 mt-4 md:mt-0">
                        <h1 className="text-xl sm:text-3xl font-extrabold text-text-dark flex items-center gap-2">
                            {vendor.name}
                        </h1>
                        <p className="text-xs text-muted-gray">Owner: <span className="text-text-dark font-semibold">{vendor.owner}</span></p>
                        <p className="text-sm text-text-dark/80 max-w-2xl leading-relaxed">{vendor.description}</p>
                    </div>

                    <div className="flex flex-col items-start md:items-end shrink-0 spacing-y-1.5 self-start md:self-end">
                        <span className="inline-block bg-primary/10 text-primary border border-primary/20 px-3.5 py-1.5 rounded-lg text-xs font-bold leading-none">
                            Store Rating: {vendor.rating} ★
                        </span>
                        <span className="text-[10px] text-muted-gray mt-1">{vendorProducts.length} listings available</span>
                    </div>
                </div>
            </div>

            {/* Tab controls */}
            <div className="flex border-b border-border-custom text-left">
                <button
                    onClick={() => setActiveTab('products')}
                    className={`flex items-center gap-1.5 pb-3 px-4 font-bold text-xs uppercase tracking-wider transition border-b-2 cursor-pointer ${activeTab === 'products'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-muted-gray hover:text-text-dark'
                        }`}
                >
                    <Grid className="w-4 h-4" />
                    Store Catalog ({vendorProducts.length})
                </button>
                <button
                    onClick={() => setActiveTab('about')}
                    className={`flex items-center gap-1.5 pb-3 px-4 font-bold text-xs uppercase tracking-wider transition border-b-2 cursor-pointer ${activeTab === 'about'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-muted-gray hover:text-text-dark'
                        }`}
                >
                    <Info className="w-4 h-4" />
                    Fiqh Compliance & Contact
                </button>
            </div>

            {/* Content panel */}
            <div className="text-left">
                {activeTab === 'products' ? (
                    <div>
                        {vendorProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {vendorProducts.map((p) => (
                                    <ProductCard key={p.id} product={p} />
                                ))}
                            </div>
                        ) : (
                            <EmptyState
                                title="No Products Available"
                                description="This merchant hasn't published any items to their verified catalog shelves yet."
                                icon={Store}
                            />
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

                        {/* Compliance Info */}
                        <div className="md:col-span-7 bg-white border border-border-custom p-6 rounded-xl space-y-4">
                            <h2 className="text-base sm:text-lg font-bold text-text-dark pb-2 border-b border-border-custom flex items-center gap-2">
                                <Award className="text-gold w-5 h-5" />
                                Fiqh al-Muamalat Compliance
                            </h2>

                            <div className="space-y-4 text-xs sm:text-sm text-text-dark/80">
                                <div className="flex items-start space-x-2">
                                    <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-bold text-primary-dark">Merchant Ethics Certified</p>
                                        <p className="text-xs text-muted-gray leading-relaxed mt-1">
                                            {vendor.fiqhCertified
                                                ? vendor.fiqhDetails
                                                : "Committed to core transparent transaction rules, spot delivery settlements and providing full refunds on proven item defects."
                                            }
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-bg-custom rounded-lg p-4 border border-border-custom leading-normal text-3xs text-muted-gray italic">
                                    \"All transactions conducted with {vendor.name} are subject to immediate order placement routing. No futures trading, interest adjustments, or hidden service broker fees.\"
                                </div>
                            </div>
                        </div>

                        {/* Vendor Contact details */}
                        <div className="md:col-span-5 bg-white border border-border-custom p-6 rounded-xl space-y-4">
                            <h3 className="text-base font-bold text-text-dark pb-2 border-b border-border-custom">Store Contact Details</h3>

                            <div className="space-y-4 text-xs">
                                <div className="flex items-center space-x-3 text-muted-gray">
                                    <Mail className="w-4.5 h-4.5 text-primary" />
                                    <div>
                                        <span className="font-extrabold text-[10px] block leading-none text-text-dark">Email Support</span>
                                        <span className="font-semibold text-text-dark/80">{vendor.contactEmail}</span>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3 text-muted-gray">
                                    <Phone className="w-4.5 h-4.5 text-primary" />
                                    <div>
                                        <span className="font-extrabold text-[10px] block leading-none text-text-dark">Store Phone</span>
                                        <span className="font-semibold text-text-dark/80">{vendor.phone}</span>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3 text-muted-gray">
                                    <MapPin className="w-4.5 h-4.5 text-primary" />
                                    <div>
                                        <span className="font-extrabold text-[10px] block leading-none text-text-dark">Physical Store Info</span>
                                        <span className="font-semibold text-text-dark/80 leading-normal">{vendor.address}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>

        </div>
    )
}

export default VendorDetails