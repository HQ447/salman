import React from 'react'
import { motion } from 'framer-motion'
import { Landmark, ShieldCheck, HeartHandshake, Compass, Users, Scale, Clock } from 'lucide-react'

function About() {
    const coreValues = [
        {
            icon: HeartHandshake,
            title: "Mutual Consent (Tiradin)",
            desc: "All transactions are structured to guarantee absolute consensus. No hidden clauses, forced sales, or ambiguous subscription lock-ins."
        },
        {
            icon: ShieldCheck,
            title: "Stock Control Verification",
            desc: "We screen and require vendors to possess physical stocks in their warehouses prior to listings, aligned with Shariah ownership rules."
        },
        {
            icon: Compass,
            title: "Description Precision",
            desc: "Detailed specs (weight, purity, format, fabric composition) are mandated to eliminate Jahalah (ignorance of product parameters)."
        },
        {
            icon: Scale,
            title: "Zero Riba",
            desc: "Total prohibition of index interest rates, late repayment fees, compounding penalties, or financing schemes that feed on loans."
        }
    ]

    const timelineSteps = [
        {
            year: "Ramadan 1445 AH (2024)",
            title: "Drafting the Code of Conduct",
            desc: "Scholars and business analysts drafted Souq Diyanat's foundational compliance charter outlining Fiqh al-Muamalat parameters."
        },
        {
            year: "Muharram 1446 AH (2025)",
            title: "Initial Partner Screenings",
            desc: "Vetted our first 10 specialized local merchants supplying premium organic foods, dates, and authentic publishing houses."
        },
        {
            year: "Safar 1447 AH (2026)",
            title: "Souq Diyanat Official Release",
            desc: "Launched our customer-facing web platform simulating transparent pricing models and spot cash deliveries across Pakistan."
        }
    ]

    return (
        <div className="space-y-16 py-12 pb-20">

            {/* 1. Header Hero */}
            <section className="bg-primary/5 border-b border-border-custom -mt-12 py-16 text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <div className="inline-block bg-primary/10 text-primary px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
                        Our Story & Stewardship
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-text-dark tracking-tight leading-tight">
                        Reviving Ethical Islamic Commerce
                    </h1>
                    <p className="text-sm sm:text-base text-muted-gray mt-4 max-w-xl mx-auto leading-relaxed">
                        Souq Diyanat stands at the intersection of modern technology and age-old Islamic commerce ethics, creating a premium marketplace for the global Muslim community.
                    </p>
                </div>
            </section>

            {/* 2. Mission & Vision */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                    {/* Mission Card */}
                    <div className="bg-white rounded-xl border border-border-custom p-8 shadow-xs hover:border-primary/30 transition-all flex flex-col justify-between">
                        <div>
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-5">
                                <Landmark className="w-5.5 h-5.5" />
                            </div>
                            <h2 className="text-xl font-bold text-text-dark mb-3">Our Mission</h2>
                            <p className="text-xs sm:text-sm text-muted-gray leading-relaxed">
                                To simplify access to genuine shariah-compliant goods by enforcing transparency guidelines at every step. We audit sellers, clarify listing content, and facilitate clean transactions to eliminate Gharar (uncertainty) and late fees.
                            </p>
                        </div>
                        <div className="border-t border-border-custom/50 pt-4 mt-6 text-2xs font-urdu font-medium text-gold scale-y-110 tracking-wide">
                            دیانتداری اور سچائی پر مبنی تجارت کا فروغ
                        </div>
                    </div>

                    {/* Vision Card */}
                    <div className="bg-white rounded-xl border border-border-custom p-8 shadow-xs hover:border-primary/30 transition-all flex flex-col justify-between">
                        <div>
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-5">
                                <Users className="w-5.5 h-5.5" />
                            </div>
                            <h2 className="text-xl font-bold text-text-dark mb-3">Our Vision</h2>
                            <p className="text-xs sm:text-sm text-muted-gray leading-relaxed">
                                To evolve the global Muslim e-commerce ecosystem beyond standard transactional pages, proving that modern tech works beautifully when built directly on shariah-compliant foundations.
                            </p>
                        </div>
                        <div className="border-t border-border-custom/50 pt-4 mt-6 text-2xs font-urdu font-medium text-gold scale-y-110 tracking-wide">
                            جدید ٹیکنالوجی اور اسلامی تجارتی قوانین کا حسین امتزاج
                        </div>
                    </div>

                </div>
            </section>

            {/* 3. Core Values Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="text-center max-w-xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-text-dark">Our Pillars of Governance</h2>
                    <p className="text-xs sm:text-sm text-muted-gray mt-2 leading-relaxed">
                        These parameters guide every merchant, dispute resolution decision, and system logic on our platform.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {coreValues.map((val, idx) => {
                        const Icon = val.icon
                        return (
                            <div
                                key={idx}
                                className="bg-white border border-border-custom hover:border-gold rounded-xl p-6 shadow-2xs hover:shadow-xs transition-all space-y-3"
                            >
                                <div className="w-9 h-9 rounded bg-primary/5 flex items-center justify-center text-primary">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <h3 className="text-sm font-bold text-text-dark">{val.title}</h3>
                                <p className="text-xs text-muted-gray leading-relaxed">{val.desc}</p>
                            </div>
                        )
                    })}
                </div>
            </section>

            {/* 4. Timeline */}
            <section className="bg-bg-custom py-16 border-y border-border-custom">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    <div className="text-center">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-text-dark flex items-center justify-center gap-2">
                            <Clock className="w-7.5 h-7.5 text-primary" />
                            Chronology & Development
                        </h2>
                        <p className="text-xs text-muted-gray mt-1.5">
                            Refined progression of the Souq Diyanat compliance framework.
                        </p>
                    </div>

                    <div className="relative border-l border-border-custom pl-6 space-y-10 ml-4">
                        {timelineSteps.map((step, idx) => (
                            <div key={idx} className="relative">
                                {/* Timeline dot */}
                                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-gold border p-0.5 border-white flex items-center justify-center">
                                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                                </div>

                                <div className="space-y-1 bg-white p-5 rounded-xl border border-border-custom shadow-2xs">
                                    <span className="text-xs font-bold text-primary block">{step.year}</span>
                                    <h3 className="text-sm font-extrabold text-text-dark">{step.title}</h3>
                                    <p className="text-xs text-muted-gray leading-relaxed mt-1">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    )
}

export default About