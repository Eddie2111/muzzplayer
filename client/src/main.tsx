import './index.css';

import React from 'react';

import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { Toaster } from 'sonner';

import { NextUIProvider } from '@nextui-org/react';

import App from './App';
import { AuthProvider } from './components/contexts/Auth-Context';
import Navigation from './components/ui/Navbar';
import Home from './pages/homePage';
import Login from './pages/login';
import Signup from './pages/signup';
import Test from './pages/test';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home",
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
    element: <Test />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <AuthProvider>
      <Toaster />
      <Navigation />
      <RouterProvider router={router} />
      </AuthProvider>
    </NextUIProvider>
  </React.StrictMode>
);
