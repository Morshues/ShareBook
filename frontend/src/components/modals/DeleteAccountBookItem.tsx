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

import { AccountBookItem } from "@/types/AccountBookItem";

type DeleteAccountBookItemRef = {
  open: (book: AccountBookItem) => void;
}

type DeleteAccountBookItemProps = {
  onDeleteRequest: (id: number) => void;
};

const DeleteAccountBookItem = forwardRef<DeleteAccountBookItemRef, DeleteAccountBookItemProps>(({ onDeleteRequest }: DeleteAccountBookItemProps, ref) => {
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
  const [accountBookItem, setAccountBookItem] = useState<AccountBookItem | null>(null);

  const open = (accountBookItem: AccountBookItem) => {
    setAccountBookItem(accountBookItem);
    onOpen();
  };

  useImperativeHandle(ref, () => ({
    open
  }));

  const handleDelete = (): void => {
    onDeleteRequest(accountBookItem!!.id);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Delete Account Book Item</ModalHeader>
              <ModalBody>
                Are you sure to delete [{accountBookItem?.name}]?
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

export default DeleteAccountBookItem;
