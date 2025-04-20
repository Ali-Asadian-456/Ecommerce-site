import React, { Children, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ProductContextProvider } from './context/ProductContext';
import { UserProvider } from "./context/UserContext"; // Ensure correct import

import Products from './pages/Products';
import Cart from './pages/Cart';
import Success from './pages/Success';
import Dashboard from './pages/Dashboard';
import UserEdit from './pages/UserEdit';
import PurchaseHistory from './pages/PurchaseHistory';



import { createBrowserRouter,Router,RouterProvider } from 'react-router-dom';
const router =createBrowserRouter([
{
  path: '/' ,
  element:<App /> ,
    children: [
      {
        resetProducts:true,
        path:'/:category?',
        element: <Products/>

      },
      {
        path:'/cart',
        element: <Cart/>

      },
      {
        path:'/success',
        element: <Success/>

      },
    
      {
        path:'/dashboard',
        element: <Dashboard/> ,

        children: [

          {
            path:'useredit', // Changed to relative path
            element: <UserEdit/>
    
          },
          {
            path:'purchasehistory', // Changed to relative path
            element: <PurchaseHistory/>
    
          },


        ]

      },
    
      
    ]

}

])

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
     <ProductContextProvider>
      <UserProvider>
          <RouterProvider router={router}/>
       </UserProvider>
      </ProductContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
