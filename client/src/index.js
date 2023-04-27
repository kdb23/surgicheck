import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {UserProvider} from './context/user';
import 'bootstrap/dist/css/bootstrap.min.css';


const Rooter = () => <UserProvider><BrowserRouter><App /></BrowserRouter></UserProvider>

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<Rooter /> );





