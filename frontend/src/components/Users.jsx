import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { BASELINK } from './config'

export function Users({ darkMode }) {
    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState('')
    const [loading, setLoading] = useState(false)

    const textPrimary = darkMode ? 'text-slate-200' : 'text-gray-900';
    const textSecondary = darkMode ? 'text-slate-400' : 'text-gray-600';

    useEffect(() => {
        setLoading(true)
        axios.get(`${BASELINK}/user/bulk?filter=` + filter, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then((response) => {
            setUsers(response.data.user)
            setLoading(false)
        })
        .catch(() => {
            setLoading(false)
        })
    }, [filter])

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Search Header */}
            <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <h3 className={`text-base sm:text-lg font-semibold ${textSecondary}`}>
                        Find People
                    </h3>
                </div>
                
                {/* Search Input */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                        <svg className={`w-4 h-4 sm:w-5 sm:h-5 ${textSecondary}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search by name..."
                        onChange={(e) => setFilter(e.target.value)}
                        className={`
                            w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-xl border transition-all duration-300
                            focus:outline-none focus:ring-2 focus:scale-[1.01] text-sm sm:text-base
                            ${darkMode 
                                ? 'bg-slate-700/50 border-slate-600/50 text-slate-200 placeholder-slate-400 focus:ring-purple-500/50 focus:border-purple-400' 
                                : 'bg-white/70 border-slate-200 text-slate-900 placeholder-slate-500 focus:ring-indigo-500/50 focus:border-indigo-400'
                            }
                            backdrop-blur-sm
                        `}
                    />
                </div>
            </div>

            {/* Users List */}
            <div className="space-y-2 sm:space-y-3">
                {loading ? (
                    <div className="flex justify-center items-center py-8 sm:py-12">
                        <div className={`
                            animate-spin h-6 w-6 sm:h-8 sm:w-8 rounded-full border-4 border-t-transparent
                            ${darkMode ? 'border-purple-500' : 'border-indigo-600'}
                        `}></div>
                        <span className={`ml-2 sm:ml-3 text-sm sm:text-base ${textSecondary}`}>Searching users...</span>
                    </div>
                ) : users.length === 0 ? (
                    <div className="text-center py-8 sm:py-12">
                        <div className={`text-4xl sm:text-6xl mb-3 sm:mb-4`}>👤</div>
                        <h3 className={`text-base sm:text-lg font-semibold ${textPrimary} mb-2`}>No users found</h3>
                        <p className={`text-sm sm:text-base ${textSecondary} px-4`}>
                            {filter ? `No users match "${filter}"` : 'Start typing to search for users'}
                        </p>
                    </div>
                ) : (
                    users.map(user => (
                        <User key={user._id} user={user} darkMode={darkMode} />
                    ))
                )}
            </div>

            {/* Users Count */}
            {users.length > 0 && (
                <div className="text-center pt-3 sm:pt-4 border-t border-gray-200/20">
                    <span className={`text-xs sm:text-sm ${textSecondary}`}>
                        {users.length} user{users.length !== 1 ? 's' : ''} found
                    </span>
                </div>
            )}
        </div>
    );
}

function User({ user, darkMode }) {
    const navigate = useNavigate();
    
    const textPrimary = darkMode ? 'text-slate-200' : 'text-gray-900';
    const textSecondary = darkMode ? 'text-slate-400' : 'text-gray-600';
    const cardClass = darkMode
        ? 'bg-slate-700/30 border border-slate-600/30 hover:bg-slate-600/40'
        : 'bg-white/50 border border-gray-200/50 hover:bg-gray-50/80';

    return (
        <div className={`
            ${cardClass}
            rounded-xl sm:rounded-2xl p-3 sm:p-4 transition-all duration-300 hover:scale-[1.01]
            backdrop-blur-sm shadow-lg hover:shadow-xl
            group
        `}>
            <div className="flex items-center justify-between space-x-3">
                {/* User Info */}
                <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                    {/* Avatar */}
                    <div className={`
                        w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0
                        bg-gradient-to-br from-indigo-500 to-purple-600
                        text-white font-bold text-sm sm:text-lg shadow-lg
                        transform transition-transform duration-300 group-hover:scale-110
                    `}>
                        {user.firstName[0].toUpperCase()}
                    </div>
                    
                    {/* User Details */}
                    <div className="min-w-0 flex-1">
                        <h4 className={`font-semibold text-sm sm:text-lg ${textPrimary} truncate`}>
                            {user.firstName} {user.lastName}
                        </h4>
                        <p className={`text-xs sm:text-sm ${textSecondary} truncate`}>
                            @{user.username?.split('@')[0] || 'user'}
                        </p>
                    </div>
                </div>

                {/* Send Money Button */}
                <button
                    onClick={() => {
                        navigate("/send?id=" + user._id + "&name=" + user.firstName + " " + user.lastName)
                    }}
                    className={`
                        px-3 py-2 sm:px-6 sm:py-2.5 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm flex-shrink-0
                        transition-all duration-300 ease-out transform hover:scale-105
                        focus:outline-none focus:ring-4 focus:ring-offset-2
                        bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700
                        text-white shadow-lg border border-emerald-400/30
                        ${darkMode ? 'focus:ring-emerald-500/50 focus:ring-offset-slate-800' : 'focus:ring-emerald-500/50 focus:ring-offset-white'}
                        group/button relative overflow-hidden
                    `}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/button:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative flex items-center space-x-1 sm:space-x-2">
                        <span className="text-sm sm:text-base">💸</span>
                        <span className="hidden sm:inline">Send Money</span>
                        <span className="sm:hidden">Send</span>
                    </span>
                </button>
            </div>
        </div>
    );
}