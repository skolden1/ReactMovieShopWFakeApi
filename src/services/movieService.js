//All crud ops for movies here

const API_URL = "http://localhost:3001/movies"

export async function getMoviesApi(){
  const res = await fetch(API_URL)
  const data = await res.json()

  return data
}

export async function createMovieApi(movieObj){
  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(movieObj),
    headers: {"Content-Type": "application/json"}
  })
  const data = await res.json()
  return data
}

export async function deleteMovieApi(id){
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  })

  return res
}