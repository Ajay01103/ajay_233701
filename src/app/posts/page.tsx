import fetchPosts from "@/actions/posts"
import React from "react"

const PostsPage = () => {
  const posts = fetchPosts()

  return <div>{JSON.stringify(posts)}</div>
}

export default PostsPage
