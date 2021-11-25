import React from 'react'
import './Nav.css'

export default function Nav() {
  const logout = () => {
    window.localStorage.clear()
    window.location.href =
      'https://trung-api-capstone1.herokuapp.com/auth/login'
  }
  return (
    <div className="menu">
      <nav
        className="navbar navbar-expand-sm navbar-light"
        style={{ backgroundColor: 'rgba(171, 210, 223, 0.829)' }}
      >
        <img src="./img/logo-capstone.png" alt="logo" />

        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        />
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <a className="nav-link" href="/Home">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/profile">
                Profile
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/resources">
                Resources
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/statistical">
                Statistical
              </a>
            </li>
            {/* <li className="navbar-nav mt-2 mt-lg-0">
              <a className="nav-link" href="/" onClick={logout}>
                Log Out
              </a>
            </li> */}
            {/* <li className="nav-item">
                                <a className="nav-link" href="#"><ion-icon name="person-outline" style={{ fontSize: '110%' }} /></a>
                            </li> */}
          </ul>
          <form className="form-inline my-2 my-lg-0">
            {/* <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              <ion-icon
                name="search-outline"
                style={{ fontSize: '120%', fontWeight: 'bolder' }}
              />
            </button> */}
            <li
              className="navbar-nav mt-2 mt-lg-0"
              style={{ fontSize: '16.5px', color: 'black' }}
            >
              <a className="nav-link" href="/" onClick={logout}>
                <ion-icon name="log-out-outline"></ion-icon> Log Out
              </a>
            </li>
          </form>
        </div>
      </nav>
    </div>
  )
}
