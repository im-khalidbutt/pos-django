import React, {useContext} from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import AddShop from './components/AddShop'
import ShopDetail from './components/ShopDetail'
import EditShop from './components/EditShop'
import LoginPage from './components/LoginPage'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import "./App.css"
import Sidebar from './components/Sidebar'
import {BrowserRouter , Route ,Routes} from "react-router-dom"
import { AuthContext } from './AuthProvider'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'


const App = () => {
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)
  return (
    <>
        <BrowserRouter>
          <Header />
          <div className="container-fluid">
            <div className="row">
              {isLoggedIn && (
                <div className="col-3">
                  <Sidebar />
                </div>
              )}
              <div className={isLoggedIn ? 'col-9' : 'col-12'}>
                <br />
                <Routes>
                  <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
                  <Route path='/addshop' element={<PrivateRoute><AddShop /></PrivateRoute>} />
                  <Route path='/shop/:id' element={<PrivateRoute><ShopDetail /></PrivateRoute>} />
                  <Route path='/edit-shop/:id' element={<PrivateRoute><EditShop /></PrivateRoute>} />
                  <Route path='/login' element={<PublicRoute><LoginPage /></PublicRoute>} />
                  <Route path='/signup' element={<PublicRoute><Signup /></PublicRoute>} />
                  <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                </Routes>
              </div>
            </div>
          </div>
          <Footer />
        </BrowserRouter>
    </>
  )
}

export default App
