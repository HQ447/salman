import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { Search, Package, ShieldCheck } from 'lucide-react'
import { Badge, Rating } from '../components/UI'

function AdminProducts() {
    const { products, categories, vendors } = useContext(AppContext)
    const [searchQuery, setSearchQuery] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('all')

    const filteredProducts = products.filter(product => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.vendorName.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter
        return matchesSearch && matchesCategory
    })

    const getStockStatus = (stock) => {
        if (stock <= 10) return { label: 'Low Stock', variant: 'warning' }
        if (stock <= 25) return { label: 'Moderate', variant: 'gray' }
        return { label: 'In Stock', variant: 'success' }
    }

    return (
        <div className="space-y-5 font-inter">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-bold text-text-dark">Product Catalog</h2>
                    <p className="text-sm text-muted-gray mt-0.5">
                        {products.length} products across {categories.length} categories
                    </p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-gray" />
                    <input
                        type="text"
                        placeholder="Search products or vendors..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-custom bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                    />
                </div>
                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-4 py-2.5 rounded-xl border border-border-custom bg-white text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/30 min-w-[180px]"
                >
                    <option value="all">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>

            <div className="bg-white rounded-2xl border border-border-custom shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px]">
                        <thead>
                            <tr className="bg-bg-custom border-b border-border-custom">
                                <th className="text-left text-[10px] font-bold uppercase tracking-wider text-muted-gray px-4 py-3">Product</th>
                                <th className="text-left text-[10px] font-bold uppercase tracking-wider text-muted-gray px-4 py-3">Vendor</th>
                                <th className="text-left text-[10px] font-bold uppercase tracking-wider text-muted-gray px-4 py-3">Category</th>
                                <th className="text-left text-[10px] font-bold uppercase tracking-wider text-muted-gray px-4 py-3">Price</th>
                                <th className="text-left text-[10px] font-bold uppercase tracking-wider text-muted-gray px-4 py-3">Stock</th>
                                <th className="text-left text-[10px] font-bold uppercase tracking-wider text-muted-gray px-4 py-3">Rating</th>
                                <th className="text-left text-[10px] font-bold uppercase tracking-wider text-muted-gray px-4 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product, idx) => {
                                const stockStatus = getStockStatus(product.stock)
                                const vendor = vendors.find(v => v.id === product.vendorId)
                                return (
                                    <tr
                                        key={product.id}
                                        className={`border-b border-border-light hover:bg-bg-custom/50 transition ${idx % 2 === 0 ? '' : 'bg-bg-custom/30'}`}
                                    >
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-10 h-10 rounded-lg object-cover border border-border-custom shrink-0"
                                                />
                                                <div className="min-w-0">
                                                    <p className="text-xs font-semibold text-text-dark truncate max-w-[180px]">{product.name}</p>
                                                    {product.featured && (
                                                        <Badge variant="secondary" className="mt-0.5 text-[9px]">Featured</Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <p className="text-xs text-text-dark font-medium">{product.vendorName}</p>
                                            {vendor?.fiqhCertified && (
                                                <span className="inline-flex items-center text-[9px] text-gold font-semibold mt-0.5">
                                                    <ShieldCheck className="w-2.5 h-2.5 mr-0.5" /> Fiqh
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-xs text-muted-gray">{product.categoryName}</span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-xs font-bold text-text-dark">${product.price.toFixed(2)}</span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-xs font-semibold text-text-dark">{product.stock}</span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <Rating rating={product.rating} count={product.reviewsCount} className="scale-90 origin-left" />
                                        </td>
                                        <td className="px-4 py-3">
                                            <Badge variant={stockStatus.variant}>{stockStatus.label}</Badge>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-border-custom">
                    <Package className="w-10 h-10 text-muted-gray mx-auto mb-3 opacity-50" />
                    <p className="text-sm font-semibold text-text-dark">No products found</p>
                    <p className="text-xs text-muted-gray mt-1">Try a different search or category filter</p>
                </div>
            )}
        </div>
    )
}

export default AdminProducts
