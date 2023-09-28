'use client'

import React, { useEffect } from 'react';
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

import { clearToken } from "@/api/ApiClient";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import { useBookList } from "@/hooks/useBookList";

import UserProfile from "@/components/UserProfile";
import BookList from "@/components/BookList";
import CreateBook from "@/components/modals/CreateBook";

export default function User() {
  const router = useRouter();
  const { user: currentUser, loaded, fetchUser, isAuthenticated } = useCurrentUser();
  const { bookList, insertBook, deleteBook } = useBookList();

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

  return (
    <div>
      <Button onClick={signOut}>Sign out</Button>
      <Button onClick={fetchUser}>Refresh</Button>
      <CreateBook onBookCreated={insertBook} />
      <UserProfile user={currentUser} />
      <BookList bookList={bookList} onBookDelete={deleteBook} />
    </div>
  )
}
