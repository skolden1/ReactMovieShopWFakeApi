import { useState } from "react"
import { Link } from "react-router-dom"
import { createMovieApi, deleteMovieApi, editMovieApi } from "../services/movieService"

const AdminView = (props) => {

  //placeholder pic (if user dsnt upload img, this will be default)
  const placeholderPic = "https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673.png"

  const [toggleForm, setToggleForm] = useState(false)
  const [editMovieId, setEditMovieId] = useState(null)

  const movieToEdit = props.movies.find(mov => mov.id === editMovieId)
  // console.log("MovieToEdit:", movieToEdit)

  function handleClick(id){
    if(editMovieId === id){
      setEditMovieId(null)
      setToggleForm(false)
    } else {
      setToggleForm(true)
      setEditMovieId(id)
    }
  }

  async function editMovie(formData){
    const title = formData.get("title") || movieToEdit.title
    const desc = formData.get("description") || movieToEdit.description
    const imgUrl = formData.get("picUrl") || movieToEdit.imgUrl 
    const price = formData.get("price") || movieToEdit.price

    const editMovieObj = {
      title,
      description: desc,
      imgUrl,
      price
    }

    const editedMovie = await editMovieApi(editMovieId, editMovieObj)
    
    props.setMovies(prev => prev.map(mov => mov.id == editedMovie.id ? editedMovie : mov))
    
    setToggleForm(prev => !prev)
  }

async function createMovie(formData){
    const title = formData.get("title")
    const desc = formData.get("description")
    const pictureUrl = formData.get("picUrl") || placeholderPic
    const price = formData.get("price")

    const newMovie = {
      id: String(Date.now()), //json api loves to change the type all the time, so i do this for now to always get a string
      title: title,
      description: desc,
      imgUrl: pictureUrl,
      price: price
    }

    const savedMovie = await createMovieApi(newMovie)

    props.setMovies(prev => [...prev, savedMovie])
  }

  async function removeMovieById(id){
    await deleteMovieApi(id)
    props.setMovies(prev => prev.filter(mov => mov.id !== id))
  }

  const renderMovies = props.movies.map(movie => {
    return <div className="movie-element" key={movie.id}>
        <img src={movie.imgUrl} />
        <h3>{`${movie.title} (${movie.price}kr)`}</h3>
        <button onClick={() => handleClick(movie.id)}>Ändra</button>
        <button onClick={() => removeMovieById(movie.id)}>Ta bort</button>
    </div>
  })

  return (
    <>
      <h1 className="admin-h1">AdminVY</h1>
      <Link className="bkHome" to="/">Tillbaka</Link>
    <div className="admin-container">
      <div className="movie-list">
        {renderMovies}
      </div>

      <section className="createMovie-section">
        <h3>Lägg till film</h3>
        <form action={createMovie}>
          <label htmlFor="title">Film titel </label>
          <input type="text" name="title" id="title"/>
          <label htmlFor="desc">Beskrivning </label>
          <input type="text" name="description" id="desc" />
          <label htmlFor="picurl">Bild url </label>
          <input type="text" name="picUrl" id="picurl" />
          <label htmlFor="price">Pris </label>
          <input type="number" name="price" id="price" />
          <button type="submit">Skapa</button>
        </form>  
      </section>
    </div>

    {toggleForm && 
    <div className={`${toggleForm ? "form-container" : ""} `}>
        <form action={editMovie}>
          <label htmlFor="e-title">Ändra titel</label>
          <input type="text" placeholder={movieToEdit.title} name="title" id="e-title"/>
          <label htmlFor="description">Ändra beskrivning</label>
          <input type="text" placeholder={movieToEdit.description} name="description" id="description"/>
          <label htmlFor="e-pickUrl">Ändra bild</label>
          <input type="text" placeholder={movieToEdit.imgUrl} name="picUrl" id="e-pickUrl"/>
          <label htmlFor="e-price">Ändra pris</label>
          <input type="number" placeholder={movieToEdit.price} name="price" id="e-price"/>
          <button type="submit">Spara ändringar</button>
        </form>
    </div>}
    </>
  )
}
export default AdminView