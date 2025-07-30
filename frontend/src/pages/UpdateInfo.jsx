import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { BASELINK } from './config'

export function UpdateInfo() {
    const [user, setUser] = useState({
        username: "", password: "", firstName: "", lastName: ""
    })
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})
    
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${BASELINK}/user/info`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((response) => {
            setUser(response.data.user)
            setLoading(false)
        }).catch((error) => {
            console.error("Error fetching user info:", error)
            setLoading(false)
        })
    }, [])

    const validateForm = () => {
        const newErrors = {}
        
        if (!user.username || !user.username.includes('@')) {
            newErrors.username = 'Please enter a valid email address'
        }
        
        if (!user.firstName || user.firstName.trim().length < 2) {
            newErrors.firstName = 'First name must be at least 2 characters'
        }
        
        if (!user.lastName || user.lastName.trim().length < 2) {
            newErrors.lastName = 'Last name must be at least 2 characters'
        }
        
        if (user.password && user.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters (leave empty to keep current)'
        }
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleUpdate = async () => {
        if (!validateForm()) return
        
        setUpdating(true)
        
        try {
            const response = await axios.put(`${BASELINK}/user/`, {
                user: user
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            
            if (response.data.success === 'n') {
                navigate('/afterFailUpdate')
            } else if (response.data.success === 'y') {
                navigate('/afterUpdate')
            }
        } catch (error) {
            console.error("Update error:", error)
            navigate('/afterFailUpdate')
        } finally {
            setUpdating(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-3 sm:p-4 relative overflow-hidden">
            {/* Animated background orbs */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -inset-10 opacity-50">
                    <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                    <div className="absolute top-1/3 right-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
                    <div className="absolute bottom-1/4 left-1/2 w-48 h-48 sm:w-72 sm:h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
                </div>
            </div>

            <div className="relative z-10 w-full max-w-sm sm:max-w-md">
                {/* Glassmorphism card */}
                <div className="backdrop-blur-xl bg-white/10 rounded-2xl sm:rounded-2xl shadow-2xl border border-white/20 p-6 sm:p-8 space-y-4 sm:space-y-6">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mx-auto flex items-center justify-center mb-3 sm:mb-4">
                            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white">Update Profile</h1>
                        <p className="text-gray-300 text-sm sm:text-base">Modify your account information</p>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                        {/* Username field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-200">Email Address</label>
                            <input
                                type="email"
                                value={user.username}
                                onChange={(e) => setUser({...user, username: e.target.value})}
                                className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-200 text-sm sm:text-base"
                                placeholder="Enter your email"
                            />
                            {errors.username && <p className="text-red-400 text-xs sm:text-sm">{errors.username}</p>}
                        </div>

                        {/* Password field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-200">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={user.password}
                                    onChange={(e) => setUser({...user, password: e.target.value})}
                                    className="w-full px-3 py-2.5 sm:px-4 sm:py-3 pr-10 sm:pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-200 text-sm sm:text-base"
                                    placeholder="Leave empty to keep current password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? (
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.543 7-1.275 4.057-5.065 7-9.543 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-400 text-xs sm:text-sm">{errors.password}</p>}
                        </div>

                        {/* First Name field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-200">First Name</label>
                            <input
                                type="text"
                                value={user.firstName}
                                onChange={(e) => setUser({...user, firstName: e.target.value.toUpperCase()})}
                                className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-200 text-sm sm:text-base"
                                placeholder="Enter your first name"
                            />
                            {errors.firstName && <p className="text-red-400 text-xs sm:text-sm">{errors.firstName}</p>}
                        </div>

                        {/* Last Name field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-200">Last Name</label>
                            <input
                                type="text"
                                value={user.lastName}
                                onChange={(e) => setUser({...user, lastName: e.target.value.toUpperCase()})}
                                className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-200 text-sm sm:text-base"
                                placeholder="Enter your last name"
                            />
                            {errors.lastName && <p className="text-red-400 text-xs sm:text-sm">{errors.lastName}</p>}
                        </div>

                        {/* Update button */}
                        <button
                            onClick={handleUpdate}
                            disabled={updating}
                            className="w-full py-2.5 sm:py-3 px-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 text-sm sm:text-base"
                        >
                            {updating ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-t-2 border-b-2 border-white"></div>
                                    <span>Updating...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                    </svg>
                                    <span>Update Profile</span>
                                </>
                            )}
                        </button>

                        {/* Back to dashboard link */}
                        <div className="text-center">
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors duration-200"
                            >
                                ← Back to Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}