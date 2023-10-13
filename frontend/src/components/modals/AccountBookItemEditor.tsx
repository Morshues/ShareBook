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
  RadioGroup, Radio,
  Avatar,
} from "@nextui-org/react";

import { AccountBookSharer } from "@/types/AccountBookSharer";
import { AccountBookItem } from "@/types/AccountBookItem";
import { CreateAccountBookItem, UpdateAccountBookItem } from "@/api/types/AccountBookItem";
import { ItemFlowEdit } from "@/api/types/ItemFlow";

type AccountBookItemEditorRef = {
  openCreate: () => void;
  openEdit: (accountBookItem: AccountBookItem) => void;
}

type AccountBookItemEditorProps = {
  accountBookId: number;
  sharerList: AccountBookSharer[];
  onCreateRequest?: (item: CreateAccountBookItem) => void;
  onEditRequest?: (item: UpdateAccountBookItem) => void;
};

const AccountBookItemEditor = forwardRef<AccountBookItemEditorRef, AccountBookItemEditorProps>(
  ({ accountBookId, sharerList, onCreateRequest, onEditRequest }: AccountBookItemEditorProps,
  ref,
) => {
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
  const [editorType, setEditorType] = useState<'creator' | 'editor'>('creator');
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('0');
  const [purchasedDate, setPurchasedDate] = useState(new Date().toISOString().substring(0,10));
  const [purchasedPlace, setPurchasedPlace] = useState('');

  const [flowMethod, setFlowMethod] = useState('none');
  const [flows, setFlows] = useState<ItemFlowEdit[]>([]);

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
    setFlowMethod('none');
    setFlows(sharerList.map(sharer => {
      return {
        itemId: id,
        sharerId: sharer.id,
        value: 0,
      }
    }))
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
    setFlowMethod('none');
    setFlows(sharerList.map(sharer => {
      return {
        itemId: id,
        sharerId: sharer.id,
        value: item.flows.find(flow => flow.sharerId === sharer.id)?.value || 0,
      }
    }))
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
      flows,
    }
  }

  const updateFlowsByMethod = (method: string, value: number) => {
    switch (method) {
      case 'none':
        setFlows(prevFlows => prevFlows.map(flow => ({...flow, value: 0}) ))
        break;
      case 'average':
        const average = value/flows.length;
        setFlows(prevFlows => prevFlows.map(flow => ({...flow, value: average}) ))
        break;
      default:
        const sharerId = parseFloat(method);
        setFlows(prevFlows => prevFlows.map(flow =>
          ({...flow, value: (sharerId === flow.sharerId ? value : 0)})
        ))
    }
  }

  const handlePriceChange = (value: string) => {
    setValue(value);
    updateFlowsByMethod(flowMethod, parseFloat(value));
  }

  const handleFlowMethodChange = (method: string) => {
    setFlowMethod(method);
    updateFlowsByMethod(method, parseFloat(value));
  }

  const handleFlowChange = (sharerId: number, value: string) => {
    setFlows(prevFlows => prevFlows.map(flow =>
      flow.sharerId === sharerId ? {...flow, value: parseFloat(value)} : flow
    ))
  }

  const handleCreate = (): void => {
    onClose();
    if (onCreateRequest) {
      onCreateRequest(generateSubmitItem());
    }
  };

  const handleEdit = (): void => {
    onClose();
    if (onEditRequest) {
      onEditRequest(generateSubmitItem());
    }
  };

  const sharerMap: {[index: number]: any} = sharerList.reduce((a, sharer) => ({
    ...a,
    [sharer.id]: sharer
  }), {})
  const isCreatorMode = editorType === 'creator';
  const editorTitle = isCreatorMode ? 'Create New Item' : 'Edit Account Book Item';
  const submitButtonLabel = isCreatorMode ? 'Create' : 'Confirm';
  const handleSubmit = isCreatorMode ? handleCreate : handleEdit;
  const flowEditComponent = isCreatorMode ?
    <RadioGroup
      label="Select the flow"
      orientation="horizontal"
      value={flowMethod}
      onValueChange={handleFlowMethodChange}
    >
      <Radio value="none">None</Radio>
      <Radio value="average">Average</Radio>
      {sharerList.map(sharer =>
        <Radio key={sharer.id} value={sharer.id.toString()}>[{sharer.displayName || sharer.userName}] Paid</Radio>
      )}
    </RadioGroup>
  :
    <div>
      Flows
      {flows.map(flow =>
        <Input
          key={flow.sharerId}
          type="number"
          startContent={
            <Avatar
              size="sm"
              src={sharerMap[flow.sharerId].userImg}
            />
          }
          labelPlacement="outside"
          value={flow.value.toString()}
          onValueChange={(v) => handleFlowChange(flow.sharerId, v)}
        />
      )}
    </div>

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
                  onValueChange={handlePriceChange}
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
                {flowEditComponent}
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
