// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import ListingPage from './listing-page/listing-page';
import Navbar from './navbar/navbar';
import AddProducts from './add-products/add-products';
import CheckOut from './check-out/check-out';
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux';
import { store } from './store/store';
import Bill from './bill/bill';



function App() {
  

  return (
    <>
      <Provider store={store}>
        <Toaster />
        <Router>
          <Navbar/>

          <div className='container'>
            <Routes>
              <Route path='/' element={<ListingPage />} />
              <Route path='/addProducts' element={<AddProducts />} />
              <Route path='/checkOut' element={<CheckOut />} />
              <Route path='/bill' element={<Bill />} />
              </Routes>
          </div>
        </Router>
      </Provider>
    </>
  )
}

export default App
