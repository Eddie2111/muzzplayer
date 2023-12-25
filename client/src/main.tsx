import React from 'react'
import ReactDOM from 'react-dom/client'
import Navigation from './components/ui/Navbar'
import App from './App.tsx'
import Login from './pages/login'
import Signup from './pages/signup'
import Test from './pages/test'
import './index.css'
import {NextUIProvider} from "@nextui-org/react";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <div>404</div>,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/test",
    element: <Test/>,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <Navigation />
      <RouterProvider router={router} />
    </NextUIProvider>
  </React.StrictMode>,
)
