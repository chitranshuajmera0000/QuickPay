export function InputBox({ 
    label, 
    placeholder, 
    onChange, 
    style = "", 
    darkMode = false, 
    type = "text", 
    value = "", 
    onKeyDown, 
    id, 
    ariaLabel,
    disabled = false 
}) {
    const labelClass = `
        font-semibold text-sm mb-2 block transition-colors duration-300
        ${darkMode 
            ? 'text-slate-300' 
            : 'text-slate-700'
        }
        ${style}
    `;

    const inputClass = `
        w-full px-4 py-3.5 rounded-xl font-medium transition-all duration-300
        placeholder:font-normal placeholder:transition-colors placeholder:duration-300
        focus:outline-none focus:ring-4 transform
        ${darkMode 
            ? `bg-slate-700/50 border border-slate-600/50 text-slate-100 
               placeholder:text-slate-400 
               focus:bg-slate-700/70 focus:border-purple-500/50 focus:ring-purple-500/20
               hover:bg-slate-700/60 hover:border-slate-500/60` 
            : `bg-white/70 border border-slate-300/60 text-slate-900 
               placeholder:text-slate-500 
               focus:bg-white focus:border-indigo-500/50 focus:ring-indigo-500/20
               hover:bg-white/90 hover:border-slate-400/70`
        }
        ${disabled 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:scale-[1.01] focus:scale-[1.01] active:scale-[0.99]'
        }
        backdrop-blur-sm shadow-lg
        ${darkMode ? 'shadow-black/20' : 'shadow-slate-200/50'}
    `;

    const containerClass = `
        relative group w-full
        ${disabled ? 'pointer-events-none' : ''}
    `;

    return (
        <div className={containerClass}>
            {/* Enhanced label with icon */}
            <label 
                htmlFor={id} 
                className={labelClass}
            >
                <span className="flex items-center gap-2">
                    {type === "email" && (
                        <span className={`text-sm ${darkMode ? 'text-purple-400' : 'text-indigo-500'}`}>
                            📧
                        </span>
                    )}
                    {type === "password" && (
                        <span className={`text-sm ${darkMode ? 'text-purple-400' : 'text-indigo-500'}`}>
                            🔒
                        </span>
                    )}
                    {label}
                </span>
            </label>

            {/* Enhanced input with floating effects */}
            <div className="relative">
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    placeholder={placeholder}
                    aria-label={ariaLabel}
                    disabled={disabled}
                    className={inputClass}
                    autoComplete={type === "email" ? "email" : type === "password" ? "current-password" : "off"}
                />
                
                {/* Floating gradient border effect */}
                <div className={`
                    absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300
                    bg-gradient-to-r ${darkMode 
                        ? 'from-purple-500/20 via-transparent to-indigo-500/20' 
                        : 'from-indigo-500/20 via-transparent to-purple-500/20'
                    }
                    opacity-0 group-hover:opacity-100 group-focus-within:opacity-100
                    -z-10 blur-sm
                `}></div>

                {/* Focus indicator */}
                <div className={`
                    absolute -inset-0.5 rounded-xl pointer-events-none transition-all duration-300
                    bg-gradient-to-r ${darkMode 
                        ? 'from-purple-500/30 to-indigo-500/30' 
                        : 'from-indigo-500/30 to-purple-500/30'
                    }
                    opacity-0 group-focus-within:opacity-100 scale-95 group-focus-within:scale-100
                    -z-20 blur-md
                `}></div>

                {/* Input validation icon */}
                {value && (
                    <div className={`
                        absolute right-3 top-1/2 transform -translate-y-1/2
                        transition-all duration-300
                        ${darkMode ? 'text-green-400' : 'text-green-500'}
                    `}>
                        <span className="text-sm">✓</span>
                    </div>
                )}
            </div>

            {/* Subtle bottom glow */}
            <div className={`
                h-0.5 mx-auto transition-all duration-500 rounded-full
                ${darkMode 
                    ? 'bg-gradient-to-r from-transparent via-purple-500/50 to-transparent' 
                    : 'bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent'
                }
                w-0 group-focus-within:w-full group-hover:w-3/4
                mt-1
            `}></div>
        </div>
    );
}