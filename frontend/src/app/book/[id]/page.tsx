'use client'

import React, { useRef } from "react";
import { useParams } from "next/navigation";
import { Button } from "@nextui-org/react";

import { AccountBookItem } from "@/types/AccountBookItem";
import { useAccountBook } from "@/hooks/useAccountBook";
import { useAccountBookSharerList } from "@/hooks/useAccountBookSharerList";

import AccountBookSharersBar from "@/components/AccountBookSharersBar";
import AccountBookItemList from "@/components/AccountBookItemList";
import AccountBookItemEditor from "@/components/modals/AccountBookItemEditor";
import DeleteAccountBookItem from "@/components/modals/DeleteAccountBookItem";

export default function AccountBook() {
  const routeParams = useParams();
  const id = Number(routeParams?.id);

  const editAccountBookItemRef = useRef<React.ElementRef<typeof AccountBookItemEditor>>(null);
  const deleteAccountBookItemRef = useRef<React.ElementRef<typeof DeleteAccountBookItem>>(null);

  const { accountBook, insertItem, updateItem, deleteItem } = useAccountBook(id);
  const { currentUserRole, currentSharerId, sharerList, insertSharer, updateSharer } = useAccountBookSharerList(id);

  const handleSharerCreateRequest = (name: string, role: string, email?: string) => {
      insertSharer(id, name, role, email);
  }

  const onEditAccountBookItem = (item: AccountBookItem) => {
    editAccountBookItemRef.current?.openEdit(item);
  }

  const onDeleteAccountBookItem = (item: AccountBookItem) => {
    deleteAccountBookItemRef.current?.open(item);
  }

  return (
    <div>
      {accountBook ? (
        <div>
          <Button onPress={() => editAccountBookItemRef.current?.openCreate()}>Create New Item</Button>
          <h1>{accountBook.name}</h1>
          <p>{accountBook.description}</p>
          <AccountBookSharersBar
            currentUserRole={currentUserRole}
            sharerList={sharerList}
            onCreateRequest={handleSharerCreateRequest}
            onRoleUpdateRequest={updateSharer}
          />
          <AccountBookItemList sharerList={sharerList} accountBookItemList={accountBook.items || []} onEdit={onEditAccountBookItem} onDelete={onDeleteAccountBookItem} />
          <AccountBookItemEditor ref={editAccountBookItemRef} accountBookId={accountBook.id} currentSharerId={currentSharerId} sharerList={sharerList} onCreateRequest={insertItem} onEditRequest={updateItem} />
          <DeleteAccountBookItem ref={deleteAccountBookItemRef} onDeleteRequest={deleteItem} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}