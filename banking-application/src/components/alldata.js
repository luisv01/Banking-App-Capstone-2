import React, { useEffect } from 'react';
import useState from 'react-usestateref';
import { Card, UserContext } from './context';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

function AllData() {
  const [email, setEmail, emailRef] = useState('');
  const ctx = React.useContext(UserContext);
  const dataArray = ctx.users.filter((u) => u.email === emailRef.current);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
      } else {
        console.log('user is logged out');
      }
    });
  }, []);

  return (
    <Card
      bgcolor="info"
      txtcolor="text-black"
      header="All Data"
      //   style='46rem'
      body={
        <div>
          <ul className="list-group list-group-flush">
            {dataArray.map((item, key) => {
              return (
                <div key={key}>
                  <li className="list-group-item">
                    {item.email} - Transaction
                    :{' '}
                    {item.action} - Balance: ${item.balance}
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
      }
    ></Card>
  );
}

export default AllData;
