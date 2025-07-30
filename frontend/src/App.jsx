import React, { useState, createContext, useContext, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Dashboard } from './pages/Dashboard'
import { SendMoney } from './pages/SendMoney'
import { AfterTransfer } from './pages/SuccessTransfer'
import { AfterFailTransfer } from './pages/FailTransfer'
import { UpdateInfo } from './pages/UpdateInfo'
import { AfterUpdate } from './pages/AfterUpdate'
import { AfterFailUpdate } from './pages/FailUpdate'
import { AfterLogout } from './pages/SuccessLogout'
import { AfterFailSignin } from './pages/FailSignin'

// Create Theme Context
const ThemeContext = createContext()

export function useTheme() {
  return useContext(ThemeContext)
}

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Optional: persist theme in localStorage
    const savedTheme = localStorage.getItem('darkMode')
    return savedTheme === 'true' || false
  })

  // Persist theme preference
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev)
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <BrowserRouter>
        {/* You can add your toggle button here or inside any component */}
        {/* <button onClick={toggleDarkMode} style={{ position: 'fixed', top: 10, right: 10, zIndex: 1000 }}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button> */}

        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/failSignin' element={<AfterFailSignin />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/' element={<Dashboard />} />
          <Route path='/send' element={<SendMoney />} />
          <Route path='/Success' element={<AfterTransfer />} />
          <Route path='/Fail' element={<AfterFailTransfer />} />
          <Route path='/update' element={<UpdateInfo />} />
          <Route path='/afterUpdate' element={<AfterUpdate />} />
          <Route path='/afterFailUpdate' element={<AfterFailUpdate />} />
          <Route path='/logout' element={<AfterLogout />} />
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  )
}

export default App
