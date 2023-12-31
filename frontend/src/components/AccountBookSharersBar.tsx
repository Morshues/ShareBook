import React, { useRef } from "react";
import { Avatar } from "@nextui-org/react";
import { AiOutlinePlus } from "react-icons/ai";

import { AccountBookSharer } from "@/types/AccountBookSharer";

import AccountBookSharerDot from "@/components/AccountBookSharerDot";
import CreateSharerModal from "@/components/modals/CreateSharerModal";

type AccountBookSharersBarProps = {
  currentUserRole: string;
  sharerList: AccountBookSharer[];
  onCreateRequest: (name: string, role: string, email?: string) => void;
  onRoleUpdateRequest: (id: number, nextRole: string) => void;
};

function AccountBookSharersBar({ currentUserRole, sharerList, onCreateRequest, onRoleUpdateRequest }: AccountBookSharersBarProps) {
  const createSharerModalRef = useRef<React.ElementRef<typeof CreateSharerModal>>(null);

  const handleCreateSharerModalOpen = () => {
    createSharerModalRef.current?.open()
  }

  return (
    <div className="flex m-1">
      {sharerList.map((sharer, index) =>
        <AccountBookSharerDot index={index} currentUserRole={currentUserRole} key={sharer.id} sharer={sharer} onRoleChangeRequest={onRoleUpdateRequest} />
      )}
      {currentUserRole === 'OWNER' &&
        <>
          <Avatar
            isBordered
            size="sm"
            as="button"
            fallback={
              <AiOutlinePlus size={30} />
            }
            onClick={handleCreateSharerModalOpen}
          />
          <CreateSharerModal ref={createSharerModalRef} onCreatedRequest={onCreateRequest} />
        </>
      }
    </div>
  );
}

export default AccountBookSharersBar;
