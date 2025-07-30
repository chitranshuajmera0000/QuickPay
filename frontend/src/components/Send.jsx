import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BASELINK } from './config'
import { useTheme } from "../App"

export function Send({ id, name }) {
    const [amount, setAmount] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { darkMode } = useTheme()

    const bgClass = darkMode
        ? 'bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950'
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50';

    const cardClass = darkMode
        ? 'bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 shadow-2xl shadow-blue-500/20'
        : 'bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl shadow-blue-500/20';

    const textPrimary = darkMode ? 'text-slate-200' : 'text-gray-900';
    const textSecondary = darkMode ? 'text-slate-400' : 'text-gray-600';

    const handleTransfer = async () => {
        if (!amount || parseFloat(amount) <= 0) {
            setError('Please enter a valid amount');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.post(`${BASELINK}/account/transfer`, {
                to: id,
                amount: parseFloat(amount)
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });

            if (response.data.success === 'n') {
                navigate('/Fail');
            } else if (response.data.success === 'y') {
                navigate('/Success');
            }
        } catch (err) {
            setError('Transfer failed. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center p-3 sm:p-4 transition-all duration-700 ${bgClass} relative overflow-hidden`}>
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className={`absolute -top-1/2 -left-1/2 w-full h-full rounded-full blur-3xl opacity-10 ${darkMode ? 'bg-blue-500' : 'bg-blue-400'} animate-pulse`}></div>
                <div className={`absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full blur-3xl opacity-10 ${darkMode ? 'bg-indigo-500' : 'bg-indigo-400'} animate-pulse`} style={{animationDelay: '2s'}}></div>
                <div className={`absolute top-1/4 left-1/3 w-72 h-72 sm:w-96 sm:h-96 rounded-full blur-2xl opacity-5 ${darkMode ? 'bg-purple-400' : 'bg-purple-300'} animate-bounce`} style={{animationDuration: '8s'}}></div>
            </div>

            <div className="relative z-10 w-full max-w-sm sm:max-w-md">
                <div className={`
                    ${cardClass}
                    rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10
                    transform transition-all duration-500 hover:scale-[1.01]
                    relative overflow-hidden
                    before:absolute before:inset-0 before:rounded-2xl sm:before:rounded-3xl before:p-[1px] 
                    ${darkMode 
                        ? 'before:bg-gradient-to-br before:from-blue-500/20 before:via-transparent before:to-indigo-500/20' 
                        : 'before:bg-gradient-to-br before:from-blue-200/30 before:via-transparent before:to-indigo-200/30'
                    }
                `}>
                    {/* Glassmorphism inner glow */}
                    <div className="absolute inset-[1px] rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                    
                    <div className="relative z-10 space-y-4 sm:space-y-6">
                        {/* Header */}
                        <div className="text-center">
                            <div className={`
                                w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4
                                bg-gradient-to-br from-blue-500 to-indigo-600 shadow-xl
                                transform transition-transform duration-300 hover:scale-110
                            `}>
                                <span className="text-lg sm:text-2xl">💸</span>
                            </div>
                            <h1 className={`
                                text-2xl sm:text-3xl font-bold mb-2
                                bg-gradient-to-r bg-clip-text text-transparent
                                ${darkMode ? 'from-blue-400 to-indigo-400' : 'from-blue-600 to-indigo-600'}
                            `}>
                                Send Money
                            </h1>
                            <p className={`text-sm sm:text-base ${textSecondary}`}>
                                Transfer funds securely and instantly
                            </p>
                        </div>

                        {/* Recipient Info */}
                        <div className={`
                            p-3 sm:p-4 rounded-xl sm:rounded-2xl
                            ${darkMode ? 'bg-slate-700/30 border border-slate-600/30' : 'bg-gray-50/50 border border-gray-200/30'}
                            backdrop-blur-sm
                        `}>
                            <div className="flex items-center space-x-3 sm:space-x-4">
                                <div className={`
                                    w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0
                                    bg-gradient-to-br from-emerald-500 to-teal-600
                                    text-white font-bold text-sm sm:text-lg shadow-lg
                                `}>
                                    {name[0].toUpperCase()}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className={`font-semibold text-base sm:text-lg ${textPrimary} truncate`}>
                                        {name}
                                    </h3>
                                    <p className={`text-xs sm:text-sm ${textSecondary}`}>
                                        Recipient
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Amount Input */}
                        <div className="space-y-2">
                            <label className={`block text-sm font-semibold ${textSecondary}`}>
                                Amount (INR)
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                                    <span className={`text-lg ${textSecondary}`}>₹</span>
                                </div>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0.00"
                                    min="1"
                                    step="0.01"
                                    className={`
                                        w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-xl border transition-all duration-300
                                        focus:outline-none focus:ring-2 focus:scale-[1.01] text-base sm:text-lg font-semibold
                                        ${darkMode 
                                            ? 'bg-slate-700/50 border-slate-600/50 text-slate-200 placeholder-slate-400 focus:ring-blue-500/50 focus:border-blue-400' 
                                            : 'bg-white/70 border-slate-200 text-slate-900 placeholder-slate-500 focus:ring-blue-500/50 focus:border-blue-400'
                                        }
                                        backdrop-blur-sm
                                    `}
                                />
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className={`
                                ${darkMode ? 'bg-red-900/30 border-red-500/30 text-red-300' : 'bg-red-50 border-red-200 text-red-700'}
                                px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border backdrop-blur-sm
                                text-sm font-medium
                                animate-shake relative overflow-hidden
                                before:absolute before:inset-0 before:bg-gradient-to-r before:from-red-500/10 before:to-transparent
                            `}>
                                <div className="flex items-center gap-2">
                                    <span className="text-red-500 text-sm sm:text-base">⚠️</span>
                                    <span className="text-xs sm:text-sm">{error}</span>
                                </div>
                            </div>
                        )}

                        {/* Transfer Button */}
                        <button
                            onClick={handleTransfer}
                            disabled={loading || !amount}
                            className={`
                                w-full px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg
                                transition-all duration-300 ease-out transform hover:scale-105
                                focus:outline-none focus:ring-4 focus:ring-offset-2
                                ${loading || !amount 
                                    ? 'opacity-60 cursor-not-allowed' 
                                    : 'hover:scale-105'
                                }
                                bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700
                                text-white shadow-xl border border-blue-400/30
                                ${darkMode ? 'focus:ring-blue-500/50 focus:ring-offset-slate-800' : 'focus:ring-blue-500/50 focus:ring-offset-white'}
                                group relative overflow-hidden
                            `}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="relative flex items-center justify-center space-x-2">
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Processing...</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-base sm:text-lg">🚀</span>
                                        <span>Initiate Transfer</span>
                                    </>
                                )}
                            </span>
                        </button>

                        {/* Security Info */}
                        <div className="text-center pt-3 sm:pt-4 border-t border-gray-200/20">
                            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className={textSecondary}>Secure Transfer</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs sm:text-sm">🔒</span>
                                    <span className={textSecondary}>Encrypted</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}