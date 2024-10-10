import { BrowserRouter, Routes, Route, } from 'react-router-dom'
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
// import withAuth from './components/WithAuth'



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/signin' element={<Signin />}></Route>
        <Route path='/failSignin'  element={<AfterFailSignin />} />
        {/* {<withAuth(Dashboard)}  */}
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/' element={<Dashboard />}></Route>
        {/* <Route path="/dashboard" element={withAuth(Dashboard )} /> */}
        {/* <Route path="/" element={withAuth(Dashboard )} /> */}
        <Route path='/send' element={<SendMoney />}></Route>
        <Route path='/Success' element={<AfterTransfer />}></Route>
        <Route path='/Fail' element={<AfterFailTransfer />}></Route>
        <Route path='/update' element={<UpdateInfo />}></Route>
        <Route path='/afterUpdate' element={<AfterUpdate />}></Route>
        <Route path='/afterFailUpdate' element={<AfterFailUpdate />}></Route>
        <Route path='/logout' element={<AfterLogout />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
