import { ReactNode } from 'react';

export type NotificationTypes = 'success' | 'error'

export interface Notification {
  id: string;
  label: string;
  text: string;
  autoHideDuration?: number
  type: NotificationTypes
  onClose?: () => void;
  action?: ReactNode;
}

export interface NotificationsSchema {
  notifications: Notification[];
  autoHideDuration: number;
}
