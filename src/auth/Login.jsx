import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Landmark, Mail, Lock, ShieldCheck, User, Users, ShieldAlert } from 'lucide-react'
import { AppContext } from '../context/AppContext'
import { Button, Input } from '../components/UI'

function Login() {
    const { loginUser } = useContext(AppContext)
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('Customer')
    const [errorCode, setErrorCode] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()

        if (!email.trim() || !password.trim()) {
            setErrorCode("Please submit all credentials.")
            return
        }

        const val = loginUser(email, password, role)
        if (val) {
            navigate('/')
        } else {
            setErrorCode("Invalid email or password.")
        }
    }

    return (
        <div className="min-h-screen bg-bg-custom flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
            {/* Decorative patterns */}
            <div className="absolute inset-0 islamic-pattern opacity-10 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-white border border-border-custom p-8 rounded-xl shadow-xl space-y-6 relative z-10 text-left"
            >
                {/* Branding header */}
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

                    <h2 className="text-xl font-extrabold text-text-dark pt-3">Ecosystem Log In</h2>
                    <p className="text-xs text-muted-gray">Choose your role parameter to sign in to Souq Diyanat.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">

                    {/* Simulated role selector cards */}
                    <div className="space-y-1.5 text-left">
                        <label className="text-3xs font-extrabold uppercase tracking-wider text-text-dark">Identity Role</label>
                        <div className="grid grid-cols-3 gap-2">
                            {['Customer', 'Vendor', 'Admin'].map(r => (
                                <button
                                    key={r}
                                    type="button"
                                    onClick={() => setRole(r)}
                                    className={`py-2 px-1 border rounded-lg text-[10px] font-bold text-center transition-all cursor-pointer ${role === r
                                        ? 'border-primary bg-primary/5 text-primary'
                                        : 'border-border-custom text-muted-gray hover:bg-bg-custom'
                                        }`}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Input
                        label="Email Address"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. salim@diyanat.com"
                        icon={Mail}
                    />

                    <Input
                        label="System Password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        icon={Lock}
                    />

                    {errorCode && (
                        <p className="text-xs text-danger-custom font-semibold flex items-center gap-1 leading-none">
                            <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                            {errorCode}
                        </p>
                    )}

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full font-bold cursor-pointer"
                    >
                        Authenticate Portal
                    </Button>
                </form>

                <div className="border-t border-border-custom/50 pt-4 flex flex-col space-y-2 text-center text-xs">
                    <Link to="/user-registration" className="text-primary hover:underline font-semibold">
                        Create Customer Account
                    </Link>
                    <Link to="/vendor-registration" className="text-gold hover:underline font-semibold">
                        Become a Selling Partner
                    </Link>
                    <Link to="/" className="text-muted-gray hover:underline font-medium">
                        Browse Guest Version
                    </Link>
                </div>

                <div className="text-[10px] text-muted-gray leading-normal italic text-center">
                    * Fiqh audit: We secure account parameters under SSL protection.
                </div>

            </motion.div>
        </div>
    )
}

export default Login