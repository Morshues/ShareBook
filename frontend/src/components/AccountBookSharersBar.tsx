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

  const { sharerList, insertSharer, updateSharer } = useAccountBookSharerList(accountBookId);

  const handleCreateRequest = (name: string, role: string) => {
    insertSharer(accountBookId, name, role);
  }

  return (
    <div className="flex">
      {sharerList.map(sharer =>
        <AccountBookSharerDot key={sharer.id} sharer={sharer} onRoleChangeRequest={updateSharer} />
      )}
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
    </div>
  );
}

export default AccountBookSharersBar;
