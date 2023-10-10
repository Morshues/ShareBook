import { AccountBookSharer } from "@/types/AccountBookSharer";

export type AccountBookSharerListResponse = {
  currentSharerId: number;
  currentUserRole: string;
  list: AccountBookSharer[];
}