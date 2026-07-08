import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Filter,
    Sliders,
    AlertTriangle,
    Check,
    Package,
    Image as ImageIcon,
    X
} from 'lucide-react'
import { Button, Badge, EmptyState, Modal } from '../components/UI'

function ProductsManagement() {
    const { products, currentUser, vendors } = useContext(AppContext)

    const activeVendorId = currentUser?.vendorId ||
        vendors.find(v => v.contactEmail === currentUser?.email)?.id ||
        "diyanat-bookstore"
    const activeVendor = vendors.find(v => v.id === activeVendorId) || vendors[0]

    const [localProducts, setLocalProducts] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [successToast, setSuccessToast] = useState(null)

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        stock: '',
        category: 'books-literature',
        image: '',
        description: '',
        publisher: '',
        dimensions: '',
        material: '',
        origin: '',
        islamicInsight: 'Vetted under standard spot business constraints.',
        pledgeVerified: false
    })
    const [formErrors, setFormErrors] = useState({})

    const categoriesMap = {
        'books-literature': 'Islamic Books & Literature',
        'modest-fashion': 'Modest Fashion & Apparel',
        'halal-cosmetics': 'Halal Cosmetics & Perfumes',
        'organic-foods': 'Dates & Organic Foods',
        'home-decor': 'Islamic Art & Home Decor',
        'educational-toys': 'Educational & Toys'
    }

    useEffect(() => {
        const filtered = products.filter(p => p.vendorId === activeVendor.id)
        setLocalProducts(filtered)
    }, [products, activeVendor.id])

    useEffect(() => {
        if (successToast) {
            const timer = setTimeout(() => setSuccessToast(null), 4000)
            return () => clearTimeout(timer)
        }
    }, [successToast])

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
        if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: null }))
    }

    const handleAddProductSubmit = (e) => {
        e.preventDefault()
        const errors = {}
        if (!formData.name.trim()) errors.name = 'Product name is required'
        if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) errors.price = 'Valid price required'
        if (!formData.stock || isNaN(formData.stock) || parseInt(formData.stock) < 0) errors.stock = 'Valid stock count required'
        if (!formData.description.trim()) errors.description = 'Description is required'
        if (!formData.pledgeVerified) errors.pledgeVerified = 'You must confirm product clarity'

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors)
            return
        }

        const cleanPrice = parseFloat(formData.price)
        const cleanStock = parseInt(formData.stock)
        const mockId = `product-${Date.now()}`
        const fallbackImage = formData.image.trim() || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=450&fit=crop"

        const detailsSpec = {}
        if (formData.publisher.trim()) detailsSpec['Publisher'] = formData.publisher
        if (formData.dimensions.trim()) detailsSpec['Dimensions'] = formData.dimensions
        if (formData.material.trim()) detailsSpec['Material'] = formData.material
        if (formData.origin.trim()) detailsSpec['Origin'] = formData.origin

        const newProd = {
            id: mockId,
            name: formData.name,
            vendorId: activeVendor.id,
            vendorName: activeVendor.name,
            price: cleanPrice,
            category: formData.category,
            categoryName: categoriesMap[formData.category],
            rating: 5.0,
            reviewsCount: 0,
            image: fallbackImage,
            description: formData.description,
            details: detailsSpec,
            islamicInsight: formData.islamicInsight,
            featured: false,
            stock: cleanStock,
            tags: [formData.category.split('-')[0], "new-listing"]
        }

        setLocalProducts(prev => [newProd, ...prev])
        setIsAddModalOpen(false)
        setSuccessToast(`"${formData.name}" added to your catalog!`)

        setFormData({
            name: '',
            price: '',
            stock: '',
            category: 'books-literature',
            image: '',
            description: '',
            publisher: '',
            dimensions: '',
            material: '',
            origin: '',
            islamicInsight: 'Vetted under standard spot business constraints.',
            pledgeVerified: false
        })
        setFormErrors({})
    }

    const handleDeleteProduct = (prodId, prodName) => {
        if (window.confirm(`Remove "${prodName}" from your catalog?`)) {
            setLocalProducts(prev => prev.filter(p => p.id !== prodId))
            setSuccessToast(`"${prodName}" removed successfully.`)
        }
    }

    const handleEditClick = (prodName) => {
        alert(`Edit form: would load "${prodName}" specs for modification. (UI simulation)`)
    }

    const filteredProducts = localProducts.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    const lowStockCount = filteredProducts.filter(p => p.stock <= 10).length

    return (
        <div className="space-y-5 font-inter">

            {/* Success Toast */}
            {successToast && (
                <div className="fixed bottom-6 right-6 z-50 flex items-center bg-primary text-white px-5 py-3 rounded-xl shadow-xl gap-3 animate-bounce">
                    <Check className="w-4 h-4 text-white" />
                    <span className="text-xs font-semibold">{successToast}</span>
                </div>
            )}

            {/* Page Header */}
            <div className="bg-white rounded-2xl border border-border-custom shadow-sm p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-base font-bold text-text-dark">Products & Inventory</h2>
                    <p className="text-xs text-muted-gray mt-0.5">Manage your store catalog, stock levels, and product listings.</p>
                    {lowStockCount > 0 && (
                        <div className="flex items-center gap-1.5 mt-2 text-warning-custom text-[11px] font-semibold">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            {lowStockCount} product{lowStockCount > 1 ? 's' : ''} running low on stock
                        </div>
                    )}
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-primary-dark transition shadow-sm shrink-0"
                >
                    <Plus className="w-4 h-4" />
                    Add Product
                </button>
            </div>

            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="w-4 h-4 text-muted-gray absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search products by name or description…"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white text-text-dark text-xs rounded-xl pl-10 pr-4 py-2.5 border border-border-custom focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                    />
                </div>
                <div className="flex items-center gap-2 bg-white border border-border-custom rounded-xl px-3.5 text-left min-w-44">
                    <Filter className="w-3.5 h-3.5 text-muted-gray shrink-0" />
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full py-2.5 text-xs focus:outline-none bg-transparent text-text-dark font-medium cursor-pointer"
                    >
                        <option value="all">All Categories</option>
                        {Object.entries(categoriesMap).map(([key, val]) => (
                            <option key={key} value={key}>{val}</option>
                        ))}
                    </select>
                </div>
                <div className="bg-white border border-border-custom rounded-xl px-4 py-2.5 flex items-center gap-2 text-xs font-semibold text-muted-gray whitespace-nowrap">
                    <Package className="w-3.5 h-3.5 text-primary" />
                    {filteredProducts.length} listings
                </div>
            </div>

            {/* Products Table */}
            {filteredProducts.length > 0 ? (
                <div className="bg-white rounded-2xl border border-border-custom shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[720px]">
                            <thead>
                                <tr className="bg-bg-custom border-b border-border-custom">
                                    <th className="text-left text-[10px] font-bold uppercase tracking-wider text-muted-gray px-4 py-3">Product</th>
                                    <th className="text-left text-[10px] font-bold uppercase tracking-wider text-muted-gray px-4 py-3">Category</th>
                                    <th className="text-left text-[10px] font-bold uppercase tracking-wider text-muted-gray px-4 py-3">Price</th>
                                    <th className="text-left text-[10px] font-bold uppercase tracking-wider text-muted-gray px-4 py-3">Stock</th>
                                    <th className="text-left text-[10px] font-bold uppercase tracking-wider text-muted-gray px-4 py-3">Rating</th>
                                    <th className="text-left text-[10px] font-bold uppercase tracking-wider text-muted-gray px-4 py-3">Status</th>
                                    <th className="text-left text-[10px] font-bold uppercase tracking-wider text-muted-gray px-4 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product, idx) => {
                                    const isLowStock = product.stock <= 10
                                    const isCritical = product.stock <= 5
                                    const stockStatus = isCritical
                                        ? { label: 'Critical', variant: 'danger' }
                                        : isLowStock
                                            ? { label: 'Low Stock', variant: 'warning' }
                                            : { label: 'In Stock', variant: 'success' }

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
                                                        <p className="text-[10px] text-muted-gray truncate max-w-[180px]">{product.description}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-xs text-muted-gray">{product.categoryName || product.category}</span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-xs font-bold text-text-dark">${product.price.toFixed(2)}</span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-1.5">
                                                    {isLowStock && <AlertTriangle className={`w-3 h-3 ${isCritical ? 'text-danger-custom' : 'text-warning-custom'}`} />}
                                                    <span className={`text-xs font-semibold ${isCritical ? 'text-danger-custom' : isLowStock ? 'text-warning-custom' : 'text-text-dark'}`}>
                                                        {product.stock}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-xs text-muted-gray">{product.rating} ({product.reviewsCount})</span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <Badge variant={stockStatus.variant}>{stockStatus.label}</Badge>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex gap-1.5">
                                                    <button
                                                        onClick={() => handleEditClick(product.name)}
                                                        className="p-1.5 border border-border-custom rounded-lg hover:border-primary/40 text-muted-gray hover:text-primary hover:bg-primary-light transition"
                                                        title="Edit product"
                                                    >
                                                        <Edit className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteProduct(product.id, product.name)}
                                                        className="p-1.5 border border-border-custom rounded-lg hover:border-red-200 text-muted-gray hover:text-danger-custom hover:bg-red-50 transition"
                                                        title="Remove product"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-border-custom shadow-sm p-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-4">
                        <Package className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-base font-bold text-text-dark mb-1">No Products Found</h3>
                    <p className="text-sm text-muted-gray mb-4">
                        {searchQuery || selectedCategory !== 'all' ? 'Try adjusting your search or filter.' : "You haven't listed any products yet."}
                    </p>
                    {!searchQuery && selectedCategory === 'all' && (
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="bg-primary text-white px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-primary-dark transition"
                        >
                            Add Your First Product
                        </button>
                    )}
                </div>
            )}

            {/* Add Product Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Add New Product"
            >
                <form onSubmit={handleAddProductSubmit} className="space-y-4 text-left">
                    <p className="text-[11px] text-muted-gray leading-relaxed bg-primary-light border border-primary/15 p-3 rounded-xl">
                        Products must represent exact specifications in accordance with Shia Fiqh (no Gharar). Items must be in physical possession before listing.
                    </p>

                    {/* Product Name */}
                    <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-text-dark uppercase tracking-wide block">Product Name *</label>
                        <input
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleFormChange}
                            placeholder="e.g. Handmade Khat-i-Naskh Calligraphy Tablet"
                            className="w-full text-text-dark text-xs rounded-lg px-3 py-2.5 border border-border-custom focus:ring-2 focus:ring-primary/30 focus:border-primary/50 focus:outline-none transition-all"
                        />
                        {formErrors.name && <p className="text-[11px] text-danger-custom">{formErrors.name}</p>}
                    </div>

                    {/* Price + Stock */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-text-dark uppercase tracking-wide block">Price (USD) *</label>
                            <input
                                name="price" type="number" required
                                value={formData.price} onChange={handleFormChange}
                                placeholder="45.00"
                                className="w-full text-text-dark text-xs rounded-lg px-3 py-2.5 border border-border-custom focus:ring-2 focus:ring-primary/30 focus:border-primary/50 focus:outline-none transition-all"
                            />
                            {formErrors.price && <p className="text-[11px] text-danger-custom">{formErrors.price}</p>}
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-text-dark uppercase tracking-wide block">Stock Units *</label>
                            <input
                                name="stock" type="number" required
                                value={formData.stock} onChange={handleFormChange}
                                placeholder="15"
                                className="w-full text-text-dark text-xs rounded-lg px-3 py-2.5 border border-border-custom focus:ring-2 focus:ring-primary/30 focus:border-primary/50 focus:outline-none transition-all"
                            />
                            {formErrors.stock && <p className="text-[11px] text-danger-custom">{formErrors.stock}</p>}
                        </div>
                    </div>

                    {/* Category */}
                    <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-text-dark uppercase tracking-wide block">Category *</label>
                        <select
                            name="category" value={formData.category} onChange={handleFormChange}
                            className="w-full text-text-dark text-xs rounded-lg px-3 py-2.5 border border-border-custom focus:ring-2 focus:ring-primary/30 focus:border-primary/50 focus:outline-none transition-all cursor-pointer bg-white"
                        >
                            {Object.entries(categoriesMap).map(([key, val]) => (
                                <option key={key} value={key}>{val}</option>
                            ))}
                        </select>
                    </div>

                    {/* Image URL */}
                    <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-text-dark uppercase tracking-wide block">Image URL (optional)</label>
                        <input
                            name="image" value={formData.image} onChange={handleFormChange}
                            placeholder="https://images.unsplash.com/…"
                            className="w-full text-text-dark text-xs rounded-lg px-3 py-2.5 border border-border-custom focus:ring-2 focus:ring-primary/30 focus:border-primary/50 focus:outline-none transition-all"
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-text-dark uppercase tracking-wide block">Description *</label>
                        <textarea
                            name="description" rows={3} required
                            value={formData.description} onChange={handleFormChange}
                            placeholder="Describe item specifications, materials, and origin clearly."
                            className="w-full text-text-dark text-xs rounded-lg px-3 py-2.5 border border-border-custom focus:ring-2 focus:ring-primary/30 focus:border-primary/50 focus:outline-none transition-all resize-none"
                        />
                        {formErrors.description && <p className="text-[11px] text-danger-custom">{formErrors.description}</p>}
                    </div>

                    {/* Optional Specs */}
                    <details className="border border-border-custom rounded-xl overflow-hidden">
                        <summary className="px-4 py-3 text-[11px] font-semibold text-text-dark uppercase tracking-wide cursor-pointer hover:bg-bg-custom flex items-center gap-2">
                            <Sliders className="w-3.5 h-3.5 text-primary" />
                            Optional Specifications
                        </summary>
                        <div className="p-4 grid grid-cols-2 gap-3 border-t border-border-light bg-bg-custom">
                            {[
                                { name: 'publisher', placeholder: 'Publisher (e.g. Dar Al-Salam)' },
                                { name: 'dimensions', placeholder: 'Dimensions (e.g. 15x20 cm)' },
                                { name: 'material', placeholder: 'Material (e.g. Turkish Cotton)' },
                                { name: 'origin', placeholder: 'Origin (e.g. Madinah, KSA)' },
                            ].map(field => (
                                <input
                                    key={field.name}
                                    type="text" name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleFormChange}
                                    placeholder={field.placeholder}
                                    className="bg-white border border-border-custom rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary/30 text-text-dark"
                                />
                            ))}
                        </div>
                    </details>

                    {/* Pledge */}
                    <div className="bg-primary-light border border-primary/20 rounded-xl p-4">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox" name="pledgeVerified"
                                checked={formData.pledgeVerified} onChange={handleFormChange}
                                className="rounded text-primary focus:ring-primary h-4 w-4"
                            />
                            <span className="text-xs font-semibold text-text-dark">
                                I confirm this product has NO ambiguity (Jahalah) in its specifications.
                            </span>
                        </label>
                        {formErrors.pledgeVerified && <p className="text-[11px] text-danger-custom mt-2">{formErrors.pledgeVerified}</p>}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={() => setIsAddModalOpen(false)}
                            className="px-4 py-2 rounded-xl text-xs font-semibold text-muted-gray hover:text-text-dark border border-border-custom hover:bg-bg-custom transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-xl text-xs font-semibold bg-primary text-white hover:bg-primary-dark transition shadow-sm"
                        >
                            Add to Catalog
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default ProductsManagement