'use client'

import React from "react";
import { useAccountBook } from "@/hooks/useAccountBook";
import AccountBookItemList from "@/components/AccountBookItemList";
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
          <AccountBookItemList accountBookItemList={accountBook.items || []} onEdit={() => {}} onDelete={() => {}} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}