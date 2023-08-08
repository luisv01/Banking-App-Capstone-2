import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, app } from '../firebase';
import Swal from 'sweetalert2';
import { UserContext } from './context';
import useStateRef from 'react-usestateref';

function AuthNavBar() {
  const ctx = React.useContext(UserContext);
  const [authenticatedUser, setAuthenticatedUser, authenticatedUserRef] =
    useStateRef('');
  const location = useLocation();
  const [name, setName, nameRef] = useStateRef('');
  let u = '';

  // useEffect(() => {
  //   const listenAuth = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setAuthenticatedUser(user);
  //       setName(user.displayName)
  //     } else {
  //       setAuthenticatedUser(null);
  //     }
  //   });
  //   return () => {
  //     listenAuth();
  //   };
  // }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticatedUser(user);
        setName(user.displayName);
        console.log(`from authNave ${name}`);
      } else {
        setAuthenticatedUser(null);
      }
    });
  });

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out');
        console.log(`from signout ${JSON.stringify(ctx.users)}`);
        Swal.fire({
          title: 'Good Day!',
          text: 'Buh Bye!',
          icon: 'success',
          confirmButtonText: 'Back to BadBank',
        });
      })
      .catch((error) => console.log(`error is: ${error}`));
  };

  return (
    <>
      {authenticatedUser === null ? (
        <>
          <Tooltip id="createaccount" />
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
          {/* <Nav.Link href="#/createaccount/">Create Account</Nav.Link> */}
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
          </Link>
        </>
      ) : (
        <>
          {/* <p>Hello {authenticatedUser.displayName}!</p> */}
          <Link
            style={{ pointerEvents: 'none'}}
            className={'nav-link'}
          >
            Welcome {nameRef.current}!
          </Link>
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
          </Link>
          <Tooltip id="signout" />
          <Link
            data-tooltip-id="signout"
            data-tooltip-content="Get the heck out!"
            className={
              location.pathname === '/'
                ? 'nav-link links'
                : 'nav-link links-hov'
            }
            to="/"
            onClick={userSignOut}
          >
            Sign Out
          </Link>
        </>
      )}
    </>
  );
}

export default AuthNavBar;
