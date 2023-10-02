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
} from "@nextui-org/react";

import { createAccountBookItem } from "@/api/ApiClient";
import { AccountBookItem } from "@/types/AccountBookItem";

type CreateAccountBookItemProps = {
  accountBookId: number;
  onCreated?: (item: AccountBookItem) => void;
};

function CreateAccountBookItem({ accountBookId, onCreated }: CreateAccountBookItemProps) {
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('0');
  const [purchasedDate, setPurchasedDate] = useState(new Date().toISOString().substring(0,10));
  const [purchasedPlace, setPurchasedPlace] = useState('');

  const isNameInvalid = React.useMemo(() => {
    return (name.trim() === '')
  }, [name]);

  const handleCreate = (): void => {
    createAccountBookItem({
      accountBookId,
      name: name.trim(),
      description,
      value: parseFloat(value),
      purchasedAt: new Date(purchasedDate).getTime(),
      purchasedPlace,
    }).then(response => {
      onClose();
      if (onCreated) {
        setName("");
        setDescription("");
        setValue('0');
        setPurchasedDate(new Date().toISOString().substring(0,10));
        setPurchasedPlace('');
        onCreated(response.data);
      }
    })
  };

  return (
    <>
      <Button onPress={onOpen}>Create New Item</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create New Item</ModalHeader>
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

export default CreateAccountBookItem;
