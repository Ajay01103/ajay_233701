"use client"

import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState({
    email: "",
    name: "ajay singh",
    rollNo: "233701",
    accessCode: "HtQdzQ",
    clientID: "a8cbf471-dd0d-4030-b8d6-1a758a42b6b9",
    clientSecret: "uybmxgRDSBxCKtvh",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      const response = await axios.post("/api/auth", formData)

      // Store the token in localStorage
      if (response.data && response.data.access_token) {
        localStorage.setItem("token", response.data.access_token)
        localStorage.setItem("token_type", response.data.token_type)
        localStorage.setItem("expires_in", response.data.expires_in.toString())

        setSuccess("Authentication successful! Token received and stored.")

        // Redirect to home page after successful login
        setTimeout(() => {
          router.push("/")
        }, 1500)
      } else {
        setError("Received response but no token found")
      }
    } catch (err) {
      console.error("Authentication error:", err)
      setError(err instanceof Error ? err.message : "Failed to authenticate")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Authentication Form
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Send authentication data to get bearer token
          </p>
        </div>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {success && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{success}</span>
          </div>
        )}

        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label
                htmlFor="email"
                className="sr-only"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="sr-only"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="rollNo"
                className="sr-only"
              >
                Roll Number
              </label>
              <input
                id="rollNo"
                name="rollNo"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Roll Number"
                value={formData.rollNo}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="accessCode"
                className="sr-only"
              >
                Access Code
              </label>
              <input
                id="accessCode"
                name="accessCode"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Access Code"
                value={formData.accessCode}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="clientID"
                className="sr-only"
              >
                Client ID
              </label>
              <input
                id="clientID"
                name="clientID"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Client ID"
                value={formData.clientID}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="clientSecret"
                className="sr-only"
              >
                Client Secret
              </label>
              <input
                id="clientSecret"
                name="clientSecret"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Client Secret"
                value={formData.clientSecret}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {isLoading ? "Authenticating..." : "Get Bearer Token"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
