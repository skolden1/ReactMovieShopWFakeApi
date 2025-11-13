import MovieProducts from "./components/MovieProducts"
import Header from "./components/Header"
import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import MovieDetail from "./components/MovieDetail"
import AdminView from "./components/AdminView"

function App() {

  const [movies, setMovies] = useState([])
  const [searchbarInput, setSearchbarInput ] = useState("")

  useEffect(() => {
    async function getMovies(){
      const response = await fetch("http://localhost:3001/movies")
      const data = await response.json()

      setMovies(data)
      // console.log("app moviearr:", converDataObjIdToNumber)
    }
    getMovies()
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
