import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Dropdown } from "../components/Dropdown";
import { BASELINK } from './config';
import { useTheme } from "../App";

export function Dashboard() {
  const { darkMode, toggleDarkMode } = useTheme();

  const [user, setUser] = useState({ firstName: "U" });
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const isAuthenticated = () => !!localStorage.getItem('token');

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/signin');
      return;
    }
  }, [navigate]);

  useEffect(() => {
    setLoading(true);
    axios.get(`${BASELINK}/user/info`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    }).then((response) => {
      setUser(response.data.user);
      setBalance(response.data.balance);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
      // Optionally handle error, e.g., show a toast or log out
    });
  }, []);

  const bgClass = darkMode
    ? 'bg-gradient-to-br from-slate-900 via-purple-950 to-indigo-950 text-slate-100'
    : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-slate-900';

  const cardClass = darkMode
    ? 'bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 shadow-2xl shadow-purple-500/10'
    : 'bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl shadow-indigo-500/10';

  const textPrimary = darkMode ? 'text-purple-400' : 'text-indigo-700';
  const textSecondary = darkMode ? 'text-slate-400' : 'text-slate-600';
  const accentGradient = darkMode 
    ? 'bg-gradient-to-r from-purple-500 to-indigo-500' 
    : 'bg-gradient-to-r from-indigo-600 to-purple-600';

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${bgClass} relative overflow-hidden`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-1/2 -left-1/2 w-full h-full rounded-full blur-3xl opacity-10 transition-colors duration-300 ${darkMode ? 'bg-purple-500' : 'bg-blue-400'} animate-pulse`}></div>
        <div className={`absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full blur-3xl opacity-10 transition-colors duration-300 ${darkMode ? 'bg-indigo-500' : 'bg-purple-400'} animate-pulse`} style={{animationDelay: '2s'}}></div>
        <div className={`absolute top-1/4 left-1/3 w-72 h-72 sm:w-96 sm:h-96 rounded-full blur-2xl opacity-5 transition-colors duration-300 ${darkMode ? 'bg-cyan-400' : 'bg-pink-300'} animate-bounce`} style={{animationDuration: '8s'}}></div>
      </div>

      <div className="relative z-10 p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12">
        {/* Enhanced Header */}
        <header className={`
          ${cardClass} 
          rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 mb-4 sm:mb-6
          relative overflow-hidden
          border border-white/10
          transition-colors duration-300
        `}>
          {/* Header glassmorphism effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 pointer-events-none"></div>
          
          <div className="relative z-10 flex items-center justify-between">
            {/* Logo and Welcome Section */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className={`
                w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl ${accentGradient} 
                flex items-center justify-center text-white text-base sm:text-lg md:text-xl font-bold
                shadow-lg transform transition-transform duration-300 hover:scale-110
              `}>
                💳
              </div>
              <div>
                <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold ${textPrimary} tracking-tight`}>
                  QuickPay
                </h1>
                <p className={`text-xs sm:text-sm ${textSecondary} hidden sm:block`}>
                  Welcome back, {user.firstName || 'User'}! 👋
                </p>
              </div>
            </div>

            {/* Controls Section */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Enhanced Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`
                  group relative p-2 sm:p-2.5 rounded-lg sm:rounded-xl
                  transition-all duration-200 ease-out transform hover:scale-105
                  focus:outline-none focus:ring-2 focus:ring-offset-1
                  ${darkMode
                    ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-amber-500/30 focus:ring-amber-400/50"
                    : "bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-indigo-500/30 focus:ring-indigo-400/50"}
                  shadow-lg overflow-hidden
                `}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <span className="relative text-sm sm:text-base transform transition-transform duration-200 group-hover:scale-125">
                  {darkMode ? "☀️" : "🌙"}
                </span>
              </button>

              {/* User Dropdown */}
              <div className="relative">
                <Dropdown user={user} darkMode={darkMode} />
              </div>
            </div>
          </div>
        </header>

        {/* Enhanced Main Content */}
        <main className="space-y-4 sm:space-y-6 md:space-y-8">
          {loading ? (
            <div className={`
              ${cardClass} rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12
              flex flex-col justify-center items-center
              min-h-[300px] sm:min-h-[400px] relative overflow-hidden
              transition-colors duration-300
            `}>
              {/* Loading animation background */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent animate-pulse"></div>
              
              <div className="relative z-10 text-center">
                {/* Enhanced Loading Spinner */}
                <div className="relative mb-6 sm:mb-8">
                  <div className={`
                    animate-spin h-12 w-12 sm:h-16 sm:w-16 rounded-full border-4 border-t-transparent mx-auto
                    ${darkMode ? 'border-purple-500' : 'border-indigo-600'}
                  `}></div>
                  <div className={`
                    absolute inset-0 animate-ping h-12 w-12 sm:h-16 sm:w-16 rounded-full border-4 border-t-transparent mx-auto opacity-20
                    ${darkMode ? 'border-purple-400' : 'border-indigo-500'}
                  `}></div>
                </div>
                
                <h3 className={`text-xl sm:text-2xl font-bold ${textPrimary} mb-2`}>
                  Loading Your Dashboard
                </h3>
                <p className={`text-base sm:text-lg ${textSecondary}`}>
                  Fetching your latest financial data...
                </p>
                
                {/* Loading progress dots */}
                <div className="flex justify-center space-x-2 mt-4 sm:mt-6">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${darkMode ? 'bg-purple-500' : 'bg-indigo-600'} animate-bounce`}
                      style={{ animationDelay: `${i * 0.2}s` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Enhanced Balance Section */}
              <section className={`
                ${cardClass} rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10
                relative overflow-hidden group
                transform transition-all duration-300 hover:scale-[1.01] hover:shadow-3xl
                before:absolute before:inset-0 before:rounded-2xl sm:before:rounded-3xl before:p-[1px] 
                ${darkMode 
                  ? 'before:bg-gradient-to-br before:from-purple-500/20 before:via-transparent before:to-indigo-500/20' 
                  : 'before:bg-gradient-to-br before:from-blue-200/30 before:via-transparent before:to-purple-200/30'
                }
              `}>
                {/* Balance card glassmorphism effect */}
                <div className="absolute inset-[1px] rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                
                {/* Balance card floating elements */}
                <div className={`absolute top-2 right-2 sm:top-4 sm:right-4 w-16 h-16 sm:w-20 sm:h-20 rounded-full blur-xl opacity-20 ${darkMode ? 'bg-purple-400' : 'bg-indigo-400'} group-hover:opacity-30 transition-opacity duration-300`}></div>
                <div className={`absolute bottom-2 left-2 sm:bottom-4 sm:left-4 w-12 h-12 sm:w-16 sm:h-16 rounded-full blur-xl opacity-20 ${darkMode ? 'bg-indigo-400' : 'bg-purple-400'} group-hover:opacity-30 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl ${accentGradient} flex items-center justify-center text-white text-lg sm:text-xl mr-3 sm:mr-4 shadow-lg`}>
                      💰
                    </div>
                    <h2 className={`text-lg sm:text-xl md:text-2xl font-bold ${textPrimary}`}>Account Balance</h2>
                  </div>
                  <Balance value={balance} darkMode={darkMode} />
                </div>
              </section>

              {/* Enhanced Users Section */}
              <section className={`
                ${cardClass} rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10
                relative overflow-hidden group
                transform transition-all duration-300 hover:scale-[1.01] hover:shadow-3xl
                before:absolute before:inset-0 before:rounded-2xl sm:before:rounded-3xl before:p-[1px] 
                ${darkMode 
                  ? 'before:bg-gradient-to-br before:from-purple-500/20 before:via-transparent before:to-indigo-500/20' 
                  : 'before:bg-gradient-to-br before:from-blue-200/30 before:via-transparent before:to-purple-200/30'
                }
              `}>
                {/* Users card glassmorphism effect */}
                <div className="absolute inset-[1px] rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                
                {/* Users card floating elements */}
                <div className={`absolute top-3 right-3 sm:top-6 sm:right-6 w-20 h-20 sm:w-24 sm:h-24 rounded-full blur-xl opacity-20 ${darkMode ? 'bg-indigo-400' : 'bg-purple-400'} group-hover:opacity-30 transition-opacity duration-300`}></div>
                <div className={`absolute bottom-3 left-3 sm:bottom-6 sm:left-6 w-16 h-16 sm:w-20 sm:h-20 rounded-full blur-xl opacity-20 ${darkMode ? 'bg-purple-400' : 'bg-indigo-400'} group-hover:opacity-30 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-4 sm:mb-6">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl ${accentGradient} flex items-center justify-center text-white text-lg sm:text-xl mr-3 sm:mr-4 shadow-lg`}>
                      👥
                    </div>
                    <h2 className={`text-lg sm:text-xl md:text-2xl font-bold ${textPrimary}`}>Send Money</h2>
                  </div>
                  <Users darkMode={darkMode} />
                </div>
              </section>
            </>
          )}
        </main>

        {/* Footer Stats */}
        <footer className="mt-8 sm:mt-12 text-center">
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8 text-xs sm:text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className={textSecondary}>Secure Connection</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm sm:text-lg">🔒</span>
              <span className={textSecondary}>Bank-Level Security</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm sm:text-lg">⚡</span>
              <span className={textSecondary}>Instant Transfers</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}