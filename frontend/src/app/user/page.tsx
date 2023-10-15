'use client'

import React, { useEffect, useRef } from 'react';
import { useRouter } from "next/navigation";
import { Link } from "@nextui-org/link";
import { AiOutlinePlus } from "react-icons/ai";
import { RiLogoutCircleLine } from "react-icons/ri";

import { clearToken } from "@/api/ApiClient";
import { AccountBook } from "@/types/accountBook";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import { useAccountBookList } from "@/hooks/useAccountBookList";

import { CommonNavBar } from "@/components/CommonNavBar";
import UserProfile from "@/components/UserProfile";
import AccountBookList from "@/components/AccountBookList";
import AccountBookEditor from "@/components/modals/AccountBookEditor";
import DeleteAccountBook from "@/components/modals/DeleteAccountBook";

export default function User() {
  const router = useRouter();

  const editAccountBookRef = useRef<React.ElementRef<typeof AccountBookEditor>>(null);
  const deleteAccountBookRef = useRef<React.ElementRef<typeof DeleteAccountBook>>(null);

  const { user: currentUser, loaded, isAuthenticated } = useCurrentUser();
  const { bookList, insertAccountBook, updateAccountBook, deleteAccountBook } = useAccountBookList();

  useEffect(() => {
    if (loaded && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loaded, router]);

  const signOut = () => {
    clearToken();
    router.push('/login');
  }

  const onEditAccountBook = (accountBook: AccountBook) => {
    editAccountBookRef.current?.openEdit(accountBook);
  };

  const onDeleteAccountBook = (accountBook: AccountBook) => {
    deleteAccountBookRef.current?.open(accountBook);
  };

  const actionComponents = [(
    // eslint-disable-next-line react/jsx-key
    <Link color="foreground" onClick={signOut}>
      <RiLogoutCircleLine size={30} />
    </Link>
  ), (
    // eslint-disable-next-line react/jsx-key
    <UserProfile user={currentUser} />
  ), (
    // eslint-disable-next-line react/jsx-key
    <Link color="foreground" onClick={editAccountBookRef.current?.openCreate}>
      <AiOutlinePlus size={30} />
    </Link>
  )];

  return (
    <div>
      <CommonNavBar actionComponents={actionComponents} />
      <AccountBookList accountBookList={bookList} onEdit={onEditAccountBook} onDelete={onDeleteAccountBook} />
      <AccountBookEditor ref={editAccountBookRef} onCreateRequest={insertAccountBook} onEditRequest={updateAccountBook} />
      <DeleteAccountBook ref={deleteAccountBookRef} onDeleteRequest={deleteAccountBook} />
    </div>
  )
}
