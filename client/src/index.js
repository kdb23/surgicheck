import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'


const Rooter = () => <BrowserRouter><App /></BrowserRouter>

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<Rooter /> );


