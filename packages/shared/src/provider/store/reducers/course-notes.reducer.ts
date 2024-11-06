import { createSlice } from "@reduxjs/toolkit";
import { CourseNotesState } from "../../../utils/types/course-notes";
import { createCourseNotes, deleteCourseNotes, getCourseNotes, getCourseNotesById, updateCourseNotes } from "../services/course-note.service";

const initialState: CourseNotesState = {
  loading: {
    create: false,
    delete: false,
    update: false,
    course_notes: false,
    single_course_notes: false,
  },
  err: {
    createErr: null,
    deleteErr: null,
    updateErr: null,
    course_notes_err: null,
    single_course_notes_err: null,
  },
  create: null,
  delete: null,
  update: null,
  course_notes: [],
  single_course_notes: null,
};

const courseNotesSlice = createSlice({
  name: "courseNotes",
  initialState,
  reducers: {
    storeSingleCourseNotes: (state, action) => {
      state.single_course_notes = action.payload;
    },
    clearCourseNotes: (state) => {
      state.create = null;
      state.update = null;
      state.delete = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCourseNotes.pending, (state) => {
        state.loading.course_notes = true;
      })
      .addCase(getCourseNotes.fulfilled, (state, action) => {
        state.loading.course_notes = false;
        state.course_notes= action.payload;
        state.err.course_notes_err = null;
      })
      .addCase(getCourseNotes.rejected, (state, action) => {
        state.loading.course_notes = false;
        state.err.course_notes_err = action?.payload;
      })

      // single user course history
      .addCase(getCourseNotesById.pending, (state) => {
        state.loading.single_course_notes = true;
      })
      .addCase(getCourseNotesById.fulfilled, (state, action) => {
        state.loading.single_course_notes = false;
        state.single_course_notes = action.payload;
        state.err.single_course_notes_err = null;
      })
      .addCase(getCourseNotesById.rejected, (state, action) => {
        state.loading.single_course_notes = false;
        state.err.single_course_notes_err = action?.payload;
      })
      //   create
      .addCase(createCourseNotes.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createCourseNotes.fulfilled, (state, action) => {
        state.loading.create = false;
        state.create = action.payload;
        state.err.createErr = null;
      })
      .addCase(createCourseNotes.rejected, (state, action) => {
        state.loading.create = false;
        state.err.createErr = action?.payload;
      })
      //  update
      .addCase(updateCourseNotes.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateCourseNotes.fulfilled, (state, action) => {
        state.loading.update = false;
        state.update = action.payload;
        state.err.updateErr = null;
      })
      .addCase(updateCourseNotes.rejected, (state, action) => {
        state.loading.update = false;
        state.err.updateErr = action?.payload;
      })
      .addCase(deleteCourseNotes.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteCourseNotes.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.delete = action.payload;
        state.err.deleteErr = null;
      })
      .addCase(deleteCourseNotes.rejected, (state, action) => {
        state.loading.delete = false;
        state.err.deleteErr = action?.payload;
      });
  }, 
});
export const { storeSingleCourseNotes, clearCourseNotes } =
  courseNotesSlice.actions;
export default courseNotesSlice.reducer;
