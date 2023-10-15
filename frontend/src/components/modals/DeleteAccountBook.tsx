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

import { AccountBook } from "@/types/accountBook";

type DeleteAccountBookRef = {
  open: (book: AccountBook) => void;
}

type DeleteAccountBookProps = {
  onDeleteRequest: (id: number) => void;
};

const DeleteAccountBook = forwardRef<DeleteAccountBookRef, DeleteAccountBookProps>(({ onDeleteRequest }: DeleteAccountBookProps, ref) => {
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
  const [accountBook, setAccountBook] = useState<AccountBook | null>(null);

  const open = (accountBook: AccountBook) => {
    setAccountBook(accountBook);
    onOpen();
  };

  useImperativeHandle(ref, () => ({
    open
  }));

  const handleDelete = (): void => {
    onDeleteRequest(accountBook!!.id);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Delete Account Book</ModalHeader>
              <ModalBody>
                Are you sure to delete [{accountBook?.name}]?
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

DeleteAccountBook.displayName = "DeleteAccountBook"
export default DeleteAccountBook;
