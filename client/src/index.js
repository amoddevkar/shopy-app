import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { CartContextProvider } from "./cart/CartContext";

import { SnackbarProvider } from 'notistack';
ReactDOM.render(
  <> <SnackbarProvider >
    <CartContextProvider value={{ user: null, setUser() { } }}>

      <App />

    </CartContextProvider></SnackbarProvider>
  </>
  ,
  document.getElementById('root')
);

