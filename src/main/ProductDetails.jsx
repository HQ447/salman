import React, { useContext, useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, ShieldCheck, ArrowLeft, Store, Package2, BadgeAlert, Award } from 'lucide-react'
import { AppContext } from '../context/AppContext'
import { Rating, Badge, Button, EmptyState } from '../components/UI'
import ProductCard from '../components/ProductCard'

function ProductDetails() {
    const { productId } = useParams()
    const { products, addToCart, currentUser } = useContext(AppContext)
    const [quantity, setQuantity] = useState(1)
    const navigate = useNavigate()

    const product = products.find(p => p.id === productId)

    // Scroll to top on id change
    useEffect(() => {
        window.scrollTo(0, 0)
        setQuantity(1)
    }, [productId])

    if (!product) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20">
                <EmptyState
                    title="Product Not Found"
                    description="The halal product ID you requested does not exist or may have been removed by our governance moderator desk."
                    actionText="Go Back to Shop"
                    onAction={() => navigate('/categories')}
                    icon={BadgeAlert}
                />
            </div>
        )
    }

    // Get related products (same category, excluding current product)
    const relatedProducts = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4)

    const handleQtyChange = (type) => {
        if (type === 'inc') {
            setQuantity(prev => Math.min(prev + 1, product.stock))
        } else if (type === 'dec') {
            setQuantity(prev => Math.max(prev - 1, 1))
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20 space-y-6 md:space-y-8">

            {/* Back button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-xs font-semibold text-muted-gray hover:text-primary transition -mt-6 cursor-pointer"
            >
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                Go Back
            </button>

            {/* Main product card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 bg-white border border-border-custom p-6 sm:p-8 rounded-xl shadow-xs text-left">

                {/* Left Column Image */}
                <div className="lg:col-span-5 space-y-4">
                    <div className="rounded-xl overflow-hidden aspect-4/3 bg-bg-custom border border-border-custom">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="bg-bg-custom text-xs text-muted-gray p-3 rounded-lg border border-border-custom/50 leading-relaxed italic text-center">
                        * The image represents the exact design styling of the asset.
                    </div>
                </div>

                {/* Right Column details */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-6">

                    <div className="space-y-3 md:space-y-4">

                        {/* Category / Spot badge */}
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0">
                            <Badge variant="primary" className="text-xs px-3 py-1 font-semibold uppercase w-fit">
                                {product.categoryName}
                            </Badge>
                            <div className="flex items-center gap-1 text-xs md:text-3xs text-primary font-bold">
                                <Store className="w-3.5 h-3.5" />
                                <Link to={`/vendors/${product.vendorId}`} className="hover:underline">
                                    {product.vendorName}
                                </Link>
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-xl sm:text-3xl font-extrabold text-text-dark leading-tight tracking-tight">
                            {product.name}
                        </h1>

                        {/* Rating */}
                        <Rating rating={product.rating} count={product.reviewsCount} className="text-sm" />

                        {/* Clean pricing section */}
                        <div className="flex items-end space-x-4 pt-1">
                            <div>
                                <span className="text-3xs text-muted-gray uppercase font-bold tracking-wider leading-none block mb-1">
                                    Spot Buying Price
                                </span>
                                <span className="text-2xl sm:text-3xl font-extrabold text-primary-dark">
                                    ${product.price.toFixed(2)}
                                </span>
                            </div>
                            <div className="text-xs text-muted-gray border-l border-border-custom pl-4 font-semibold pb-0.5">
                                Physical Inventory: <span className="text-primary font-bold">{product.stock} items</span>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-text-dark/80 leading-relaxed pt-2">
                            {product.description}
                        </p>

                        {/* Shariah-ethics compliance box */}
                        <div className="bg-primary/5 rounded-xl border border-primary/20 p-4 space-y-2.5">
                            <div className="flex items-center space-x-2 text-primary-dark font-extrabold text-xs tracking-wider uppercase">
                                <Award className="w-4 h-4 text-gold flex-shrink-0" />
                                <span>Fiqh Transaction Assurance</span>
                            </div>
                            <p className="md:text-3xs text-xs text-muted-gray leading-normal">
                                {product.islamicInsight} Physical warehousing ownership verified by Souq Diyanat. Sold on absolute spot transaction mode (spot price, immediate delivery order routing, no riba elements).
                            </p>
                        </div>

                    </div>

                    {/* Cart Quantity + Purchase */}
                    {currentUser?.role === 'Vendor' || currentUser?.role === 'Admin' ? (
                        <div className="pt-6 border-t border-border-custom/50">
                            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center">
                                <p className="text-xs font-bold text-amber-800 leading-relaxed">
                                    You are currently logged in as a {currentUser.role}. Vendors and Administrators are not permitted to buy or add products to cart.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="pt-6 border-t border-border-custom/50 flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">

                            {/* Quantity Selector */}
                            <div className="flex items-center border border-border-custom rounded-lg bg-bg-custom/50">
                                <button
                                    onClick={() => handleQtyChange('dec')}
                                    className="px-4 py-2 text-text-dark/70 hover:text-black font-extrabold cursor-pointer"
                                >
                                    -
                                </button>
                                <span className="px-3 text-sm font-extrabold text-text-dark">{quantity}</span>
                                <button
                                    onClick={() => handleQtyChange('inc')}
                                    className="px-4 py-2 text-text-dark/70 hover:text-black font-extrabold cursor-pointer"
                                >
                                    +
                                </button>
                            </div>

                            {/* Buy trigger button */}
                            <Button
                                variant="primary"
                                size="md"
                                onClick={() => {
                                    addToCart(product, quantity)
                                    navigate('/cart')
                                }}
                                icon={ShoppingCart}
                                className="flex-1 font-bold cursor-pointer"
                                disabled={product.stock <= 0}
                            >
                                {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart / Buy Spot'}
                            </Button>
                        </div>
                    )}

                </div>
            </div>

            {/* Specifications list */}
            <section className="bg-white border border-border-custom p-6 sm:p-8 rounded-xl shadow-xs text-left">
                <h2 className="text-base sm:text-lg font-bold text-text-dark pb-3.5 border-b border-border-custom flex items-center gap-2 mb-6">
                    <Package2 className="w-4.5 h-4.5 text-primary" />
                    Technical Specifications (Eliminating Jahalah)
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.details).map(([key, value]) => (
                        <div key={key} className="flex py-2 border-b border-border-custom/50 text-xs">
                            <span className="w-2/5 font-extrabold text-muted-gray uppercase tracking-wider">{key}</span>
                            <span className="w-3/5 font-semibold text-text-dark">{value}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Suggested items list */}
            {relatedProducts.length > 0 && (
                <section className="space-y-6">
                    <div className="text-left pb-3 border-b border-border-custom flex justify-between items-center">
                        <h2 className="text-lg font-extrabold text-text-dark">Explore Similar Items</h2>
                        <Link to={`/categories?category=${product.category}`} className="text-xs font-bold text-primary hover:underline hover:text-primary-dark">
                            See All
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedProducts.map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </section>
            )}

        </div>
    )
}

export default ProductDetails