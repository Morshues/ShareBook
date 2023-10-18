import { AccountBookItem } from "@/types/AccountBookItem";
import { AccountBookSharer } from "@/types/AccountBookSharer";

type Summary = {
  sharerId: number,
  value: number,
  shares: number,
  sharer: AccountBookSharer,
}

export const useAccountBookSummary = (accountBookItemList: AccountBookItem[], sharerList: AccountBookSharer[]) => {

  const totalSum = accountBookItemList.reduce((accumulator: number, item: AccountBookItem) => {
    return accumulator + item.value;
  }, 0);

  const average = totalSum / sharerList.length;

  const tempSumBySharerId = accountBookItemList.reduce<{[key: number]: Summary}>((acc, item) => {
    item.flows.forEach(flow => {
      if (!acc[flow.sharerId]) {
        acc[flow.sharerId] = {
          sharerId: flow.sharerId,
          value: 0,
          shares: 0,
          sharer: sharerList.find(sharer => sharer.id === flow.sharerId)!!,
        }
      }
      acc[flow.sharerId].value += flow.value;
    });
    return acc;
  }, {});

  const summaryBySharerId = Object.values(tempSumBySharerId).map(share => {
    share.shares = parseFloat((share.value - average).toFixed(2));
    return share;
  })

  return { totalSum, summaryBySharerId };
}