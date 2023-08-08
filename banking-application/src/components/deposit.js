import React, { useEffect } from 'react';
import useState from 'react-usestateref';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Card, UserContext } from './context';
import Swal from 'sweetalert2';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

function Deposit() {
  const ctx = React.useContext(UserContext);
  const [loggedUser, setLoggedUser, loggedUserRef] = useState('');
  const [balance, setBalance, balanceRef] = useState('');
  const [depositAmount, setDepositAmount, depositAmountRef] = useState('');
  const [email, setEmail, emailRef] = useState('');
  const [name, setName, nameRef] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setLoggedUser(user);
        setName(user.displayName);
        setEmail(user.email);
      } else {
        console.log('user is logged out');
      }
    });
  }, []);

  function balanceText() {
    if(balance === ''){
      return `Hello ${name}!`
    }
    return `Hello ${name}, your balance is: $${balance}`;
  }

  function handle() {
    fetch(`/account/update/${emailRef.current}/${depositAmountRef.current}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          // props.setStatus(JSON.stringify(data.value));
          // props.setShow(false);
          setBalance(data.value.balance)
          console.log('JSON:', data.value.balance);
          ctx.users.push({
            name: data.value.name,
            email: data.value.email,
            action: 'Deposit',
            balance: data.value.balance,
          });
        } catch (err) {
          // props.setStatus('Deposit failed')
          console.log('err:', text);
        }
      });
  }

  return (
    <Card
      // className="text-center"
      bgcolor="success"
      header="Deposit"
      title={balanceText()}
      body={
        <Formik
          initialValues={{ deposit: 0 }}
          validationSchema={Yup.object({
            deposit: Yup.number()
              .required(
                'What you entered is not a number!\nOnly enter numbers!'
              )
              .positive()
              // .round(),
              .integer(),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
              setDepositAmount(values.deposit);
              Swal.fire({
                title: 'Success!',
                text: "Gimme Mo'Money",
                icon: 'success',
                confirmButtonText: 'Cool',
              });
              handle();
            }, 400);
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <label htmlFor="deposit">Deposit Amount:</label>
              <br />
              <input
                id="deposit"
                type="number"
                min="0"
                // step='0.01'
                {...formik.getFieldProps('deposit')}
              />
              {formik.touched.deposit && formik.errors.deposit ? (
                <div>{formik.errors.deposit}</div>
              ) : null}
              <br />
              <button
                className="btn btn-light"
                disabled={!formik.isValid}
                type="submit"
              >
                DEPOSIT
              </button>
            </form>
          )}
        </Formik>
      }
    />
  );
}

export default Deposit;
