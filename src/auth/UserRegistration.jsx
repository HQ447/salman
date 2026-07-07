import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Landmark, Mail, Lock, User, ShieldCheck, MapPin } from 'lucide-react'
import { AppContext } from '../context/AppContext'
import { Button, Input } from '../components/UI'

function UserRegistration() {
    const { loginUser } = useContext(AppContext)
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: ''
    })

    const [errorText, setErrorText] = useState('')

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleRegister = (e) => {
        e.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            setErrorText("Passwords must match.")
            return
        }

        if (formData.email && formData.password) {
            // Mock registration
            const success = loginUser(formData.email, formData.password, 'Customer')
            if (success) {
                navigate('/')
            }
        }
    }

    return (
        <div className="min-h-screen bg-bg-custom flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
            <div className="absolute inset-0 islamic-pattern opacity-10 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-white border border-border-custom p-8 rounded-xl shadow-xl space-y-6 relative z-10 text-left"
            >
                <div className="text-center space-y-2">
                    <Link to="/" className="inline-flex items-center space-x-2">
                        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shadow-md">
                            <Landmark className="text-gold w-6 h-6" />
                        </div>
                        <div className="text-left flex flex-col">
                            <span className="text-base font-extrabold text-primary-dark">Souq Diyanat</span>
                            <span className="text-3xs font-urdu font-medium text-gold -mt-1 scale-y-110 tracking-wide">سوق دیانت</span>
                        </div>
                    </Link>

                    <h2 className="text-xl font-extrabold text-text-dark pt-3">Customer Registry</h2>
                    <p className="text-xs text-muted-gray">Sign up to buy shariah-compliant goods with transparent terms.</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                    <Input
                        label="Full Display Name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Salim Rahman"
                        icon={User}
                    />

                    <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. salim@diyanat.com"
                        icon={Mail}
                    />

                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        icon={Lock}
                    />

                    <Input
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        required
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        icon={Lock}
                    />

                    <div>
                        <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1">
                            Delivery Address (Default)
                        </label>
                        <textarea
                            name="address"
                            rows={2}
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="e.g. House 14, Islamabad"
                            className="w-full rounded-lg border border-border-custom focus:ring-primary px-3 py-2 text-sm focus:outline-none focus:ring-2 bg-white transition-all"
                        />
                    </div>

                    {errorText && (
                        <p className="text-xs text-danger-custom font-semibold">{errorText}</p>
                    )}

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full font-bold cursor-pointer"
                    >
                        Create Customer Account
                    </Button>
                </form>

                <div className="border-t border-border-custom/50 pt-4 text-center text-xs">
                    <span className="text-muted-gray font-semibold">Already have an account? </span>
                    <Link to="/login" className="text-primary hover:underline font-bold">
                        Log In here
                    </Link>
                </div>

                <div className="text-[10px] text-muted-gray leading-relaxed italic text-center">
                    * Shariah Compliance audit guarantee: All data properties are handled escrow-safe without profiling sale margins.
                </div>

            </motion.div>
        </div>
    )
}

export default UserRegistration