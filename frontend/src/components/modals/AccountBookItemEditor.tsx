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
} from "@nextui-org/react";

import { createAccountBookItem, updateAccountBookItem } from "@/api/ApiClient";
import { AccountBookItem } from "@/types/AccountBookItem";

type AccountBookItemEditorRef = {
  openCreate: () => void;
  openEdit: (accountBookItem: AccountBookItem) => void;
}

type AccountBookItemEditorProps = {
  accountBookId: number;
  onCreated?: (item: AccountBookItem) => void;
  onEdited?: (accountBookItem: AccountBookItem) => void;
};

const AccountBookItemEditor = forwardRef<AccountBookItemEditorRef, AccountBookItemEditorProps>(
  ({ accountBookId, onCreated, onEdited }: AccountBookItemEditorProps,
  ref
) => {
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
  const [editorType, setEditorType] = useState<'creator' | 'editor'>('creator');
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('0');
  const [purchasedDate, setPurchasedDate] = useState(new Date().toISOString().substring(0,10));
  const [purchasedPlace, setPurchasedPlace] = useState('');

  const isNameInvalid = React.useMemo(() => {
    return (name.trim() === '')
  }, [name]);

  const openCreate = () => {
    setEditorType('creator');
    setName("");
    setDescription("");
    setValue('0');
    setPurchasedDate(new Date().toISOString().substring(0,10));
    setPurchasedPlace('');
    onOpen();
  };

  const openEdit = (item: AccountBookItem) => {
    setEditorType('editor');
    setId(item.id);
    setName(item.name);
    setDescription(item.description);
    setValue(item.value.toString());
    setPurchasedPlace(item.purchasedPlace);
    setPurchasedDate(new Date(item.purchasedAt).toISOString().substring(0,10));
    onOpen();
  };

  useImperativeHandle(ref, () => ({
    openCreate,
    openEdit,
  }));


  const generateSubmitItem = () => {
    return {
      id,
      accountBookId,
      name: name.trim(),
      description,
      value: parseFloat(value),
      purchasedAt: new Date(purchasedDate).getTime(),
      purchasedPlace,
    }
  }

  const handleCreate = (): void => {
    createAccountBookItem(generateSubmitItem()).then(response => {
      onClose();
      if (onCreated) {
        onCreated(response.data);
      }
    })
  };

  const handleEdit = (): void => {
    updateAccountBookItem(generateSubmitItem()).then(response => {
      onClose();
      if (onEdited) {
        onEdited(response.data);
      }
    })
  };

  const isCreatorMode = editorType === 'creator';
  const editorTitle = isCreatorMode ? 'Create New Item' : 'Edit Account Book Item';
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
                  isRequired
                  type="text"
                  label="Name"
                  labelPlacement="outside"
                  placeholder=" "
                  value={name}
                  onValueChange={setName}
                  isInvalid={isNameInvalid}
                />
                <Input
                  type="text"
                  label="Description"
                  labelPlacement="outside"
                  placeholder=" "
                  value={description}
                  onValueChange={setDescription}
                />
                <Input
                  isRequired
                  type="number"
                  label="Price"
                  labelPlacement="outside"
                  value={value}
                  onValueChange={setValue}
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">$</span>
                    </div>
                  }
                />
                <Input
                  type="date"
                  label="Purchased Date"
                  labelPlacement="outside"
                  placeholder="*"
                  onValueChange={setPurchasedDate}
                  value={purchasedDate}
                />
                <Input
                  type="text"
                  label="Purchased Place"
                  labelPlacement="outside"
                  placeholder=" "
                  value={purchasedPlace}
                  onValueChange={setPurchasedPlace}
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

export default AccountBookItemEditor;
