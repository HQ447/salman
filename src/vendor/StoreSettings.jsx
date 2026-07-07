import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import {
    Store,
    Save,
    ShieldCheck,
    Mail,
    Phone,
    MapPin,
    Image as ImageIcon,
    Check,
    AlertCircle,
    HeartHandshake,
    User,
    Globe,
    Loader2
} from 'lucide-react'

function StoreSettings() {
    const { currentUser, vendors, updateProfile } = useContext(AppContext)

    const activeVendorId = currentUser?.vendorId ||
        vendors.find(v => v.contactEmail === currentUser?.email)?.id ||
        "diyanat-bookstore"
    const activeVendor = vendors.find(v => v.id === activeVendorId) || vendors[0]

    const [formData, setFormData] = useState({
        name: '',
        owner: '',
        contactEmail: '',
        phone: '',
        address: '',
        description: '',
        logo: '',
        banner: '',
        fiqhCertified: false,
        fiqhDetails: ''
    })

    const [isSaving, setIsSaving] = useState(false)
    const [successToast, setSuccessToast] = useState(null)

    useEffect(() => {
        if (activeVendor) {
            setFormData({
                name: activeVendor.name || '',
                owner: activeVendor.owner || '',
                contactEmail: activeVendor.contactEmail || '',
                phone: activeVendor.phone || '',
                address: activeVendor.address || '',
                description: activeVendor.description || '',
                logo: activeVendor.logo || '',
                banner: activeVendor.banner || '',
                fiqhCertified: activeVendor.fiqhCertified || false,
                fiqhDetails: activeVendor.fiqhDetails || ''
            })
        }
    }, [activeVendor])

    useEffect(() => {
        if (successToast) {
            const timer = setTimeout(() => setSuccessToast(null), 3500)
            return () => clearTimeout(timer)
        }
    }, [successToast])

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        setIsSaving(true)
        setTimeout(() => {
            setIsSaving(false)
            setSuccessToast("Store settings saved successfully!")
            updateProfile({
                name: formData.name,
                email: formData.contactEmail,
                phone: formData.phone,
                address: formData.address
            })
        }, 1200)
    }

    const inputClass = "w-full text-text-dark text-sm rounded-xl px-3.5 py-2.5 border border-border-custom focus:ring-2 focus:ring-primary/30 focus:border-primary/50 focus:outline-none transition-all bg-white placeholder:text-muted-light"
    const labelClass = "block text-[11px] font-semibold text-text-dark uppercase tracking-wide mb-1.5"
    const sectionClass = "bg-white rounded-2xl border border-border-custom shadow-sm p-6 space-y-5"

    return (
        <div className="space-y-5 font-inter">

            {/* Success Toast */}
            {successToast && (
                <div className="fixed bottom-6 right-6 z-50 flex items-center bg-primary text-white px-5 py-3 rounded-xl shadow-xl gap-3 animate-bounce">
                    <Check className="w-4 h-4" />
                    <span className="text-xs font-semibold">{successToast}</span>
                </div>
            )}

            {/* Page Header */}
            <div className="bg-white rounded-2xl border border-border-custom shadow-sm p-5">
                <h2 className="text-base font-bold text-text-dark">Store Settings</h2>
                <p className="text-xs text-muted-gray mt-0.5">Manage your public storefront profile, contact info, and Shariah compliance declarations.</p>
            </div>

            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                {/* Left Column */}
                <div className="lg:col-span-2 space-y-5">

                    {/* Identity Section */}
                    <div className={sectionClass}>
                        <div className="flex items-center gap-2 pb-3 border-b border-border-light">
                            <div className="w-7 h-7 rounded-lg bg-primary-light flex items-center justify-center">
                                <Store className="w-3.5 h-3.5 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-text-dark">Store Identity</h3>
                                <p className="text-[10px] text-muted-gray">Public profile shown to buyers</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}>Store Name *</label>
                                <input
                                    name="name" required value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Al-Barakah Foods"
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Owner / Proprietor *</label>
                                <input
                                    name="owner" required value={formData.owner}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Salim Al-Harbi"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        <div>
                            <label className={labelClass}>Store Description *</label>
                            <textarea
                                name="description" rows={3} required
                                value={formData.description}
                                onChange={handleInputChange}
                                className={`${inputClass} resize-none`}
                                placeholder="Describe your items' origin, pricing formula, and return guarantees."
                            />
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className={sectionClass}>
                        <div className="flex items-center gap-2 pb-3 border-b border-border-light">
                            <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                                <Phone className="w-3.5 h-3.5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-text-dark">Contact & Location</h3>
                                <p className="text-[10px] text-muted-gray">Buyer-facing contact details</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}>Support Email *</label>
                                <div className="relative">
                                    <Mail className="w-3.5 h-3.5 text-muted-gray absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input
                                        name="contactEmail" type="email" required
                                        value={formData.contactEmail} onChange={handleInputChange}
                                        placeholder="support@store.co"
                                        className={`${inputClass} pl-9`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>Phone Number *</label>
                                <div className="relative">
                                    <Phone className="w-3.5 h-3.5 text-muted-gray absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input
                                        name="phone" required value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="+92 300 1234567"
                                        className={`${inputClass} pl-9`}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className={labelClass}>Warehouse / Sourcing Address *</label>
                            <div className="relative">
                                <MapPin className="w-3.5 h-3.5 text-muted-gray absolute left-3.5 top-3.5" />
                                <textarea
                                    name="address" rows={2} required
                                    value={formData.address} onChange={handleInputChange}
                                    placeholder="Street, Sector, City, Country"
                                    className={`${inputClass} pl-9 resize-none`}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Shariah Compliance Section */}
                    <div className={sectionClass}>
                        <div className="flex items-center justify-between pb-3 border-b border-border-light">
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-gold-light flex items-center justify-center">
                                    <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-text-dark">Shariah Compliance</h3>
                                    <p className="text-[10px] text-muted-gray">Fiqh audit declarations</p>
                                </div>
                            </div>
                            <span className="text-[10px] bg-primary-light text-primary font-bold border border-primary/20 px-2.5 py-1 rounded-full">
                                Audited
                            </span>
                        </div>

                        <div className="bg-primary-light border border-primary/15 rounded-xl p-4 space-y-3">
                            <div className="flex items-start gap-2.5">
                                <HeartHandshake className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs font-bold text-primary leading-tight">Islamic Trading Standards</p>
                                    <p className="text-[11px] text-muted-gray leading-relaxed mt-0.5">
                                        Sellers must ensure: strict spot transactions (pre-stocked), zero Riba on returns, and transparent specifications (no Jahalah).
                                    </p>
                                </div>
                            </div>
                            <label className="flex items-center gap-3 cursor-pointer pt-1">
                                <input
                                    type="checkbox" name="fiqhCertified"
                                    checked={formData.fiqhCertified} onChange={handleInputChange}
                                    className="rounded text-primary h-4 w-4 border-primary/30"
                                />
                                <span className="text-xs font-semibold text-text-dark">
                                    Display "Fiqh Audited" badge on my public storefront
                                </span>
                            </label>
                        </div>

                        <div>
                            <label className={labelClass}>Compliance Terms (Publicly Visible)</label>
                            <textarea
                                name="fiqhDetails" rows={3}
                                value={formData.fiqhDetails} onChange={handleInputChange}
                                className={`${inputClass} resize-none text-sm`}
                                placeholder="Describe physical possession terms, return limits, e.g. We fulfill contracts hand-to-hand under spot business rules..."
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-5">

                    {/* Graphics Section */}
                    <div className={sectionClass}>
                        <div className="flex items-center gap-2 pb-3 border-b border-border-light">
                            <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center">
                                <ImageIcon className="w-3.5 h-3.5 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-text-dark">Store Graphics</h3>
                                <p className="text-[10px] text-muted-gray">Logo & banner images</p>
                            </div>
                        </div>

                        {/* Banner */}
                        <div className="space-y-2">
                            <label className={labelClass}>Banner Image URL</label>
                            <input
                                name="banner" value={formData.banner}
                                onChange={handleInputChange}
                                placeholder="https://unsplash.com/banner.jpg"
                                className={inputClass}
                            />
                            <div className="h-24 rounded-xl border border-border-custom bg-bg-custom overflow-hidden">
                                {formData.banner.trim() ? (
                                    <img src={formData.banner} alt="Banner" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-muted-gray/50 gap-1.5">
                                        <ImageIcon className="w-5 h-5" />
                                        <span className="text-[10px] font-medium">No banner set</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Logo */}
                        <div className="space-y-2 pt-2 border-t border-border-light">
                            <label className={labelClass}>Logo Image URL</label>
                            <input
                                name="logo" value={formData.logo}
                                onChange={handleInputChange}
                                placeholder="https://unsplash.com/logo.jpg"
                                className={inputClass}
                            />
                            <div className="flex items-center gap-3 bg-bg-custom p-3 rounded-xl border border-border-light">
                                <div className="w-12 h-12 rounded-xl border border-border-custom bg-white overflow-hidden shrink-0 shadow-sm flex items-center justify-center">
                                    {formData.logo.trim() ? (
                                        <img src={formData.logo} alt="Logo" className="w-full h-full object-cover" />
                                    ) : (
                                        <Store className="w-5 h-5 text-muted-gray/40" />
                                    )}
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-text-dark">Avatar Preview</p>
                                    <p className="text-[10px] text-muted-gray leading-relaxed">Shown in sidebar and storefront pages.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Save Panel */}
                    <div className={sectionClass}>
                        <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl p-3.5">
                            <AlertCircle className="w-4 h-4 text-warning-custom shrink-0 mt-0.5" />
                            <p className="text-[11px] text-muted-gray leading-relaxed font-medium">
                                Changes publish immediately to your marketplace listing. Double-check all details before saving.
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={isSaving}
                            className="w-full flex items-center justify-center gap-2 bg-primary text-white px-4 py-3 rounded-xl text-sm font-semibold hover:bg-primary-dark transition shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isSaving ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Save className="w-4 h-4" />
                            )}
                            {isSaving ? 'Saving…' : 'Save Settings'}
                        </button>
                    </div>

                </div>
            </form>
        </div>
    )
}

export default StoreSettings