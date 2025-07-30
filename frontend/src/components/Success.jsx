import { useNavigate } from "react-router-dom"
import { useTheme } from "../App"

export function Success({label, buttonLabel, to}) {
    const navigate = useNavigate()
    const { darkMode } = useTheme()

    const bgClass = darkMode
        ? 'bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-950'
        : 'bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50';

    const cardClass = darkMode
        ? 'bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 shadow-2xl shadow-emerald-500/20'
        : 'bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl shadow-emerald-500/20';

    const textPrimary = darkMode ? 'text-slate-200' : 'text-gray-900';
    const textSecondary = darkMode ? 'text-slate-400' : 'text-gray-600';

    return (
        <div className={`min-h-screen flex items-center justify-center p-4 transition-all duration-700 ${bgClass} relative overflow-hidden`}>
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className={`absolute -top-1/2 -left-1/2 w-full h-full rounded-full blur-3xl opacity-10 ${darkMode ? 'bg-emerald-500' : 'bg-emerald-400'} animate-pulse`}></div>
                <div className={`absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full blur-3xl opacity-10 ${darkMode ? 'bg-teal-500' : 'bg-teal-400'} animate-pulse`} style={{animationDelay: '2s'}}></div>
                <div className={`absolute top-1/4 left-1/3 w-96 h-96 rounded-full blur-2xl opacity-5 ${darkMode ? 'bg-green-400' : 'bg-green-300'} animate-bounce`} style={{animationDuration: '8s'}}></div>
            </div>

            <div className="relative z-10 w-full max-w-md">
                <div className={`
                    ${cardClass}
                    rounded-3xl p-8 md:p-10
                    transform transition-all duration-500 hover:scale-[1.02]
                    relative overflow-hidden
                    before:absolute before:inset-0 before:rounded-3xl before:p-[1px] 
                    ${darkMode 
                        ? 'before:bg-gradient-to-br before:from-emerald-500/20 before:via-transparent before:to-teal-500/20' 
                        : 'before:bg-gradient-to-br before:from-emerald-200/30 before:via-transparent before:to-teal-200/30'
                    }
                `}>
                    {/* Glassmorphism inner glow */}
                    <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                    
                    <div className="relative z-10 text-center">
                        {/* Success Icon */}
                        <div className="flex justify-center mb-6">
                            <div className={`
                                w-20 h-20 rounded-2xl flex items-center justify-center
                                bg-gradient-to-br from-emerald-500 to-teal-600 shadow-xl
                                transform transition-transform duration-300 hover:scale-110
                                animate-bounce
                            `} style={{animationDuration: '2s'}}>
                                <svg 
                                    className="w-10 h-10 text-white" 
                                    fill="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        fillRule="evenodd" 
                                        d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" 
                                        clipRule="evenodd" 
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Success Title */}
                        <h1 className={`
                            text-3xl md:text-4xl font-bold mb-6
                            bg-gradient-to-r bg-clip-text text-transparent
                            ${darkMode ? 'from-emerald-400 to-teal-400' : 'from-emerald-600 to-teal-600'}
                        `}>
                            {label}
                        </h1>

                        {/* Success Animation */}
                        <div className="mb-8">
                            <div className="flex justify-center items-center space-x-2">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                                <span className={`text-sm font-medium ${textSecondary}`}>Operation completed successfully</span>
                                <div className="w-2 h-2 bg-teal-500 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                            </div>
                        </div>

                        {/* Action Button */}
                        <button
                            onClick={() => navigate(to)}
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
                                <span>✨</span>
                                <span>{buttonLabel}</span>
                                <svg className="w-5 h-5 ml-1 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </span>
                        </button>

                        {/* Celebration Elements */}
                        <div className="mt-6 pt-4 border-t border-gray-200/20">
                            <div className="flex items-center justify-center space-x-4 text-sm">
                                <div className="flex items-center space-x-2">
                                    <span className="text-lg">🎉</span>
                                    <span className={textSecondary}>Well done!</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-lg">✅</span>
                                    <span className={textSecondary}>Completed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


