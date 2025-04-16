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

  console.log("Fetching posts from:", url)
  console.log("Using token:", token.substring(0, 20) + "...")

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      timeout: 10000, // 10 seconds timeout
    })

    console.log("Response status:", response.status)
    console.log("Response headers:", response.headers)
    console.log("Response data:", JSON.stringify(response.data, null, 2))

    if (!response.data || typeof response.data !== "object") {
      console.error("Invalid response format:", response.data)
      return { posts: [] }
    }

    if (response.data.posts) {
      return response.data
    } else {
      if (Array.isArray(response.data)) {
        return { posts: response.data }
      } else {
        console.log("Unexpected response structure, returning raw data for debugging")
        return { posts: [{ id: 0, userid: 0, content: JSON.stringify(response.data) }] }
      }
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
      })
    } else {
      console.error("Non-Axios error:", error)
    }

    return { posts: [] }
  }
}

export default fetchPosts
