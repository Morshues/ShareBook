import { useCallback, useEffect, useState } from "react";

import { getAccountBookSharers } from "@/api/ApiClient";
import { AccountBookSharer } from "@/types/AccountBookSharer";

export const useAccountBookSharerList = (accountBookId: number) => {
  const [accountBookSharerList, setAccountBookSharerList] = useState<AccountBookSharer[]>([]);

  const fetchAccountBookSharerList = useCallback(async () => {
    try {
      const response = await getAccountBookSharers(accountBookId);
      if (response == null || response.status != 'success') {
        return;
      }

      setAccountBookSharerList(response.data);
    }
    catch (error) {
      setAccountBookSharerList([]);
    }
  }, []);

  useEffect(() => {
    fetchAccountBookSharerList().then(/* Do Nothing */);
  }, [fetchAccountBookSharerList]);

  const insertSharer = (sharer: AccountBookSharer) => {
    setAccountBookSharerList(prevList => [...prevList, sharer]);
  }

  const updateSharer = (updatedSharer: AccountBookSharer) => {
    setAccountBookSharerList(prevList => prevList.map(sharer => sharer.id === updatedSharer.id ? updatedSharer : sharer))
  }

  const deleteSharer = (id: number) => {
    setAccountBookSharerList(prevList => prevList.filter(sharer => sharer.id !== id));
  }

  return { sharerList: accountBookSharerList, fetchSharerList: fetchAccountBookSharerList, insertSharer, updateSharer, deleteSharer };
}
