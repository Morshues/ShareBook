import { useEffect, useState } from "react";

import { getAccountBook, createAccountBookItem, updateAccountBookItem, deleteAccountBookItem } from "@/api/ApiClient";
import { CreateAccountBookItem, UpdateAccountBookItem } from "@/api/types/AccountBookItem";
import { AccountBook } from "@/types/accountBook";

export const useAccountBook = (accountBookId: number) => {
  const [accountBook, setAccountBook] = useState<AccountBook | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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

    if (loading) {
      return;
    }
    fetchBook().then(/* Do Nothing */);
  }, [accountBookId, loading]);

  const insertItem = (item: CreateAccountBookItem) => {
    createAccountBookItem(item).then(response => {
      setAccountBook(prevAccountBook => {
        if (prevAccountBook == null) return null;
        return {
          ...prevAccountBook,
          items: [...prevAccountBook.items || [], response.data]
        }
      });
    });
  }

  const updateItem = (targetItem: UpdateAccountBookItem) => {
    updateAccountBookItem(targetItem).then(response => {
      setAccountBook(prevAccountBook => {
        if (prevAccountBook == null) return null;
        return {
          ...prevAccountBook,
          items: prevAccountBook.items.map(item => item.id === response.data.id ? response.data : item)
        }
      });
    });
  }

  const deleteItem = (id: number) => {
    deleteAccountBookItem(id).then(() => {
      setAccountBook(prevAccountBook => {
        if (prevAccountBook == null) return null;
        return {
          ...prevAccountBook,
          items: prevAccountBook.items.filter(item => item.id !== id)
        }
      });
    })
  }


  return { accountBook, loading, insertItem, updateItem, deleteItem };
}
