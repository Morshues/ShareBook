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

import { updateBook } from "@/api/ApiClient";
import { Book } from "@/types/book";

type EditBookRef = {
  open: (book: Book) => void;
}

type EditBookProps = {
  onBookEdited?: (book: Book) => void;
};

const EditBook = forwardRef<EditBookRef, EditBookProps>(({ onBookEdited }: EditBookProps, ref) => {
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
  const [id, setId] = useState(0)
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const isNameInvalid = React.useMemo(() => {
    return (name.trim() === '' || !/^[a-zA-Z0-9]+$/.test(name))
  }, [name]);

  const open = (book: Book) => {
    setId(book.id);
    setName(book.name);
    setDescription(book.description);
    onOpen();
  };

  useImperativeHandle(ref, () => ({
    open
  }));

  const handleEdit = (): void => {
    updateBook({ id, name: name.trim(), description}).then(response => {
      if (onBookEdited) {
        onClose();
        setName('');
        setDescription('');
        onBookEdited(response.data);
      }
    })
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Edit Book</ModalHeader>
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

export default EditBook;
