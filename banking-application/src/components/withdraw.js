import React, { useEffect } from 'react';
import useState from 'react-usestateref';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Card, UserContext } from './context';
import Swal from 'sweetalert2';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

function Withdraw() {
  const ctx = React.useContext(UserContext);
  const [loggedUser, setLoggedUser, loggedUserRef] = useState('');
  const [balance, setBalance, balanceRef] = useState('');
  const [withdrawAmount, setwithdrawAmount, withdrawAmountRef] = useState('');
  const [email, setEmail, emailRef] = useState('');
  const [name, setName, nameRef] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // const uid = user.uid;
        setLoggedUser(user);
        setName(user.displayName);
        setEmail(user.email);
      } else {
        console.log('user is logged out');
      }
    });
  }, []);

  function balanceText() {
    if (balance === '') {
      return `Hello ${name}!`;
    }
    return `Hello ${name}, your balance is: $${balance}`;
  }

  function handle() {
    fetch(`/account/update/${emailRef.current}/-${withdrawAmountRef.current}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          setBalance(data.value.balance);
          console.log('JSON:', data.value.balance);
          ctx.users.push({
            name: data.value.name,
            email: data.value.email,
            action: 'Withdraw',
            balance: data.value.balance,
          });
        } catch (err) {
          Swal.fire({
            title: 'Not enough funds!',
            text: 'Work more and get paid!',
            icon: 'error',
            confirmButtonText: 'Return',
          });
          ctx.users.push({
            name: name,
            email: email,
            action: 'Rejected Withdrawl',
            // balance: balanceRef,
          });
          console.log('err:', text);
          console.log(err);
        }
      });
  }

  return (
    <Card
      bgcolor="warning"
      txtcolor="text-black"
      header="Withdraw"
      title={balanceText()}
      body={
        <Formik
          initialValues={{ withdraw: 0 }}
          validationSchema={Yup.object({
            withdraw: Yup.number()
              .required(
                'What you entered is not a number!\nOnly enter numbers!'
              )
              .positive()
              // .round(),
              .integer(),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              // alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
              setwithdrawAmount(values.withdraw);
              handle();
              Swal.fire({
                title: 'Withdrawl Successful!',
                text: 'You took my money!',
                icon: 'success',
                confirmButtonText: 'Not Cool',
              });
            }, 400);
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <label htmlFor="withdraw">Withdraw Amount:</label>
              <br />
              <input
                id="withdraw"
                type="number"
                min="0"
                // step='0.01'
                {...formik.getFieldProps('withdraw')}
              />
              {formik.touched.withdraw && formik.errors.withdraw ? (
                <div>{formik.errors.withdraw}</div>
              ) : null}
              <br />
              <button
                className="btn btn-light"
                disabled={!formik.isValid}
                type="submit"
              >
                WITHDRAW
              </button>
            </form>
          )}
        </Formik>
      }
    />
  );
}

export default Withdraw;
