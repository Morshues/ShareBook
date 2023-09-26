import { useCallback, useEffect, useState } from "react";

import { getBookList } from "@/api/ApiClient";
import { Book } from "@/types/book";

export const useBookList = () => {
  const [bookList, setBookList] = useState<Book[]>([]);

  const fetchBookList = useCallback(async () => {
    try {
      const bookListResponse = await getBookList();
      if (bookListResponse == null || bookListResponse.status != 'success') {
        return;
      }

      setBookList(bookListResponse.data);
    }
    catch (error) {
      setBookList([]);
    }
  }, []);

  useEffect(() => {
    fetchBookList().then(/* Do Nothing */);
  }, [fetchBookList]);

  const insertBook = (book: Book) => {
    setBookList(prevBookList => [...prevBookList, book]);
  }

  const updateBook = (updatedBook: Book) => {
    const newBookList = bookList.map(book =>
      book.id === updatedBook.id ? updatedBook : book
    );
    setBookList(newBookList);
  }

  const deleteBook = (id: number) => {
    setBookList(prevBookList => prevBookList.filter(book => book.id !== id));
  }

  return { bookList, fetchBookList, insertBook, updateBook, deleteBook };
}
