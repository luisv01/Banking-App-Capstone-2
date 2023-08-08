import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle';
import './App.css';
import {
  Route,
  BrowserRouter,
  Routes,
  UserContext,
} from './components/context';
import NavBar from './components/navbar';
import Home from './components/home';
import Login from './components/login';
import CreateAccount from './components/createaccount';
import Withdraw from './components/withdraw';
import Deposit from './components/deposit';
import Balance from './components/balance';
import AllData from './components/alldata';
import axios from "axios";
import { initializeApp } from 'firebase/app';

function App() {
  return (
    <div className="container App-header">
      <BrowserRouter>
        <NavBar />
        <UserContext.Provider
          value={{
            users: [
              {
                // name: '',
                // email: '',
                // balance: 0,
              },
            ],
          }}
        >
          <div
            className="container d-flex justify-content-center"
            style={{ padding: '50px' }}
          >
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/createaccount/" element={<CreateAccount />} />
              <Route path="/login/" element={<Login />} />
              <Route path="/withdraw/" element={<Withdraw />} />
              <Route path="/deposit/" element={<Deposit />} />
              <Route path="/balance/" element={<Balance />} />
              <Route path="/alldata/" element={<AllData />} />
            </Routes>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
