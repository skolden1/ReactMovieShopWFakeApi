//All crud ops for comments here

const API_URL = "http://localhost:3001/comments"

export async function getCommentsApi(id){
  const res = await fetch(`${API_URL}?movieId=${id}`)
  const data = await res.json()

  return data
}

export async function removeCommentApi(id){
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  })
  return res
}

export async function postCommentApi(commentObj){
  const res = await fetch(`${API_URL}`, {
    method: "POST",
    body: JSON.stringify(commentObj),
    headers: {"Content-Type": "application/json"}
  })
  const data = await res.json()
  return data
}

export async function submitEditApi(id, commentText){
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify({text: commentText}),
    headers: {"Content-Type":"application/json"}
  })
  const data = await res.json()
  return data
}