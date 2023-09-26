import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

import { getBook } from "@/api/ApiClient";
import { Book } from "@/types/book";

export const useBook = () => {
  const router = useRouter();
  const [id, setId] = useState<number | null>(null);
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setId(Number(router.query.id));
  }, [router.query]);

  useEffect(() => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetchBook().then(/* Do Nothing */);
  }, [id]);

  const fetchBook = async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      const bookResponse = await getBook(id);
      if (bookResponse == null || bookResponse.status != 'success') {
        return;
      }

      setBook(bookResponse.data);
    }
    catch (error) {
      setBook(null);
    }
    finally {
      setLoading(false);
    }
  };

  return { book, fetchBook, loading };
}
