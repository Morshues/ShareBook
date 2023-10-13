import { AccountBookItem } from "@/types/AccountBookItem";

export type AccountBook = {
  id: number;
  name: string;
  description: string;
  createdAt: number;
  items: AccountBookItem[];
};