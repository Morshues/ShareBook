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
  Avatar,
  Spinner,
  SortDescriptor,
} from "@nextui-org/react";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { MdDocumentScanner, MdModeEditOutline } from "react-icons/md";

import { AccountBookItem } from "@/types/AccountBookItem";
import { AccountBookSharer } from "@/types/AccountBookSharer";

import PriceBar from "@/components/PriceBar";
import AccountBookItemDetail from "@/components/AccountBookItemDetail";
import { useAccountBookSummary } from "@/hooks/useAccountBookSummary";

type AccountBookItemListProps = {
  sharerList: AccountBookSharer[];
  loading: boolean;
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

function AccountBookItemList({ sharerList, loading, sortDescriptor, accountBookItemList, onSortRequest, onEdit, onDelete }: AccountBookItemListProps) {
  const { totalSum, summaryBySharerId } = useAccountBookSummary(accountBookItemList, sharerList);

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
        <TableBody
          items={accountBookItemList}
          emptyContent={loading ? <Spinner color="white" /> : "No items to display"}
        >
          {(accountBookItem) => (
            <TableRow key={accountBookItem.id}>
              {(columnKey) => <TableCell>{renderCell(accountBookItem, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div>
        <h2>Sum: {totalSum}</h2>
        <PriceBar flows={summaryBySharerId} value={totalSum} showNumber={true} />
        <div className="flex gap-6 mt-8">
          {summaryBySharerId.map(summary => (
            <span key={summary.sharerId} className="flex flex-col items-center text-center justify-center">
              <Avatar
                size="sm"
                src={summary.sharer.userImg}
                showFallback
                name={summary.sharer.displayName || summary.sharer.userName}
                className="justify-self-center"
              />
              <span>{summary.shares}</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default AccountBookItemList;
