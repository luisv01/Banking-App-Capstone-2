import React from 'react';
import { Routes, Route, Link, HashRouter, useLocation } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './navbar.css';
import { Tooltip } from 'react-tooltip';
import AuthNavBar from './authNavbar';
import { UserContext } from './context';

function NavBar() {
  const location = useLocation();
  const ctx = React.useContext(UserContext);
  return (
    <Navbar className='fs-5 text' collapseOnSelect expand="lg" bg="light" variant="light">
      <Tooltip id="home" />
      <Link
        data-tooltip-id="home"
        data-tooltip-content="Hello World from Bad Bank!"
        className={
          location.pathname === '/'
            ? 'navbar-brand links'
            : 'navbar-brand links-hov'
        }
        to="/"
      >
        BadBank
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto justify-content-end flex-grow-1 pe-3">
          <AuthNavBar />
          
          {/* <Tooltip id="createaccount" />
          <Link
            data-tooltip-id="createaccount"
            data-tooltip-content="Create a new bad account!"
            className={
              location.pathname === '/createaccount/'
                ? 'nav-link links'
                : 'nav-link links-hov'
            }
            to="/createaccount/"
          >
            Create Account
          </Link>
          <Tooltip id="login" />
          <Link
            data-tooltip-id="login"
            data-tooltip-content="Are you sure you want to login?"
            className={
              location.pathname === '/login/'
                ? 'nav-link links'
                : 'nav-link links-hov'
            }
            to="/login/"
          >
            Login
          </Link> */}
{/*           
          <Tooltip id="deposit" />
          <Link
            data-tooltip-id="deposit"
            data-tooltip-content="Show me the money!"
            className={
              location.pathname === '/deposit/'
                ? 'nav-link links'
                : 'nav-link links-hov'
            }
            to="/deposit/"
          >
            Deposit
          </Link>
          <Tooltip id="withdraw" />
          <Link
            data-tooltip-id="withdraw"
            data-tooltip-content="Don't take my money!"
            className={
              location.pathname === '/withdraw/'
                ? 'nav-link links'
                : 'nav-link links-hov'
            }
            to="/withdraw/"
          >
            Withdraw
          </Link>
          <Tooltip id="balance" />
          <Link
            data-tooltip-id="balance"
            data-tooltip-content="Not much left!"
            className={
              location.pathname === '/balance/'
                ? 'nav-link links'
                : 'nav-link links-hov'
            }
            to="/balance/"
          >
            Balance
          </Link>
          <Tooltip id="alldata" />
          <Link
            data-tooltip-id="alldata"
            data-tooltip-content="Everyone's cash!"
            className={
              location.pathname === '/alldata/'
                ? 'nav-link links'
                : 'nav-link links-hov'
            }
            to="/alldata/"
          >
            All Data
          </Link> */}

          {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

// function NavBar() {
//   return (
//     <>
//       <nav className="navbar navbar-expand-lg navbar-light bg-light">
//         <Link className="navbar-brand" to="/">
//           BadBank
//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-toggle="collapse"
//           data-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav">
//             <li className="nav-item">
//               <Link className="nav-link" to="/createaccount/">
//                 Create Account
//               </Link>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="#/login/">
//                 Login
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="#/deposit/">
//                 Deposit
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="#/withdraw/">
//                 Withdraw
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="#/balance/">
//                 Balance
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="#/alldata/">
//                 AllData
//               </a>
//             </li>
//           </ul>
//         </div>
//       </nav>
//     </>
//   );
// }

export default NavBar;
