export interface AppNotification {
  data: NotificationData;
  viewed: boolean;
  createdAt: Date;
  to: string;
}

export interface NotificationData {
  actionId: string;
  action: string;
  message: string;
  pictureUrl: string;
}
