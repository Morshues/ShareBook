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

import { createBook } from "@/api/ApiClient";
import { Book } from "@/types/book";

type CreateBookProps = {
  onBookCreated?: (book: Book) => void;
};

function CreateBook({ onBookCreated }: CreateBookProps) {
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const isNameInvalid = React.useMemo(() => {
    return (name.trim() === '' || !/^[a-zA-Z0-9]+$/.test(name))
  }, [name]);

  const handleCreate = (): void => {
    createBook({name: name.trim(), description}).then(response => {
      if (onBookCreated) {
        onClose();
        setName("");
        setDescription("");
        onBookCreated(response.data);
      }
    })
  };

  return (
    <>
      <Button onPress={onOpen}>Create New Book</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create New Book</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  isRequired
                  variant="bordered"
                  type="text"
                  label="Book Name"
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

export default CreateBook;
