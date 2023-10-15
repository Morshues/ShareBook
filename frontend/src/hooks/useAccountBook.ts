import { useEffect, useState } from "react";
import { SortDescriptor } from "@nextui-org/react";

import { getAccountBook, createAccountBookItem, updateAccountBookItem, deleteAccountBookItem } from "@/api/ApiClient";
import { CreateAccountBookItem, UpdateAccountBookItem } from "@/api/types/AccountBookItem";
import { AccountBook } from "@/types/accountBook";

export const useAccountBook = (accountBookId: number) => {
  const [accountBook, setAccountBook] = useState<AccountBook | null>(null);
  const [loading, setLoading] = useState(false);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({});

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const bookResponse = await getAccountBook(accountBookId);
        if (bookResponse == null || bookResponse.status != 'success') {
          return;
        }

        setAccountBook(bookResponse.data);
        sortItems({column: "purchasedAt", direction: "descending"});
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
  }, [accountBookId]);

  const sortItems = (sortDescriptor: SortDescriptor) => {
    setSortDescriptor(sortDescriptor);
    setAccountBook(prevAccountBook => {
      if (prevAccountBook == null) return null;

      return {
        ...prevAccountBook,
        items: prevAccountBook?.items.sort((a, b) => {
          let first = a[sortDescriptor.column as keyof typeof a];
          let second = b[sortDescriptor.column as keyof typeof b];
          let cmp = 0;
          switch (typeof first) {
            case "number":
              cmp = (first as number) < (second as number) ? -1 : 1;
              break;
            case "string":
              cmp = (parseInt(first) || first) < (parseInt(second as string) || second) ? -1 : 1;
              break;
          }

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        })
      }
    })
  }

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


  return { accountBook, loading, sortDescriptor, sortItems, insertItem, updateItem, deleteItem };
}
