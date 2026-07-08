import React, { useState } from 'react'
import {
    UserPlus,
    Users,
    Shield,
    Store,
    UserCog,
    Mail,
    Lock,
    Check,
    Trash2
} from 'lucide-react'
import { Badge } from '../components/UI'

const demoAccounts = [
    { id: 1, name: 'Ahmad Abdullah', email: 'contact@diyanatbooks.com', role: 'Vendor', store: 'Diyanat Bookstore', status: 'Active', created: '2026-01-15' },
    { id: 2, name: 'Salim Al-Harbi', email: 'sales@albarakahfoods.com', role: 'Vendor', store: 'Al-Barakah Foods', status: 'Active', created: '2026-02-03' },
    { id: 3, name: 'Fatima Zahra', email: 'info@hayaamodest.com', role: 'Vendor', store: 'Hayaa Modest Wear', status: 'Active', created: '2026-02-18' },
    { id: 4, name: 'Omar Hassan', email: 'omar.manager@diyanat.com', role: 'Manager', store: '—', status: 'Active', created: '2026-03-10' },
    { id: 5, name: 'Zainab Khan', email: 'zainab.admin@diyanat.com', role: 'Admin', store: '—', status: 'Active', created: '2026-01-01' },
]

const roleConfig = {
    Vendor: { icon: Store, variant: 'primary', color: 'text-primary', bg: 'bg-primary-light' },
    Manager: { icon: UserCog, variant: 'warning', color: 'text-amber-600', bg: 'bg-amber-50' },
    Admin: { icon: Shield, variant: 'secondary', color: 'text-gold', bg: 'bg-gold-light' },
}

function AdminAdministration() {
    const [accounts, setAccounts] = useState(demoAccounts)
    const [showForm, setShowForm] = useState(false)
    const [successToast, setSuccessToast] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'Vendor',
        store: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formData.name || !formData.email || !formData.password) return

        const newAccount = {
            id: Date.now(),
            name: formData.name,
            email: formData.email,
            role: formData.role,
            store: formData.role === 'Vendor' ? formData.store || 'New Store' : '—',
            status: 'Active',
            created: new Date().toISOString().split('T')[0],
        }

        setAccounts(prev => [newAccount, ...prev])
        setFormData({ name: '', email: '', password: '', role: 'Vendor', store: '' })
        setShowForm(false)
        setSuccessToast(`Account created for ${newAccount.name}`)
        setTimeout(() => setSuccessToast(null), 3500)
    }

    const handleDelete = (id, name) => {
        if (window.confirm(`Remove account for "${name}"?`)) {
            setAccounts(prev => prev.filter(a => a.id !== id))
        }
    }

    const roleCounts = {
        Vendor: accounts.filter(a => a.role === 'Vendor').length,
        Manager: accounts.filter(a => a.role === 'Manager').length,
        Admin: accounts.filter(a => a.role === 'Admin').length,
    }

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
                    <h2 className="text-lg font-bold text-text-dark">User Administration</h2>
                    <p className="text-sm text-muted-gray mt-0.5">
                        Create and manage vendor, manager, and admin accounts
                    </p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition shadow-sm self-start"
                >
                    <UserPlus className="w-4 h-4" />
                    Create Account
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {Object.entries(roleCounts).map(([role, count]) => {
                    const config = roleConfig[role]
                    const Icon = config.icon
                    return (
                        <div key={role} className="bg-white rounded-2xl border border-border-custom shadow-sm p-4 flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center shrink-0`}>
                                <Icon className={`w-5 h-5 ${config.color}`} />
                            </div>
                            <div>
                                <p className="text-xl font-black text-text-dark">{count}</p>
                                <p className="text-[10px] text-muted-gray font-medium">{role} Accounts</p>
                            </div>
                        </div>
                    )
                })}
            </div>

            {showForm && (
                <div className="bg-white rounded-2xl border border-border-custom shadow-sm p-5 sm:p-6">
                    <h3 className="text-sm font-bold text-text-dark mb-4 flex items-center gap-2">
                        <UserPlus className="w-4 h-4 text-primary" />
                        Create New Account
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[11px] font-semibold text-text-dark uppercase tracking-wide">Full Name *</label>
                                <input
                                    name="name" value={formData.name} onChange={handleChange} required
                                    placeholder="e.g. Ahmad Abdullah"
                                    className="w-full text-sm rounded-xl px-4 py-2.5 border border-border-custom focus:ring-2 focus:ring-primary/30 focus:outline-none"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[11px] font-semibold text-text-dark uppercase tracking-wide">Email *</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-gray" />
                                    <input
                                        name="email" type="email" value={formData.email} onChange={handleChange} required
                                        placeholder="user@example.com"
                                        className="w-full text-sm rounded-xl pl-10 pr-4 py-2.5 border border-border-custom focus:ring-2 focus:ring-primary/30 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[11px] font-semibold text-text-dark uppercase tracking-wide">Password *</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-gray" />
                                    <input
                                        name="password" type="password" value={formData.password} onChange={handleChange} required
                                        placeholder="••••••••"
                                        className="w-full text-sm rounded-xl pl-10 pr-4 py-2.5 border border-border-custom focus:ring-2 focus:ring-primary/30 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[11px] font-semibold text-text-dark uppercase tracking-wide">Role *</label>
                                <select
                                    name="role" value={formData.role} onChange={handleChange}
                                    className="w-full text-sm rounded-xl px-4 py-2.5 border border-border-custom focus:ring-2 focus:ring-primary/30 focus:outline-none bg-white"
                                >
                                    <option value="Vendor">Vendor</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                            {formData.role === 'Vendor' && (
                                <div className="space-y-1 sm:col-span-2">
                                    <label className="text-[11px] font-semibold text-text-dark uppercase tracking-wide">Store Name</label>
                                    <input
                                        name="store" value={formData.store} onChange={handleChange}
                                        placeholder="e.g. My Islamic Store"
                                        className="w-full text-sm rounded-xl px-4 py-2.5 border border-border-custom focus:ring-2 focus:ring-primary/30 focus:outline-none"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end gap-2 pt-2">
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="px-4 py-2 rounded-xl text-xs font-semibold text-muted-gray border border-border-custom hover:bg-bg-custom transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-xl text-xs font-semibold bg-primary text-white hover:bg-primary-dark transition"
                            >
                                Create Account
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-2xl border border-border-custom shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-border-custom flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-bold text-text-dark">All Accounts ({accounts.length})</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px]">
                        <thead>
                            <tr className="bg-bg-custom border-b border-border-custom">
                                <th className="text-left text-[10px] font-bold uppercase tracking-wider text-muted-gray px-4 py-3">User</th>
                                <th className="text-left text-[10px] font-bold uppercase tracking-wider text-muted-gray px-4 py-3">Role</th>
                                <th className="text-left text-[10px] font-bold uppercase tracking-wider text-muted-gray px-4 py-3">Store</th>
                                <th className="text-left text-[10px] font-bold uppercase tracking-wider text-muted-gray px-4 py-3">Status</th>
                                <th className="text-left text-[10px] font-bold uppercase tracking-wider text-muted-gray px-4 py-3">Created</th>
                                <th className="text-left text-[10px] font-bold uppercase tracking-wider text-muted-gray px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts.map((account, idx) => (
                                <tr
                                    key={account.id}
                                    className={`border-b border-border-light hover:bg-bg-custom/50 transition ${idx % 2 === 0 ? '' : 'bg-bg-custom/30'}`}
                                >
                                    <td className="px-4 py-3">
                                        <p className="text-xs font-semibold text-text-dark">{account.name}</p>
                                        <p className="text-[10px] text-muted-gray">{account.email}</p>
                                    </td>
                                    <td className="px-4 py-3">
                                        <Badge variant={roleConfig[account.role]?.variant || 'gray'}>{account.role}</Badge>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="text-xs text-muted-gray">{account.store}</span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <Badge variant="success">{account.status}</Badge>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="text-xs text-muted-gray">{account.created}</span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => handleDelete(account.id, account.name)}
                                            className="p-1.5 rounded-lg text-muted-gray hover:text-danger-custom hover:bg-red-50 transition"
                                            title="Remove account"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminAdministration
