import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

/* Important Style Packages */
import "./style/styling.scss";

/* Plugin Packages */
import "@fortawesome/fontawesome-free/css/all.css";

import $ from 'jquery';
import '@popperjs/core';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'jquery.nicescroll/dist/jquery.nicescroll';

// Main Course
import App from './App';

// require("bootstrap/dist/js/bootstrap.bundle.min.js");
// require("jquery/dist/jquery.min.js");
// require("jquery.nicescroll/dist/jquery.nicescroll.js");

ReactDOM.render(
  <BrowserRouter>
    <App /> {/* The various pages will be displayed by the `Main` component. */}
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
