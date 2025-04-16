import fetchPosts, { Post } from "@/actions/posts"
import React from "react"

export default async function PostsPage() {
  try {
    const postsData = await fetchPosts()

    const posts = postsData?.posts || []

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Posts from User 1</h1>

        {posts.length === 0 ? (
          <p className="text-gray-500">No posts found.</p>
        ) : (
          <div className="grid gap-4">
            {posts.map((post: Post) => (
              <div
                key={post.id}
                className="bg-white shadow rounded-lg p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold">Post #{post.id}</h2>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    User ID: {post.userid}
                  </span>
                </div>
                <p className="text-gray-700">{post.content}</p>
              </div>
            ))}
          </div>
        )}

        {/* Debug section */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Debug Information</h2>
          <pre className="bg-gray-800 text-white p-4 rounded overflow-auto max-h-96">
            {JSON.stringify(postsData, null, 2)}
          </pre>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error in PostsPage:", error)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error loading posts</p>
          <p>{error instanceof Error ? error.message : "Unknown error occurred"}</p>
        </div>
      </div>
    )
  }
}
