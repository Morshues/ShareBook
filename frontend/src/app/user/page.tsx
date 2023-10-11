'use client'

import React, { useEffect, useRef } from 'react';
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

import { clearToken } from "@/api/ApiClient";
import { AccountBook } from "@/types/accountBook";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import { useAccountBookList } from "@/hooks/useAccountBookList";

import UserProfile from "@/components/UserProfile";
import AccountBookList from "@/components/AccountBookList";
import AccountBookEditor from "@/components/modals/AccountBookEditor";
import DeleteAccountBook from "@/components/modals/DeleteAccountBook";

export default function User() {
  const router = useRouter();

  const editAccountBookRef = useRef<React.ElementRef<typeof AccountBookEditor>>(null);
  const deleteAccountBookRef = useRef<React.ElementRef<typeof DeleteAccountBook>>(null);

  const { user: currentUser, loaded, fetchUser, isAuthenticated } = useCurrentUser();
  const { bookList, insertAccountBook, updateAccountBook, deleteAccountBook } = useAccountBookList();

  useEffect(() => {
    if (loaded && !isAuthenticated) {
      redirectToLogin();
    }
  }, [isAuthenticated, loaded]);

  const signOut = () => {
    clearToken();
    redirectToLogin();
  }

  const redirectToLogin = () => {
    router.push('/login');
  };

  const onEditAccountBook = (accountBook: AccountBook) => {
    editAccountBookRef.current?.openEdit(accountBook);
  };

  const onDeleteAccountBook = (accountBook: AccountBook) => {
    deleteAccountBookRef.current?.open(accountBook);
  };

  return (
    <div>
      <Button onClick={signOut}>Sign out</Button>
      <Button onClick={fetchUser}>Refresh</Button>
      <Button onPress={() => editAccountBookRef.current?.openCreate()}>Create New Account Book</Button>
      <UserProfile user={currentUser} />
      <AccountBookList accountBookList={bookList} onEdit={onEditAccountBook} onDelete={onDeleteAccountBook} />
      <AccountBookEditor ref={editAccountBookRef} onCreateRequest={insertAccountBook} onEditRequest={updateAccountBook} />
      <DeleteAccountBook ref={deleteAccountBookRef} onDeleteRequest={deleteAccountBook} />
    </div>
  )
}
