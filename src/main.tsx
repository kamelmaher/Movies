import { createRoot } from 'react-dom/client'
import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Layout from './Layout.tsx'
import App from './App.tsx'
import MovieDetails from './components/Movie/MovieDetails.tsx'
import Seasons from './components/Movie/Seasons.tsx'
import Actor from './components/Movie/Actor.tsx'
import DataContextProvider from './context/DataContextProvider.tsx'
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Layout />}>
            <Route path='/' element={<App />} />
            <Route path='/movie/:movieId' element={<MovieDetails />} />
            <Route path='serie/:serieId/seasons/:seasonNumber' element={<Seasons />} />
            <Route path='actor/:actorId' element={<Actor />} />
        </Route>
    )
)
createRoot(document.getElementById('root')!).render(
    <DataContextProvider>
        <RouterProvider router={router} />
    </DataContextProvider>

)
