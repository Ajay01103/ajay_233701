import { NextRequest, NextResponse } from "next/server"
import axios from "axios"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const response = await axios.post(
      "http://20.244.56.144/evaluation-service/auth",
      body
    )

    return NextResponse.json(response.data, { status: 200 })
  } catch (error) {
    console.error("Error in auth proxy:", error)

    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        { error: "API Error", details: error.response.data },
        { status: error.response.status }
      )
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
