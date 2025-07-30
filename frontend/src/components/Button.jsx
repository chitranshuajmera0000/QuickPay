export function Button({ 
    label, 
    onPress, 
    darkMode = false, 
    disabled = false, 
    loading = false,
    variant = "primary",
    size = "default",
    className = "",
    type = "button"
}) {
    const sizeClasses = {
        small: "px-4 py-2 text-sm h-9",
        default: "px-6 py-3.5 text-base h-12",
        large: "px-8 py-4 text-lg h-14"
    };

    const baseClasses = `
        w-full rounded-xl font-semibold transition-all duration-300 transform
        focus:outline-none focus:ring-4 
        relative overflow-hidden
        ${sizeClasses[size]}
        ${disabled || loading 
            ? 'cursor-not-allowed opacity-60' 
            : 'hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
        }
    `;

    const variantClasses = {
        primary: darkMode 
            ? `bg-gradient-to-r from-purple-600 to-indigo-600 
               hover:from-purple-500 hover:to-indigo-500 
               text-white shadow-lg shadow-purple-500/25
               focus:ring-purple-400/50
               disabled:from-purple-600/50 disabled:to-indigo-600/50` 
            : `bg-gradient-to-r from-indigo-600 to-purple-600 
               hover:from-indigo-500 hover:to-purple-500 
               text-white shadow-lg shadow-indigo-500/25
               focus:ring-indigo-400/50
               disabled:from-indigo-600/50 disabled:to-purple-600/50`,
        
        secondary: darkMode
            ? `bg-slate-700/50 border border-slate-600/50 
               hover:bg-slate-600/60 hover:border-slate-500/60
               text-slate-200 backdrop-blur-sm
               focus:ring-slate-400/50
               disabled:bg-slate-700/30 disabled:border-slate-600/30`
            : `bg-white/70 border border-slate-300/60 
               hover:bg-white hover:border-slate-400/70
               text-slate-700 backdrop-blur-sm shadow-md
               focus:ring-slate-400/50
               disabled:bg-white/50 disabled:border-slate-300/40`,
        
        success: `bg-gradient-to-r from-emerald-500 to-green-600 
                  hover:from-emerald-400 hover:to-green-500 
                  text-white shadow-lg shadow-emerald-500/25
                  focus:ring-emerald-400/50
                  disabled:from-emerald-500/50 disabled:to-green-600/50`,
        
        danger: `bg-gradient-to-r from-red-500 to-rose-600 
                 hover:from-red-400 hover:to-rose-500 
                 text-white shadow-lg shadow-red-500/25
                 focus:ring-red-400/50
                 disabled:from-red-500/50 disabled:to-rose-600/50`
    };

    const buttonClass = `${baseClasses} ${variantClasses[variant]} ${className}`;

    return (
        <div className="w-full">
            <button
                type={type}
                className={buttonClass}
                onClick={disabled || loading ? undefined : onPress}
                disabled={disabled || loading}
                aria-disabled={disabled || loading}
            >
                {/* Background shine effect */}
                <div className={`
                    absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                    transform -skew-x-12 -translate-x-full transition-transform duration-700
                    ${!disabled && !loading ? 'group-hover:translate-x-full' : ''}
                `}></div>

                {/* Button content */}
                <div className="relative flex items-center justify-center gap-2">
                    {loading && (
                        <div className="flex items-center gap-2">
                            <div className={`
                                w-4 h-4 border-2 rounded-full animate-spin
                                ${variant === 'secondary' 
                                    ? (darkMode ? 'border-slate-400/30 border-t-slate-200' : 'border-slate-400/30 border-t-slate-700')
                                    : 'border-white/30 border-t-white'
                                }
                            `}></div>
                        </div>
                    )}
                    
                    {typeof label === 'string' ? (
                        <span className={`transition-all duration-300 ${loading ? 'ml-1' : ''}`}>
                            {label}
                        </span>
                    ) : (
                        label
                    )}
                </div>

                {/* Floating particles effect for primary buttons */}
                {variant === 'primary' && !disabled && !loading && (
                    <>
                        <div className={`
                            absolute top-1 left-1/4 w-1 h-1 rounded-full opacity-0
                            ${darkMode ? 'bg-purple-300' : 'bg-indigo-200'}
                            animate-ping animation-delay-100
                        `}></div>
                        <div className={`
                            absolute top-2 right-1/3 w-1 h-1 rounded-full opacity-0
                            ${darkMode ? 'bg-indigo-300' : 'bg-purple-200'}
                            animate-ping animation-delay-300
                        `}></div>
                        <div className={`
                            absolute bottom-1 left-1/3 w-1 h-1 rounded-full opacity-0
                            ${darkMode ? 'bg-cyan-300' : 'bg-blue-200'}
                            animate-ping animation-delay-500
                        `}></div>
                    </>
                )}

                {/* Ripple effect on click */}
                <div className={`
                    absolute inset-0 rounded-xl transition-all duration-300 pointer-events-none
                    ${!disabled && !loading ? 'active:bg-white/20' : ''}
                `}></div>
            </button>

            {/* Enhanced bottom glow */}
            <div className={`
                h-0.5 mx-auto transition-all duration-500 rounded-full mt-1
                ${variant === 'primary' 
                    ? (darkMode 
                        ? 'bg-gradient-to-r from-transparent via-purple-400/50 to-transparent' 
                        : 'bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent'
                      )
                    : 'bg-gradient-to-r from-transparent via-slate-400/30 to-transparent'
                }
                ${!disabled && !loading 
                    ? 'w-0 hover:w-3/4 focus-within:w-full' 
                    : 'w-0'
                }
            `}></div>

            <style jsx>{`
                .animation-delay-100 {
                    animation-delay: 0.1s;
                }
                .animation-delay-300 {
                    animation-delay: 0.3s;
                }
                .animation-delay-500 {
                    animation-delay: 0.5s;
                }
                @keyframes ping {
                    0% {
                        opacity: 0;
                        transform: scale(0);
                    }
                    50% {
                        opacity: 0.8;
                        transform: scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: scale(1.2);
                    }
                }
                .animate-ping {
                    animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
                }
            `}</style>
        </div>
    );
}