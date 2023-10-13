import { ItemFlow } from "@/types/ItemFlow";

export type AccountBookItem = {
  id: number;
  accountBookId: number;
  name: string;
  description: string;
  value: number;
  purchasedAt: number;
  purchasedPlace: string;
  createdAt: number;
  flows: ItemFlow[];
};
