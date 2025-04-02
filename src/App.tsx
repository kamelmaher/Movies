import './App.css'
import MoviesContainer from './components/Movie/MoviesContainer'
import Slider from './components/Slider'
import DataContextProvider from './context/DataContextProvider'

function App() {
  return (
    <DataContextProvider>
      <Slider />
      <MoviesContainer />
    </DataContextProvider>
  )
}

export default App
