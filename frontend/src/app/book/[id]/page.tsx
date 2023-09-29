'use client'

import { useAccountBook } from "@/hooks/useAccountBook";

export default function AccountBook() {
  const { accountBook } = useAccountBook();

  return (
    <div>
      {accountBook ? (
        <div>
          <h1>{accountBook.name}</h1>
          <p>{accountBook.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}