import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    Landmark, ArrowRight, ShieldCheck, CheckCircle2, ChevronDown, ChevronUp,
    HelpCircle, Star, MessageSquare, LandmarkIcon, Building2, ShoppingBag, ShieldAlert, BadgeHelp
} from 'lucide-react'
import { AppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard'
import VendorCard from '../components/VendorCard'
import CategoryCard from '../components/CategoryCard'
import { Button } from '../components/UI'
import faqData from '../data/faqs.json'

function Home() {
    const { products, categories, vendors } = useContext(AppContext)
    const [activeFaq, setActiveFaq] = useState(null)
    const navigate = useNavigate()

    const featuredProducts = products.filter(p => p.featured).slice(0, 4)
    const topVendors = vendors.slice(0, 3)

    const toggleFaq = (index) => {
        setActiveFaq(activeFaq === index ? null : index)
    }

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    }

    const staggerContainer = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    return (
        <div className="space-y-20 pb-20">

            {/* 1. HERO SECTION */}
            <section className="relative bg-primary-dark text-white py-16 sm:py-24 overflow-hidden">
                {/* Islamic Geometric Pattern Decor */}
                <div className="absolute inset-0 islamic-pattern opacity-10 pointer-events-none" />

                {/* Calligraphy Ornament background */}
                <div className="absolute -top-3 transform right-0 -translate-y-8 translate-x-20 opacity-15 pointer-events-none text-9xl font-urdu select-none scale-y-110">
                    سوق دیانت
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                        {/* Left Column Text */}
                        <div className="lg:col-span-7 space-y-6 text-left">
                            <div className="inline-flex items-center space-x-2 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 backdrop-blur-xs">
                                <Landmark className="w-4 h-4 text-gold" />
                                <span className="text-xs font-semibold tracking-wider uppercase text-gold">
                                    100% Shariah-Compliant Market
                                </span>
                            </div>

                            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
                                Ethical Trading & <br />
                                <span className="text-gold">Halal Commerce</span>
                            </h1>

                            <p className="text-base sm:text-lg text-white/80 max-w-xl leading-relaxed">
                                Welcome to Souq Diyanat (سوق دیانت), a premier multi-vendor marketplace governed strictly under Fiqh al-Muamalat. Buy and sell with absolute clarity, mutual consent, and complete peace of mind.
                            </p>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    onClick={() => navigate('/categories')}
                                    className="font-bold cursor-pointer"
                                >
                                    Shop Now
                                    <ArrowRight className="w-4 h-4 ml-2.5" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={() => navigate('/vendor-registration')}
                                    className="border-white/20 text-white hover:bg-white/10 font-bold cursor-pointer"
                                >
                                    Become a Partner Vendor
                                </Button>
                            </div>
                        </div>

                        {/* Right Column Visual Placeholder with Unsplash Image */}
                        <div className="lg:col-span-5 relative mt-6 lg:mt-0">
                            <div className="absolute inset-0 bg-gold/10 rounded-2xl filter blur-3xl transform rotate-3 scale-95" />
                            <div className="relative border border-white/10 rounded-2xl overflow-hidden shadow-2xl bg-white/5 backdrop-blur-sm p-4">
                                <div className="relative rounded-xl overflow-hidden aspect-video sm:aspect-square lg:aspect-4/3">
                                    <img
                                        src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop"
                                        alt="Islamic Arts and Marketplace products"
                                        className="w-full h-full object-cover filter brightness-95"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent" />

                                    {/* Floating badge inside image */}
                                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs text-text-dark border-l-4 border-gold p-3 rounded-lg flex items-center space-x-2 shadow-md">
                                        <ShieldCheck className="w-6 h-6 text-primary flex-shrink-0" />
                                        <div>
                                            <p className="text-3xs font-bold text-primary uppercase tracking-widest leading-none mb-0.5">Fiqh Compliance</p>
                                            <p className="text-2xs font-semibold text-text-dark leading-tight line-clamp-1">Every transaction is fully transparent & riba-free</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 2. FEATURED CATEGORIES */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-text-dark">Explore Halal Sectors</h2>
                    <span className="h-0.5 w-12 bg-gold inline-block mt-2 rounded"></span>
                    <p className="text-sm text-muted-gray mt-2.5">
                        Browse our hand-screened departments, structured for transparency and conforming with Shariah trade ethics.
                    </p>
                </div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {categories.map((category) => (
                        <motion.div key={category.id} variants={fadeInUp}>
                            <CategoryCard category={category} />
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* 3. FEATURED PRODUCTS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 border-b border-border-custom pb-4">
                    <div className="text-left">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-text-dark">Featured Products</h2>
                        <p className="text-xs sm:text-sm text-muted-gray mt-1.5">
                            Top quality picks with transparent Fiqh-verified supply chains.
                        </p>
                    </div>
                    <Link
                        to="/categories"
                        className="flex items-center text-sm font-bold text-primary hover:text-primary-dark transition mt-3 sm:mt-0"
                    >
                        See All Products
                        <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            {/* 4. TOP VENDORS */}
            <section className="bg-bg-custom py-16 border-y border-border-custom">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-border-custom/50">
                        <div className="text-left">
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-dark">Screened Partner Shops</h2>
                            <p className="text-xs sm:text-sm text-muted-gray mt-1.5">
                                Every merchant here holds physical possession of the items and pledges to shariah transaction values.
                            </p>
                        </div>
                        <Link
                            to="/vendors"
                            className="flex items-center text-sm font-bold text-primary hover:text-primary-dark transition mt-3 sm:mt-0"
                        >
                            Examine All Vendors
                            <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {topVendors.map((vendor) => (
                            <VendorCard key={vendor.id} vendor={vendor} />
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. WHY CHOOSE US - Islamic principles grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-text-dark">Our Pillars of Commerce</h2>
                    <span className="h-0.5 w-12 bg-gold inline-block mt-2 rounded"></span>
                    <p className="text-sm text-muted-gray mt-2.5">
                        What makes trading at Souq Diyanat distinct from conventional big-box marketplaces.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-xl border border-border-custom space-y-3 relative hover:shadow-sm transition-shadow">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mx-auto">
                            <LandmarkIcon className="w-6 h-6" />
                        </div>
                        <h3 className="font-extrabold text-base text-text-dark">Strictly Riba & Gharar Free</h3>
                        <p className="text-xs text-muted-gray leading-relaxed">
                            No hidden interest charges, zero index pricing confusion, absolute transparency in financing, and spot payments matching Islamic transaction guidelines.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-border-custom space-y-3 relative hover:shadow-sm transition-shadow">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mx-auto">
                            <ShoppingBag className="w-6 h-6" />
                        </div>
                        <h3 className="font-extrabold text-base text-text-dark">Hand-to-Hand & Physical Possession</h3>
                        <p className="text-xs text-muted-gray leading-relaxed">
                            We require vendors to own and possess items (as per standard shariah requirements) prior to completing the sale transaction, preventing sale of non-existent items.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-border-custom space-y-3 relative hover:shadow-sm transition-shadow">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mx-auto">
                            <ShieldAlert className="w-6 h-6" />
                        </div>
                        <h3 className="font-extrabold text-base text-text-dark">Exchange & Defect Rights (Khayar)</h3>
                        <p className="text-xs text-muted-gray leading-relaxed">
                            If an item does not conform exactly to specs or has defects, you retain the shariah Option of Defect (Khayar al-Ayb) for immediate cancel and full money back.
                        </p>
                    </div>
                </div>
            </section>

            {/* 6. HOW IT WORKS */}
            <section className="bg-primary py-16 text-white overflow-hidden relative">
                <div className="absolute inset-0 islamic-pattern opacity-5 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Marketplace Workflows</h2>
                        <span className="h-0.5 w-12 bg-gold inline-block mt-2 rounded"></span>
                        <p className="text-sm text-white/80 mt-2.5">
                            Designed as a unified collaborative ecosystem keeping buyers, sellers, and administrators aligned.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 space-y-4 hover:bg-white/15 transition-all">
                            <div className="text-3xl font-extrabold text-gold leading-none">01</div>
                            <h3 className="font-bold text-lg text-white">For Customers</h3>
                            <p className="text-xs text-white/85 leading-relaxed">
                                Browse detailed listing specifications with complete transparency on pricing, weight, materials, and delivery timelines. Initiate spot purchases directly via cash on delivery or instant card transfer.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 space-y-4 hover:bg-white/15 transition-all">
                            <div className="text-3xl font-extrabold text-gold leading-none">02</div>
                            <h3 className="font-bold text-lg text-white">For Sellers</h3>
                            <p className="text-xs text-white/85 leading-relaxed">
                                Submit shop registry with clear proof of physical inventory stock. Pledge to comply with shariah rules of Muamalat and fulfill orders within transparent delivery schedules after being vetted by the admins.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 space-y-4 hover:bg-white/15 transition-all">
                            <div className="text-3xl font-extrabold text-gold leading-none">03</div>
                            <h3 className="font-bold text-lg text-white">For Governance Admins</h3>
                            <p className="text-xs text-white/85 leading-relaxed">
                                Admins audit shop credentials, examine descriptions to eliminate Jahalah (ambiguity), review customer cancellation claims, and monitor merchant adherence to the Souq Diyanat ethics charter.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. TESTIMONIALS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-text-dark">Voices of Trust</h2>
                    <span className="h-0.5 w-12 bg-gold inline-block mt-2 rounded"></span>
                    <p className="text-sm text-muted-gray mt-2.5">
                        Hear from buyers and vendors who have transitioned to transparent, shariah-compliant trade.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="bg-white border border-border-custom rounded-xl p-6 relative shadow-xs flex flex-col justify-between">
                        <div className="space-y-4">
                            <div className="flex text-gold">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                            </div>
                            <p className="text-xs italic text-text-dark/80 leading-relaxed">
                                \"I always search for items online but am frustrated by hidden charges and ambiguous dimensions. Here, the exact specifications and Islamic insights gave me final conviction. Excellent Quran Tajweed box.\"
                            </p>
                        </div>
                        <div className="flex items-center space-x-3 pt-6 mt-4 border-t border-border-custom">
                            <img
                                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop"
                                alt="Amina Malik"
                                className="w-9 h-9 rounded-full object-cover"
                            />
                            <div>
                                <h4 className="text-xs font-bold text-text-dark">Amina Malik</h4>
                                <p className="text-[10px] text-muted-gray">Verified Customer, Karachi</p>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white border border-border-custom rounded-xl p-6 relative shadow-xs flex flex-col justify-between">
                        <div className="space-y-4">
                            <div className="flex text-gold">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                            </div>
                            <p className="text-xs italic text-text-dark/80 leading-relaxed">
                                \"Operating a bookstore under standard terms is tough. The Souq Diyanat ethics dashboard has allowed us to explain our direct trade, our spot warehousing, and ensure our buyers get exactly what is advertised.\"
                            </p>
                        </div>
                        <div className="flex items-center space-x-3 pt-6 mt-4 border-t border-border-custom">
                            <img
                                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop"
                                alt="Ahmad Abdullah"
                                className="w-9 h-9 rounded-full object-cover"
                            />
                            <div>
                                <h4 className="text-xs font-bold text-text-dark">Ahmad Abdullah</h4>
                                <p className="text-[10px] text-muted-gray">Store Owner, Diyanat Bookstore</p>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white border border-border-custom rounded-xl p-6 relative shadow-xs flex flex-col justify-between">
                        <div className="space-y-4">
                            <div className="flex text-gold">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                            </div>
                            <p className="text-xs italic text-text-dark/80 leading-relaxed">
                                \"Excellent pure Oud attars. I ordered it for Eid prayers, and was pleasantly surprised by the quick communication and transparent, flat shipping charge. Highly recommend Al-Barakah dates too.\"
                            </p>
                        </div>
                        <div className="flex items-center space-x-3 pt-6 mt-4 border-t border-border-custom">
                            <img
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop"
                                alt="Tariq Jamil"
                                className="w-9 h-9 rounded-full object-cover"
                            />
                            <div>
                                <h4 className="text-xs font-bold text-text-dark">Tariq Jamil</h4>
                                <p className="text-[10px] text-muted-gray">Verified Customer, Islamabad</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. FAQ - Accordion */}
            <section className="bg-bg-custom py-16 border-y border-border-custom">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                    <div className="text-center">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-text-dark flex items-center justify-center gap-2">
                            <BadgeHelp className="text-primary w-7.5 h-7.5" />
                            Frequently Answered Questions
                        </h2>
                        <p className="text-xs sm:text-sm text-muted-gray mt-2">
                            Understanding Muamalat rules and buyer protections at Souq Diyanat.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {faqData.map((faq, index) => {
                            const isOpen = activeFaq === index
                            return (
                                <div
                                    key={faq.id}
                                    className="bg-white border border-border-custom rounded-xl overflow-hidden transition-all duration-200"
                                >
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full flex items-center justify-between px-6 py-4.5 text-left font-bold text-sm text-text-dark hover:bg-bg-custom transition-colors focus:outline-none"
                                    >
                                        <span className="flex items-center gap-2.5">
                                            <HelpCircle className="w-4 h-4 text-primary flex-shrink-0" />
                                            {faq.question}
                                        </span>
                                        {isOpen ? <ChevronUp className="w-4 h-4 text-primary" /> : <ChevronDown className="w-4 h-4 text-muted-gray" />}
                                    </button>
                                    {isOpen && (
                                        <div className="px-6 pb-5 pt-1 border-t border-border-custom/50">
                                            <p className="text-xs text-muted-gray leading-relaxed font-normal">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* 9. NEWSLETTER */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-primary-dark rounded-2xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-lg border border-gold/20">
                    {/* Pattern */}
                    <div className="absolute inset-0 islamic-pattern opacity-10 pointer-events-none" />

                    <div className="relative z-10 space-y-6 max-w-xl mx-auto">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Join the Halal Market Network</h2>
                        <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                            Sign up today. Receive curated notices of certified products, scholar interviews on modern finance, and unique store updates.
                        </p>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 pt-2">
                            <input
                                type="email"
                                placeholder="Submit your email address..."
                                className="w-full bg-white text-text-dark text-sm rounded-lg px-4 py-3 border border-transparent focus:outline-none focus:ring-2 focus:ring-gold"
                            />
                            <Button variant="secondary" size="lg" className="font-bold shrink-0 cursor-pointer">
                                Subscribe
                            </Button>
                        </div>
                        <p className="text-[10px] text-white/60">
                            By subscribing, you agree to receive shariah guidelines updates. We respect your privacy completely (no spam).
                        </p>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Home