import { useCallback, useEffect, useState } from "react";

import { getAccountBookList } from "@/api/ApiClient";
import { AccountBook } from "@/types/accountBook";

export const useAccountBookList = () => {
  const [accountBookList, setAccountBookList] = useState<AccountBook[]>([]);

  const fetchAccountBookList = useCallback(async () => {
    try {
      const response = await getAccountBookList();
      if (response == null || response.status != 'success') {
        return;
      }

      setAccountBookList(response.data);
    }
    catch (error) {
      setAccountBookList([]);
    }
  }, []);

  useEffect(() => {
    fetchAccountBookList().then(/* Do Nothing */);
  }, [fetchAccountBookList]);

  const insertAccountBook = (accountBook: AccountBook) => {
    setAccountBookList(prevList => [...prevList, accountBook]);
  }

  const updateAccountBook = (updatedAccountBook: AccountBook) => {
    setAccountBookList(prevList => prevList.map(accountBook => accountBook.id === updatedAccountBook.id ? updatedAccountBook : accountBook))
  }

  const deleteAccountBook = (id: number) => {
    setAccountBookList(prevList => prevList.filter(accountBook => accountBook.id !== id));
  }

  return { bookList: accountBookList, fetchBookList: fetchAccountBookList, insertAccountBook, updateAccountBook, deleteAccountBook };
}
