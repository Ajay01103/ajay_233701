import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <Link
      href="/users"
      className="text-3xl "
    >
      Click here to go Users Page
    </Link>
  )
}
