import axios from 'axios';
import './App.css'
import { useEffect, useState } from 'react';
import MoviesContainer from './components/Movie/MoviesContainer';
import { Category } from './components/types/Category';
import { useAppSelector } from './Store/Store';
import { Movie } from './Store/MovieSlice';
// import { Movie } from './Store/MovieSlice';
// import { Serie } from './components/types/Serie';


function App() {
  const [categories, setCategories] = useState<Category[]>([])
  const content = useAppSelector(state => state.Content.content)
  const [data, setData] = useState<Movie[]>([])
  const [selectedCategory, setSelectedCategory] = useState(-1)
  console.log("Content :", content)
  useEffect(() => {
    // Api Key : acecc2235b3b867602d49291bcc21926
    // https://api.themoviedb.org/3/movie/popular?api_key=&page=3&language=en-US
    // https://api.themoviedb.org/3/genre/movie/list?api_key=YOUR_TMDB_API_KEY
    // https://api.themoviedb.org/3/movie/popular?api_key=acecc2235b3b867602d49291bcc21926
    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=acecc2235b3b867602d49291bcc21926`).then(({ data }) => {
      setCategories(data.genres)
    })
    axios.get(`https://api.themoviedb.org/3/discover/${content}?api_key=acecc2235b3b867602d49291bcc21926&with_original_language=en`).then(({ data }) => {
      setData(data.results)
      console.log(data)
    })
    // axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=acecc2235b3b867602d49291bcc21926&with_original_language=ar`).then(({ data }) => {

    //   // Arabic Movies

    //   // console.log(data)
    // })
    // axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=acecc2235b3b867602d49291bcc21926&with_original_language=ar`).then(({ data }) => {

    //   // Arabic Series

    //   // console.log(data)
    // })
    // axios.get("https://api.themoviedb.org/3/discover/movie?language=en-US&api_key=acecc2235b3b867602d49291bcc21926").then((data) => {
    //   console.log(data.data.results)
    //   setMovies((data.data.results))
    // })
    // axios.get("https://api.themoviedb.org/3/discover/tv?language=en-US&api_key=acecc2235b3b867602d49291bcc21926").then(({ data }) => {
    //   console.log(data.results)
    //   setSeries(data.results)
    // })
    // axios.get("https://api.themoviedb.org/3/movie/popular?language=en-US&api_key=acecc2235b3b867602d49291bcc21926").then(({ data }) => {
    //   console.log(data.results)
    //   // setSeries(data.results)
    // })
  }, [content])

  return <div className='row mt-5'>
    <div className='col-md-9 p-0'>
      {/* <table className='table'>
        <thead>
          <tr>
            <th>name</th>
          </tr>
        </thead>
        <tbody>
          {data.map(e => {
            return <tr>
              <td>{e.name}</td>
            </tr>
          })}
        </tbody>
      </table> */}
      {
        data.length > 0 &&
        <MoviesContainer data={data} categories={categories} id={selectedCategory} />
      }
    </div>
    <aside className='col-md-2 p-0'>
      <div>
        <ul>
          <h4 className='mb-3'>Categories</h4>
          {
            categories.slice(0, 9).map((e, index) => {
              return <li key={index} className='category text-danger mb-3' onClick={() => {
                setSelectedCategory(e.id)
              }} >
                {e.name}
              </li>
            })
          }
        </ul>
      </div>
    </aside>
  </div>
}

export default App
