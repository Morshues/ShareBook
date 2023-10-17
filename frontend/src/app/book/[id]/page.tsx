'use client'

import React, { useRef } from "react";
import { useParams } from "next/navigation";
import { Link } from "@nextui-org/link";
import { AiOutlinePlus } from "react-icons/ai";

import { AccountBookItem } from "@/types/AccountBookItem";
import { useAccountBook } from "@/hooks/useAccountBook";
import { useAccountBookSharerList } from "@/hooks/useAccountBookSharerList";

import { CommonNavBar } from "@/components/CommonNavBar";
import AccountBookSharersBar from "@/components/AccountBookSharersBar";
import AccountBookItemList from "@/components/AccountBookItemList";
import AccountBookItemEditor from "@/components/modals/AccountBookItemEditor";
import DeleteAccountBookItem from "@/components/modals/DeleteAccountBookItem";

export default function AccountBook() {
  const routeParams = useParams();
  const id = Number(routeParams?.id);

  const editAccountBookItemRef = useRef<React.ElementRef<typeof AccountBookItemEditor>>(null);
  const deleteAccountBookItemRef = useRef<React.ElementRef<typeof DeleteAccountBookItem>>(null);

  const { accountBook, loading, sortDescriptor, sortItems, insertItem, updateItem, deleteItem } = useAccountBook(id);
  const { currentUserRole, currentSharerId, sharerList, insertSharer, updateSharer } = useAccountBookSharerList(id);

  const handleSharerCreateRequest = (name: string, role: string, email?: string) => {
      insertSharer(id, name, role, email);
  }

  const onCreateAccountBookItem = () => {
    if (accountBook == null) return;
    editAccountBookItemRef.current?.openCreate(accountBook.id);
  }

  const onEditAccountBookItem = (item: AccountBookItem) => {
    if (accountBook == null) return;
    editAccountBookItemRef.current?.openEdit(accountBook.id, item);
  }

  const onDeleteAccountBookItem = (item: AccountBookItem) => {
    deleteAccountBookItemRef.current?.open(item);
  }

  const actionComponents = [(
    // eslint-disable-next-line react/jsx-key
    <Link color="foreground" onClick={onCreateAccountBookItem}>
      <AiOutlinePlus size={30} />
    </Link>
  )]

  return (
    <div>
      <CommonNavBar title={accountBook?.name} actionComponents={accountBook ? actionComponents : []} />
      <div>
        <AccountBookSharersBar
          currentUserRole={currentUserRole}
          sharerList={sharerList}
          onCreateRequest={handleSharerCreateRequest}
          onRoleUpdateRequest={updateSharer}
        />
        <AccountBookItemList
          sharerList={sharerList}
          loading={loading}
          accountBookItemList={accountBook?.items || []}
          sortDescriptor={sortDescriptor}
          onSortRequest={sortItems}
          onEdit={onEditAccountBookItem}
          onDelete={onDeleteAccountBookItem}
        />
        <AccountBookItemEditor
          ref={editAccountBookItemRef}
          currentSharerId={currentSharerId}
          sharerList={sharerList}
          onCreateRequest={insertItem}
          onEditRequest={updateItem}
        />
        <DeleteAccountBookItem ref={deleteAccountBookItemRef} onDeleteRequest={deleteItem} />
      </div>
    </div>
  )
}