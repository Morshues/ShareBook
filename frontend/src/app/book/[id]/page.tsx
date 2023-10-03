'use client'

import React, { useRef } from "react";

import { AccountBookItem } from "@/types/AccountBookItem";
import { useAccountBook } from "@/hooks/useAccountBook";

import AccountBookItemList from "@/components/AccountBookItemList";
import CreateAccountBookItem from "@/components/modals/CreateAccountBookItem";
import DeleteAccountBookItem from "@/components/modals/DeleteAccountBookItem";

export default function AccountBook() {
  const deleteAccountBookItemRef = useRef<React.ElementRef<typeof DeleteAccountBookItem>>(null);

  const { accountBook, insertItem, deleteItem } = useAccountBook();


  const onDeleteAccountBookItem = (item: AccountBookItem) => {
    deleteAccountBookItemRef.current?.open(item);
  };

  return (
    <div>
      {accountBook ? (
        <div>
          <CreateAccountBookItem accountBookId={accountBook.id} onCreated={insertItem} />
          <h1>{accountBook.name}</h1>
          <p>{accountBook.description}</p>
          <AccountBookItemList accountBookItemList={accountBook.items || []} onEdit={() => {}} onDelete={onDeleteAccountBookItem} />
          <DeleteAccountBookItem ref={deleteAccountBookItemRef} onDeleted={deleteItem}/>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}