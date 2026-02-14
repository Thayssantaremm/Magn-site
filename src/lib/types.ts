export type PageRow = {
  id: string;
  parentId: string | null;
  title: string;
  icon: string | null;
  coverUrl: string | null;
  content: any;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};
