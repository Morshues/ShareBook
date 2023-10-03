import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';

import { getAccountBook } from "@/api/ApiClient";
import { AccountBook } from "@/types/accountBook";
import { AccountBookItem } from "@/types/AccountBookItem";

export const useAccountBook = () => {
  const routeParams = useParams();
  const [id, setId] = useState<number | null>(null);
  const [accountBook, setAccountBook] = useState<AccountBook | null>(null);
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

      setAccountBook(bookResponse.data);
    }
    catch (error) {
      setAccountBook(null);
    }
    finally {
      setLoading(false);
    }
  };

  const insertItem = (item: AccountBookItem) => {
    setAccountBook(prevAccountBook => {
      if (prevAccountBook == null) return null;
      return {
        ...prevAccountBook,
        items: [...prevAccountBook.items || [], item]
      }
    });
  }

  const deleteItem = (id: number) => {
    setAccountBook(prevAccountBook => {
      if (prevAccountBook == null) return null;
      return {
        ...prevAccountBook,
        items: prevAccountBook.items?.filter(item => item.id !== id)
      }
    });
  }


  return { accountBook, fetchBook, loading, insertItem, deleteItem };
}
