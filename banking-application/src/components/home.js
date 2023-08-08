import React from 'react';
import { useEffect } from 'react';
import useState from 'react-usestateref';
import { Card } from './context';
import bankImage from './bank.png';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
// import { NavLink, useNavigate } from 'react-router-dom';

function Home() {
  const [user, setUser, userRef] = useState('');
  const [show, setShow] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setShow(false);
        console.log(user)
        console.log('user', user.email);
      } else {
        // console.log('user is logged out');
        setShow(true)
      }
    });
  }, []);

  return (
    <Card
      txtcolor="black"
      header={`Welcome to BadBank`}
      body={
        show ? (
          <div>
            <h2>Please create an account or login.</h2>
            <img src={bankImage} className="img-fluid" alt="Bank image" />
          </div>
        ) : (
          <div>
            <h1>Hello {user.displayName}</h1>
            <img src={bankImage} className="img-fluid" alt="Bank image" />
          </div>
        )
      }
    />
  );
}
export default Home;
