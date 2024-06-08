import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Header } from './components/index.js'
import { createBrowserRouter,RouterProvider } from "react-router-dom"
import routes from "@/routes/routes.jsx"

const routesPath = createBrowserRouter(routes)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={routesPath}>
      </RouterProvider>
  </React.StrictMode>,
)