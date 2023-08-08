import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAtaIlQIjpH4INO6bDYxfh7XMlA2_Rkss4',
  authDomain: 'bad-bank-c0c38.firebaseapp.com',
  projectId: 'bad-bank-c0c38',
  storageBucket: 'bad-bank-c0c38.appspot.com',
  messagingSenderId: '802391601177',
  appId: '1:802391601177:web:3ed03431d7254bcc30ba88',
};

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;