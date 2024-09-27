export interface CoursesSectionInfo {
  id: number;
  course_id: number;
  section_number: number;
  section_heading: string;
  section_topics: string;
  section_time: number;
  video: File;
  text: string;
  notes: string;
}

export interface CoursesSectionState {
  loading: {
    coursesSection: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  err: {
    coursesSectionErr: any;
    createErr: any;
    updateErr: any;
    deleteErr: any;
  };
  coursesSection: CoursesSectionInfo[];
  create: CoursesSectionInfo | null;
  update: CoursesSectionInfo | null;
  delete: string | null;
}
