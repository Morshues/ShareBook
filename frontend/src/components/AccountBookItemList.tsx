import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@nextui-org/react";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";

import { AccountBookItem } from "@/types/AccountBookItem";

type AccountBookItemListProps = {
  accountBookItemList: AccountBookItem[];
  onEdit: (accountBookItem: AccountBookItem) => void;
  onDelete: (accountBookItem: AccountBookItem) => void;
};

const accountBookItemColumns = [
  {name: "Name", uid: "name"},
  {name: "Price", uid: "value"},
  {name: "Purchased Place", uid: "purchased_place"},
  {name: "Purchased At", uid: "purchased_at"},
  {name: "Created At", uid: "created_at"},
  {name: "Actions", uid: "actions"},
];

function AccountBookItemList({ accountBookItemList, onEdit, onDelete }: AccountBookItemListProps) {
  const handleEditClick = (accountBookItem: AccountBookItem) => () => {
    onEdit(accountBookItem);
  }

  const handleDeleteClick = (accountBookItem: AccountBookItem) => () => {
    onDelete(accountBookItem);
  }

  const renderCell = React.useCallback((accountBookItem: AccountBookItem, columnKey: React.Key) => {
    switch (columnKey) {
      case "name":
        return (
          <Tooltip
            content={accountBookItem.description}
            isDisabled={accountBookItem.description.trim().length == 0}
            placement={"right"}
            closeDelay={0}>
            <span>{accountBookItem.name}</span>
          </Tooltip>
        );
      case "value":
        return accountBookItem.value;
      case "purchased_place":
        return accountBookItem.purchasedPlace;
      case "purchased_at":
        let purchasedDate = new Date(accountBookItem.createdAt);
        return purchasedDate.toLocaleDateString();
      case "created_at":
        let createdDate = new Date(accountBookItem.createdAt);
        return `${createdDate.toLocaleDateString()} ${createdDate.toLocaleTimeString()}`;
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <span className="text-lg text-default-400 cursor-pointer hover:opacity-50" onClick={handleEditClick(accountBookItem)}>
              <MdModeEditOutline />
            </span>
            <span className="text-lg text-danger cursor-pointer hover:opacity-50" onClick={handleDeleteClick(accountBookItem)}>
              <RiDeleteBin7Fill />
            </span>
          </div>
        );
      default:
        return "";
    }
  }, []);

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={accountBookItemColumns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={accountBookItemList}>
        {(accountBookItem) => (
          <TableRow key={accountBookItem.id}>
            {(columnKey) => <TableCell>{renderCell(accountBookItem, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default AccountBookItemList;
