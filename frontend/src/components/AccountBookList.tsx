import React from "react";
import Link from "next/link";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";

import { AccountBook } from "@/types/accountBook";

type AccountBookListProps = {
  accountBookList: AccountBook[];
  onEdit: (accountBook: AccountBook) => void;
  onDelete: (accountBook: AccountBook) => void;
};

const accountBookColumns = [
  {name: "Name", uid: "name"},
  {name: "Description", uid: "description"},
  {name: "Created At", uid: "created_at"},
  {name: "Actions", uid: "actions"},
];

function AccountBookList({ accountBookList, onEdit, onDelete }: AccountBookListProps) {

  const handleEditClick = React.useCallback((accountBook: AccountBook) => () => {
    onEdit(accountBook);
  }, [onEdit]);

  const handleDeleteClick = React.useCallback((accountBook: AccountBook) => () => {
    onDelete(accountBook);
  }, [onDelete]);

  const renderCell = React.useCallback((accountBook: AccountBook, columnKey: React.Key) => {
    switch (columnKey) {
      case "name":
        return (
          <Link href={`/book/${accountBook.id}`}>
            {accountBook.name}
          </Link>
        );
      case "description":
        return accountBook.description;
      case "created_at":
        let createdDate = new Date(accountBook.createdAt);
        return `${createdDate.toLocaleDateString()} ${createdDate.toLocaleTimeString()}`;
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <span className="text-lg text-default-400 cursor-pointer hover:opacity-50" onClick={handleEditClick(accountBook)}>
              <MdModeEditOutline />
            </span>
            <span className="text-lg text-danger cursor-pointer hover:opacity-50" onClick={handleDeleteClick(accountBook)}>
              <RiDeleteBin7Fill />
            </span>
          </div>
        );
      default:
        return "";
    }
  }, [handleEditClick, handleDeleteClick]);

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={accountBookColumns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={accountBookList}>
        {(accountBook) => (
          <TableRow key={accountBook.id}>
            {(columnKey) => <TableCell>{renderCell(accountBook, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default AccountBookList;
