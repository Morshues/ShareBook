import { useCallback, useEffect, useState } from "react";

import { createAccountBookSharer, getAccountBookSharers, updateRole } from "@/api/ApiClient";
import { AccountBookSharer } from "@/types/AccountBookSharer";

export const useAccountBookSharerList = (accountBookId: number) => {
  const [currentUserRole, setCurrentUserRole] = useState('VIEWER');
  const [accountBookSharerList, setAccountBookSharerList] = useState<AccountBookSharer[]>([]);

  const fetchAccountBookSharerList = useCallback(async () => {
    try {
      const response = await getAccountBookSharers(accountBookId);
      if (response == null || response.status != 'success') {
        return;
      }

      setCurrentUserRole(response.data.currentUserRole);
      setAccountBookSharerList(response.data.list);
    }
    catch (error) {
      setAccountBookSharerList([]);
    }
  }, []);

  useEffect(() => {
    fetchAccountBookSharerList().then(/* Do Nothing */);
  }, [fetchAccountBookSharerList]);

  const insertSharer = (id: number, name: string, role: string, email?: string) => {
    createAccountBookSharer(id, name, role, email).then(response => {
      const createdSharer = response.data;
      setAccountBookSharerList(prevList => [...prevList, createdSharer]);
    })
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

  return { currentUserRole, sharerList: accountBookSharerList, fetchSharerList: fetchAccountBookSharerList, insertSharer, updateSharer };
}
