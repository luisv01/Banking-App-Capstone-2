import React from 'react';
import useState from 'react-usestateref';
import { NavLink, useNavigate } from 'react-router-dom';
import { Card, UserContext } from './context';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';

const CreateAccount = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const ctx = React.useContext(UserContext);

  function handle() {
    console.log(
      `from handle in create account ${username},${email},${password}`
    );
    const url = `/account/create/${username}/${email}/${password}`;
    (async () => {
      var res = await fetch(url);
      var data = await res.json();
      console.log(data);
    })();
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(auth.currentUser, { displayName: username });
        handle();
        ctx.users.push({
          name: username,
          email: email,
          action: 'Account Created',
          balance: 0,
        });
        Swal.fire({
          title: 'Success!',
          text: "Account Created Successfully!",
          icon: 'success',
          confirmButtonText: 'Login',
        });
        navigate('/login');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/email-already-in-use') {
          Swal.fire({
            title: 'Account already in use!',
            text: 'Please use a differnet email!',
            icon: 'error',
            confirmButtonText: 'Return',
          });
        }
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <Card
      bgcolor="dark"
      header="Create Account"
      // status={status}
      body={
        <main>
          <section>
            <div>
              <div>
                <form>
                  <div>
                    <label htmlFor="username">Username</label>
                    <br />
                    <input
                      type="text"
                      label="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder="Username"
                    />
                  </div>
                  <div>
                    <label htmlFor="email-address">Email address</label>
                    <br />
                    <input
                      type="email"
                      label="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Email address"
                    />
                  </div>

                  <div>
                    <label htmlFor="password">Password</label>
                    <br />
                    <input
                      type="password"
                      label="Create password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Password"
                    />
                  </div>

                  <button
                    className="btn btn-light"
                    type="submit"
                    onClick={onSubmit}
                  >
                    Sign up
                  </button>
                </form>

                <p>
                  Already have an account?
                  <br /> <NavLink to="/login">Login</NavLink>
                </p>
              </div>
            </div>
          </section>
        </main>
      }
    />
  );
};

export default CreateAccount;
