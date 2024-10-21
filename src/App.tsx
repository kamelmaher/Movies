import axios from 'axios';
import './App.css'
import { useEffect, useState } from 'react';
import MoviesContainer from './components/Movie/MoviesContainer';
import { useAppDispatch, useAppSelector } from './Store/Store';
import { Movie } from './Store/MovieSlice';
import { setCategory } from './Store/LinkSlice';

function App() {
  const content = useAppSelector(state => state.Link.content)
  const [data, setData] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errMessage, setErrMessage] = useState("is Loading...")
  const selectedCategory = useAppSelector(state => state.Link.category)
  const searchValue = useAppSelector(state => state.Search.search)
  const categories = useAppSelector(state => state.Category.categories)
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (searchValue != "") {

      // Search Movies
      axios.get(`https://api.themoviedb.org/3/search/${content}?api_key=acecc2235b3b867602d49291bcc21926&query=${searchValue}`).then(({ data }) => {
        setData(data.results)
      })
    } else {

      // Fetch All Movies
      axios.get(`https://api.themoviedb.org/3/discover/${content}?api_key=acecc2235b3b867602d49291bcc21926&with_original_language=en`).then(({ data }) => {
        setData(data.results)
        setIsLoading(false)
      }).catch(e => {
        setErrMessage(e.message)
      })
    }

  }, [content, searchValue])

  return <div className='row mt-5'>
    {
      !isLoading ?
        <div className='col-md-9 p-0'>
          {
            <MoviesContainer movies={data} />
          }
        </div> : <h3>{errMessage}</h3>
    }
    <aside className='col-md-2 p-0 d-none d-md-block'>
      <div>
        <ul>
          <h4 className='mb-3'>Categories</h4>
          {
            categories.slice(0, 9).map((e, index) => {
              return <li key={index} className={`${e.id == selectedCategory.id ? 'category mb-3 text-success' : 'category text-danger mb-3'}`} onClick={() => {
                dispatch(setCategory(e))
              }}>
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
