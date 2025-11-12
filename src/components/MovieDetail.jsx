import { useState } from "react"
import { Link, useParams } from "react-router-dom"
const MovieDetail = (props) => {

  const [toggleForm, setToggleForm] = useState(false)

  const { id } = useParams()

  if (!props.movies || props.movies.length === 0) {
  return <p className="loader">Laddar filmdata...</p>
}

  const movie = props.movies.find(mov => mov.id === Number(id))


  async function editMovie(formData){
    const title = formData.get("title") || movie.title
    const desc = formData.get("description") || movie.description
    const price = formData.get("price") ? Number(formData.get("price")) : movie.price
    const img = formData.get("imgUrl") || movie.imgUrl

    const editMovie = {
      title: title,
      description: desc,
      price: price,
      imgUrl: img
    }

    const res = await fetch(`http://localhost:3001/movies/${movie.id}`, {
      method: "PUT",
      body: JSON.stringify(editMovie),
      headers: {"Content-Type": "application/json"}
    })
    const updatedMovie = await res.json()
    updatedMovie.id = Number(updatedMovie.id)
    props.setMovies(prev => prev.map(movie => movie.id === updatedMovie.id ? updatedMovie : movie))
    setToggleForm(false)
  }

  function handleClick(){
    setToggleForm(prev => !prev)
  }

  return (
    <>
      <div className="movieDetailContainer">
        <div className="card">
          <img src={movie.imgUrl} alt={movie.title} />
          <h2>{movie.title}</h2>
          <h4>{movie.description}</h4>
          <p>{movie.price} kr</p>
          <p>Mer info...</p>
          <p>Mer info...</p>
          <div className="button-flex">
            <Link to="/">
            <button>Tillbaka</button>
            </Link>
            <button onClick={handleClick}>Ändra</button>
          </div>  
        </div>
      </div>
    <div className={`${toggleForm ? "form-container" : ""}`}> 
      {toggleForm && 
        <form action={editMovie}>
          <label htmlFor="title">Ändra filmtitel: </label>
          <input type="text" name="title" id="title" placeholder={movie.title}/>
          <label htmlFor="description">Ändra beskrivning: </label>
          <input type="text" name="description" id="description" placeholder={movie.description}/>
          <label htmlFor="price">Ändra pris: </label>
          <input type="number" name="price" id="price" placeholder={movie.price}/>
          <label htmlFor="pic">Ändra bild: </label>
          <input type="text" id="pic" name="imgUrl" placeholder={movie.imgUrl}/>
          <button type="submit">Spara ändringar</button>
        </form>
      }
    </div> 
    </>
  )
}
export default MovieDetail