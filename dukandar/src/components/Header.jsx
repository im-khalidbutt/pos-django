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
    localStorage.removeItem('user')
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
                {isLoggedIn && user?.is_shop_owner && (
                    <Link className="nav-link active" aria-current="page" to={'/'}>Home</Link>
                  )}
                </li>
                <li className="nav-item">
                  {isLoggedIn && user?.is_shop_owner && (
                    <Link className="nav-link" aria-current="page" to="/dashboard">
                      Dashboard
                    </Link>
                  )}
                </li>            
            </ul>
            <div> {isLoggedIn ? (
              <>
              <div className="dropdown d-flex ropdown-mb-custom">
        <a
          href="#"
          className="d-flex align-items-center link-dark-custom text-decoration-none dropdown-toggle"
          id="dropdownUser2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong className='text-white'>{user?.first_name + ' ' + user?.last_name}</strong>
        </a>
        <ul
          className="dropdown-menu text-small shadow dropdown-menu-mb-custom"
          aria-labelledby="dropdownUser2"
        >
          <li>
            <a className="dropdown-item" href="#">
              New project...
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Settings
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Profile
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item" onClick={handleLogout}>
              Sign out
            </a>
          </li>
        </ul>
      </div>
               {/* <Link className="btn btn-success" to={'/'}>Home</Link> 
               &nbsp;<button className="btn btn-danger" onClick={handleLogout}>Logout</button>  */}
           
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
