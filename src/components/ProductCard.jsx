import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, ShieldCheck } from 'lucide-react'
import { AppContext } from '../context/AppContext'
import { Rating, Badge } from './UI'

function ProductCard({ product }) {
    const { addToCart, currentUser } = useContext(AppContext)

    const handleAddToCart = (e) => {
        e.preventDefault() // prevent navigating to details page
        if (currentUser?.role === 'Vendor' || currentUser?.role === 'Admin') return
        addToCart(product, 1)
    }

    // Stock status styling
    const isOutOfStock = product.stock <= 0

    return (
        <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="group bg-white rounded-xl shadow-xs border border-border-custom hover:shadow-md transition-all overflow-hidden flex flex-col h-full"
        >
            <div className="relative pt-[70%] bg-bg-custom w-full overflow-hidden block">
                {/* Product Image */}
                <Link to={`/products/${product.id}`} className="absolute inset-0">
                    <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                </Link>

                {/* Transparency / Fiqh compliance tag */}
                <div className="absolute md:top-3 top-2 left-1 md:left-3 z-10 flex flex-col space-y-1.5 pointer-events-none">
                    <Badge variant="primary" className="bg-primary/90 text-white backdrop-blur-xs font-medium border-none shadow-xs text-3xs">
                        Spot Trade Only
                    </Badge>
                </div>

                {/* Favorite overlay button - decorative */}
                <button className="absolute md:top-3 top-2 right-1 md:right-3 p-1.5 hover:bg-white rounded-full bg-white/80 backdrop-blur-xs text-muted-gray hover:text-red-500 transition-all z-10 shadow-2xs">
                    <Heart className="w-4.5 h-4.5" />
                </button>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
                {/* Category & Vendor */}
                <div className="flex flex-col  text-xs  uppercase font-semibold text-muted-gray mb-1.5">
                    <span>{product.categoryName}</span>

                </div>

                {/* Product Title */}
                <Link to={`/products/${product.id}`} className="block mb-2 group-hover:text-primary transition-colors flex-1">
                    <h3 className="text-sm font-bold text-text-dark line-clamp-2 leading-relaxed">
                        {product.name}
                    </h3>
                    <Link to={`/vendors/${product.vendorId}`} className="text-primary hover:underline text-xs hover:text-primary-dark">
                        {product.vendorName}
                    </Link>
                </Link>

                {/* Rating */}
                <div className="flex items-center space-x-1.5 mb-2.5">
                    <Rating rating={product.rating} count={product.reviewsCount} />
                </div>

                {/* Shariah compliance assurance */}
                <div className="bg-bg-custom/50 text-[10px] rounded-lg p-2 border border-border-custom/40 mb-4 flex items-start space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-muted-gray leading-tight line-clamp-1 italic">
                        {product.islamicInsight}
                    </p>
                </div>

                {/* Pricing & Cart Action */}
                <div className="flex flex-col gap-3 md:gap-0 md:flex-row md:items-center md:justify-between mt-auto border-t border-border-custom/50">
                    <div className='flex md:flex-col justify-between items-center'>
                        <span className="text-2xs text-muted-gray block leading-none font-medium mb-1">Price</span>
                        <span className="text-base font-extrabold text-primary-dark">
                            ${product.price ? product.price.toFixed(2) : '0.00'}
                        </span>
                    </div>

                    {isOutOfStock ? (
                        <span className="text-2xs text-red-500 font-bold border border-red-200 bg-red-50 px-2.5 py-1.5 rounded-lg">
                            Out of Stock
                        </span>
                    ) : (currentUser?.role === 'Vendor' || currentUser?.role === 'Admin') ? (
                        <span className="text-2xs text-amber-600 font-bold border border-amber-200 bg-amber-50 px-2.5 py-1.5 rounded-lg select-none">
                            Store View
                        </span>
                    ) : (
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={handleAddToCart}
                            className="bg-primary hover:bg-primary-dark text-white p-2 rounded-lg transition-colors flex items-center justify-center shadow-xs cursor-pointer"
                            title="Add to Cart"
                        >
                            <ShoppingCart className="w-4 h-4 mr-1 md:mr-1.5" />
                            <span className="text-xs font-semibold px-0.5">Buy</span>
                        </motion.button>
                    )}
                </div>
            </div>
        </motion.div>
    )
}

export default ProductCard
