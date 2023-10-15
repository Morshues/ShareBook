import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Popover, PopoverTrigger, PopoverContent,
  SortDescriptor,
} from "@nextui-org/react";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { MdDocumentScanner, MdModeEditOutline } from "react-icons/md";

import { AccountBookItem } from "@/types/AccountBookItem";
import { AccountBookSharer } from "@/types/AccountBookSharer";

import PriceBar from "@/components/PriceBar";
import AccountBookItemDetail from "@/components/AccountBookItemDetail";

type AccountBookItemListProps = {
  sharerList: AccountBookSharer[];
  sortDescriptor: SortDescriptor;
  accountBookItemList: AccountBookItem[];
  onSortRequest: (sortDescription: SortDescriptor) => void;
  onEdit: (accountBookItem: AccountBookItem) => void;
  onDelete: (accountBookItem: AccountBookItem) => void;
};

const accountBookItemColumns: {name: string, uid: string, align: ('start'|'end'|'center'), className: string}[] = [
  {name: "Name", uid: "name", align: "start", className: "w-40"},
  {name: "", uid: "price_bar", align: "center", className: "w-auto"},
  {name: "Price", uid: "value", align: "end", className: "w-28 text-end"},
  {name: "Purchased At", uid: "purchasedAt", align: "start", className: "w-20"},
  {name: "Actions", uid: "actions", align: "center", className: "w-20"},
];

const allowSortingColumns = ["name", "value", "purchasedAt"];

function AccountBookItemList({ sharerList, sortDescriptor, accountBookItemList, onSortRequest, onEdit, onDelete }: AccountBookItemListProps) {
  const handleEditClick = React.useCallback((accountBookItem: AccountBookItem) => () => {
    onEdit(accountBookItem);
  }, [onEdit]);

  const handleDeleteClick = React.useCallback((accountBookItem: AccountBookItem) => () => {
    onDelete(accountBookItem);
  }, [onDelete]);

  const renderCell = React.useCallback((accountBookItem: AccountBookItem, columnKey: React.Key) => {
    switch (columnKey) {
      case "name":
        return (
          <Tooltip
            content={accountBookItem.description}
            isDisabled={accountBookItem.description.trim().length == 0}
            placement={"right"}
            closeDelay={0}>
            <span>{accountBookItem.name}</span>
          </Tooltip>
        );
      case "value":
        return <span className="float-right">{accountBookItem.value}</span>
      case "price_bar":
        return (
          <PriceBar flows={accountBookItem.flows} value={accountBookItem.value} />
        )
      case "purchasedAt":
        let purchasedDate = new Date(accountBookItem.purchasedAt);
        return purchasedDate.toLocaleDateString();
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Popover placement="left">
              <PopoverTrigger>
                <span className="text-lg text-default-400 cursor-pointer hover:opacity-50">
                  <MdDocumentScanner />
                </span>
              </PopoverTrigger>
              <PopoverContent>
                <AccountBookItemDetail sharerList={sharerList} item={accountBookItem} />
              </PopoverContent>
            </Popover>
            <span className="text-lg text-default-400 cursor-pointer hover:opacity-50" onClick={handleEditClick(accountBookItem)}>
              <MdModeEditOutline />
            </span>
            <span className="text-lg text-danger cursor-pointer hover:opacity-50" onClick={handleDeleteClick(accountBookItem)}>
              <RiDeleteBin7Fill />
            </span>
          </div>
        );
      default:
        return "";
    }
  }, [sharerList, handleEditClick, handleDeleteClick]);

  const totalSum = accountBookItemList.reduce((accumulator: number, item: AccountBookItem) => {
    return accumulator + item.value;
  }, 0);

  const sumBySharerId = accountBookItemList.reduce<{[key: number]: ({value:number, sharerId: number})}>((acc, item) => {
    item.flows.forEach(flow => {
      if (!acc[flow.sharerId]) {
        acc[flow.sharerId] = {sharerId: flow.sharerId, value: 0};
      }
      acc[flow.sharerId].value += flow.value;
    });
    return acc;
  }, {});

  return (
    <>
      <Table
        aria-label="Example table with custom cells"
        className="table-fixed"
        onSortChange={onSortRequest}
        sortDescriptor={sortDescriptor}
      >
        <TableHeader columns={accountBookItemColumns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.align} className={column.className} allowsSorting={allowSortingColumns.includes(column.uid)}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={accountBookItemList} emptyContent={"No items to display"}>
          {(accountBookItem) => (
            <TableRow key={accountBookItem.id}>
              {(columnKey) => <TableCell>{renderCell(accountBookItem, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div>
        <h2>Sum: {totalSum}</h2>
        <PriceBar flows={Object.values(sumBySharerId)} value={totalSum} showNumber={true} />
      </div>
    </>
  );
}

export default AccountBookItemList;
