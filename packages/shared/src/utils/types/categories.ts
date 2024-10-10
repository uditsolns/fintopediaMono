export interface CategoriesResponse {
  id?: number;
  category_name?: string;
  user_id?: number;
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
  categories: CategoriesResponse[];
  create: CategoriesResponse | null;
  update: CategoriesResponse | null;
  delete: string | null;
}
