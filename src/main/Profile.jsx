import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, ShieldCheck, Mail, Phone, MapPin, BadgeCheck, CheckCircle2, History } from 'lucide-react'
import { AppContext } from '../context/AppContext'
import { Button, Input } from '../components/UI'

function Profile() {
    const { currentUser, updateProfile, orders } = useContext(AppContext)
    const [success, setSuccess] = useState(false)

    // Edit fields state
    const [editFields, setEditFields] = useState({
        name: currentUser ? currentUser.name : '',
        phone: currentUser ? currentUser.phone : '',
        address: currentUser ? currentUser.address : '',
        avatar: currentUser ? currentUser.avatar : ''
    })

    if (!currentUser) {
        return (
            <div className="max-w-md mx-auto py-20 px-4 text-center">
                <div className="bg-white border border-border-custom p-8 rounded-xl space-y-4">
                    <User className="w-12 h-12 text-primary mx-auto" />
                    <h2 className="text-lg font-bold text-text-dark">Not Standard Logged In</h2>
                    <p className="text-xs text-muted-gray">Please register or log in using credentials prior to viewing dashboard profiles.</p>
                    <Link to="/login" className="inline-block bg-primary text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-primary-dark transition">
                        Log In Now
                    </Link>
                </div>
            </div>
        )
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setEditFields(prev => ({ ...prev, [name]: value }))
    }

    const handleSave = (e) => {
        e.preventDefault()
        updateProfile(editFields)
        setSuccess(true)
        setTimeout(() => setSuccess(false), 5000)
    }

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20 space-y-10">

            {/* Profile Header card */}
            <div className="bg-white border border-border-custom rounded-xl shadow-xs overflow-hidden text-left">
                <div className="h-32 bg-primary relative">
                    <div className="absolute inset-0 islamic-pattern opacity-10 pointer-events-none" />
                </div>

                <div className="p-6 relative pt-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-border-custom">
                    {/* Avatar overlap */}
                    <div className="absolute -top-12 left-6 w-20 h-20 rounded-full border-2 border-white bg-white shadow-md overflow-hidden">
                        <img
                            src={currentUser.avatar}
                            alt={currentUser.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="space-y-1 mt-2">
                        <h1 className="text-xl sm:text-2xl font-extrabold text-text-dark flex items-center gap-1.5">
                            {currentUser.name}
                            <BadgeCheck className="w-5 h-5 text-primary" />
                        </h1>
                        <p className="text-3xs text-muted-gray uppercase tracking-wider font-semibold">
                            Ecosystem Role: <span className="text-primary font-bold">{currentUser.role}</span>
                        </p>
                    </div>

                    <div className="text-xs text-muted-gray shrink-0 text-left sm:text-right font-medium">
                        Account verified check: <span className="text-primary font-extrabold">Active</span>
                    </div>
                </div>

                {/* Short contact list bar */}
                <div className="px-6 py-4 bg-bg-custom/30 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-text-dark/85">
                    <div className="flex items-center space-x-2">
                        <Mail className="w-4.5 h-4.5 text-primary shrink-0" />
                        <span className="truncate">{currentUser.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Phone className="w-4.5 h-4.5 text-primary shrink-0" />
                        <span>{currentUser.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <MapPin className="w-4.5 h-4.5 text-primary shrink-0" />
                        <span className="truncate">{currentUser.address}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">

                {/* Form settings */}
                <div className="lg:col-span-8 bg-white border border-border-custom p-6 sm:p-8 rounded-xl shadow-xs space-y-6">
                    <h2 className="text-base font-extrabold text-text-dark pb-3 border-b border-border-custom uppercase tracking-wider">
                        Edit Profile Parameters
                    </h2>

                    <form onSubmit={handleSave} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <Input
                                label="Full Display Name"
                                name="name"
                                required
                                value={editFields.name}
                                onChange={handleInputChange}
                                placeholder="Salim Rahman"
                            />
                            <Input
                                label="Contact Phone"
                                name="phone"
                                required
                                value={editFields.phone}
                                onChange={handleInputChange}
                                placeholder="+92 300 9876543"
                            />
                        </div>

                        <Input
                            label="Avatar URL Parameter"
                            name="avatar"
                            value={editFields.avatar}
                            onChange={handleInputChange}
                            placeholder="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
                        />

                        <div>
                            <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1">
                                Standard Shipping Address
                            </label>
                            <textarea
                                name="address"
                                rows={3}
                                value={editFields.address}
                                onChange={handleInputChange}
                                placeholder="House, Street, Area, City Code"
                                className="w-full rounded-lg border border-border-custom focus:ring-primary px-3 py-2 text-sm focus:outline-none focus:ring-2 bg-white transition-all"
                            />
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full font-bold cursor-pointer"
                        >
                            Save Profile Changes
                        </Button>
                    </form>

                    {success && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-green-50 border border-green-200 text-primary-dark p-3.5 rounded-lg flex items-center space-x-2"
                        >
                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-xs font-bold">Profile parameters successfully synchronized.</span>
                        </motion.div>
                    )}

                </div>

                {/* Small orders history side widget */}
                <div className="lg:col-span-4 bg-white border border-border-custom p-6 rounded-xl shadow-xs space-y-6">
                    <h3 className="text-base font-extrabold text-text-dark pb-3 border-b border-border-custom uppercase tracking-wider flex items-center gap-1.5">
                        <History className="w-4.5 h-4.5 text-primary" />
                        Quick Orders Log
                    </h3>

                    {orders.length > 0 ? (
                        <div className="space-y-4">
                            <div className="divide-y divide-border-custom/50">
                                {orders.slice(0, 3).map((order) => (
                                    <div key={order.id} className="py-3 flex justify-between items-center text-xs gap-3">
                                        <div>
                                            <p className="font-bold text-text-dark">{order.id}</p>
                                            <p className="text-[10px] text-muted-gray">{new Date(order.date).toLocaleDateString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-extrabold text-primary-dark">${order.total.toFixed(2)}</p>
                                            <span className="inline-block bg-primary/10 text-primary px-1.5 py-0.2 rounded text-[9px] font-bold">
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link
                                to="/orders"
                                className="block text-center text-xs font-semibold text-primary hover:underline hover:text-primary-dark transition"
                            >
                                Track All Orders
                            </Link>
                        </div>
                    ) : (
                        <p className="text-xs text-muted-gray">No order transactions found.</p>
                    )}

                </div>

            </div>

        </div>
    )
}

export default Profile