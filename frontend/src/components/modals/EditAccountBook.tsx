import React, { forwardRef, useImperativeHandle, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";

import { updateAccountBook } from "@/api/ApiClient";
import { AccountBook } from "@/types/accountBook";

type EditAccountBookRef = {
  open: (accountBook: AccountBook) => void;
}

type EditAccountBookProps = {
  onEdited?: (accountBook: AccountBook) => void;
};

const EditAccountBook = forwardRef<EditAccountBookRef, EditAccountBookProps>(({ onEdited }: EditAccountBookProps, ref) => {
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
  const [id, setId] = useState(0)
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const isNameInvalid = React.useMemo(() => {
    return (name.trim() === '' || !/^[a-zA-Z0-9]+$/.test(name))
  }, [name]);

  const open = (accountBook: AccountBook) => {
    setId(accountBook.id);
    setName(accountBook.name);
    setDescription(accountBook.description);
    onOpen();
  };

  useImperativeHandle(ref, () => ({
    open
  }));

  const handleEdit = (): void => {
    updateAccountBook({ id, name: name.trim(), description}).then(response => {
      if (onEdited) {
        onClose();
        setName('');
        setDescription('');
        onEdited(response.data);
      }
    })
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Edit Account Book</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  isRequired
                  variant="bordered"
                  type="text"
                  label="Account Book Name"
                  value={name}
                  onValueChange={setName}
                  isInvalid={isNameInvalid}
                />
                <Textarea
                  variant="bordered"
                  label="Description"
                  value={description}
                  onValueChange={setDescription}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleEdit} isDisabled={isNameInvalid}>
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
})

export default EditAccountBook;
