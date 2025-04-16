import axios from "axios"

// Create an axios instance with default configuration
const api = axios.create({
  baseURL: "http://20.244.56.144",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

// Add the authorization token to every request
api.interceptors.request.use(
  (config) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ0NzgzMDc3LCJpYXQiOjE3NDQ3ODI3NzcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImE4Y2JmNDcxLWRkMGQtNDAzMC1iOGQ2LTFhNzU4YTQyYjZiOSIsInN1YiI6ImFqYXlzaW5naDAxMTAzQGdtYWlsLmNvbSJ9LCJlbWFpbCI6ImFqYXlzaW5naDAxMTAzQGdtYWlsLmNvbSIsIm5hbWUiOiJhamF5IHNpbmdoIiwicm9sbE5vIjoiMjMzNzAxIiwiYWNjZXNzQ29kZSI6Ikh0UWR6USIsImNsaWVudElEIjoiYThjYmY0NzEtZGQwZC00MDMwLWI4ZDYtMWE3NThhNDJiNmI5IiwiY2xpZW50U2VjcmV0IjoidXlibXhnUkRTQnhDS3R2aCJ9.Sq3D1wOrhoYMUCA8ydn78kx3E1jfhFjMCyTtXBi34PY"

    // Set the Authorization header for every request
    config.headers.Authorization = `Bearer ${token}`

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Function to fetch users
export const fetchUsers = async () => {
  try {
    const response = await api.get("/evaluation-service/users")
    return response.data
  } catch (error) {
    console.error("Error fetching users:", error)
    throw error
  }
}

export default api
