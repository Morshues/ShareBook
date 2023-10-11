import React, { useRef } from "react";
import { Avatar } from "@nextui-org/react";
import { AiOutlinePlus } from "react-icons/ai";

import { useAccountBookSharerList } from "@/hooks/useAccountBookSharerList";

import AccountBookSharerDot from "@/components/AccountBookSharerDot";
import CreateSharerModal from "@/components/modals/CreateSharerModal";

type AccountBookSharersBarProps = {
  accountBookId: number;
};

function AccountBookSharersBar({ accountBookId }: AccountBookSharersBarProps) {
  const createSharerModalRef = useRef<React.ElementRef<typeof CreateSharerModal>>(null);

  const { currentUserRole, sharerList, insertSharer, updateSharer } = useAccountBookSharerList(accountBookId);

  const handleCreateRequest = (name: string, role: string, email?: string) => {
    insertSharer(accountBookId, name, role, email);
  }

  return (
    <div className="flex">
      {sharerList.map(sharer =>
        <AccountBookSharerDot currentUserRole={currentUserRole} key={sharer.id} sharer={sharer} onRoleChangeRequest={updateSharer} />
      )}
      {currentUserRole === 'OWNER' ?
        <>
          <Avatar
            isBordered
            size="sm"
            as="button"
            fallback={
              <AiOutlinePlus size={30} />
            }
            onClick={createSharerModalRef.current?.open}
          />
          <CreateSharerModal ref={createSharerModalRef} onCreatedRequest={handleCreateRequest} />
        </>
      : ''}
    </div>
  );
}

export default AccountBookSharersBar;
