import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Landmark, HeartHandshake, CheckCircle2 } from 'lucide-react'
import { Button, Input } from '../components/UI'

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [success, setSuccess] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.name && formData.email && formData.message) {
            setSuccess(true)
            setFormData({ name: '', email: '', subject: '', message: '' })
            setTimeout(() => setSuccess(false), 6000)
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20 space-y-16">

            {/* Header */}
            <div className="text-center max-w-xl mx-auto -mt-6">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-text-dark">Reach Out to Our Governance</h1>
                <span className="h-0.5 w-12 bg-gold inline-block mt-2 rounded"></span>
                <p className="text-sm text-muted-gray mt-2.5">
                    Have queries about Fiqh al-Muamalat parameters, shop requirements, or need dispute arbitration? Our support team is here to guide you.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                {/* Left Side: Contact details */}
                <div className="lg:col-span-5 space-y-8 text-left bg-white border border-border-custom p-6 sm:p-8 rounded-xl shadow-xs">
                    <h2 className="text-lg font-bold text-text-dark pb-3 border-b border-border-custom">
                        Corporate & Shariah Offices
                    </h2>

                    <div className="space-y-6">
                        <div className="flex items-start space-x-3.5">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-primary-dark">Head Office Location</h4>
                                <p className="text-xs text-muted-gray leading-relaxed mt-1">
                                    Plot 14, Executive Plaza, F-11 Markaz, Islamabad, Pakistan
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3.5">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-primary-dark">Electronic Mail</h4>
                                <p className="text-xs text-muted-gray leading-relaxed mt-1">
                                    governance@souqdiyanat.com <br />
                                    support@souqdiyanat.com
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3.5">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                <Phone className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-primary-dark">Helpline Support</h4>
                                <p className="text-xs text-muted-gray leading-relaxed mt-1">
                                    +92 (51) 111-222-333 <br />
                                    Mon-Fri, 9:00 AM - 5:00 PM PST
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3.5">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                <Landmark className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-primary-dark">Shariah Board Oversight Office</h4>
                                <p className="text-xs text-muted-gray leading-relaxed mt-1">
                                    Supervised by the Fiqh Advisors Committee, auditing commercial listings on a weekly basis.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Adherence note */}
                    <div className="bg-bg-custom rounded-lg p-4 border border-border-custom flex items-start space-x-2">
                        <HeartHandshake className="w-5 h-5 text-gold flex-shrink-0" />
                        <p className="text-[10px] text-muted-gray leading-relaxed italic">
                            \"Speak truth and record debts, and if you execute a trade, let it be in a clear, written, transparent, and agreed manner so that doubts are removed.\"
                        </p>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="lg:col-span-7 bg-white border border-border-custom p-6 sm:p-8 rounded-xl shadow-xs text-left">
                    <h2 className="text-lg font-bold text-text-dark mb-6">Send an Inquiry</h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <Input
                                label="Full Name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="e.g. Salim Rahman"
                            />
                            <Input
                                label="Email Address"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="e.g. salim@example.com"
                            />
                        </div>

                        <Input
                            label="Subject of Inquiry"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            placeholder="e.g. Fiqh guidelines for dates selling"
                        />

                        <div>
                            <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1">
                                Message Detail <span className="text-danger-custom">*</span>
                            </label>
                            <textarea
                                name="message"
                                required
                                rows={5}
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder="Write your request, reference orders, or feedback details here in detail..."
                                className="w-full rounded-lg border border-border-custom focus:ring-primary pr-3 pl-3 py-2 text-sm focus:outline-none focus:ring-2 bg-white transition-all"
                            />
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full font-bold cursor-pointer"
                        >
                            Submit Ticket
                        </Button>
                    </form>

                    {/* Success confirmation */}
                    {success && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-green-50 border border-green-200 text-primary-dark p-4 rounded-lg mt-5 flex items-start space-x-2"
                        >
                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-xs font-bold">JazakAllah Khair! Message Submitted.</p>
                                <p className="text-3xs text-muted-gray mt-0.5 leading-relaxed">
                                    We have logged your ticket. An executive from our moderation or Shariah board auditing desk will contact you within 24 working hours.
                                </p>
                            </div>
                        </motion.div>
                    )}

                </div>

            </div>

            {/* Map Placeholder */}
            <section className="bg-bg-custom rounded-2xl h-80 relative overflow-hidden border border-border-custom flex items-center justify-center text-center p-6">
                <div className="absolute inset-0 bg-cover bg-center grayscale opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1000')" }} />
                <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
                <div className="relative z-10 space-y-2">
                    <MapPin className="w-10 h-10 text-primary mx-auto" />
                    <h3 className="text-sm font-extrabold text-text-dark">F-11 Markaz, Islamabad, Pakistan</h3>
                    <p className="text-xs text-muted-gray max-w-md mx-auto">
                        (Map Display Placeholder - In a live deployment, this hosts an interactive OpenStreetMap component mapping the Souq Diyanat head offices)
                    </p>
                </div>
            </section>

        </div>
    )
}

export default Contact