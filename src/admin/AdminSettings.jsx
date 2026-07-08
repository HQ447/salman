import React, { useState, useEffect } from 'react'
import {
    Settings,
    Globe,
    Bell,
    ShieldCheck,
    DollarSign,
    Truck,
    Mail,
    Save,
    Check,
    Loader2
} from 'lucide-react'

function AdminSettings() {
    const [isSaving, setIsSaving] = useState(false)
    const [successToast, setSuccessToast] = useState(null)
    const [settings, setSettings] = useState({
        platformName: 'Souq Diyanat',
        platformTagline: 'Islamic Marketplace — Shariah-Compliant Trade',
        supportEmail: 'support@diyanat.com',
        supportPhone: '+92 300 0000000',
        defaultShippingFee: '8.00',
        currency: 'USD',
        maintenanceMode: false,
        vendorAutoApprove: false,
        fiqhAuditRequired: true,
        emailNotifications: true,
        orderAlerts: true,
        vendorRegistration: true,
        minOrderAmount: '10.00',
        returnPolicyDays: '7',
        platformCommission: '5',
    })

    useEffect(() => {
        if (successToast) {
            const timer = setTimeout(() => setSuccessToast(null), 3500)
            return () => clearTimeout(timer)
        }
    }, [successToast])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    const handleSave = (e) => {
        e.preventDefault()
        setIsSaving(true)
        setTimeout(() => {
            setIsSaving(false)
            setSuccessToast('Platform settings saved successfully!')
        }, 1200)
    }

    const sections = [
        {
            title: 'General Settings',
            icon: Globe,
            fields: [
                { name: 'platformName', label: 'Platform Name', type: 'text' },
                { name: 'platformTagline', label: 'Tagline', type: 'text' },
                { name: 'supportEmail', label: 'Support Email', type: 'email', icon: Mail },
                { name: 'supportPhone', label: 'Support Phone', type: 'text' },
            ],
        },
        {
            title: 'Commerce Settings',
            icon: DollarSign,
            fields: [
                { name: 'defaultShippingFee', label: 'Default Shipping Fee ($)', type: 'number' },
                { name: 'minOrderAmount', label: 'Minimum Order Amount ($)', type: 'number' },
                { name: 'platformCommission', label: 'Platform Commission (%)', type: 'number' },
                { name: 'returnPolicyDays', label: 'Return Policy (Days)', type: 'number' },
                {
                    name: 'currency',
                    label: 'Currency',
                    type: 'select',
                    options: ['USD', 'PKR', 'SAR', 'AED'],
                },
            ],
        },
    ]

    const toggles = [
        { name: 'maintenanceMode', label: 'Maintenance Mode', desc: 'Temporarily disable the marketplace for visitors', icon: Settings },
        { name: 'vendorAutoApprove', label: 'Auto-Approve Vendors', desc: 'Automatically approve new vendor registrations', icon: ShieldCheck },
        { name: 'fiqhAuditRequired', label: 'Fiqh Audit Required', desc: 'Require fiqh compliance review for all vendors', icon: ShieldCheck },
        { name: 'emailNotifications', label: 'Email Notifications', desc: 'Send email alerts for platform events', icon: Bell },
        { name: 'orderAlerts', label: 'Order Alerts', desc: 'Notify admins on new order placements', icon: Truck },
        { name: 'vendorRegistration', label: 'Vendor Registration', desc: 'Allow new vendors to register on the platform', icon: Globe },
    ]

    return (
        <div className="space-y-5 font-inter">
            {successToast && (
                <div className="fixed bottom-6 right-6 z-50 flex items-center bg-primary text-white px-5 py-3 rounded-xl shadow-xl gap-3">
                    <Check className="w-4 h-4" />
                    <span className="text-xs font-semibold">{successToast}</span>
                </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-bold text-text-dark">Platform Settings</h2>
                    <p className="text-sm text-muted-gray mt-0.5">
                        Configure marketplace rules, commerce policies, and notifications
                    </p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition shadow-sm self-start disabled:opacity-60"
                >
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {isSaving ? 'Saving...' : 'Save Settings'}
                </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
                {sections.map((section, sIdx) => {
                    const SectionIcon = section.icon
                    return (
                        <div key={sIdx} className="bg-white rounded-2xl border border-border-custom shadow-sm p-5 sm:p-6">
                            <div className="flex items-center gap-2 mb-5">
                                <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center">
                                    <SectionIcon className="w-4 h-4 text-primary" />
                                </div>
                                <h3 className="text-sm font-bold text-text-dark">{section.title}</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {section.fields.map(field => (
                                    <div key={field.name} className="space-y-1">
                                        <label className="text-[11px] font-semibold text-text-dark uppercase tracking-wide">
                                            {field.label}
                                        </label>
                                        {field.type === 'select' ? (
                                            <select
                                                name={field.name}
                                                value={settings[field.name]}
                                                onChange={handleChange}
                                                className="w-full text-sm rounded-xl px-4 py-2.5 border border-border-custom focus:ring-2 focus:ring-primary/30 focus:outline-none bg-white"
                                            >
                                                {field.options.map(opt => (
                                                    <option key={opt} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                name={field.name}
                                                type={field.type}
                                                value={settings[field.name]}
                                                onChange={handleChange}
                                                className="w-full text-sm rounded-xl px-4 py-2.5 border border-border-custom focus:ring-2 focus:ring-primary/30 focus:outline-none"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}

                <div className="bg-white rounded-2xl border border-border-custom shadow-sm p-5 sm:p-6">
                    <div className="flex items-center gap-2 mb-5">
                        <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center">
                            <Bell className="w-4 h-4 text-primary" />
                        </div>
                        <h3 className="text-sm font-bold text-text-dark">Platform Controls</h3>
                    </div>
                    <div className="space-y-4">
                        {toggles.map(toggle => {
                            const ToggleIcon = toggle.icon
                            return (
                                <label
                                    key={toggle.name}
                                    className="flex items-center justify-between gap-4 p-4 rounded-xl border border-border-light hover:bg-bg-custom transition"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-bg-custom flex items-center justify-center shrink-0 mt-0.5">
                                            <ToggleIcon className="w-4 h-4 text-muted-gray" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-text-dark">{toggle.label}</p>
                                            <p className="text-[11px] text-muted-gray mt-0.5">{toggle.desc}</p>
                                        </div>
                                    </div>
                                    <div className="relative shrink-0">
                                        <button
                                            type="button"
                                            onClick={() => setSettings(prev => ({ ...prev, [toggle.name]: !prev[toggle.name] }))}
                                            className={`w-10 h-5 rounded-full transition-colors ${settings[toggle.name] ? 'bg-primary' : 'bg-border-custom'}`}
                                        >
                                            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform m-0.5 ${settings[toggle.name] ? 'translate-x-5' : ''}`} />
                                        </button>
                                    </div>
                                </label>
                            )
                        })}
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition shadow-sm disabled:opacity-60"
                    >
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save All Settings
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AdminSettings
