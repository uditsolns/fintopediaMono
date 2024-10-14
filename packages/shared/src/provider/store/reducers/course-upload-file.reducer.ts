import { createSlice } from "@reduxjs/toolkit";
import { CourseUploadFileState } from "../../../utils/types/course-upload-file";
import { createCourseUploadFile, deleteCourseUploadFile, getCourseUploadFile, getCourseUploadFileById, updateCourseUploadFile } from "../services/course-upload-file.service";
const initialState: CourseUploadFileState = {
  loading: {
    create: false,
    delete: false,
    update: false,
    upload_file: false,
    single_upload_file: false,
  },
  err: {
    createErr: null,
    deleteErr: null,
    updateErr: null,
    upload_file_err: null,
    single_upload_file_err: null,
  },
  create: null,
  delete: null,
  update: null,
  upload_file: [],
  single_upload_file: null,
};

const courseUploadFileSlice = createSlice({
  name: "courseUploadFile",
  initialState,
  reducers: {
    storeSingleCourseUploadFile: (state, action) => {
      state.single_upload_file = action.payload;
    },
    clearCourseUploadFile: (state) => {
      state.create = null;
      state.update = null;
      state.delete = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCourseUploadFile.pending, (state) => {
        state.loading.upload_file = true;
      })
      .addCase(getCourseUploadFile.fulfilled, (state, action) => {
        state.loading.upload_file = false;
        state.upload_file = action.payload;
        state.err.upload_file_err = null;
      })
      .addCase(getCourseUploadFile.rejected, (state, action) => {
        state.loading.upload_file = false;
        state.err.upload_file_err = action?.payload;
      })

      // single user course history
      .addCase(getCourseUploadFileById.pending, (state) => {
        state.loading.single_upload_file = true;
      })
      .addCase(getCourseUploadFileById.fulfilled, (state, action) => {
        state.loading.single_upload_file = false;
        state.single_upload_file = action.payload;
        state.err.single_upload_file_err = null;
      })
      .addCase(getCourseUploadFileById.rejected, (state, action) => {
        state.loading.single_upload_file = false;
        state.err.single_upload_file_err = action?.payload;
      })
      //   create
      .addCase(createCourseUploadFile.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createCourseUploadFile.fulfilled, (state, action) => {
        state.loading.create = false;
        state.create = action.payload;
        state.err.createErr = null;
      })
      .addCase(createCourseUploadFile.rejected, (state, action) => {
        state.loading.create = false;
        state.err.createErr = action?.payload;
      })
      //  update
      .addCase(updateCourseUploadFile.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateCourseUploadFile.fulfilled, (state, action) => {
        state.loading.update = false;
        state.update = action.payload;
        state.err.updateErr = null;
      })
      .addCase(updateCourseUploadFile.rejected, (state, action) => {
        state.loading.update = false;
        state.err.updateErr = action?.payload;
      })
      .addCase(deleteCourseUploadFile.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteCourseUploadFile.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.delete = action.payload;
        state.err.deleteErr = null;
      })
      .addCase(deleteCourseUploadFile.rejected, (state, action) => {
        state.loading.delete = false;
        state.err.deleteErr = action?.payload;
      });
  },
});
export const { storeSingleCourseUploadFile, clearCourseUploadFile } =
  courseUploadFileSlice.actions;
export default courseUploadFileSlice.reducer;
