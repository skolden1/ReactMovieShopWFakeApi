
import { Link, useParams } from "react-router-dom"
const MovieDetail = (props) => {

  const { id } = useParams()

  if (!props.movies || props.movies.length === 0) {
  return <p className="loader">Laddar filmdata...</p>
}

  const movie = props.movies.find(mov => mov.id === id)


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
          </div>  
        </div>
      </div>
    </>
  )
}
export default MovieDetail