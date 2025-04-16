"use client"

import { useState, useEffect } from "react"
import { getUsers } from "@/data/user"

export default function UsersPage() {
  const [users, setUsers] = useState<{ [key: string]: string }>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // loading to demonstrate the loading state
    const timer = setTimeout(() => {
      setUsers(getUsers.users)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg">Loading users...</p>
        </div>
      </div>
    )
  }

  const userEntries = Object.entries(users)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Users Directory</h1>

      {userEntries.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="grid gap-6">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {userEntries.map(([id, name]) => (
                  <tr
                    key={id}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Alternative card view */}
          <h2 className="text-2xl font-bold mt-8 mb-4">Card View</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {userEntries.map(([id, name]) => (
              <div
                key={id}
                className="bg-white shadow rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="font-medium text-lg text-gray-900">{name}</div>
                <div className="text-sm text-gray-500">ID: {id}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
