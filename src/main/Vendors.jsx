import React, { useContext, useState } from 'react'
import { Search, ShieldCheck, RefreshCw, Store } from 'lucide-react'
import { AppContext } from '../context/AppContext'
import VendorCard from '../components/VendorCard'
import { EmptyState } from '../components/UI'

function Vendors() {
    const { vendors } = useContext(AppContext)
    const [searchQuery, setSearchQuery] = useState('')
    const [fiqhFilter, setFiqhFilter] = useState('all')

    const filteredVendors = vendors.filter(vendor => {
        const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vendor.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vendor.description.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesFiqh = fiqhFilter === 'all' ||
            (fiqhFilter === 'certified' && vendor.fiqhCertified)

        return matchesSearch && matchesFiqh
    })

    const resetFilters = () => {
        setSearchQuery('')
        setFiqhFilter('all')
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20 space-y-12">

            {/* Header */}
            <div className="text-left -mt-6">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-text-dark tracking-tight">Verified Partners & Stores</h1>
                <p className="text-xs sm:text-sm text-muted-gray mt-1">
                    Explore storefronts who have signed our Shariah trading ethics pledge.
                </p>
            </div>

            {/* Control bar */}
            <div className="bg-white border border-border-custom p-4 sm:p-5 rounded-xl shadow-2xs flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between text-left">

                {/* Search */}
                <div className="relative flex-1 max-w-sm">
                    <input
                        type="text"
                        placeholder="Search seller by shop name, owner..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-bg-custom text-text-dark text-xs rounded-lg pl-9 pr-3 py-2.5 border border-border-custom focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <Search className="w-4 h-4 text-muted-gray absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>

                {/* Fiqh Filtering and Reset */}
                <div className="flex flex-wrap items-center gap-3">
                    <button
                        onClick={() => setFiqhFilter(fiqhFilter === 'all' ? 'certified' : 'all')}
                        className={`flex items-center gap-1.5 px-3.5 py-2 border rounded-lg text-xs font-semibold transition-all cursor-pointer ${fiqhFilter === 'certified'
                                ? 'bg-primary text-white border-primary shadow-xs'
                                : 'bg-white hover:bg-bg-custom text-text-dark border-border-custom'
                            }`}
                    >
                        <ShieldCheck className="w-4 h-4" />
                        Fiqh-Certified Only
                    </button>

                    <button
                        onClick={resetFilters}
                        className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-primary hover:text-primary-dark transition cursor-pointer"
                    >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Reset Filters
                    </button>
                </div>

            </div>

            {/* Grid */}
            {filteredVendors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredVendors.map((vendor) => (
                        <VendorCard key={vendor.id} vendor={vendor} />
                    ))}
                </div>
            ) : (
                <EmptyState
                    title="No Stores Found"
                    description="We couldn't locate any Islamic verified partner stores matching your query details."
                    actionText="Clear Filters"
                    onAction={resetFilters}
                    icon={Store}
                />
            )}

        </div>
    )
}

export default Vendors