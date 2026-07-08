import React, { useContext } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import {
    ArrowLeft,
    ShieldCheck,
    Mail,
    Phone,
    MapPin,
    User,
    Package,
    Star,
    MessageCircle
} from 'lucide-react'
import { Badge, Rating } from '../components/UI'

function formatWhatsAppNumber(phone) {
    return phone.replace(/[\s\-()]/g, '').replace(/^\+/, '')
}

function AdminVendorDetails() {
    const { vendorId } = useParams()
    const { vendors, products } = useContext(AppContext)

    const vendor = vendors.find(v => v.id === vendorId)

    if (!vendor) {
        return <Navigate to="/admin/vendors" replace />
    }

    const vendorProducts = products.filter(p => p.vendorId === vendor.id)
    const whatsappNumber = formatWhatsAppNumber(vendor.phone)
    const whatsappMessage = encodeURIComponent(
        `Assalamu Alaikum ${vendor.owner}, this is the Souq Diyanat administration team regarding your store "${vendor.name}".`
    )
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

    return (
        <div className="space-y-5 font-inter">
            <Link
                to="/admin/vendors"
                className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:text-primary-dark transition"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Vendor Registry
            </Link>

            <div className="bg-white rounded-2xl border border-border-custom shadow-sm overflow-hidden">
                <div className="h-36 sm:h-44 relative">
                    <img src={vendor.banner} alt={vendor.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <img
                        src={vendor.logo}
                        alt={vendor.name}
                        className="absolute -bottom-8 left-5 sm:left-6 w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-lg"
                    />
                </div>

                <div className="pt-12 px-5 sm:px-6 pb-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold text-text-dark">{vendor.name}</h2>
                            <p className="text-sm text-muted-gray mt-1 flex items-center gap-1.5">
                                <User className="w-3.5 h-3.5" />
                                {vendor.owner}
                            </p>
                            <div className="flex items-center gap-3 mt-2">
                                <Rating rating={vendor.rating} />
                                <span className="text-xs text-muted-gray flex items-center gap-1">
                                    <Package className="w-3.5 h-3.5" />
                                    {vendorProducts.length || vendor.productsCount} products
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {vendor.verified && <Badge variant="success">Verified</Badge>}
                                {vendor.fiqhCertified && (
                                    <Badge variant="secondary">
                                        <ShieldCheck className="w-3 h-3 mr-0.5" /> Fiqh Certified
                                    </Badge>
                                )}
                                {!vendor.verified && <Badge variant="warning">Pending Verification</Badge>}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-semibold hover:bg-[#1da851] transition shadow-sm"
                            >
                                <MessageCircle className="w-4 h-4" />
                                Contact on WhatsApp
                            </a>
                            <a
                                href={`mailto:${vendor.contactEmail}`}
                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-border-custom text-xs font-semibold text-text-dark hover:bg-bg-custom transition"
                            >
                                <Mail className="w-4 h-4" />
                                Send Email
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2 space-y-5">
                    <div className="bg-white rounded-2xl border border-border-custom shadow-sm p-5 sm:p-6">
                        <h3 className="text-sm font-bold text-text-dark mb-3">About Store</h3>
                        <p className="text-sm text-muted-gray leading-relaxed">{vendor.description}</p>
                    </div>

                    {vendor.fiqhDetails && (
                        <div className="bg-white rounded-2xl border border-border-custom shadow-sm p-5 sm:p-6">
                            <div className="flex items-center gap-2 mb-3">
                                <ShieldCheck className="w-4 h-4 text-gold" />
                                <h3 className="text-sm font-bold text-text-dark">Fiqh Compliance Details</h3>
                            </div>
                            <p className="text-sm text-muted-gray leading-relaxed">{vendor.fiqhDetails}</p>
                        </div>
                    )}

                    <div className="bg-white rounded-2xl border border-border-custom shadow-sm p-5 sm:p-6">
                        <h3 className="text-sm font-bold text-text-dark mb-4">Store Products</h3>
                        {vendorProducts.length > 0 ? (
                            <div className="space-y-3">
                                {vendorProducts.map(product => (
                                    <div key={product.id} className="flex items-center gap-3 p-3 rounded-xl border border-border-light hover:bg-bg-custom transition">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-12 h-12 rounded-lg object-cover border border-border-custom shrink-0"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-semibold text-text-dark truncate">{product.name}</p>
                                            <p className="text-[10px] text-muted-gray">{product.categoryName}</p>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="text-sm font-bold text-text-dark">${product.price.toFixed(2)}</p>
                                            <div className="flex items-center gap-0.5 justify-end mt-0.5">
                                                <Star className="w-3 h-3 text-gold fill-gold" />
                                                <span className="text-[10px] text-muted-gray">{product.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-gray text-center py-6">No products listed yet.</p>
                        )}
                    </div>
                </div>

                <div className="space-y-5">
                    <div className="bg-white rounded-2xl border border-border-custom shadow-sm p-5 sm:p-6">
                        <h3 className="text-sm font-bold text-text-dark mb-4">Contact Information</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-lg bg-primary-light flex items-center justify-center shrink-0">
                                    <Mail className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-gray">Email</p>
                                    <p className="text-xs text-text-dark mt-0.5 break-all">{vendor.contactEmail}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-lg bg-[#25D366]/10 flex items-center justify-center shrink-0">
                                    <Phone className="w-4 h-4 text-[#25D366]" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-gray">Phone / WhatsApp</p>
                                    <p className="text-xs text-text-dark mt-0.5">{vendor.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-lg bg-primary-light flex items-center justify-center shrink-0">
                                    <MapPin className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-gray">Address</p>
                                    <p className="text-xs text-text-dark mt-0.5 leading-relaxed">{vendor.address}</p>
                                </div>
                            </div>
                        </div>

                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-5 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#25D366] text-white text-xs font-semibold hover:bg-[#1da851] transition"
                        >
                            <MessageCircle className="w-4 h-4" />
                            Open WhatsApp Chat
                        </a>
                    </div>

                    <div className="bg-white rounded-2xl border border-border-custom shadow-sm p-5 sm:p-6">
                        <h3 className="text-sm font-bold text-text-dark mb-4">Quick Stats</h3>
                        <div className="space-y-3">
                            {[
                                { label: 'Store Rating', value: vendor.rating.toFixed(1) },
                                { label: 'Products Listed', value: vendorProducts.length || vendor.productsCount },
                                { label: 'Verification', value: vendor.verified ? 'Approved' : 'Pending' },
                                { label: 'Fiqh Status', value: vendor.fiqhCertified ? 'Certified' : 'Standard' },
                            ].map((stat, i) => (
                                <div key={i} className="flex justify-between items-center py-2 border-b border-border-light last:border-0">
                                    <span className="text-xs text-muted-gray">{stat.label}</span>
                                    <span className="text-xs font-bold text-text-dark">{stat.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminVendorDetails
