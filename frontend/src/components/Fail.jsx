import { useNavigate } from "react-router-dom"
import { useTheme } from "../App"

export function Fail({label, des, button}) {
    const navigate = useNavigate()
    const { darkMode } = useTheme()
    
    if (!button) {button="Go To Dashboard"}

    const bgClass = darkMode
        ? 'bg-gradient-to-br from-slate-900 via-red-950 to-rose-950'
        : 'bg-gradient-to-br from-red-50 via-rose-50 to-pink-50';

    const cardClass = darkMode
        ? 'bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 shadow-2xl shadow-red-500/20'
        : 'bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl shadow-red-500/20';

    const textPrimary = darkMode ? 'text-slate-200' : 'text-gray-900';
    const textSecondary = darkMode ? 'text-slate-400' : 'text-gray-600';

    return (
        <div className={`min-h-screen flex items-center justify-center p-4 transition-all duration-700 ${bgClass} relative overflow-hidden`}>
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className={`absolute -top-1/2 -left-1/2 w-full h-full rounded-full blur-3xl opacity-10 ${darkMode ? 'bg-red-500' : 'bg-red-400'} animate-pulse`}></div>
                <div className={`absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full blur-3xl opacity-10 ${darkMode ? 'bg-rose-500' : 'bg-rose-400'} animate-pulse`} style={{animationDelay: '2s'}}></div>
                <div className={`absolute top-1/4 left-1/3 w-96 h-96 rounded-full blur-2xl opacity-5 ${darkMode ? 'bg-pink-400' : 'bg-pink-300'} animate-bounce`} style={{animationDuration: '8s'}}></div>
            </div>

            <div className="relative z-10 w-full max-w-md">
                <div className={`
                    ${cardClass}
                    rounded-3xl p-8 md:p-10
                    transform transition-all duration-500 hover:scale-[1.02]
                    relative overflow-hidden
                    before:absolute before:inset-0 before:rounded-3xl before:p-[1px] 
                    ${darkMode 
                        ? 'before:bg-gradient-to-br before:from-red-500/20 before:via-transparent before:to-rose-500/20' 
                        : 'before:bg-gradient-to-br before:from-red-200/30 before:via-transparent before:to-rose-200/30'
                    }
                `}>
                    {/* Glassmorphism inner glow */}
                    <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                    
                    <div className="relative z-10 text-center">
                        {/* Error Icon */}
                        <div className="flex justify-center mb-6">
                            <div className={`
                                w-20 h-20 rounded-2xl flex items-center justify-center
                                bg-gradient-to-br from-red-500 to-rose-600 shadow-xl
                                transform transition-transform duration-300 hover:scale-110
                            `}>
                                <svg 
                                    className="w-10 h-10 text-white" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" 
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Error Title */}
                        <h1 className={`
                            text-3xl md:text-4xl font-bold mb-4
                            bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent
                            ${darkMode ? 'from-red-400 to-rose-400' : 'from-red-600 to-rose-600'}
                        `}>
                            {label}
                        </h1>

                        {/* Error Description */}
                        <p className={`text-lg font-medium mb-8 ${textSecondary} leading-relaxed`}>
                            {des}
                        </p>

                        {/* Action Button */}
                        <button
                            onClick={() => navigate("/dashboard")}
                            className={`
                                w-full px-6 py-4 rounded-2xl font-semibold text-lg
                                transition-all duration-300 ease-out transform hover:scale-105
                                focus:outline-none focus:ring-4 focus:ring-offset-2
                                bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700
                                text-white shadow-xl border border-emerald-400/30
                                ${darkMode ? 'focus:ring-emerald-500/50 focus:ring-offset-slate-800' : 'focus:ring-emerald-500/50 focus:ring-offset-white'}
                                group relative overflow-hidden
                            `}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="relative flex items-center justify-center space-x-2">
                                <span>🏠</span>
                                <span>{button}</span>
                            </span>
                        </button>

                        {/* Additional Help Text */}
                        <div className="mt-6 pt-4 border-t border-gray-200/20">
                            <div className="flex items-center justify-center space-x-4 text-sm">
                                <div className="flex items-center space-x-2">
                                    <span className="text-lg">💡</span>
                                    <span className={textSecondary}>Need help? Contact support</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}