import React, { forwardRef, useImperativeHandle, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@nextui-org/react";

import { deleteBook } from "@/api/ApiClient";
import { Book } from "@/types/book";

type DeleteBookRef = {
  open: (book: Book) => void;
}

type DeleteBookProps = {
  onBookDeleted?: (id: number) => void;
};

const DeleteBook = forwardRef<DeleteBookRef, DeleteBookProps>(({ onBookDeleted }: DeleteBookProps, ref) => {
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
  const [book, setBook] = useState<Book | null>(null);

  const open = (book: Book) => {
    setBook(book);
    onOpen();
  };

  useImperativeHandle(ref, () => ({
    open
  }));

  const handleDelete = (): void => {
    deleteBook(book!!.id).then(() => {
      if (onBookDeleted) {
        onClose();
        onBookDeleted(book!!.id);
      }
    })
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Delete Book</ModalHeader>
              <ModalBody>
                Are you sure to delete book [{book?.name}]?
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleDelete}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
})

export default DeleteBook;
