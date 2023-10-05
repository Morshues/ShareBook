import { useEffect, useState } from "react";

import { getAccountBook } from "@/api/ApiClient";
import { AccountBook } from "@/types/accountBook";
import { AccountBookItem } from "@/types/AccountBookItem";

export const useAccountBook = (accountBookId: number) => {
  const [accountBook, setAccountBook] = useState<AccountBook | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      return;
    }
    fetchBook().then(/* Do Nothing */);
  }, []);

  const fetchBook = async () => {
    setLoading(true);
    try {
      const bookResponse = await getAccountBook(accountBookId);
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

  const updateItem = (targetItem: AccountBookItem) => {
    setAccountBook(prevAccountBook => {
      if (prevAccountBook == null) return null;
      return {
        ...prevAccountBook,
        items: prevAccountBook.items?.map(item => item.id === targetItem.id ? targetItem : item)
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


  return { accountBook, fetchBook, loading, insertItem, updateItem, deleteItem };
}
