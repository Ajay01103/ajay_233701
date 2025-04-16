import { NextResponse } from "next/server"
import { fetchUsers } from "@/utils/api"

export async function GET() {
  try {
    console.log("Server-side API route: Fetching users with axios utility")

    // Use our utility function to fetch users
    const data = await fetchUsers()

    console.log("API Response received successfully")

    // Return the data to the client
    return NextResponse.json(data)
  } catch (error: any) {
    console.error("Error in API route:", error)

    // Return a detailed error response
    return NextResponse.json(
      {
        error: "Failed to fetch users",
        details: error.message || "Unknown error",
        response: error.response?.data,
      },
      { status: error.response?.status || 500 }
    )
  }
}
