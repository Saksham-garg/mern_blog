import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from "react-router-dom"
import routes from "@/routes/routes.jsx"
import { store } from './stores/stores.js'
import { Provider } from 'react-redux'

const routesPath = createBrowserRouter(routes)
ReactDOM.createRoot(document.getElementById('root')).render(
     <Provider store={store}>
      <RouterProvider router={routesPath}>
      </RouterProvider>
     </Provider>
)
