import React, {useContext, useState} from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../AuthProvider'
import axiosInstance from '../AxiosInstance'
const LoginPage = () => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true)
    const userData = {
      username, password
    } 

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/token/', userData)
      localStorage.setItem("accessToken", response.data.access)
      localStorage.setItem("refreshToken", response.data.refresh)
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setIsLoggedIn(true)
      const userRes = await axiosInstance.get('http://127.0.0.1:8000/api/user/v1/currentuser/', {
        headers: {
          Authorization: `Bearer ${response.data.access}`,
        },
      });
    
      const user = userRes.data;
      localStorage.setItem('user', JSON.stringify(user));
      // console.log('response.data', response.data)
      navigate('/')
    } catch(error) {
      console.log('error.data', error.response.data)
      setError('Invalid Credentials')
    }finally{
      setLoading(false)
    }

  }
  return (
    <>
        <div className="row justify-content-center">
        <div className="col-md-3 bg-light-dark p-5 rounded"></div>
          <div className="col-md-6 bg-light-dark p-5 rounded">
            <h3 className='text-center mb-4'>Login</h3>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <input type="text" className='form-control ' placeholder='Enter username' value={username}  onChange={(e)=>setUserName(e.target.value)}/>
              </div> 
              <div className="mb-3  ">
                <input type="password" className='form-control' placeholder='Enter password' value={password}  onChange={(e)=>setPassword(e.target.value)}/>
              </div> 
                {
                  error && <div className='text-danger'> {error}</div>
                }
                {
                  loading ? (
                  <button type='submit' className='btn btn-info d-block mx-auto' disabled><FontAwesomeIcon icon={faSpinner} spin/> Login...</button>
                ): (
                  <button type='submit' className='btn btn-info d-block mx-auto'>Login</button>
                )}
              {/* <button type='submit' className='btn btn-info d-block mx-auto'>Register</button> */}
            </form>

          </div>
          <div className="col-md-3 bg-light-dark p-5 rounded"></div>

        </div>
    </>
  )
}

export default LoginPage
