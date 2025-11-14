import MovieProducts from "./components/MovieProducts"
import Header from "./components/Header"
import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import MovieDetail from "./components/MovieDetail"
import AdminView from "./components/AdminView"
import { getMoviesApi } from "./services/movieService"

function App() {

  const [movies, setMovies] = useState([])
  const [searchbarInput, setSearchbarInput ] = useState("")

  useEffect(() => {
    async function getAllMovies(){
      const allMovies = await getMoviesApi()

      setMovies(allMovies)
      // console.log("app moviearr:", converDataObjIdToNumber)
    }
    getAllMovies()
  }, [])

  

  const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchbarInput.toLowerCase()))

return (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header
              setSearchbarInput={setSearchbarInput}
              searchbarInput={searchbarInput}
            />
            <MovieProducts filteredMovies={filteredMovies} />
          </>
        }
      />
      <Route path="/movies/:id" element={<MovieDetail movies={movies} setMovies={setMovies}/>}/>
      <Route path="/admin" element={ <AdminView movies={movies} setMovies={setMovies}/>} />
    </Routes>
  </BrowserRouter>
)
}

export default App
