import React, { useContext, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, ArrowUpDown, RefreshCw, BookOpen } from 'lucide-react'
import { AppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard'
import { Badge, Button, EmptyState } from '../components/UI'

function Categories() {
    const { products, categories } = useContext(AppContext)
    const [searchParams, setSearchParams] = useSearchParams()

    // State models for filters
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [priceRange, setPriceRange] = useState({ min: '', max: '' })
    const [minRating, setMinRating] = useState('all')
    const [sortBy, setSortBy] = useState('featured')

    // Parse search params on load or change
    useEffect(() => {
        const urlQuery = searchParams.get('search') || ''
        const urlCategory = searchParams.get('category') || 'all'

        if (urlQuery) setSearchQuery(urlQuery)
        if (urlCategory) setSelectedCategory(urlCategory)
    }, [searchParams])

    // Filter products logic
    const filteredProducts = products.filter(product => {
        // 1. Text Search Filter
        const matchesSearch = searchQuery.trim() === '' ||
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
            product.vendorName.toLowerCase().includes(searchQuery.toLowerCase())

        // 2. Category Filter
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory

        // 3. Price Filter
        const minVal = parseFloat(priceRange.min)
        const maxVal = parseFloat(priceRange.max)
        const matchesMinPrice = isNaN(minVal) || product.price >= minVal
        const matchesMaxPrice = isNaN(maxVal) || product.price <= maxVal

        // 4. Rating Filter
        const numRating = parseFloat(minRating)
        const matchesRating = minRating === 'all' || product.rating >= numRating

        return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice && matchesRating
    })

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price
        if (sortBy === 'price-desc') return b.price - a.price
        if (sortBy === 'rating') return b.rating - a.rating
        return b.featured - a.featured // featured default
    })

    const resetFilters = () => {
        setSearchQuery('')
        setSelectedCategory('all')
        setPriceRange({ min: '', max: '' })
        setMinRating('all')
        setSortBy('featured')
        setSearchParams({})
    }

    const handleCategorySelect = (categorySlug) => {
        setSelectedCategory(categorySlug)
        const params = {}
        if (searchQuery) params.search = searchQuery
        if (categorySlug !== 'all') params.category = categorySlug
        setSearchParams(params)
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20 space-y-12">

            {/* Page Title */}
            <div className="text-left -mt-6">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-text-dark tracking-tight">Browse Halal Marketplace</h1>
                <p className="text-xs sm:text-sm text-muted-gray mt-1">
                    Handpicked and audited products adhering to ethical trade guidelines.
                </p>
            </div>

            {/* Filter and Content layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Left Side: Filter Sidebar Panel */}
                <aside className="space-y-6 lg:col-span-1 bg-white border border-border-custom p-5 rounded-xl shadow-xs text-left h-fit">
                    <div className="flex items-center justify-between pb-3 border-b border-border-custom mb-2">
                        <h2 className="font-extrabold text-sm text-text-dark flex items-center gap-1.5 uppercase tracking-wider">
                            <SlidersHorizontal className="w-4 h-4 text-primary" />
                            Filter Catalog
                        </h2>
                        <button
                            onClick={resetFilters}
                            title="Reset Filters"
                            className="text-xs text-primary hover:text-primary-dark font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                        >
                            <RefreshCw className="w-3 h-3" />
                            Reset
                        </button>
                    </div>

                    {/* Text Search */}
                    <div className="space-y-1.5">
                        <label className="text-3xs font-extrabold uppercase tracking-wider text-text-dark">Text Search</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Product name, tag..."
                                className="w-full bg-bg-custom text-text-dark placeholder-muted-gray text-xs rounded-lg pl-8 pr-3 py-2 border border-border-custom focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                            <Search className="w-3.5 h-3.5 text-muted-gray absolute left-2.5 top-1/2 transform -translate-y-1/2" />
                        </div>
                    </div>

                    {/* Categories select checklist */}
                    <div className="space-y-2">
                        <label className="text-3xs font-extrabold uppercase tracking-wider text-text-dark block">Categories</label>
                        <div className="flex flex-col space-y-1">
                            <button
                                onClick={() => handleCategorySelect('all')}
                                className={`text-left text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors text-ellipsis overflow-hidden ${selectedCategory === 'all'
                                        ? 'bg-primary text-white'
                                        : 'text-text-dark/80 hover:bg-bg-custom'
                                    }`}
                            >
                                All Departments
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => handleCategorySelect(cat.slug)}
                                    className={`text-left text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors text-ellipsis overflow-hidden ${selectedCategory === cat.slug
                                            ? 'bg-primary text-white'
                                            : 'text-text-dark/80 hover:bg-bg-custom'
                                        }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Pricing range */}
                    <div className="space-y-1.5">
                        <label className="text-3xs font-extrabold uppercase tracking-wider text-text-dark">Price Range (USD)</label>
                        <div className="grid grid-cols-2 gap-2">
                            <input
                                type="number"
                                placeholder="Min"
                                value={priceRange.min}
                                onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                                className="w-full bg-bg-custom text-text-dark text-xs rounded-lg px-2 py-1.5 border border-border-custom focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                            <input
                                type="number"
                                placeholder="Max"
                                value={priceRange.max}
                                onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                                className="w-full bg-bg-custom text-text-dark text-xs rounded-lg px-2 py-1.5 border border-border-custom focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>
                    </div>

                    {/* Minimum Rating */}
                    <div className="space-y-1.5">
                        <label className="text-3xs font-extrabold uppercase tracking-wider text-text-dark">Minimum Rating</label>
                        <select
                            value={minRating}
                            onChange={(e) => setMinRating(e.target.value)}
                            className="w-full bg-bg-custom text-text-dark text-xs rounded-lg px-2.5 py-2 border border-border-custom focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                            <option value="all">Any Rating</option>
                            <option value="4.8">4.8+ Stars</option>
                            <option value="4.5">4.5+ Stars</option>
                            <option value="4.0">4.0+ Stars</option>
                        </select>
                    </div>
                </aside>

                {/* Right Side: Listings and Sorters */}
                <section className="lg:col-span-3 space-y-6">
                    {/* Top control bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-border-custom px-4 py-3.5 rounded-xl shadow-2xs gap-4 text-left">
                        <div className="text-xs text-muted-gray font-semibold">
                            Showing <span className="text-text-dark font-bold">{sortedProducts.length}</span> Halal Listings
                        </div>

                        <div className="flex items-center space-x-3 self-end sm:self-center">
                            <span className="text-3xs font-bold uppercase tracking-wider text-muted-gray flex items-center gap-1">
                                <ArrowUpDown className="w-3 h-3" />
                                Sort By
                            </span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-bg-custom text-text-dark text-xs rounded-lg px-2.5 py-1.5 border border-border-custom focus:outline-none focus:ring-1 focus:ring-primary"
                            >
                                <option value="featured">Featured Picks</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="rating">Rating</option>
                            </select>
                        </div>
                    </div>

                    {/* Products Grid */}
                    {sortedProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {sortedProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            title="No Products Match Filters"
                            description="JazakAllah Khair for searching, but we currently have no verified items matching your filter settings."
                            actionText="Reset All Filters"
                            onAction={resetFilters}
                            icon={BookOpen}
                        />
                    )}
                </section>

            </div>

        </div>
    )
}

export default Categories