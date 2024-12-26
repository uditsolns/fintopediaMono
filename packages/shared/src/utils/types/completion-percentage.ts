export interface CompletionPercentageFields {
  id?: number; 
  course_id: number;
  completion_percentage: number;
}

export interface CompletionPercentageResponse {
  user_id: number;
  completion_percentage: CompletionPercentageFields[];
}

export interface CompletionPercentageState {
  loading: {
    completion_percentage: boolean;
    single_completion_percentage: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  err: {
    completion_percentage_err: any;
    single_completion_percentage_err: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
  };
  completion_percentage: CompletionPercentageFields[]; 
  single_completion_percentage: CompletionPercentageFields | null;
  create: CompletionPercentageFields | null;
  update: CompletionPercentageFields | null;
  delete: string | null;
}