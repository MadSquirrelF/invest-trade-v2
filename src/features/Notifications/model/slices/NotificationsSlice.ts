import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { Notification, NotificationsSchema } from '../types/NotificationsSchema';

const initialState: NotificationsSchema = {
    notifications: [],
    autoHideDuration: 3000,
};

export const NotificationsSlice = createSlice({
    name: 'Notifications',
    initialState,
    reducers: {
        addNotification: (
            state,
            { payload }: PayloadAction<Omit<Notification, 'id'>>,
        ) => {
            const notification: Notification = {
                id: nanoid(),
                ...payload,
            };

            state.notifications.push(notification);
        },
        dismissNotification: (
            state,
            { payload }: PayloadAction<Notification['id']>,
        ) => {
            const index = state.notifications.findIndex(
                (notification) => notification.id === payload,
            );

            if (index !== -1) {
                state.notifications.splice(index, 1);
            }
        },
        setNotificationDuration: (
            state,
            { payload }: PayloadAction<NotificationsSchema['autoHideDuration']>,
        ) => {
            state.autoHideDuration = payload;
        },
    },

});

export const { actions: NotificationsActions } = NotificationsSlice;
export const { reducer: NotificationsReducer } = NotificationsSlice;
