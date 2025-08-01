import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div
      className="flex-shrink-0 p-3 bg-light py-3 d-flex flex-column min-vh-100"
      style={{ width: "280px" }}
    >
      <Link
        to={'/'}
        className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom"
      >
        <svg className="bi me-2" width="30" height="24">
          <use xlinkHref="#bootstrap"></use>
        </svg>
        <span className="fs-5 fw-semibold">Dukandar</span>
      </Link>
      <ul className="list-unstyled ps-0">
        {/* <li className="mb-1">
          <button
            className="btn btn-toggle align-items-center rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#home-collapse"
            aria-expanded="false"
          >
            Home
          </button>
          <div className="collapse" id="home-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <a href="#" className="link-dark rounded">
                  Overview
                </a>
              </li>
              <li>
                <a href="#" className="link-dark rounded">
                  Updates
                </a>
              </li>
              <li>
                <a href="#" className="link-dark rounded">
                  Reports
                </a>
              </li>
            </ul>
          </div>
        </li> */}
        <li className="mb-1">
          <button
            className="btn btn-toggle align-items-center rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#dashboard-collapse"
            aria-expanded="false"
          >
            Dashboard
          </button>
          <div className="collapse" id="dashboard-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <a href="#" className="link-dark rounded">
                  Overview
                </a>
              </li>
              <li>
                <a href="#" className="link-dark rounded">
                  Weekly
                </a>
              </li>
              <li>
                <a href="#" className="link-dark rounded">
                  Monthly
                </a>
              </li>
              <li>
                <a href="#" className="link-dark rounded">
                  Annually
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="mb-1">
          <button
            className="btn btn-toggle align-items-center rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#orders-collapse"
            aria-expanded="false"
          >
            Orders
          </button>
          <div className="collapse" id="orders-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <a href="#" className="link-dark rounded">
                  New
                </a>
              </li>
              <li>
                <a href="#" className="link-dark rounded">
                  Processed
                </a>
              </li>
              <li>
                <a href="#" className="link-dark rounded">
                  Shipped
                </a>
              </li>
              <li>
                <a href="#" className="link-dark rounded">
                  Returned
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="mb-1">
          <button
            className="btn btn-toggle align-items-center rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#item-collapse"
            aria-expanded="false"
          >
            Item
          </button>
          <div className="collapse" id="item-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <Link to={'/add-item'} className="link-dark rounded">
                  Add Item
                </Link>
              </li>
              <li>
                <a href="#" className="link-dark rounded">
                  Item Category
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="border-top my-3"></li>
        <li className="mb-1">
          <button
            className="btn btn-toggle align-items-center rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#account-collapse"
            aria-expanded="false"
          >
            Account
          </button>
          <div className="collapse" id="account-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <a href="#" className="link-dark rounded">
                  New...
                </a>
              </li>
              <li>
                <a href="#" className="link-dark rounded">
                  Profile
                </a>
              </li>
              <li>
                <a href="#" className="link-dark rounded">
                  Settings
                </a>
              </li>
              <li>
                <a href="#" className="link-dark rounded">
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>

      {/* <div className="dropdown d-flex justify-content-end mb-3 position-fixed bottom-0 dropdown-mb-custom p-2">
        <a
          href="#"
          className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
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
          <strong>mdo</strong>
        </a>
        <ul
          className="dropdown-menu text-small shadow"
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
            <a className="dropdown-item" href="#">
              Sign out
            </a>
          </li>
        </ul>
      </div> */}
    </div>
  )
}

export default Sidebar
