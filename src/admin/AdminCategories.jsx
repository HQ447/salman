import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import {
    BookOpen,
    Shirt,
    Sparkles,
    Apple,
    Home,
    Gamepad2,
    Package,
    TrendingUp
} from 'lucide-react'

const iconMap = {
    BookOpen,
    Shirt,
    Sparkles,
    Apple,
    Home,
    Gamepad2,
}

function AdminCategories() {
    const { categories, products } = useContext(AppContext)

    const getCategoryProductCount = (categoryId) =>
        products.filter(p => p.category === categoryId).length

    const totalListed = categories.reduce((sum, cat) => sum + getCategoryProductCount(cat.id), 0)

    return (
        <div className="space-y-5 font-inter">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-bold text-text-dark">Category Management</h2>
                    <p className="text-sm text-muted-gray mt-0.5">
                        {categories.length} marketplace categories · {totalListed} products listed
                    </p>
                </div>
                <button className="px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition shadow-sm self-start">
                    + Add Category
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map(category => {
                    const Icon = iconMap[category.icon] || Package
                    const actualCount = getCategoryProductCount(category.id)
                    const percentage = totalListed > 0 ? Math.round((actualCount / totalListed) * 100) : 0

                    return (
                        <div
                            key={category.id}
                            className="bg-white rounded-2xl border border-border-custom shadow-sm p-5 hover:shadow-md transition-shadow group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 rounded-xl bg-primary-light border border-primary/15 flex items-center justify-center group-hover:scale-105 transition-transform">
                                    <Icon className="w-6 h-6 text-primary" />
                                </div>
                                <div className="flex items-center gap-1 text-[10px] font-bold text-success-custom bg-success-custom/10 px-2 py-1 rounded-full">
                                    <TrendingUp className="w-3 h-3" />
                                    Active
                                </div>
                            </div>

                            <h3 className="text-sm font-bold text-text-dark">{category.name}</h3>
                            <p className="text-xs text-muted-gray mt-1.5 line-clamp-2 leading-relaxed">{category.description}</p>

                            <div className="mt-4 pt-4 border-t border-border-light">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-gray">Products</span>
                                    <span className="text-sm font-black text-text-dark">
                                        {actualCount}
                                        <span className="text-[10px] text-muted-gray font-medium ml-1">
                                            / {category.count} catalog
                                        </span>
                                    </span>
                                </div>

                                <div className="w-full h-2 bg-bg-custom rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary rounded-full transition-all duration-500"
                                        style={{ width: `${Math.min(percentage, 100)}%` }}
                                    />
                                </div>
                                <p className="text-[10px] text-muted-gray mt-1.5">{percentage}% of listed products</p>
                            </div>

                            <div className="flex gap-2 mt-4">
                                <button className="flex-1 py-2 rounded-lg text-xs font-semibold bg-primary text-white hover:bg-primary-dark transition">
                                    Edit
                                </button>
                                <button className="flex-1 py-2 rounded-lg text-xs font-semibold border border-border-custom text-muted-gray hover:bg-bg-custom transition">
                                    View Products
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="bg-white rounded-2xl border border-border-custom shadow-sm p-5 sm:p-6">
                <h3 className="text-sm font-bold text-text-dark mb-4">Category Distribution</h3>
                <div className="space-y-3">
                    {categories.map(category => {
                        const actualCount = getCategoryProductCount(category.id)
                        const percentage = totalListed > 0 ? (actualCount / totalListed) * 100 : 0
                        const Icon = iconMap[category.icon] || Package

                        return (
                            <div key={category.id} className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center shrink-0">
                                    <Icon className="w-4 h-4 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-semibold text-text-dark truncate">{category.name}</span>
                                        <span className="text-xs font-bold text-text-dark shrink-0 ml-2">{actualCount}</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-bg-custom rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary/60 rounded-full"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default AdminCategories
