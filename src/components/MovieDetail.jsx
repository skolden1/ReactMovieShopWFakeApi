import { FaTrash, FaPencilAlt } from "react-icons/fa"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
const MovieDetail = (props) => {

  const { id } = useParams()

  const [toggleComment, setToggleComment] = useState(false)

  const [comments, setComments] = useState([])

  const [editById, setEditById] = useState(null)

  useEffect(() => {
  async function getComments(){
    const res = await fetch(`http://localhost:3001/comments?movieId=${id}`)
    const data = await res.json()

    setComments(data)
  }
  getComments()
}, [id])


function toggleEdit(id){
  setEditById(prev => prev === id ? null : id)
}

function handleClick(){
  setToggleComment(prev => !prev)
}


if (!props.movies || props.movies.length === 0) {
return <p className="loader">Laddar filmdata...</p>
}

const movie = props.movies.find(mov => mov.id === id)

async function removeComment(id){
  fetch(`http://localhost:3001/comments/${id}`, {
    method: "DELETE"
  })

  setComments(prev => prev.filter(comment => comment.id !== id))
}

async function postComment(formData){
    const commentTxt = formData.get("comment")
    const name = formData.get("name")

    const commentObj = {
      username: name,
      text: commentTxt,
      movieId: movie.id,
      dateTime: new Date().toLocaleDateString()
    }

  const res = await fetch('http://localhost:3001/comments', {
      method: "POST",
      body: JSON.stringify(commentObj),
      headers: {"Content-Type": "application/json"}
    })
  
  const comment = await res.json()

  setComments(prev => [...prev, comment])
}

async function submitEdit(formData, id){
  const newText = formData.get("editText")

  const res = await fetch(`http://localhost:3001/comments/${id}`, {
    method: "PATCH",
    body: JSON.stringify({text: newText}),
    headers: {"Content-Type": "application/json"}
  })

  const editedComment = await res.json()

  setComments(prev => prev.map(c => c.id === editedComment.id ? editedComment : c))
  setEditById(null)
}

const renderComments = comments.map(comment => {
  const isEditing = editById === comment.id

  return (
    <div className="commentCard" key={comment.id}>

      {!isEditing && (
        <>
          <p>{comment.text}</p>

          <div className="comment-flex">
            <p className="datePara">{comment.dateTime}</p>
            <p className="author-para">Author: {comment.username}</p>

            <FaTrash
              className="trashIcon"
              onClick={() => removeComment(comment.id)}
            />

            <FaPencilAlt
              className="trashIcon"
              onClick={() => toggleEdit(comment.id)}
            />
          </div>
        </>
      )}

      {isEditing && (
        <form action={formData => submitEdit(formData, comment.id)}>
          <textarea
            name="editText"
            defaultValue={comment.text}
            rows="10"
            cols="50"
          ></textarea>

          <button type="submit">Spara</button>
          <button className="cancelBtn" type="button" onClick={() => toggleEdit(comment.id)}>Avbryt</button>
        </form>
      )}
    </div>
  )
})

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
      {/* todo visa alla kommentarer här? */}

    <section className="showComment-section">
      <h2>{`${comments.length > 0 ? "Kommentarer" : "Bli den första att kommentera"}`}</h2>
      {renderComments}
    </section>

    <section className={`${toggleComment ? "comment-section" : ""}`}>
        <button onClick={handleClick} className="comment-toggleClick">{`${toggleComment ? "X" : "Kommentera"}`}</button>
        {toggleComment && 
        <form action={postComment}>
          <h4>Kommentera</h4>
          <label htmlFor="commentText">Skriv en kommentar</label>
          <textarea name="comment" id="commentText" rows="4" cols="20"></textarea>
          <label htmlFor="name">Ditt namn</label>
          <input type="text" name="name" id="name" required/>
          <button type="submit">Kommentera</button>
        </form>}
    </section>

    </>
  )
}
export default MovieDetail