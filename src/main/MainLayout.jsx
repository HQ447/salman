import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function MainLayout() {
    const [showScrollTop, setShowScrollTop] = useState(false)

    // Track window scroll coordinates for scroll-to-top visibility
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollTop(true)
            } else {
                setShowScrollTop(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <div className="flex flex-col min-h-screen bg-bg-custom antialiased font-sans">
            {/* Sticky Navbar is mounted here */}
            <Navbar />

            {/* Main content body outlet */}
            <main className="flex-1 w-full relative">
                {/* Pattern Background for aesthetic depth */}
                <div className="absolute inset-0 islamic-pattern opacity-3 pointer-events-none -z-10" />
                <Outlet />
            </main>

            {/* Footer is mounted here */}
            <Footer />

            {/* Reusable floating Back To Top action button with animations */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={scrollToTop}
                        className="fixed bottom-6 right-6 z-50 p-3.5 rounded-full bg-primary hover:bg-primary-dark text-white border border-gold/30 shadow-lg cursor-pointer flex items-center justify-center transition-colors focus:outline-none"
                        aria-label="Back to top"
                    >
                        <ArrowUp className="w-5 h-5 text-gold" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    )
}

export default MainLayout