import React from "react";
import { Avatar } from "@nextui-org/react";
import { AiOutlinePlus } from "react-icons/ai";

import { useAccountBookSharerList } from "@/hooks/useAccountBookSharerList";

import AccountBookSharerDot from "@/components/AccountBookSharerDot";

type AccountBookSharersBarProps = {
  accountBookId: number;
};

function AccountBookSharersBar({ accountBookId }: AccountBookSharersBarProps) {
  const { sharerList, updateSharer } = useAccountBookSharerList(accountBookId);

  return (
    <div className="flex">
      {sharerList.map(sharer =>
        <AccountBookSharerDot key={sharer.id} sharer={sharer} onRoleChangeRequest={updateSharer} />
      )}
    </div>
  );
}

export default AccountBookSharersBar;
