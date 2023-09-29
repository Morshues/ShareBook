import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';

import { getAccountBook } from "@/api/ApiClient";
import { AccountBook } from "@/types/accountBook";

export const useAccountBook = () => {
  const routeParams = useParams();
  const [id, setId] = useState<number | null>(null);
  const [book, setBook] = useState<AccountBook | null>(null);
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
      const bookResponse = await getAccountBook(id);
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

  return { accountBook: book, fetchBook, loading };
}
