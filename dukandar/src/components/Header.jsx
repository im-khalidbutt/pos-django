import { Link, useNavigate} from 'react-router-dom'
import React, {useContext} from 'react'
import { AuthContext } from '../AuthProvider'

const Header = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)
  const  navigate = useNavigate()

  const handleLogout = () => {
    
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setIsLoggedIn(false)
    navigate('/login')
  }
  return (
    <>
      <nav className="navbar  bg-dark  navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" aria-current="page" to={'/'}>Dukandar</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ '--bs-scroll-height': '100px' }}>
                <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={'/'}>Home</Link>
                </li>
                <li className="nav-item">
                  {user.is_shop_owner && (
                    <>
                      <Link className="nav-link" aria-current="page" to={'/dashboard'}>Dashboard</Link>
                    </>
                  )
                  }
                </li>
                {/* <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Link
                </a>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
                </li> */}
            
            </ul>
            <div> {isLoggedIn ? (
              <>
               <Link className="btn btn-success" to={'/'}>Home</Link> 
               &nbsp;<button className="btn btn-danger" onClick={handleLogout}>Logout</button> 
           
            </>
            ) : (

              <>
               <Link className="btn btn-success" to={'/login'}>Login</Link> 
               &nbsp;<Link className="btn btn-success" to={'/signup'}>Signup</Link> 
              </>
              ) }


            </div>
            </div>
        </div>
        </nav>
    </>
  )
}

export default Header
