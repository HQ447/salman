import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Shirt, Sparkles, Apple, Home, Gamepad2, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const iconMap = {
    BookOpen: BookOpen,
    Shirt: Shirt,
    Sparkles: Sparkles,
    Apple: Apple,
    Home: Home,
    Gamepad2: Gamepad2
}

function CategoryCard({ category }) {
    const IconComponent = iconMap[category.icon] || BookOpen

    return (
        <Link to={`/categories?category=${category.slug}`} className="block">
            <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="bg-white border border-border-custom p-6 rounded-xl hover:border-gold hover:shadow-md transition-all h-full flex flex-col justify-between group"
            >
                <div className="space-y-4">
                    {/* Icon Container */}
                    <div className="w-12 h-12 rounded-lg bg-bg-custom group-hover:bg-primary/10 transition-colors flex items-center justify-center border border-border-custom/50">
                        <IconComponent className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>

                    {/* Heading */}
                    <div>
                        <h3 className="text-sm font-extrabold text-text-dark group-hover:text-primary-dark transition-colors">
                            {category.name}
                        </h3>
                        <p className="text-xs text-muted-gray leading-normal mt-1.5 line-clamp-2">
                            {category.description}
                        </p>
                    </div>
                </div>

                {/* Count and Next link trigger */}
                <div className="flex items-center justify-between mt-6 pt-3 border-t border-border-custom/40">
                    <span className="text-2xs font-semibold text-primary bg-primary/5 px-2.5 py-1 rounded">
                        {category.count} Listings
                    </span>
                    <div className="text-muted-gray group-hover:text-primary transition-colors flex items-center text-xs font-semibold">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity mr-1">Explore</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                </div>
            </motion.div>
        </Link>
    )
}

export default CategoryCard
