import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'; // Import ThemeProvider
import Layout from './components/Layout/Layout.jsx';
import Home from './pages/Home/Home.jsx';
import Donate from './pages/Donate/Donate.jsx';
import { createTheme } from '@mui/material/styles'; // Import createTheme
import 'bootstrap/dist/css/bootstrap.min.css';



// Create your MUI theme
const theme = createTheme();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='donate' element={<Donate />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap your application inside ThemeProvider */}
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
