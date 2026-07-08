import React from 'react'
import {
    Landmark,
    ShieldCheck,
    HeartHandshake,
    Scale,
    Database,
    Building2
} from 'lucide-react'

function About() {

    const coreValues = [
        {
            icon: ShieldCheck,
            title: "Shariah Supervisory Board",
            urdu: "شرعی سپروائزری بورڈ",
            desc: "Every marketplace policy, transaction flow, and future smart contract is designed under the supervision of qualified Islamic scholars to ensure compliance with Fiqh al-Muamalat."
        },
        {
            icon: Scale,
            title: "Fair Protection of Rights",
            urdu: "حقوق کا عادلانہ تحفظ",
            desc: "We protect the rights of both buyers and sellers equally through transparency, accountability, and fair commercial practices."
        },
        {
            icon: HeartHandshake,
            title: "Transparent Commerce",
            urdu: "شفاف تجارت",
            desc: "Products must be described honestly with complete specifications, eliminating deception, ambiguity, and misleading information."
        }
    ]

    return (
        <div className="space-y-20 pb-20">

            {/* Hero Section */}
            <section className="bg-primary/5 border-b border-border-custom py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">

                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
                        <Landmark className="w-4 h-4" />
                        About Souq Diyanat
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-extrabold text-text-dark leading-tight">
                        Building the Future of
                        <span className="text-primary block mt-2">
                            Ethical Islamic Digital Commerce
                        </span>
                    </h1>

                    <p className="mt-6 text-base text-muted-gray leading-relaxed max-w-3xl mx-auto">
                        Souq Diyanat is more than an online marketplace. It is a comprehensive
                        Shariah-compliant digital commerce platform where every transaction
                        follows the authentic principles of Islamic commercial jurisprudence
                        (Fiqh al-Muamalat), ensuring transparency, fairness, and trust.
                    </p>

                    <div className="mt-8">
                        <p className="font-urdu text-gold text-xl scale-y-110 leading-loose">
                            سوقِ دیانت صرف ایک آن لائن مارکیٹ پلیس نہیں بلکہ ایک مکمل شرعی
                            ڈیجیٹل تجارتی نظام ہے جہاں خرید و فروخت کا ہر مرحلہ فقہ المعاملات
                            کے اصولوں کے مطابق انجام دیا جاتا ہے۔
                        </p>
                    </div>

                </div>
            </section>

            {/* Vision & Mission */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Vision */}
                    <div className="bg-white rounded-2xl border border-border-custom p-8 shadow-sm hover:border-primary/30 transition-all">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5">
                            <Landmark className="w-6 h-6" />
                        </div>

                        <h2 className="text-2xl font-bold text-text-dark mb-4">
                            Our Vision
                        </h2>

                        <p className="text-muted-gray leading-relaxed">
                            To establish a fair, independent, and globally trusted digital
                            economy that provides the Muslim Ummah with a halal alternative
                            to conventional e-commerce platforms while ensuring justice,
                            transparency, and Shariah compliance in every transaction.
                        </p>

                        <div className="mt-6 pt-5 border-t border-border-custom">
                            <p className="font-urdu text-gold text-lg scale-y-110 leading-loose">
                                مسلم اُمہ کے لیے ایک منصفانہ، خودمختار اور عالمی سطح پر
                                قابلِ اعتماد ڈیجیٹل تجارتی معیشت قائم کرنا جو روایتی
                                ای کامرس پلیٹ فارمز کا مکمل حلال متبادل فراہم کرے۔
                            </p>
                        </div>
                    </div>

                    {/* Mission */}
                    <div className="bg-white rounded-2xl border border-border-custom p-8 shadow-sm hover:border-primary/30 transition-all">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5">
                            <HeartHandshake className="w-6 h-6" />
                        </div>

                        <h2 className="text-2xl font-bold text-text-dark mb-4">
                            Our Mission
                        </h2>

                        <p className="text-muted-gray leading-relaxed">
                            To integrate modern technologies, software systems, and future
                            blockchain smart contracts with the principles of Islamic finance
                            and Fiqh al-Muamalat, creating a marketplace free from Riba,
                            Gharar, gambling, and the sale of non-owned goods.
                        </p>

                        <div className="mt-6 pt-5 border-t border-border-custom">
                            <p className="font-urdu text-gold text-lg scale-y-110 leading-loose">
                                جدید ٹیکنالوجی، سوفٹ ویئر سسٹمز اور اسلامی مالیات کے اصولوں
                                کو یکجا کر کے ایسا تجارتی نظام قائم کرنا جہاں سود، غرر،
                                قمار اور غیر ملکیتی اشیاء کی خرید و فروخت کا کوئی وجود نہ ہو۔
                            </p>
                        </div>
                    </div>

                </div>
            </section>
            {/* Core Principles */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
                        Our Core Principles
                    </span>

                    <h2 className="text-3xl sm:text-4xl font-extrabold text-text-dark">
                        The Foundation of Every Transaction
                    </h2>

                    <p className="mt-4 text-muted-gray leading-relaxed">
                        Every feature of Souq Diyanat is designed around authentic Islamic
                        commercial ethics, ensuring transparency, justice, and trust for
                        every buyer and seller.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {coreValues.map((item, index) => {

                        const Icon = item.icon

                        return (

                            <div
                                key={index}
                                className="bg-white rounded-2xl border border-border-custom p-8 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300"
                            >

                                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                                    <Icon className="w-7 h-7" />
                                </div>

                                <h3 className="text-xl font-bold text-text-dark">
                                    {item.title}
                                </h3>

                                <p className="text-gold font-urdu text-lg mt-2 scale-y-110">
                                    {item.urdu}
                                </p>

                                <p className="text-muted-gray leading-relaxed mt-5">
                                    {item.desc}
                                </p>

                            </div>

                        )

                    })}

                </div>

            </section>

            {/* Organizational Framework */}

            <section className="bg-bg-custom border-y border-border-custom py-20">

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="grid lg:grid-cols-2 gap-14 items-center">

                        <div>

                            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider mb-5">
                                <Building2 className="w-4 h-4" />
                                Organizational Structure
                            </div>

                            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-dark mb-6">
                                Organizational & Legal Framework
                            </h2>

                            <p className="text-muted-gray leading-relaxed mb-6">
                                Souq Diyanat follows a hybrid legal structure designed to
                                operate within an Islamic regulatory framework. Our objective
                                is to establish a secure digital marketplace that combines
                                modern technology with authentic Islamic commercial law.
                            </p>

                            <p className="text-muted-gray leading-relaxed">
                                Every operational policy is developed with fairness,
                                accountability, transparency, and long-term sustainability
                                while protecting the interests of both merchants and customers.
                            </p>

                        </div>

                        <div className="bg-white rounded-2xl border border-border-custom p-8 shadow-sm">

                            <h3 className="text-2xl font-bold text-text-dark mb-5">
                                اردو خلاصہ
                            </h3>

                            <p className="font-urdu text-gold text-xl leading-loose scale-y-110">
                                سوقِ دیانت ایک ہائبرڈ قانونی ڈھانچے پر مبنی شرعی
                                ای کامرس پلیٹ فارم ہے جس کا مقصد جدید ٹیکنالوجی
                                کو اسلامی تجارتی اصولوں کے ساتھ ہم آہنگ کرتے ہوئے
                                ایک محفوظ، شفاف اور قابلِ اعتماد تجارتی ماحول فراہم کرنا ہے۔
                            </p>

                        </div>

                    </div>

                </div>

            </section>

            {/* Technology & Security */}

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    <div className="bg-primary rounded-3xl p-10 text-white">

                        <Database className="w-14 h-14 text-gold mb-6" />

                        <h2 className="text-3xl font-bold mb-5">
                            Technology with Trust
                        </h2>

                        <p className="leading-relaxed text-white/90">
                            Modern database systems, cybersecurity standards, and future
                            blockchain integrations are intended to strengthen transparency,
                            data integrity, and operational reliability across the platform.
                        </p>

                    </div>

                    <div>

                        <h2 className="text-3xl font-extrabold text-text-dark mb-6">
                            Digital Security & Halal Trading Environment
                        </h2>

                        <p className="text-muted-gray leading-relaxed mb-5">
                            We prioritize customer privacy, secure data management,
                            cybersecurity, and transparent business processes to create
                            a trusted marketplace for the global Muslim community.
                        </p>

                        <p className="text-muted-gray leading-relaxed mb-5">
                            Every future enhancement—from product verification to digital
                            ownership tracking—will be developed to strengthen confidence,
                            authenticity, and Shariah compliance throughout the trading
                            journey.
                        </p>

                        <div className="bg-primary/5 rounded-xl border border-primary/10 p-6 mt-8">

                            <p className="font-urdu text-gold text-xl leading-loose scale-y-110">
                                جدید ڈیٹا بیس مینجمنٹ، سائبر سیکیورٹی اور محفوظ
                                ڈیجیٹل انفراسٹرکچر کے ذریعے صارفین کو ایک قابلِ اعتماد
                                اور مکمل شرعی تجارتی ماحول فراہم کرنا ہمارا بنیادی مقصد ہے۔
                            </p>

                        </div>

                    </div>

                </div>

            </section>
            {/* Why Souq Diyanat */}

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-3xl mx-auto mb-12">

                    <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
                        Why Souq Diyanat?
                    </span>

                    <h2 className="text-3xl sm:text-4xl font-extrabold text-text-dark">
                        More Than an E-Commerce Platform
                    </h2>

                    <p className="mt-4 text-muted-gray leading-relaxed">
                        Souq Diyanat is a long-term initiative to establish an ethical digital
                        marketplace where technology serves Islamic values. Every policy,
                        feature, and future enhancement is designed to promote fairness,
                        accountability, and trust while remaining faithful to the principles
                        of Fiqh al-Muamalat.
                    </p>

                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                    <div className="bg-white rounded-2xl border border-border-custom p-6 text-center shadow-sm hover:shadow-md transition-all">
                        <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                            <ShieldCheck className="w-7 h-7 text-primary" />
                        </div>

                        <h3 className="font-bold text-text-dark mb-3">
                            Shariah Compliance
                        </h3>

                        <p className="text-sm text-muted-gray leading-relaxed">
                            Every transaction is designed around authentic Islamic commercial principles.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-border-custom p-6 text-center shadow-sm hover:shadow-md transition-all">
                        <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                            <Scale className="w-7 h-7 text-primary" />
                        </div>

                        <h3 className="font-bold text-text-dark mb-3">
                            Fair & Transparent Trade
                        </h3>

                        <p className="text-sm text-muted-gray leading-relaxed">
                            Honest pricing, verified ownership, and complete product transparency.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-border-custom p-6 text-center shadow-sm hover:shadow-md transition-all">
                        <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                            <Database className="w-7 h-7 text-primary" />
                        </div>

                        <h3 className="font-bold text-text-dark mb-3">
                            Secure Technology
                        </h3>

                        <p className="text-sm text-muted-gray leading-relaxed">
                            Built with modern technologies that prioritize security, transparency, and future scalability.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-border-custom p-6 text-center shadow-sm hover:shadow-md transition-all">
                        <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                            <HeartHandshake className="w-7 h-7 text-primary" />
                        </div>

                        <h3 className="font-bold text-text-dark mb-3">
                            Community Trust
                        </h3>

                        <p className="text-sm text-muted-gray leading-relaxed">
                            Strengthening trust between buyers and sellers through ethical digital commerce.
                        </p>
                    </div>

                </div>

            </section>

            {/* Closing Statement */}

            <section className="bg-primary text-white py-20">

                <div className="max-w-4xl mx-auto px-4 text-center">

                    <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                        Building a Marketplace Rooted in Faith, Integrity & Innovation
                    </h2>

                    <p className="mt-6 text-white/90 leading-relaxed text-lg">
                        Souq Diyanat aspires to become a trusted digital marketplace where
                        technology and Islamic ethics work together to create transparent,
                        responsible, and sustainable commerce for individuals, businesses,
                        and the global Muslim community.
                    </p>

                    <div className="mt-10 max-w-3xl mx-auto border-t border-white/20 pt-8">

                        <p className="font-urdu text-gold text-2xl leading-loose scale-y-110">
                            ہمارا مقصد صرف ایک آن لائن مارکیٹ قائم کرنا نہیں بلکہ ایسا
                            ڈیجیٹل تجارتی نظام تشکیل دینا ہے جہاں دیانت، انصاف، شفافیت
                            اور اسلامی اصول ہر لین دین کی بنیاد ہوں، تاکہ امتِ مسلمہ
                            کو ایک محفوظ، قابلِ اعتماد اور مکمل شرعی متبادل فراہم کیا جا سکے۔
                        </p>

                    </div>

                </div>

            </section>

        </div>
    )
}

export default About