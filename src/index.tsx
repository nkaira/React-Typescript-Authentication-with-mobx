import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

import App from './components/App/App';
import AuthStore from './store/AuthStore';
import ContactsStore from './store/ContactsStore';

export const authStore = new AuthStore();
export const contactsStore = new ContactsStore();

export const Context = createContext({
  authStore, contactsStore
})

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <Context.Provider value={{
    authStore, contactsStore
  }}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Context.Provider>
);
