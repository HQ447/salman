import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Store, ShieldCheck, ArrowUpRight } from 'lucide-react'
import { Rating, Badge } from './UI'

function VendorCard({ vendor }) {
    return (
        <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="group bg-white rounded-xl shadow-xs border border-border-custom hover:shadow-md transition-all overflow-hidden flex flex-col h-full"
        >
            {/* Banner */}
            <div className="relative h-24 bg-bg-custom overflow-hidden">
                <img
                    src={vendor.banner}
                    alt={`${vendor.name} banner`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                {vendor.verified && (
                    <div className="absolute top-3 right-3 z-10">
                        <Badge variant="primary" className="bg-primary/95 text-white font-medium border-none shadow-xs text-3xs">
                            Verified Partner
                        </Badge>
                    </div>
                )}
            </div>

            {/* Main card info area */}
            <div className="px-4 pb-4 flex flex-col flex-1 relative pt-10">
                {/* Vendor Logo overlapping the banner */}
                <div className="absolute -top-8 left-4 w-16 h-16 rounded-xl border border-border-custom bg-white shadow-xs overflow-hidden">
                    <img
                        src={vendor.logo}
                        alt={`${vendor.name} logo`}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Shop Name & Owner */}
                <div className="flex justify-between items-start">
                    <div className="space-y-0.5">
                        <h3 className="text-sm font-bold text-text-dark group-hover:text-primary transition-colors flex items-center mt-1">
                            {vendor.name}
                        </h3>
                        <p className="text-3xs text-muted-gray mb-1">Owner: {vendor.owner}</p>
                    </div>
                    <div className="text-right">
                        <span className="inline-block bg-primary/10 text-primary px-2 py-0.5 rounded text-3xs font-semibold">
                            {vendor.productsCount} Items
                        </span>
                    </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1.5 mt-2 mb-3">
                    <Rating rating={vendor.rating} />
                </div>

                {/* Store description */}
                <p className="text-xs text-muted-gray leading-relaxed mb-4 line-clamp-2 grow">
                    {vendor.description}
                </p>

                {/* Fiqh Certificaton Banner if certified */}
                {vendor.fiqhCertified && (
                    <div className="bg-primary/5 rounded-lg border border-primary/20 p-2.5 mb-4 flex items-start space-x-1">
                        <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-bold text-primary-dark tracking-wide uppercase leading-none mb-0.5">
                                Fiqh al-Muamalat Certified
                            </p>
                            <p className="text-muted-gray text-3xs leading-relaxed truncate">
                                {vendor.fiqhDetails}
                            </p>
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="mt-auto pt-3 border-t border-border-custom/50 flex justify-between items-center z-10">
                    <div className="flex items-center space-x-1 text-muted-gray">
                        <Store className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-medium leading-none">Pakistan Seller</span>
                    </div>
                    <Link
                        to={`/vendors/${vendor.id}`}
                        className="inline-flex items-center text-xs font-bold text-primary hover:text-primary-dark transition-colors group-hover:translate-x-0.5 duration-200"
                    >
                        Visit Shop
                        <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
                    </Link>
                </div>

            </div>
        </motion.div>
    )
}

export default VendorCard
