import React from 'react';
import useState from 'react-usestateref';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import { Card, UserContext } from './context';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(true);
  const ctx = React.useContext(UserContext);

  function handle() {
    fetch(`/account/login/${email}/${password}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          console.log('JSON:', data);
          ctx.users.push({
            name: data.name,
            email: data.email,
            action: 'Account Login',
            balance: data.balance,
          });
        } catch (err) {
          console.log('err:', text);
        }
      });
  }

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        handle();
        navigate('/');
        // console.log(`from firebase User: ${JSON.stringify(user)}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        if (error) {
          setShow(false);
        }
      });
  };

  const logBackIn = () => {
    setShow(true);
  };

  return (
    <Card
      bgcolor="dark"
      header="Login"
      // status={status}
      body={
        show ? (
          <main>
            <section>
              <div>
                <form>
                  <div>
                    <label htmlFor="email-address">Email address</label>
                    <br />
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      required
                      placeholder="Email address"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="password">Password</label>
                    <br />
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div>
                    <button onClick={onLogin}>Login</button>
                  </div>
                </form>

                <p className="text-sm text-white text-center">
                  No account yet?
                  <br />
                  <NavLink to="/createaccount">Create Account</NavLink>
                </p>
              </div>
            </section>
          </main>
        ) : (
          <>
            <h1>Invalid Credentials</h1>
            <p>
              Please <NavLink to="/createaccount">create an account </NavLink>{' '}
              or
              <NavLink onClick={logBackIn} to="/login">
                {' '}
                login
              </NavLink>
            </p>
          </>
        )
      }
    />
  );
};

export default Login;
