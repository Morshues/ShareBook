'use client'

import { useAccountBook } from "@/hooks/useAccountBook";
import CreateAccountBookItem from "@/components/modals/CreateAccountBookItem";

export default function AccountBook() {
  const { accountBook } = useAccountBook();

  return (
    <div>
      {accountBook ? (
        <div>
          <CreateAccountBookItem accountBookId={accountBook.id} />
          <h1>{accountBook.name}</h1>
          <p>{accountBook.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}