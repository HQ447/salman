import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Landmark, Mail, ArrowRight, ShieldCheck, HeartHandshake, Eye, Award } from 'lucide-react'

function Footer() {
    const [email, setEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)

    const handleSubscribe = (e) => {
        e.preventDefault()
        if (email.trim()) {
            setSubscribed(true)
            setEmail('')
            setTimeout(() => setSubscribed(false), 5000)
        }
    }

    return (
        <footer className="bg-primary-dark text-white border-t-2 border-gold pt-16 pb-8 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 islamic-pattern opacity-5 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Adherence to Islamic Principles Trust Banner */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 mb-12">
                    <div className="flex items-center space-x-3">
                        <HeartHandshake className="w-10 h-10 text-gold flex-shrink-0" />
                        <div>
                            <h4 className="text-sm font-bold tracking-wide">Mutual Consent</h4>
                            <p className="text-xs text-white/70">Tiradin-based trade contracts without coercion.</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <ShieldCheck className="w-10 h-10 text-gold flex-shrink-0" />
                        <div>
                            <h4 className="text-sm font-bold tracking-wide">Zero Riba & Gharar</h4>
                            <p className="text-xs text-white/70">No hidden fees, interest elements, or uncertainty.</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Eye className="w-10 h-10 text-gold flex-shrink-0" />
                        <div>
                            <h4 className="text-sm font-bold tracking-wide">Full Transparency</h4>
                            <p className="text-xs text-white/70">Detailed description to prevent Jahalah ambiguity.</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Award className="w-10 h-10 text-gold flex-shrink-0" />
                        <div>
                            <h4 className="text-sm font-bold tracking-wide">Verified Vendors</h4>
                            <p className="text-xs text-white/70">All stores screen-checked for physical possession.</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">

                    {/* Brand Info */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-9 h-9 rounded bg-white/10 border border-gold/30 flex items-center justify-center">
                                <Landmark className="text-gold w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-base font-bold text-white tracking-wide">Souq Diyanat</span>
                                <span className="text-2xs font-urdu font-medium text-gold -mt-1 tracking-wide scale-y-110">سوق دیانت</span>
                            </div>
                        </div>
                        <p className="text-sm text-white/75 leading-relaxed">
                            Elevating Islamic business values globally. A transparent multi-vendor marketplace built directly on the codes of Fiqh al-Muamalat.
                        </p>
                        <div className="text-xs text-gold/80 italic font-medium tracking-wide">
                            \"O you who have believed, do not consume one another's wealth unjustly but only [in business by] mutual consent...\" (Surah An-Nisa: 29)
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-extrabold uppercase tracking-widest text-gold mb-4">Shop Pages</h4>
                        <ul className="space-y-2 text-sm text-white/75">
                            <li><Link to="/" className="hover:text-gold transition">Marketplace Home</Link></li>
                            <li><Link to="/categories" className="hover:text-gold transition">Browse Categories</Link></li>
                            <li><Link to="/vendors" className="hover:text-gold transition">Explore Sellers</Link></li>
                            <li><Link to="/about" className="hover:text-gold transition">Interactive Timeline</Link></li>
                            <li><Link to="/contact" className="hover:text-gold transition">Help & Contact</Link></li>
                        </ul>
                    </div>

                    {/* Guidelines Links */}
                    <div>
                        <h4 className="text-sm font-extrabold uppercase tracking-widest text-gold mb-4">Halal Commerce</h4>
                        <ul className="space-y-2 text-sm text-white/75">
                            <li><Link to="/about" className="hover:text-gold transition">Fiqh al-Muamalat Rules</Link></li>
                            <li><Link to="/about" className="hover:text-gold transition">Ethics Pledge</Link></li>
                            <li><Link to="/contact" className="hover:text-gold transition">Seller Registration Guidelines</Link></li>
                            <li><Link to="/about" className="hover:text-gold transition">Risk & Mutual Consent</Link></li>
                            <li><Link to="/contact" className="hover:text-gold transition">Defects Option (Khayar)</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter Panel */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-extrabold uppercase tracking-widest text-gold mb-4">Newsletter</h4>
                        <p className="text-sm text-white/75">
                            Subscribe to receive updates on halal vendors, new books, and premium dates.
                        </p>
                        <form onSubmit={handleSubscribe} className="relative">
                            <input
                                type="email"
                                required
                                placeholder="Submit your email..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/10 text-white placeholder-white/40 text-sm rounded-lg pl-3 pr-10 py-2.5 border border-white/20 focus:outline-none focus:ring-1 focus:ring-gold"
                            />
                            <button
                                type="submit"
                                className="absolute right-1 top-1/2 -translate-y-1/2 bg-gold hover:bg-gold/90 text-text-dark p-1.5 rounded"
                            >
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                        {subscribed && (
                            <p className="text-xs text-gold font-semibold animate-pulse">
                                Subscribed successfully! JazakAllah Khair.
                            </p>
                        )}
                    </div>

                </div>

                {/* Footer Base */}
                <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/60 space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-1">
                        <span>&copy; {new Date().getFullYear()} Souq Diyanat Inc. All rights reserved.</span>
                        <span className="hidden md:inline">|</span>
                        <span className="font-urdu scale-y-110 tracking-wide">ترجمہ اور قوانینِ فروخت شريعت كے مطابق انجام دیئے گئے ہیں۔</span>
                    </div>
                    <div className="flex space-x-6">
                        <Link to="/about" className="hover:text-white transition">Terms of Sale</Link>
                        <Link to="/about" className="hover:text-white transition">Privacy Policy</Link>
                        <Link to="/contact" className="hover:text-white transition">Vendor Code of Conduct</Link>
                    </div>
                </div>

            </div>
        </footer>
    )
}

export default Footer