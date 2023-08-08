import React, { useEffect } from 'react';
import useState from 'react-usestateref';
import { UserContext, Card } from './context';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

// function Balance() {
//   const ctx = React.useContext(UserContext);
//   const [balance, setBalance, balanceRef] = useState(
//     ctx.users[ctx.users.length - 1].balance
//   );
//   let balanceText = `${ctx.users[ctx.users.length - 1].name}'s Balance is: $${
//     ctx.users[ctx.users.length - 1].balance
//   }.`;
//   return (
//     <div className="p-5 mb-4 text-white bg-info rounded-3">
//       <div className="container-fluid py-5">
//         <h1 className="display-5 fw-bold text-black">{balanceText}</h1>
//       </div>
//     </div>
//   );
// }

function Balance() {
  const ctx = React.useContext(UserContext);
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [email, setEmail, emailRef] = useState('');
  const [balance, setBalance, balanceRef] = useState('');
  // const [loggedUser, setLoggedUser, loggedUserRef] = useState('');
  const [name, setName, nameRef] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // setLoggedUser(user);
        setName(user.displayName);
        setEmail(user.email);
        console.log(emailRef.current);
      } else {
        console.log('user is logged out');
      }
    });
  }, []);

  function handle() {
    fetch(`/account/findOne/${email}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          setBalance(data.balance);
          console.log('JSON:', data.balance);
          console.log(balanceRef.current);
          ctx.users.push({
            name: data.name,
            email: data.email,
            action: 'Check Balance',
            balance: data.balance,
          });
          setShow(false);
        } catch (err) {
          console.log('err:', text);
        }
      });
  }

  function clearForm() {
    setShow(true);
  }

  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={
        show ? (
          <button className="btn btn-light" onClick={handle} type="submit">
            Get Balance
          </button>
        ) : (
          <>
            <h5>Success!</h5>
            <h5>
              Hello {name}. Your balance is: ${balanceRef.current}!
            </h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              Back
            </button>
          </>
        )
      }
    />
  );
}

export default Balance;
