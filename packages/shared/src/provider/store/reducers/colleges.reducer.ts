import { CollegeState } from "../../../utils/types/college";
import { createSlice } from "@reduxjs/toolkit";
import {
  deleteCollege,
  getCollege,
  updateCollege,
  createCollege,
} from "../services/colleges.service";

const initialState: CollegeState = {
  loading: {
    create: false,
    delete: false,
    update: false,
    college: false,
  },
  err: {
    createErr: null,
    deleteErr: null,
    updateErr: null,
    collegeErr: null,
  },
  create: null,
  delete: null,
  update: null,
  college: [],
};

const collegeSlice = createSlice({
  name: "college",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCollege.pending, (state) => {
        state.loading.college = true;
      })
      .addCase(getCollege.fulfilled, (state, action) => {
        state.loading.college = false;
        state.college = action.payload;
        state.err.collegeErr = null;
      })
      .addCase(getCollege.rejected, (state, action) => {
        state.loading.college = false;
        state.err.collegeErr = action?.payload;
      })
      //   create
      .addCase(createCollege.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createCollege.fulfilled, (state, action) => {
        state.loading.create = false;
        state.create = action.payload;
        state.err.updateErr = null;
      })
      .addCase(createCollege.rejected, (state, action) => {
        state.loading.create = false;
        state.err.updateErr = action?.payload;
      })
      //  update
      .addCase(updateCollege.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateCollege.fulfilled, (state, action) => {
        state.loading.update = false;
        state.update = action.payload;
        state.err.updateErr = null;
      })
      .addCase(updateCollege.rejected, (state, action) => {
        state.loading.update = false;
        state.err.updateErr = action?.payload;
      })
      .addCase(deleteCollege.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteCollege.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.delete = action.payload;
        state.err.deleteErr = null;
      })
      .addCase(deleteCollege.rejected, (state, action) => {
        state.loading.delete = false;
        state.err.deleteErr = action?.payload;
      });
  },
});

export default collegeSlice.reducer;
