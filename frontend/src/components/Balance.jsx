export function Balance({value, darkMode}) {
    const textPrimary = darkMode ? 'text-slate-200' : 'text-gray-900';
    const textSecondary = darkMode ? 'text-slate-400' : 'text-gray-600';
    const textAccent = darkMode ? 'text-emerald-400' : 'text-emerald-600';

    // Format the balance with commas
    const formatBalance = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2
        }).format(amount);
    };

    return (
        <div className="space-y-3 sm:space-y-4">
            {/* Balance Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <h3 className={`text-base sm:text-lg font-semibold ${textSecondary}`}>
                    Available Balance
                </h3>
                <div className={`
                    px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium w-fit
                    ${darkMode 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }
                `}>
                    Active
                </div>
            </div>

            {/* Main Balance Display */}
            <div className="relative">
                <div className={`
                    text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight ${textAccent}
                    bg-gradient-to-r bg-clip-text text-transparent
                    ${darkMode 
                        ? 'from-emerald-400 via-teal-400 to-cyan-400' 
                        : 'from-emerald-600 via-teal-600 to-cyan-600'
                    }
                    drop-shadow-sm break-all sm:break-normal
                `}>
                    {formatBalance(value)}
                </div>
                
                {/* Animated underline */}
                <div className={`
                    h-0.5 sm:h-1 mt-1 sm:mt-2 rounded-full transition-all duration-500
                    bg-gradient-to-r
                    ${darkMode 
                        ? 'from-emerald-500/50 via-teal-500/50 to-cyan-500/50' 
                        : 'from-emerald-500/30 via-teal-500/30 to-cyan-500/30'
                    }
                    animate-pulse
                `}></div>
            </div>

            {/* Balance Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
                <div className={`
                    p-3 sm:p-4 rounded-xl
                    ${darkMode 
                        ? 'bg-slate-700/30 border border-slate-600/30' 
                        : 'bg-gray-50/50 border border-gray-200/30'
                    }
                    backdrop-blur-sm
                `}>
                    <div className={`text-xs font-medium ${textSecondary} mb-1`}>
                        Account Status
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className={`text-sm font-semibold ${textPrimary}`}>
                            Active
                        </span>
                    </div>
                </div>

                <div className={`
                    p-3 sm:p-4 rounded-xl
                    ${darkMode 
                        ? 'bg-slate-700/30 border border-slate-600/30' 
                        : 'bg-gray-50/50 border border-gray-200/30'
                    }
                    backdrop-blur-sm
                `}>
                    <div className={`text-xs font-medium ${textSecondary} mb-1`}>
                        Account Type
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm">💎</span>
                        <span className={`text-sm font-semibold ${textPrimary}`}>
                            Premium
                        </span>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-3 sm:pt-4 border-t border-gray-200/20 space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm">
                    <div className="flex items-center space-x-2">
                        <span className="text-base sm:text-lg">🔄</span>
                        <span className={textSecondary}>Last updated: Just now</span>
                    </div>
                </div>
                <button className={`
                    text-xs font-medium px-2 py-1 sm:px-3 sm:py-1 rounded-lg transition-colors duration-200 w-fit
                    ${darkMode 
                        ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'
                    }
                `}>
                    Refresh ↻
                </button>
            </div>
        </div>
    );
}