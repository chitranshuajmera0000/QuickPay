import { Heading } from '../components/Heading'
import { SubHeading } from '../components/SubHeading'
import { Button } from '../components/Button'
import { BottomWarning } from '../components/BottomWarning'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BASELINK } from './config'
import { useTheme } from '../App'

export function Signup() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState(0)
    const navigate = useNavigate()
    const { darkMode, toggleDarkMode } = useTheme()

    // Password strength calculator
    const calculatePasswordStrength = (pass) => {
        let strength = 0
        if (pass.length >= 8) strength += 1
        if (/[A-Z]/.test(pass)) strength += 1
        if (/[a-z]/.test(pass)) strength += 1
        if (/[0-9]/.test(pass)) strength += 1
        if (/[^A-Za-z0-9]/.test(pass)) strength += 1
        return strength
    }

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value
        setPassword(newPassword)
        setPasswordStrength(calculatePasswordStrength(newPassword))
    }

    const handleSignUp = async () => {
        if (loading) return

        // Validation
        if (!firstName.trim() || !lastName.trim() || !username.trim() || !password.trim()) {
            setError('Please fill in all fields')
            return
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        if (passwordStrength < 3) {
            setError('Password is too weak. Please use a stronger password.')
            return
        }

        setError('')
        setLoading(true)

        try {
            const response = await axios.post(`${BASELINK}/user/signup`, {
                username, 
                password, 
                firstName: firstName.trim(), 
                lastName: lastName.trim()
            })
            
            if (response.data.token) {
                localStorage.setItem("token", response.data.token)
                navigate('/dashboard')
            } else {
                setError('Account creation failed. Please try again.')
            }
        } catch (err) {
            if (err.response?.status === 409) {
                setError('An account with this email already exists.')
            } else {
                setError('Error creating account. Please try again.')
            }
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSignUp()
        }
    }

    const bgClass = darkMode
        ? 'bg-gradient-to-br from-slate-900 via-purple-950 to-indigo-950'
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'

    const cardClass = darkMode
        ? 'bg-slate-800/90 backdrop-blur-xl border border-slate-700/50'
        : 'bg-white/80 backdrop-blur-xl border border-white/20'

    const getPasswordStrengthColor = () => {
        if (passwordStrength <= 1) return 'bg-red-500'
        if (passwordStrength <= 2) return 'bg-orange-500'
        if (passwordStrength <= 3) return 'bg-yellow-500'
        if (passwordStrength <= 4) return 'bg-blue-500'
        return 'bg-green-500'
    }

    const getPasswordStrengthText = () => {
        if (passwordStrength <= 1) return 'Weak'
        if (passwordStrength <= 2) return 'Fair'
        if (passwordStrength <= 3) return 'Good'
        if (passwordStrength <= 4) return 'Strong'
        return 'Very Strong'
    }

    return (
        <div className={`min-h-screen flex items-center justify-center p-3 sm:p-4 transition-all duration-700 ${bgClass} relative overflow-hidden`}>
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className={`absolute -top-1/2 -left-1/2 w-full h-full rounded-full blur-3xl opacity-20 ${darkMode ? 'bg-purple-500' : 'bg-blue-400'} animate-pulse`}></div>
                <div className={`absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full blur-3xl opacity-20 ${darkMode ? 'bg-indigo-500' : 'bg-purple-400'} animate-pulse`} style={{animationDelay: '2s'}}></div>
                <div className={`absolute top-1/3 right-1/4 w-48 h-48 sm:w-64 sm:h-64 rounded-full blur-2xl opacity-10 ${darkMode ? 'bg-cyan-400' : 'bg-pink-300'} animate-bounce`} style={{animationDuration: '8s'}}></div>
            </div>

            <div className="relative z-10 w-full max-w-sm sm:max-w-lg">
                <div className={`
                    ${cardClass}
                    rounded-2xl sm:rounded-3xl
                    p-6 sm:p-8 md:p-10
                    shadow-2xl shadow-black/10
                    transform transition-all duration-500 hover:scale-[1.01] hover:shadow-3xl
                    relative
                    before:absolute before:inset-0 before:rounded-2xl sm:before:rounded-3xl before:p-[1px] 
                    ${darkMode 
                        ? 'before:bg-gradient-to-br before:from-purple-500/20 before:via-transparent before:to-indigo-500/20' 
                        : 'before:bg-gradient-to-br before:from-blue-200/30 before:via-transparent before:to-purple-200/30'
                    }
                `}>
                    {/* Glassmorphism inner glow */}
                    <div className="absolute inset-[1px] rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                        {/* Dark Mode Toggle */}
                        <button
                            onClick={toggleDarkMode}
                            className={`
                                absolute -top-1 -right-1 sm:-top-2 sm:-right-2
                                w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg
                                transition-all duration-300 ease-out
                                focus:outline-none focus:ring-4 focus:scale-110
                                transform hover:scale-110 hover:rotate-12
                                ${darkMode
                                    ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-amber-500/30 focus:ring-amber-400/50"
                                    : "bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-indigo-500/30 focus:ring-indigo-400/50"}
                                flex items-center justify-center text-lg sm:text-xl
                            `}
                            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                            type="button"
                        >
                            <span className="transform transition-transform duration-300 hover:scale-125">
                                {darkMode ? "☀️" : "🌙"}
                            </span>
                        </button>

                        {/* Header */}
                        <div className="text-center mb-6 sm:mb-8">
                            <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 ${darkMode ? 'bg-gradient-to-br from-purple-600/20 to-indigo-600/20' : 'bg-gradient-to-br from-blue-500/10 to-purple-500/10'} backdrop-blur-sm`}>
                                <div className={`text-2xl sm:text-3xl ${darkMode ? 'text-purple-400' : 'text-indigo-600'}`}>🚀</div>
                            </div>
                            <Heading 
                                label="Join Us Today" 
                                className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${darkMode ? 'from-purple-400 to-indigo-400' : 'from-indigo-600 to-purple-600'} bg-clip-text text-transparent mb-2`} 
                            />
                            <SubHeading 
                                text="Create your account and start your journey" 
                                className={`${darkMode ? 'text-slate-400' : 'text-slate-600'} text-sm sm:text-base font-medium`} 
                            />
                        </div>

                        {/* Error display */}
                        {error && (
                            <div className={`
                                ${darkMode ? 'bg-red-900/30 border-red-500/30 text-red-300' : 'bg-red-50 border-red-200 text-red-700'}
                                px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border backdrop-blur-sm
                                mb-4 sm:mb-6 text-sm font-medium
                                animate-shake relative overflow-hidden
                                before:absolute before:inset-0 before:bg-gradient-to-r before:from-red-500/10 before:to-transparent
                            `} role="alert">
                                <div className="flex items-center gap-2">
                                    <span className="text-red-500 text-sm sm:text-base">⚠️</span>
                                    <span className="text-xs sm:text-sm">{error}</span>
                                </div>
                            </div>
                        )}

                        {/* Form inputs */}
                        <div className="space-y-4 sm:space-y-5 mb-4 sm:mb-6">
                            {/* Name fields in a row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div className="transform transition-all duration-300 hover:scale-[1.01]">
                                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        onKeyDown={onKeyDown}
                                        placeholder="John"
                                        id="signup-firstname"
                                        aria-label="First name"
                                        className={`
                                            w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border transition-all duration-300 text-sm sm:text-base
                                            focus:outline-none focus:ring-2 focus:scale-[1.02]
                                            ${darkMode 
                                                ? 'bg-slate-700/50 border-slate-600/50 text-slate-200 placeholder-slate-400 focus:ring-purple-500/50 focus:border-purple-400' 
                                                : 'bg-white/70 border-slate-200 text-slate-900 placeholder-slate-500 focus:ring-indigo-500/50 focus:border-indigo-400'
                                            }
                                            backdrop-blur-sm
                                        `}
                                    />
                                </div>
                                <div className="transform transition-all duration-300 hover:scale-[1.01]">
                                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        onKeyDown={onKeyDown}
                                        placeholder="Doe"
                                        id="signup-lastname"
                                        aria-label="Last name"
                                        className={`
                                            w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border transition-all duration-300 text-sm sm:text-base
                                            focus:outline-none focus:ring-2 focus:scale-[1.02]
                                            ${darkMode 
                                                ? 'bg-slate-700/50 border-slate-600/50 text-slate-200 placeholder-slate-400 focus:ring-purple-500/50 focus:border-purple-400' 
                                                : 'bg-white/70 border-slate-200 text-slate-900 placeholder-slate-500 focus:ring-indigo-500/50 focus:border-indigo-400'
                                            }
                                            backdrop-blur-sm
                                        `}
                                    />
                                </div>
                            </div>

                            <div className="transform transition-all duration-300 hover:scale-[1.01]">
                                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    onKeyDown={onKeyDown}
                                    placeholder="johndoe@example.com"
                                    id="signup-email"
                                    aria-label="Email address"
                                    className={`
                                        w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border transition-all duration-300 text-sm sm:text-base
                                        focus:outline-none focus:ring-2 focus:scale-[1.02]
                                        ${darkMode 
                                            ? 'bg-slate-700/50 border-slate-600/50 text-slate-200 placeholder-slate-400 focus:ring-purple-500/50 focus:border-purple-400' 
                                            : 'bg-white/70 border-slate-200 text-slate-900 placeholder-slate-500 focus:ring-indigo-500/50 focus:border-indigo-400'
                                        }
                                        backdrop-blur-sm
                                    `}
                                />
                            </div>

                            <div className="transform transition-all duration-300 hover:scale-[1.01]">
                                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={handlePasswordChange}
                                        onKeyDown={onKeyDown}
                                        placeholder="Create a strong password"
                                        id="signup-password"
                                        aria-label="Password"
                                        className={`
                                            w-full px-3 py-2.5 sm:px-4 sm:py-3 pr-10 sm:pr-12 rounded-xl border transition-all duration-300 text-sm sm:text-base
                                            focus:outline-none focus:ring-2 focus:scale-[1.02]
                                            ${darkMode 
                                                ? 'bg-slate-700/50 border-slate-600/50 text-slate-200 placeholder-slate-400 focus:ring-purple-500/50 focus:border-purple-400' 
                                                : 'bg-white/70 border-slate-200 text-slate-900 placeholder-slate-500 focus:ring-indigo-500/50 focus:border-indigo-400'
                                            }
                                            backdrop-blur-sm
                                        `}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className={`
                                            absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2
                                            w-7 h-7 sm:w-8 sm:h-8 rounded-lg transition-all duration-200
                                            flex items-center justify-center
                                            ${darkMode 
                                                ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-600/50' 
                                                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/50'
                                            }
                                            focus:outline-none focus:ring-2 focus:ring-offset-2
                                            ${darkMode ? 'focus:ring-purple-500/50' : 'focus:ring-indigo-500/50'}
                                        `}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? (
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                
                                {/* Password strength indicator */}
                                {password && (
                                    <div className="mt-2">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className={`text-xs font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                                Password Strength
                                            </span>
                                            <span className={`text-xs font-semibold ${passwordStrength >= 4 ? 'text-green-500' : passwordStrength >= 3 ? 'text-yellow-500' : 'text-red-500'}`}>
                                                {getPasswordStrengthText()}
                                            </span>
                                        </div>
                                        <div className={`w-full bg-gray-200 rounded-full h-1.5 sm:h-2 ${darkMode ? 'bg-slate-700' : 'bg-slate-200'}`}>
                                            <div 
                                                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                                                style={{ width: `${(passwordStrength / 5) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="transform transition-all duration-300 hover:scale-[1.01]">
                                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        onKeyDown={onKeyDown}
                                        placeholder="Confirm your password"
                                        id="signup-confirm-password"
                                        aria-label="Confirm password"
                                        className={`
                                            w-full px-3 py-2.5 sm:px-4 sm:py-3 pr-10 sm:pr-12 rounded-xl border transition-all duration-300 text-sm sm:text-base
                                            focus:outline-none focus:ring-2 focus:scale-[1.02]
                                            ${darkMode 
                                                ? 'bg-slate-700/50 border-slate-600/50 text-slate-200 placeholder-slate-400 focus:ring-purple-500/50 focus:border-purple-400' 
                                                : 'bg-white/70 border-slate-200 text-slate-900 placeholder-slate-500 focus:ring-indigo-500/50 focus:border-indigo-400'
                                            }
                                            backdrop-blur-sm
                                        `}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className={`
                                            absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2
                                            w-7 h-7 sm:w-8 sm:h-8 rounded-lg transition-all duration-200
                                            flex items-center justify-center
                                            ${darkMode 
                                                ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-600/50' 
                                                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/50'
                                            }
                                            focus:outline-none focus:ring-2 focus:ring-offset-2
                                            ${darkMode ? 'focus:ring-purple-500/50' : 'focus:ring-indigo-500/50'}
                                        `}
                                        aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                                    >
                                        {showConfirmPassword ? (
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {confirmPassword && password !== confirmPassword && (
                                    <div className={`mt-1 text-xs ${darkMode ? 'text-red-400' : 'text-red-600'} flex items-center gap-1`}>
                                        <span>❌</span>
                                        <span>Passwords do not match</span>
                                    </div>
                                )}
                                {confirmPassword && password === confirmPassword && (
                                    <div className={`mt-1 text-xs ${darkMode ? 'text-green-400' : 'text-green-600'} flex items-center gap-1`}>
                                        <span>✅</span>
                                        <span>Passwords match</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sign up button */}
                        <div className="mb-4 sm:mb-6">
                            <Button
                                onPress={handleSignUp}
                                label={loading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span className="text-sm sm:text-base">Creating Account...</span>
                                    </div>
                                ) : (
                                    <span className="text-sm sm:text-base">Create Account</span>
                                )}
                                darkMode={darkMode}
                                disabled={loading}
                                variant="primary"
                            />
                        </div>

                        {/* Bottom warning */}
                        <div className="text-center">
                            <BottomWarning
                                label="Already have an account?"
                                buttonText="Sign In"
                                to="/signin"
                                darkMode={darkMode}
                                className={`${darkMode ? 'text-slate-400' : 'text-slate-600'} text-xs sm:text-sm`}
                            />
                        </div>

                        {/* Security features */}
                        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-200/20">
                            <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs text-slate-500">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                    <span>Secure Registration</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs sm:text-sm">🔒</span>
                                    <span>256-bit Encryption</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs sm:text-sm">🛡️</span>
                                    <span>Privacy Protected</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs sm:text-sm">⚡</span>
                                    <span>Instant Setup</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }
            `}</style>
        </div>
    )
}