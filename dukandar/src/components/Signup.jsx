import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import registerImg from '../assets/register.jpg'; // adjust path if needed

const Signup = () => {
  const [username, setUserName] = useState('')
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleRegisteration = async (e) => {
    e.preventDefault();
    setLoading(true)
    const userData = {
      username, email, password,first_name, last_name
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/register/', userData)
       // ✅ Clear form fields after success
        setUserName('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');

      setErrors({})
      setSuccess(true)
      
    } catch(error) {
      setErrors(error.response.data)
      console.log('error.data', error.response.data)
    }finally{
      setLoading(false)
    }
  }
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);
  return (
    <>
    <br/>
        <div className="row justify-content-center">
        <div className="col-md-7 bg-light-dark p-5 rounded">
        <img
            src={registerImg}
            alt="Register Visual"
            className="img-fluid h-100 w-100"
            style={{ objectFit: 'cover' }}
            />
        </div>
          <div className="col-md-5 bg-light-dark p-5 rounded">
            <h3 className='text-center mb-4'>Create an Account</h3>
            <form onSubmit={handleRegisteration}>
            <div className="mb-3">
                <input type="text" className='form-control ' placeholder='First Name' value={first_name}  onChange={(e)=>setFirstName(e.target.value)}/>
                <small>{errors.first_name && <div className='text-danger'>{errors.first_name}</div>}</small>
              </div> 
              <div className="mb-3">
                <input type="text" className='form-control ' placeholder='Last Name' value={last_name}  onChange={(e)=>setLastName(e.target.value)}/>
                <small>{errors.last_name && <div className='text-danger'>{errors.last_name}</div>}</small>
              </div> 
              <div className="mb-3">
                <input type="text" className='form-control ' placeholder='Username' value={username}  onChange={(e)=>setUserName(e.target.value)}/>
                <small>{errors.username && <div className='text-danger'>{errors.username}</div>}</small>
              </div> 
              <div className="mb-3">
                <input type="email" className='form-control' placeholder='Email Address' value={email}  onChange={(e)=>setEmail(e.target.value)}/>
                <small>{errors.email && <div className='text-danger'>{errors.email}</div>}</small>
              </div> 
              <div className="mb-3  ">
                <input type="password" className='form-control' placeholder='Set Password' value={password}  onChange={(e)=>setPassword(e.target.value)}/>
                <small>{errors.password && <div className='text-danger'>{errors.password}</div>}</small>
              </div> 
              {success && <div className='alert alert-success'>
                Registeration Successful
                </div>}
                {loading ? (
                  <button type='submit' className='btn btn-info d-block mx-auto' disabled><FontAwesomeIcon icon={faSpinner} spin/> Please Wait...</button>
                ): (
                  <button type='submit' className='btn btn-info d-block mx-auto'>Register</button>
                )}
              {/* <button type='submit' className='btn btn-info d-block mx-auto'>Register</button> */}
            </form>

          </div>
        </div>
    </>
  )
}

export default Signup
