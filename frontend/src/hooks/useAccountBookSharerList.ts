import { useCallback, useEffect, useState } from "react";

import { getAccountBookSharers, updateRole } from "@/api/ApiClient";
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

  const updateSharer = (id: number, newRole: string) => {
    updateRole(id, newRole).then(result => {
      const updatedRole = result.data;
      setAccountBookSharerList(prevList => prevList.map(sharer => {
        if (sharer.id === id) {
          sharer.role = updatedRole;
        }
        return sharer;
      }))
    })
  }

  return { sharerList: accountBookSharerList, fetchSharerList: fetchAccountBookSharerList, insertSharer, updateSharer };
}
