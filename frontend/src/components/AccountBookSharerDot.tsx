import React from "react";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Selection
} from "@nextui-org/react";

import { AccountBookSharer } from "@/types/AccountBookSharer";

type AccountBookSharerProps = {
  sharer: AccountBookSharer;
  onRoleChangeRequest: (id: number, nextRole: string) => void
};

function AccountBookSharerDot({ sharer, onRoleChangeRequest }: AccountBookSharerProps) {
  const [role, setRole] = React.useState(sharer.role);

  const handleRoleChange = (s: Selection) => {
    let newRole = [...s][0] as string;
    onRoleChangeRequest(sharer.id, newRole);
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          isBordered
          size="sm"
          as="button"
          src={sharer.userImg}
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Account book sharer"
        variant="flat"
        disabledKeys={["profile", "fixedRole"]}
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={[role]}
        onSelectionChange={handleRoleChange}
      >
        <DropdownItem key="profile" textValue={"Profile"} className="h-14 gap-2">
          <p className="font-semibold">{sharer.userName}</p>
          <p className="font-semibold">{sharer.userEmail}</p>
        </DropdownItem>
        {sharer.role === 'OWNER' ? (
          <DropdownSection>
            <DropdownItem key="OWNER">OWNER</DropdownItem>
            <DropdownItem key="EDITOR">EDITOR</DropdownItem>
            <DropdownItem key="VIEWER">VIEWER</DropdownItem>
          </DropdownSection>
        ) : (
          <DropdownItem key="fixedRole">{sharer.role}</DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}

export default AccountBookSharerDot;
