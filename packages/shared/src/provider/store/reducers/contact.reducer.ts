import { createSlice } from "@reduxjs/toolkit";
import { ContactState } from "../../../utils/types/contactus";
import {
  createContactSupport,
  deleteContactSupport,
  getContactSupport,
  updateContactSupport,
} from "../services/contact.service";
const initialState: ContactState = {
  loading: {
    create: false,
    delete: false,
    update: false,
    contact: false,
  },
  err: {
    createErr: null,
    deleteErr: null,
    updateErr: null,
    contactErr: null,
  },
  create: null,
  delete: null,
  update: null,
  contact: [],
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    clearContact: (state) => {
      state.create = null;
      state.update = null;
      state.delete = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContactSupport.pending, (state) => {
        state.loading.contact = true;
      })
      .addCase(getContactSupport.fulfilled, (state, action) => {
        state.loading.contact = false;
        state.contact = action.payload;
        state.err.contactErr = null;
      })
      .addCase(getContactSupport.rejected, (state, action) => {
        state.loading.contact = false;
        state.err.contactErr = action?.payload;
      })
      //   create
      .addCase(createContactSupport.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createContactSupport.fulfilled, (state, action) => {
        state.loading.create = false;
        state.create = action.payload;
        state.err.createErr = null;
      })
      .addCase(createContactSupport.rejected, (state, action) => {
        state.loading.create = false;
        state.err.createErr = action?.payload;
      })
      //  update
      .addCase(updateContactSupport.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateContactSupport.fulfilled, (state, action) => {
        state.loading.update = false;
        state.update = action.payload;
        state.err.updateErr = null;
      })
      .addCase(updateContactSupport.rejected, (state, action) => {
        state.loading.update = false;
        state.err.updateErr = action?.payload;
      })
      .addCase(deleteContactSupport.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteContactSupport.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.delete = action.payload;
        state.err.deleteErr = null;
      })
      .addCase(deleteContactSupport.rejected, (state, action) => {
        state.loading.delete = false;
        state.err.deleteErr = action?.payload;
      });
  },
});
export const { clearContact } = contactSlice.actions;
export default contactSlice.reducer;
