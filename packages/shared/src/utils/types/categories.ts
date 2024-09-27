export interface CategoriesInfo {
  id: number;
  category_name: string;
  user_id: number;
} 
export interface CategoriesState {
  loading: {
    categories: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  err: {
    categoriesErr: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
  };
  categories: CategoriesInfo[];
  create: CategoriesInfo | null;
  update: CategoriesInfo | null;
  delete: string | null;
}
