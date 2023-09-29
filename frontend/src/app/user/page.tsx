'use client'

import React, { useEffect, useRef } from 'react';
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

import { clearToken } from "@/api/ApiClient";
import { Book } from "@/types/book";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import { useBookList } from "@/hooks/useBookList";

import UserProfile from "@/components/UserProfile";
import BookList from "@/components/BookList";
import CreateBook from "@/components/modals/CreateBook";
import EditBook from "@/components/modals/EditBook";
import DeleteBook from "@/components/modals/DeleteBook";

export default function User() {
  const router = useRouter();

  const editBookRef = useRef<React.ElementRef<typeof EditBook>>(null);
  const deleteBookRef = useRef<React.ElementRef<typeof DeleteBook>>(null);

  const { user: currentUser, loaded, fetchUser, isAuthenticated } = useCurrentUser();
  const { bookList, insertBook, updateBook, deleteBook } = useBookList();

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

  const onEditBook = (book: Book) => {
    editBookRef.current?.open(book);
  };

  const onDeleteBook = (book: Book) => {
    deleteBookRef.current?.open(book);
  };

  return (
    <div>
      <Button onClick={signOut}>Sign out</Button>
      <Button onClick={fetchUser}>Refresh</Button>
      <CreateBook onBookCreated={insertBook} />
      <UserProfile user={currentUser} />
      <BookList bookList={bookList} onEditBook={onEditBook} onDeleteBook={onDeleteBook} />
      <EditBook ref={editBookRef} onBookEdited={updateBook} />
      <DeleteBook ref={deleteBookRef} onBookDeleted={deleteBook} />
    </div>
  )
}
