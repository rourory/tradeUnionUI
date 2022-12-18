export type NotificatorType = {
  notificatorIsOpened: boolean;
  content: NotificatorContentType;
};

export type NotificatorContentType = {
  dialogTitle: string;
  dialogContentText: string;
};
