import { Link } from "react-router-dom"

const MovieProducts = (props) => {

  const renderProducts = props.filteredMovies.map(mov => {
    return <div className="card" key={mov.id}>
        <img src={mov.imgUrl} alt={mov.title} />
        <h2>{mov.title}</h2>
        <h4>{mov.description}</h4>
        <p>{mov.price} kr</p>
        <Link to={`/movies/${mov.id}`}>
          <button>Visa mer</button>
        </Link>
    </div>
  })

  return (
    <div className="movies-container">
      {renderProducts}
    </div>
  )
}
export default MovieProducts