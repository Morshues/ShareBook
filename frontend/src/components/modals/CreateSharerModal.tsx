import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader, Radio, RadioGroup,
  useDisclosure
} from "@nextui-org/react";

type CreateSharerModalRef = {
  open: () => void;
}

type CreateSharerModalProps = {
  onCreatedRequest: (name: string, role: string, email?: string) => void;
};

const CreateSharerModal = forwardRef<CreateSharerModalRef, CreateSharerModalProps>(({ onCreatedRequest }: CreateSharerModalProps, ref) => {
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = React.useState('VIEWER');

  const isNameInvalid = React.useMemo(() => {
    return (name.trim() === '')
  }, [name]);

  const open = () => {
    onOpen();
  };

  useImperativeHandle(ref, () => ({
    open
  }));

  const handleCreateRequest = (): void => {
    let toSendEmail = (email.trim() === '') ? undefined : email.trim()
    onCreatedRequest(name, role, toSendEmail);
    onClose();
    setName('');
    setEmail('')
    setRole('VIEWER');
  }

  return (
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
                type="email"
                label="email"
                labelPlacement="outside"
                placeholder="(Optional)"
                value={email}
                onValueChange={setEmail}
              />
              <RadioGroup
                label="Select the role of the sharer"
                orientation="horizontal"
                value={role}
                onValueChange={setRole}
              >
                <Radio value="OWNER">OWNER</Radio>
                <Radio value="EDITOR">EDITOR</Radio>
                <Radio value="VIEWER">VIEWER</Radio>
              </RadioGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleCreateRequest} isDisabled={isNameInvalid}>
                Create
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
})

export default CreateSharerModal;