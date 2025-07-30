import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";

export function Dropdown({ user, darkMode }) {
    const [isOpen, setIsOpen] = useState(false)
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 })
    const dropdownRef = useRef(null)
    const buttonRef = useRef(null)
    
    const toggleDropdown = () => {
        if (!isOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect()
            const dropdownWidth = 320 // Approximate dropdown width
            const viewportWidth = window.innerWidth
            const viewportHeight = window.innerHeight
            
            // Calculate horizontal position
            let rightOffset = viewportWidth - rect.right
            if (rightOffset < dropdownWidth) {
                // If dropdown would go off-screen on the right, position it to the left
                rightOffset = viewportWidth - rect.left - dropdownWidth
                // Ensure it doesn't go off-screen on the left either
                if (rightOffset < 0) {
                    rightOffset = 16 // 16px from edge
                }
            }
            
            // Calculate vertical position
            let topPosition = rect.bottom + 8
            const dropdownHeight = 400 // Approximate dropdown height
            if (topPosition + dropdownHeight > viewportHeight) {
                // If dropdown would go off-screen at bottom, position it above
                topPosition = rect.top - dropdownHeight - 8
                // Ensure it doesn't go off-screen at top
                if (topPosition < 0) {
                    topPosition = 16
                }
            }
            
            setDropdownPosition({
                top: topPosition,
                right: rightOffset
            })
        }
        setIsOpen(!isOpen)
    }
    
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
            buttonRef.current && !buttonRef.current.contains(event.target)) {
            setIsOpen(false)
        }
    }
    const navigate = useNavigate()
    async function logout() {
        localStorage.removeItem('token')
        navigate('/logout')
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const buttonClass = darkMode
        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-purple-500/30'
        : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-indigo-300/30';

    const dropdownClass = darkMode
        ? 'bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 shadow-2xl shadow-purple-500/20'
        : 'bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-2xl shadow-indigo-500/20';

    const textPrimary = darkMode ? 'text-slate-200' : 'text-gray-800';
    const textSecondary = darkMode ? 'text-slate-400' : 'text-gray-600';

    return (
        <div className="relative">
            {/* User Avatar Button */}
            <button 
                ref={buttonRef}
                onClick={toggleDropdown}
                className={`
                    flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 rounded-lg sm:rounded-xl
                    transition-all duration-300 ease-out transform hover:scale-105
                    focus:outline-none focus:ring-2 focus:ring-offset-1
                    ${darkMode 
                        ? 'bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 focus:ring-purple-500/50' 
                        : 'bg-white/50 hover:bg-gray-50/80 border border-gray-200/50 focus:ring-indigo-500/50'
                    }
                    backdrop-blur-sm shadow-lg group
                `}
                aria-label="User menu"
            >
                {/* Avatar */}
                <div className={`
                    w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center
                    bg-gradient-to-br from-emerald-500 to-teal-600
                    text-white font-bold text-sm sm:text-lg shadow-lg
                    transform transition-transform duration-300 group-hover:scale-110
                `}>
                    {user.firstName?.[0] || 'U'}
                </div>
                
                {/* User Name */}
                <span className={`font-semibold ${textPrimary} hidden md:block text-sm`}>
                    {user.firstName || 'User'}
                </span>
                
                {/* Dropdown Arrow */}
                <svg 
                    className={`
                        w-4 h-4 transition-transform duration-300 ${textSecondary}
                        ${isOpen ? 'rotate-180' : 'rotate-0'}
                    `}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Menu using Portal */}
            {isOpen && createPortal(
                <div 
                    ref={dropdownRef}
                    className={`
                        w-72 sm:w-80 rounded-xl sm:rounded-2xl overflow-visible
                        ${dropdownClass}
                        transform transition-all duration-300 ease-out
                        animate-in fade-in-0 zoom-in-95
                    `} 
                    style={{
                        position: 'fixed',
                        top: dropdownPosition.top,
                        right: dropdownPosition.right,
                        zIndex: 999999
                    }}
                >
                    {/* Glassmorphism overlay */}
                    <div className="absolute inset-[1px] rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                    
                    <div className="relative z-10 p-4 sm:p-6">
                        {/* User Info Header */}
                        <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                            <div className={`
                                w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center
                                bg-gradient-to-br from-emerald-500 to-teal-600
                                text-white font-bold text-lg sm:text-xl shadow-lg
                            `}>
                                {user.firstName?.[0] || 'U'}
                            </div>
                            <div className="min-w-0 flex-1">
                                <h3 className={`font-bold text-base sm:text-lg ${textPrimary} truncate`}>
                                    {user.firstName} {user.lastName}
                                </h3>
                                <p className={`text-xs sm:text-sm ${textSecondary} truncate`}>
                                    {user.username}
                                </p>
                            </div>
                        </div>

                        {/* User Details */}
                        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                            <div className={`
                                p-3 sm:p-4 rounded-lg sm:rounded-xl 
                                ${darkMode ? 'bg-slate-700/30' : 'bg-gray-50/50'}
                                backdrop-blur-sm border
                                ${darkMode ? 'border-slate-600/30' : 'border-gray-200/30'}
                            `}>
                                <div className="grid grid-cols-1 gap-2 sm:gap-3 text-xs sm:text-sm">
                                    <div className="flex justify-between items-center">
                                        <span className={`font-semibold ${textSecondary}`}>Name:</span>
                                        <span className={`${textPrimary} truncate ml-2`}>{user.firstName} {user.lastName}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className={`font-semibold ${textSecondary}`}>Email:</span>
                                        <span className={`${textPrimary} truncate ml-2`}>{user.username}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-2 sm:space-y-3">
                            {/* Update Details Button */}
                            <button
                                onClick={() => {
                                    navigate('/update')
                                    setIsOpen(false)
                                }}
                                className={`
                                    w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm
                                    transition-all duration-300 ease-out transform hover:scale-[1.02]
                                    focus:outline-none focus:ring-2 focus:ring-offset-1
                                    ${buttonClass}
                                    shadow-lg border
                                    ${darkMode ? 'focus:ring-purple-500/50' : 'focus:ring-indigo-500/50'}
                                    flex items-center justify-center space-x-2
                                    group overflow-hidden relative
                                `}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <span className="relative">✏️</span>
                                <span className="relative">Update Details</span>
                            </button>

                            {/* Logout Button */}
                            <button
                                onClick={() => {
                                    logout()
                                    setIsOpen(false)
                                }}
                                className={`
                                    w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm
                                    transition-all duration-300 ease-out transform hover:scale-[1.02]
                                    focus:outline-none focus:ring-2 focus:ring-offset-1
                                    bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700
                                    text-white border border-red-400/30
                                    ${darkMode ? 'focus:ring-red-500/50' : 'focus:ring-red-500/50'}
                                    shadow-lg flex items-center justify-center space-x-2
                                    group overflow-hidden relative
                                `}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <span className="relative">🚪</span>
                                <span className="relative">Logout</span>
                                <svg 
                                    className="relative w-3 h-3 sm:w-4 sm:h-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </button>
                        </div>

                        {/* Security Info */}
                        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200/20">
                            <div className="flex items-center justify-center space-x-3 sm:space-x-4 text-xs">
                                <div className="flex items-center space-x-1">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className={textSecondary}>Secure</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <span className="text-xs">🔐</span>
                                    <span className={textSecondary}>Encrypted</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}

