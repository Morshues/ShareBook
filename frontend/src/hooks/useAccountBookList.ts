import { useCallback, useEffect, useState } from "react";

import {
  getAccountBookList,
  createAccountBook,
  updateAccountBook as apiUpdateAccountBook,
  deleteAccountBook as apiDeleteAccountBook,
} from "@/api/ApiClient";
import { AccountBook } from "@/types/accountBook";

export const useAccountBookList = () => {
  const [accountBookList, setAccountBookList] = useState<AccountBook[]>([]);

  const fetchAccountBookList = useCallback(async () => {
    try {
      const response = await getAccountBookList();
      if (response == null || response.status != 'SUCCESS') {
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

  const insertAccountBook = (name: string, description: string) => {
    createAccountBook({name, description}).then(response => {
      setAccountBookList(prevList => [...prevList, response.data]);
    })
  }

  const updateAccountBook = (id: number, name: string, description: string) => {
    apiUpdateAccountBook({id, name, description}).then(response => {
      const updatedAccountBook = response.data;
      setAccountBookList(prevList => prevList.map(accountBook => accountBook.id === updatedAccountBook.id ? updatedAccountBook : accountBook))
    })
  }

  const deleteAccountBook = (id: number) => {
    apiDeleteAccountBook(id).then(() => {
      setAccountBookList(prevList => prevList.filter(accountBook => accountBook.id !== id));
    })
  }

  return { bookList: accountBookList, fetchBookList: fetchAccountBookList, insertAccountBook, updateAccountBook, deleteAccountBook };
}
