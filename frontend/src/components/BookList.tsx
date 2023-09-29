import React from "react";
import Link from "next/link";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";

import { Book } from "@/types/book";

type BookListProps = {
  bookList: Book[];
  onEditBook: (book: Book) => void;
  onDeleteBook: (book: Book) => void;
};

const bookColumns = [
  {name: "Name", uid: "name"},
  {name: "Description", uid: "description"},
  {name: "Created At", uid: "created_at"},
  {name: "Actions", uid: "actions"},
];

function BookList({ bookList, onEditBook, onDeleteBook }: BookListProps) {
  const handleEditClick = (book: Book) => () => {
    onEditBook(book);
  }

  const handleDeleteClick = (book: Book) => () => {
    onDeleteBook(book);
  }

  const renderCell = React.useCallback((book: Book, columnKey: React.Key) => {
    switch (columnKey) {
      case "name":
        return (
          <Link href={`/book/${book.id}`}>
            {book.name}
          </Link>
        );
      case "description":
        return book.description;
      case "created_at":
        let createdDate = new Date(book.createdAt);
        return `${createdDate.toLocaleDateString()} ${createdDate.toLocaleTimeString()}`;
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <span className="text-lg text-default-400 cursor-pointer hover:opacity-50" onClick={handleEditClick(book)}>
              <MdModeEditOutline />
            </span>
            <span className="text-lg text-danger cursor-pointer hover:opacity-50" onClick={handleDeleteClick(book)}>
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
      <TableHeader columns={bookColumns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={bookList}>
        {(book) => (
          <TableRow key={book.id}>
            {(columnKey) => <TableCell>{renderCell(book, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default BookList;
