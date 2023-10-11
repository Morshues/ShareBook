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

import { createAccountBook, updateAccountBook } from "@/api/ApiClient";
import { AccountBook } from "@/types/accountBook";

type EditAccountBookRef = {
  openCreate: () => void;
  openEdit: (accountBook: AccountBook) => void;
}

type EditAccountBookProps = {
  onCreated?: (accountBook: AccountBook) => void;
  onEdited?: (accountBook: AccountBook) => void;
};

const AccountBookEditor = forwardRef<EditAccountBookRef, EditAccountBookProps>(({ onCreated, onEdited }: EditAccountBookProps, ref) => {
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
  const [editorType, setEditorType] = useState<'creator' | 'editor'>('creator');
  const [id, setId] = useState(0)
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const isNameInvalid = React.useMemo(() => {
    return (name.trim() === '' || !/^[a-zA-Z0-9]+$/.test(name))
  }, [name]);

  const openCreate = () => {
    setEditorType('creator');
    setName('');
    setDescription('');
    onOpen();
  };

  const openEdit = (accountBook: AccountBook) => {
    setEditorType('editor');
    setId(accountBook.id);
    setName(accountBook.name);
    setDescription(accountBook.description);
    onOpen();
  };

  useImperativeHandle(ref, () => ({
    openCreate,
    openEdit,
  }));

  const handleCreate = (): void => {
    createAccountBook({name: name.trim(), description}).then(response => {
      onClose();
      if (onCreated) {
        onCreated(response.data);
      }
    })
  };

  const handleEdit = (): void => {
    updateAccountBook({ id, name: name.trim(), description}).then(response => {
      onClose();
      if (onEdited) {
        onEdited(response.data);
      }
    })
  };

  const isCreatorMode = editorType === 'creator';
  const editorTitle = isCreatorMode ? 'Create New Account Book' : 'Edit Account Book';
  const submitButtonLabel = isCreatorMode ? 'Create' : 'Confirm';
  const handleSubmit = isCreatorMode ? handleCreate : handleEdit;

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{editorTitle}</ModalHeader>
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
                <Button color="primary" onPress={handleSubmit} isDisabled={isNameInvalid}>
                  {submitButtonLabel}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
})

export default AccountBookEditor;
