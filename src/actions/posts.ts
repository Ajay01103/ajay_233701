import axios from "axios"

export interface Post {
  id: number
  userid: number
  content: string
}

export interface PostsResponse {
  posts: Post[]
}

const fetchPosts = async (): Promise<PostsResponse> => {
  const url = "http://20.244.56.144/evaluation-service/users/1/posts"
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ0Nzg3NzUyLCJpYXQiOjE3NDQ3ODc0NTIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImE4Y2JmNDcxLWRkMGQtNDAzMC1iOGQ2LTFhNzU4YTQyYjZiOSIsInN1YiI6ImFqYXlzaW5naDAxMTAzQGdtYWlsLmNvbSJ9LCJlbWFpbCI6ImFqYXlzaW5naDAxMTAzQGdtYWlsLmNvbSIsIm5hbWUiOiJhamF5IHNpbmdoIiwicm9sbE5vIjoiMjMzNzAxIiwiYWNjZXNzQ29kZSI6Ikh0UWR6USIsImNsaWVudElEIjoiYThjYmY0NzEtZGQwZC00MDMwLWI4ZDYtMWE3NThhNDJiNmI5IiwiY2xpZW50U2VjcmV0IjoidXlibXhnUkRTQnhDS3R2aCJ9.y2KyoUYL_NHuUM9uJVNREuj8irgtM0C5FLLc63xzf9k"

  try {
    const response = await axios.get<PostsResponse>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error("Error fetching posts:", error)
    throw error
  }
}

export default fetchPosts
