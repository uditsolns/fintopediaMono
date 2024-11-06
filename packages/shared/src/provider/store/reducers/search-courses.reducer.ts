import { createSlice } from "@reduxjs/toolkit";
import { SearchCoursesState } from "../../../utils/types/search-courses";
import { postSeachCourses } from "../services/search-courses.service";

const initialState: SearchCoursesState = {
  loading: {
    search_courses: false,
  },
  err: {
    search_courses_err: null,
  },

  search_courses: [],
};

const searchCoursesSlice = createSlice({
  name: "searchCourses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postSeachCourses.pending, (state) => {
        state.loading.search_courses = true;
      })
      .addCase(postSeachCourses.fulfilled, (state, action) => {
        state.loading.search_courses = false;
        state.search_courses = action.payload;
        state.err.search_courses_err = null;
      })
      .addCase(postSeachCourses.rejected, (state, action) => {
        state.loading.search_courses = false;
        state.err.search_courses_err = action?.payload;
      });
  },
});

export default searchCoursesSlice.reducer;
