import React, { ReactNode } from 'react';
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

type DeleteBookProps = {
  book: Book;
  onBookDeleted?: (id: number) => void;
  renderTrigger?: (props: { onPress: () => void }) => ReactNode;
};

function DeleteBook({ book, onBookDeleted, renderTrigger }: DeleteBookProps) {
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();

  const handleDelete = (): void => {
    deleteBook(book.id).then(response => {
      if (onBookDeleted) {
        onClose();
        onBookDeleted(book.id);
      }
    })
  };

  return (
    <>
      {renderTrigger ?
        renderTrigger({ onPress: onOpen })
        :
        <Button onPress={onOpen}>Delete Book</Button>
      }
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Delete Book</ModalHeader>
              <ModalBody>
                Are you sure to delete book [{book.name}]?
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
}

export default DeleteBook;
