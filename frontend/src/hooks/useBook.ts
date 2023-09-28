import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';

import { getBook } from "@/api/ApiClient";
import { Book } from "@/types/book";

export const useBook = () => {
  const routeParams = useParams();
  const [id, setId] = useState<number | null>(null);
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setId(Number(routeParams?.id));
  }, [routeParams]);

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
