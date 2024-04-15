import { StateSchema } from '@/app/providers/StoreProvider';

export const selectNotifications = (state: StateSchema) => state.notifications.notifications;

export const selectNotificationDuration = (state: StateSchema) => state.notifications.autoHideDuration;
