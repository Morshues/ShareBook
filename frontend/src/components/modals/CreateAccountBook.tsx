import React, { useState } from 'react';
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

import { createAccountBook } from "@/api/ApiClient";
import { AccountBook } from "@/types/accountBook";

type CreateBookProps = {
  onCreated?: (accountBook: AccountBook) => void;
};

function CreateAccountBook({ onCreated }: CreateBookProps) {
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const isNameInvalid = React.useMemo(() => {
    return (name.trim() === '' || !/^[a-zA-Z0-9]+$/.test(name))
  }, [name]);

  const handleCreate = (): void => {
    createAccountBook({name: name.trim(), description}).then(response => {
      if (onCreated) {
        onClose();
        setName("");
        setDescription("");
        onCreated(response.data);
      }
    })
  };

  return (
    <>
      <Button onPress={onOpen}>Create New Account Book</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create New Account Book</ModalHeader>
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
                <Button color="primary" onPress={handleCreate} isDisabled={isNameInvalid}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateAccountBook;
