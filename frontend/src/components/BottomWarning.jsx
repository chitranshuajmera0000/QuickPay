import { Link } from "react-router-dom";

export function BottomWarning({label, buttonText, to, darkMode, className = ""}) {
    const textSecondary = darkMode ? 'text-slate-400' : 'text-gray-600';
    const linkColor = darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-indigo-600 hover:text-indigo-700';

    return (
        <div className={`flex justify-center items-center pt-4 pb-2 text-sm ${className}`}>
            <span className={`${textSecondary} font-medium`}>
                {label}
            </span>
            <Link 
                className={`
                    ml-2 font-semibold transition-all duration-300 ease-out
                    ${linkColor}
                    hover:underline hover:underline-offset-4
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:rounded-md
                    ${darkMode ? 'focus:ring-purple-500/50 focus:ring-offset-slate-800' : 'focus:ring-indigo-500/50 focus:ring-offset-white'}
                    relative group px-1 py-0.5
                `} 
                to={to}
            >
                {/* Background highlight on hover */}
                <div className={`
                    absolute inset-0 rounded-md transition-all duration-300 ease-out
                    ${darkMode 
                        ? 'bg-purple-500/0 group-hover:bg-purple-500/10' 
                        : 'bg-indigo-500/0 group-hover:bg-indigo-500/10'
                    }
                `}></div>
                
                {/* Link text */}
                <span className="relative">
                    {buttonText}
                </span>

                {/* Animated arrow */}
                <svg 
                    className="inline-block w-4 h-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                    />
                </svg>
            </Link>
        </div>
    );
}