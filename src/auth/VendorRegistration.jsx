import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Landmark, Store, FileText, CheckCircle2, ChevronRight, ArrowLeft, ShieldCheck } from 'lucide-react'
import { Button, Input } from '../components/UI'

function VendorRegistration() {
    const navigate = useNavigate()
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        ownerName: '',
        email: '',
        shopName: '',
        description: '',
        category: 'books-literature',
        agreedToCharter: false
    })

    const [formErrors, setFormErrors] = useState({})

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const goNextStep = (e) => {
        e.preventDefault()

        const errors = {}
        if (step === 1) {
            if (!formData.ownerName.trim()) errors.ownerName = "Owner name is required."
            if (!formData.email.trim()) errors.email = "Support email is required."

            if (Object.keys(errors).length > 0) {
                setFormErrors(errors)
                return
            }
            setFormErrors({})
            setStep(2)
        }
    }

    const handleRegisterVendor = (e) => {
        e.preventDefault()

        if (step === 2) {
            const errors = {}
            if (!formData.shopName.trim()) errors.shopName = "Shop name is required."
            if (!formData.description.trim()) errors.description = "Store description is required."
            if (!formData.agreedToCharter) errors.agreedToCharter = "You must agree to the Shariah Trading ethics pledge."

            if (Object.keys(errors).length > 0) {
                setFormErrors(errors)
                return
            }

            setFormErrors({})
            setStep(3) // Shows pending screen
        }
    }

    return (
        <div className="min-h-screen bg-bg-custom flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
            <div className="absolute inset-0 islamic-pattern opacity-10 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-lg w-full bg-white border border-border-custom p-8 rounded-xl shadow-xl space-y-6 relative z-10 text-left"
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

                    <h2 className="text-xl font-extrabold text-text-dark pt-3">Vendor Registry & Vetting</h2>
                    <p className="text-xs text-muted-gray">Step {step} of 3: Register your compliance-audited store storefront.</p>
                </div>

                {step === 1 && (
                    <form onSubmit={goNextStep} className="space-y-5">
                        <h3 className="font-extrabold text-sm text-text-dark uppercase tracking-wider pb-2 border-b border-border-custom">
                            1. Merchant Contact Details
                        </h3>

                        <Input
                            label="Owner Full Name"
                            name="ownerName"
                            required
                            value={formData.ownerName}
                            onChange={handleInputChange}
                            error={formErrors.ownerName}
                            placeholder="e.g. Salim Al-Harbi"
                        />

                        <Input
                            label="Contact Support Email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            error={formErrors.email}
                            placeholder="e.g. partner@example.com"
                        />

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full font-bold cursor-pointer"
                        >
                            Continue to Shop Configuration
                            <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleRegisterVendor} className="space-y-5">
                        <div className="flex items-center justify-between pb-2 border-b border-border-custom">
                            <h3 className="font-extrabold text-sm text-text-dark uppercase tracking-wider">
                                2. Store Details & Shariah Pledge
                            </h3>
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="text-xs font-bold text-muted-gray hover:text-text-dark flex items-center gap-1 cursor-pointer"
                            >
                                <ArrowLeft className="w-3.5 h-3.5" />
                                Back
                            </button>
                        </div>

                        <Input
                            label="Vetted Shop Name"
                            name="shopName"
                            required
                            value={formData.shopName}
                            onChange={handleInputChange}
                            error={formErrors.shopName}
                            placeholder="e.g. Al-Barakah Foods"
                        />

                        <div>
                            <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1">
                                Store Core Specialty
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full rounded-lg border border-border-custom focus:ring-primary px-3 py-2 text-sm focus:outline-none focus:ring-2 bg-white transition-all text-text-dark"
                            >
                                <option value="books-literature">Islamic Books & Literature</option>
                                <option value="modest-fashion">Modest Fashion & Apparel</option>
                                <option value="halal-cosmetics">Halal Cosmetics & Perfumes</option>
                                <option value="organic-foods">Dates & Organic Foods</option>
                                <option value="home-decor">Islamic Art & Home Decor</option>
                                <option value="educational-toys">Educational & Toys</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1">
                                Store Vetting Description
                            </label>
                            <textarea
                                name="description"
                                rows={3}
                                required
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Detail your item sourcing, inventory possession practices, and transparent return procedures."
                                className="w-full rounded-lg border border-border-custom focus:ring-primary px-3 py-2 text-sm focus:outline-none focus:ring-2 bg-white transition-all text-text-dark"
                            />
                            {formErrors.description && <p className="mt-1 text-xs text-danger-custom">{formErrors.description}</p>}
                        </div>

                        {/* Shariah compliance agreement */}
                        <div className="bg-primary/5 p-4 rounded-xl border border-primary/25 space-y-3">
                            <div className="flex items-center space-x-2 text-primary font-bold text-xs uppercase tracking-wider">
                                <ShieldCheck className="w-5 h-5 text-gold flex-shrink-0" />
                                <span>Souq Diyanat Ethics Pledge</span>
                            </div>
                            <p className="text-[10px] text-muted-gray leading-normal">
                                By ticking, I verify under consensus that: <br />
                                - I own and hold physical possession of all products listed. <br />
                                - Pricing contains no hidden interest/Riba, indices compounding, or late fee penalties. <br />
                                - Sizing and specifications eliminate ambiguity (Jahalah). <br />
                                - Buyers maintain defect cancellation option rights.
                            </p>
                            <label className="flex items-center space-x-2 text-xs font-bold text-text-dark/95 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="agreedToCharter"
                                    checked={formData.agreedToCharter}
                                    onChange={handleInputChange}
                                    className="rounded text-primary focus:ring-primary h-4 w-4"
                                />
                                <span>I solemnly agree to these terms.</span>
                            </label>
                            {formErrors.agreedToCharter && <p className="text-[10px] text-danger-custom font-semibold">{formErrors.agreedToCharter}</p>}
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full font-bold cursor-pointer"
                        >
                            Submit Vetting Request
                        </Button>
                    </form>
                )}

                {step === 3 && (
                    <div className="text-center py-6 space-y-6">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto">
                            <CheckCircle2 className="w-10 h-10 text-primary" />
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-extrabold text-lg text-text-dark">Application Pending Vetting</h3>
                            <p className="text-xs text-muted-gray leading-relaxed max-w-sm mx-auto">
                                Alhamdulillah! Your merchant configuration application has been logged. Under shariah marketplace norms, we manually authenticate registration papers/stocks.
                            </p>
                        </div>

                        <div className="bg-bg-custom text-3xs text-muted-gray p-4 rounded-xl border border-border-custom/50 text-left line-normal">
                            <strong>What Happens Next?</strong> <br />
                            An admin representative will contact you via <strong>{formData.email}</strong> within 3 business days to finalize physical stock audit options and approve dashboard credentials access.
                        </div>

                        <Button
                            variant="outline"
                            size="md"
                            onClick={() => navigate('/')}
                            className="font-bold cursor-pointer"
                        >
                            Go to Home Screen
                        </Button>
                    </div>
                )}

                {step < 3 && (
                    <div className="border-t border-border-custom/50 pt-4 text-center text-xs">
                        <span className="text-muted-gray font-semibold">Already registered? </span>
                        <Link to="/login" className="text-primary hover:underline font-bold">Log In here</Link>
                    </div>
                )}

            </motion.div>
        </div>
    )
}

export default VendorRegistration