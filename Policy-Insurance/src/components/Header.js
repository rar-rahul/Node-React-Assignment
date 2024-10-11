import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../reducer/userSlice';
import { filterData, clearFilter } from '../reducer/policySlice';
import { Link } from 'react-router-dom';

const Header = () => {
  const user = useSelector((state) => state.user);
  const policy = useSelector((state) => state.policy);

  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const [filterkey, SetFilterKey] = useState('');

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleDropdown = () => {
    setShowDropdown(true);
    console.log(showDropdown);
  };

  const handleChangeFilter = (e) => {
    const value = e.target.value.trim();
    SetFilterKey(value);
    if (value.length > 0) {
      dispatch(filterData(value));
    } else {
      dispatch(clearFilter());
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark container-fluid px-4 px-lg-5">
      <a className="navbar-brand" href="#">
        Logo
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link to={'/'} className="nav-link">
              Home <span className="sr-only"></span>
            </Link>
          </li>
          {policy.selectedPolicies.length > 1 && (
            <li className="nav-item active">
              <Link to={'/compare'} className="nav-link">
                Compare <span className="sr-only"></span>
              </Link>
            </li>
          )}
        </ul>

        {/* Centered Search Box */}
        <form className="mx-auto w-50 w-lg-50 d-flex mt-3 mt-lg-0">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search Policy here.."
            aria-label="Search"
            onChange={handleChangeFilter}
          />
        </form>

        <div className="d-flex align-items-center ml-auto">
          {user.isLoggedIn ? (
            <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {user.currentUser.name}
                </button>
                <div
                  className="dropdown-menu mr-5"
                  aria-labelledby="navbarDropdown"
                >

{user && user.currentUser?.role === 'user' && (
          <>
          
                  <li>
                    <Link to="/profile" className="dropdown-item">
                      My Profile
                    </Link>
                  </li>

                  <li>
                    <Link to={'/claim-history'} className="dropdown-item">
                      Claim History
                    </Link>
                  </li>
                  </>

)}
              {user && user.currentUser?.role === 'admin' && (
                <>
                 <li>
                    <Link to="/viewclaims" className="dropdown-item">
                     All Claims
                    </Link>
                  </li>

                  <li>
                    <Link to={'/viewpolicies'} className="dropdown-item">
                      Policy Purchase History
                    </Link>
                  </li>
                </>
              )}
                 

                  <li>
                    <Link className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </Link>
                  </li>
                </div>
              </li>
            </ul>
          ) : (
            <div className="d-flex mt-3 mt-lg-0 ml-auto">
              <Link to="/login" className="btn btn-outline-light me-2">
                Login
              </Link>
              <Link to="/register" className="btn btn-outline-light">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
