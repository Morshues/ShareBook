export type CreateAccountBookItem = {
  accountBookId: number;
  name: string;
  description: string;
  value: number;
  purchasedAt: number;
  purchasedPlace: string;
};

export type UpdateAccountBookItem = {
  id: number;
  accountBookId: number;
  name: string;
  description: string;
  value: number;
  purchasedAt: number;
  purchasedPlace: string;
};
