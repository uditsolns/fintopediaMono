import { createSlice } from "@reduxjs/toolkit";
import { NotificationState } from "../../../utils/types/notifications";
import {
  createNotifications,
  deleteNotifications,
  getNotifications,
  getNotificationsById,
  updateNotifications,
} from "../services/notifications.service";

const initialState: NotificationState = {
  loading: {
    create: false,
    delete: false,
    update: false,
    notifications: false,
    single_notifications: false,
  },
  err: {
    createErr: null,
    deleteErr: null,
    updateErr: null,
    notifications_err: null,
    single_notifications_err: null,
  },
  create: null,
  delete: null,
  update: null,
  notifications: [],
  single_notifications: null,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    storeSingleNotifications: (state, action) => {
      state.single_notifications = action.payload;
    },
    clearNotifications: (state) => {
      state.create = null;
      state.update = null;
      state.delete = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state) => {
        state.loading.notifications = true;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.loading.notifications = false;
        state.notifications = action.payload;
        state.err.notifications_err = null;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.loading.notifications = false;
        state.err.notifications_err = action?.payload;
      })

      // single user course history
      .addCase(getNotificationsById.pending, (state) => {
        state.loading.single_notifications = true;
      })
      .addCase(getNotificationsById.fulfilled, (state, action) => {
        state.loading.single_notifications = false;
        state.single_notifications = action.payload;
        state.err.single_notifications_err = null;
      })
      .addCase(getNotificationsById.rejected, (state, action) => {
        state.loading.single_notifications = false;
        state.err.single_notifications_err = action?.payload;
      })
      //   create
      .addCase(createNotifications.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createNotifications.fulfilled, (state, action) => {
        state.loading.create = false;
        state.create = action.payload;
        state.err.createErr = null;
      })
      .addCase(createNotifications.rejected, (state, action) => {
        state.loading.create = false;
        state.err.createErr = action?.payload;
      })
      //  update
      .addCase(updateNotifications.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateNotifications.fulfilled, (state, action) => {
        state.loading.update = false;
        state.update = action.payload;
        state.err.updateErr = null;
      })
      .addCase(updateNotifications.rejected, (state, action) => {
        state.loading.update = false;
        state.err.updateErr = action?.payload;
      })
      .addCase(deleteNotifications.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteNotifications.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.delete = action.payload;
        state.err.deleteErr = null;
      })
      .addCase(deleteNotifications.rejected, (state, action) => {
        state.loading.delete = false;
        state.err.deleteErr = action?.payload;
      });
  },
});
export const { storeSingleNotifications, clearNotifications } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
