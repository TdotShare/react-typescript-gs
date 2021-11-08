import React from 'react';
import { render, screen } from '@testing-library/react';
import fireEvent from '@testing-library/user-event'
import App from './router/Routers';
//import LoginScrenn from './screen/auth/Login'


import { store } from './store/ConfigureStore'
import { Provider } from 'react-redux'

import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'



let persistor = persistStore(store)


test('Test Input Login Form Sucss', () => {
  render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider >
  );

  screen.getByLabelText("Email Address *")
  screen.getByLabelText("Password *")
  fireEvent.type(screen.getByLabelText('Email Address *'), 'neo.tdot@gmail.com')
  fireEvent.type(screen.getByLabelText('Password *'), 'neo2539')
  fireEvent.click(screen.getByText(/Sign In/i))

  setTimeout(() => {

    screen.getByLabelText("MISIRD - GS")

  }, 1000);


});

test('Test Input Login Form Error Incomplete', () => {
  render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider >
  );

  screen.getByLabelText("Email Address *")
  screen.getByLabelText("Password *")
  fireEvent.type(screen.getByLabelText('Email Address *'), 'neo.tdot@gmail.com')
  //fireEvent.type(screen.getByLabelText('Password *'), '')
  fireEvent.click(screen.getByText(/Sign In/i))

  setTimeout(() => {
    const errorForm = screen.getByLabelText("กรุณากรอกข้อมูลให้ครบ !")
    expect(errorForm).toBeInTheDocument()
  }, 1000);

  

});