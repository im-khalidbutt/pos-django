import React from 'react'
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
import AuthProvider from './AuthProvider'

import {BrowserRouter , Route ,Routes} from "react-router-dom"

const App = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <main className="flex-grow-1 container p-4">
            <Routes> 
            <Route path='/' element={<Home />} />
            <Route path='/addshop' element={<AddShop />} />
            <Route path="/shop/:id" element={<ShopDetail />} />
            <Route path="/edit-shop/:id" element={<EditShop />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* <About /> */}
            {/* Add more components here */}
            </Routes>
          </main>
          <Footer />
        </div>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
