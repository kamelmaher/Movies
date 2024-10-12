import { createRoot } from 'react-dom/client'
import './App.css'
import { createBrowserRouter, createRoutesFromElements , Route, RouterProvider } from "react-router-dom"
import Layout from './Layout.tsx'
import { Provider } from 'react-redux'
import {Store} from "./Store/Store.ts"
import App from './App.tsx'
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element= {<Layout />}>
            <Route path='/' element={<App />}/>
        </Route>
    )
)
createRoot(document.getElementById('root')!).render(
    <Provider store={Store}>
        <RouterProvider router={router} />
    </Provider>

)
