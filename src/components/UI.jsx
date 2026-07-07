import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, StarHalf, X, Loader } from 'lucide-react'

// --- BADGE ---
export const Badge = ({ children, variant = 'primary', className = '' }) => {
    const styles = {
        primary: 'bg-primary/10 text-primary border border-primary/20',
        secondary: 'bg-gold/10 text-gold border border-gold/20',
        success: 'bg-success-custom/10 text-success-custom border border-success-custom/20',
        danger: 'bg-danger-custom/10 text-danger-custom border border-danger-custom/20',
        warning: 'bg-warning-custom/10 text-warning-custom border border-warning-custom/20',
        gray: 'bg-muted-gray/10 text-muted-gray border border-muted-gray/20'
    }

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${styles[variant]} ${className}`}>
            {children}
        </span>
    )
}

// --- BUTTON ---
export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    onClick,
    type = 'button',
    disabled = false,
    loading = false,
    className = '',
    icon: Icon
}) => {
    const baseStyle = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'

    const variants = {
        primary: 'bg-primary hover:bg-primary-dark text-white shadow-sm focus:ring-primary',
        secondary: 'bg-gold hover:bg-gold/90 text-text-dark shadow-sm focus:ring-gold',
        outline: 'border border-primary-dark/20 text-primary-dark hover:bg-primary/5 focus:ring-primary',
        danger: 'bg-danger-custom hover:bg-danger-custom/90 text-white shadow-sm focus:ring-danger-custom',
        ghost: 'text-muted-gray hover:text-text-dark hover:bg-black/5 focus:ring-primary'
    }

    const sizes = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base'
    }

    return (
        <motion.button
            whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
            whileHover={{ scale: disabled || loading ? 1 : 1.01 }}
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        >
            {loading && <Loader className="w-4 h-4 mr-2 animate-spin" />}
            {!loading && Icon && <Icon className="w-4 h-4 mr-2" />}
            {children}
        </motion.button>
    )
}

// --- INPUT ---
export const Input = ({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    name,
    required = false,
    className = '',
    icon: Icon
}) => {
    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1">
                    {label} {required && <span className="text-danger-custom">*</span>}
                </label>
            )}
            <div className="relative rounded-lg shadow-sm">
                {Icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon className="h-4 h-4 text-muted-gray" />
                    </div>
                )}
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    placeholder={placeholder}
                    className={`block w-full rounded-lg border ${error ? 'border-danger-custom focus:ring-danger-custom' : 'border-border-custom focus:ring-primary'
                        } ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-2 text-sm focus:outline-none focus:ring-2 bg-white transition-all`}
                />
            </div>
            {error && <p className="mt-1 text-xs text-danger-custom">{error}</p>}
        </div>
    )
}

// --- RATING ---
export const Rating = ({ rating = 0, count, className = '' }) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return (
        <div className={`flex items-center space-x-1 ${className}`}>
            <span className="flex text-gold">
                {[...Array(fullStars)].map((_, i) => (
                    <Star key={`full-${i}`} className="w-4.5 h-4.5 fill-current" />
                ))}
                {hasHalfStar && <StarHalf className="w-4.5 h-4.5 fill-current" />}
                {[...Array(emptyStars)].map((_, i) => (
                    <Star key={`empty-${i}`} className="w-4.5 h-4.5 text-border-custom" />
                ))}
            </span>
            {count !== undefined && (
                <span className="text-xs text-muted-gray font-medium">({count})</span>
            )}
        </div>
    )
}

// --- SKELETON ---
export const LoadingSkeleton = ({ variant = 'card', className = '' }) => {
    if (variant === 'card') {
        return (
            <div className={`bg-white border border-border-custom rounded-xl p-4 animate-pulse space-y-3 ${className}`}>
                <div className="bg-border-custom h-48 rounded-lg w-full"></div>
                <div className="h-4 bg-border-custom rounded w-3/4"></div>
                <div className="h-4 bg-border-custom rounded w-1/2"></div>
                <div className="flex justify-between items-center pt-2">
                    <div className="h-6 bg-border-custom rounded w-1/4"></div>
                    <div className="h-8 bg-border-custom rounded w-1/3"></div>
                </div>
            </div>
        )
    }
    return <div className={`animate-pulse bg-border-custom rounded ${className}`}></div>
}

// --- EMPTY STATE ---
export const EmptyState = ({
    title = "No Items Found",
    description = "There are no products or records matching your query.",
    icon: Icon,
    actionText,
    onAction,
    className = ""
}) => {
    return (
        <div className={`flex flex-col items-center justify-center text-center p-8 border border-dashed border-border-custom rounded-xl bg-white/50 ${className}`}>
            {Icon ? (
                <Icon className="w-12 h-12 text-primary/60 mb-3" />
            ) : (
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <span className="text-lg font-bold text-primary">!</span>
                </div>
            )}
            <h3 className="text-lg font-semibold text-text-dark mb-1">{title}</h3>
            <p className="text-sm text-muted-gray max-w-sm mb-4">{description}</p>
            {actionText && onAction && (
                <Button variant="primary" onClick={onAction}>
                    {actionText}
                </Button>
            )}
        </div>
    )
}

// --- MODAL ---
export const Modal = ({ isOpen, onClose, title, children }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-xs"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 15 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                        className="relative bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden border border-border-custom z-10"
                    >
                        {/* Header */}
                        <div className="flex border-b border-border-custom items-center justify-between px-5 py-4 bg-bg-custom">
                            <h3 className="font-semibold text-base text-text-dark tracking-wide">{title}</h3>
                            <button
                                onClick={onClose}
                                className="text-muted-gray hover:text-text-dark transition p-1 hover:bg-black/5 rounded-lg"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        {/* Content */}
                        <div className="p-6 overflow-y-auto max-h-[70vh]">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
