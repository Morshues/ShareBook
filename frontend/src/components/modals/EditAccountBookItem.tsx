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

import { updateAccountBookItem } from "@/api/ApiClient";
import { AccountBookItem } from "@/types/AccountBookItem";

type EditAccountBookItemRef = {
  open: (accountBookItem: AccountBookItem) => void;
}

type EditAccountBookItemProps = {
  onEdited?: (accountBookItem: AccountBookItem) => void;
};

const EditAccountBookItem = forwardRef<EditAccountBookItemRef, EditAccountBookItemProps>(({ onEdited }: EditAccountBookItemProps, ref) => {
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
  const [id, setId] = useState(0);
  const [accountBookId, setAccountBookId] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('0');
  const [purchasedDate, setPurchasedDate] = useState(new Date().toISOString().substring(0,10));
  const [purchasedPlace, setPurchasedPlace] = useState('');

  const isNameInvalid = React.useMemo(() => {
    return (name.trim() === '')
  }, [name]);

  const open = (item: AccountBookItem) => {
    setId(item.id);
    setAccountBookId(item.accountBookId);
    setName(item.name);
    setDescription(item.description);
    setValue(item.value.toString());
    setPurchasedPlace(item.purchasedPlace);
    setPurchasedDate(new Date(item.purchasedAt).toISOString().substring(0,10));
    onOpen();
  };

  useImperativeHandle(ref, () => ({
    open
  }));

  const handleEdit = (): void => {
    updateAccountBookItem({
      id,
      accountBookId,
      name: name.trim(),
      description,
      value: parseFloat(value),
      purchasedAt: new Date(purchasedDate).getTime(),
      purchasedPlace,
    }).then(response => {
      onClose();
      if (onEdited) {
        setName("");
        setDescription("");
        setValue('0');
        setPurchasedDate(new Date().toISOString().substring(0,10));
        setPurchasedPlace('');
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
              <ModalHeader className="flex flex-col gap-1">Edit Account Book Item</ModalHeader>
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

export default EditAccountBookItem;
