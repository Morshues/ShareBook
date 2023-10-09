'use client'

import React, { useRef } from "react";
import { useParams } from "next/navigation";

import { AccountBookItem } from "@/types/AccountBookItem";
import { useAccountBook } from "@/hooks/useAccountBook";

import AccountBookSharersBar from "@/components/AccountBookSharersBar";
import AccountBookItemList from "@/components/AccountBookItemList";
import CreateAccountBookItem from "@/components/modals/CreateAccountBookItem";
import EditAccountBookItem from "@/components/modals/EditAccountBookItem";
import DeleteAccountBookItem from "@/components/modals/DeleteAccountBookItem";

export default function AccountBook() {
  const routeParams = useParams();
  const id = Number(routeParams?.id);

  const editAccountBookItemRef = useRef<React.ElementRef<typeof EditAccountBookItem>>(null);
  const deleteAccountBookItemRef = useRef<React.ElementRef<typeof DeleteAccountBookItem>>(null);

  const { accountBook, insertItem, updateItem, deleteItem } = useAccountBook(id);

  const onEditAccountBookItem = (item: AccountBookItem) => {
    editAccountBookItemRef.current?.open(item);
  }

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
          <AccountBookSharersBar accountBookId={id} />
          <AccountBookItemList accountBookItemList={accountBook.items || []} onEdit={onEditAccountBookItem} onDelete={onDeleteAccountBookItem} />
          <EditAccountBookItem ref={editAccountBookItemRef} onEdited={updateItem} />
          <DeleteAccountBookItem ref={deleteAccountBookItemRef} onDeleted={deleteItem} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}