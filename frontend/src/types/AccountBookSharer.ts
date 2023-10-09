export type AccountBookSharer = {
  id: number;
  userId?: number;
  userEmail?: string;
  userName?: string;
  userImg?: string;
  accountBookId: number;
  role: string;
  createdAt: number;
};
