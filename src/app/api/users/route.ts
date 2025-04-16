import { NextResponse } from "next/server"
import { fetchUsers } from "@/utils/api"

export async function GET() {
  try {
    console.log("Server-side API route: Fetching users with axios utility")

    const data = await fetchUsers()

    console.log("API Response received successfully")

    return NextResponse.json(data)
  } catch (error: any) {
    console.error("Error in API route:", error)

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
