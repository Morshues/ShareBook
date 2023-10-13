import { ItemFlowEdit } from "@/api/types/ItemFlow";

export type CreateAccountBookItem = {
  accountBookId: number;
  name: string;
  description: string;
  value: number;
  purchasedAt: number;
  purchasedPlace: string;
  flows: ItemFlowEdit[];
};

export type UpdateAccountBookItem = {
  id: number;
  accountBookId: number;
  name: string;
  description: string;
  value: number;
  purchasedAt: number;
  purchasedPlace: string;
  flows: ItemFlowEdit[];
};
