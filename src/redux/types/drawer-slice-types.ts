export type DrawerState = {
  opened: boolean;
  items: DrawerItems;
};

export type DrawerItems = {
  adminItems: DrawerSimpleItem[];
  mainItems: DrawerSimpleItem[];
  additionalItems: DrawerSimpleItem[];
};

export type DrawerSimpleItem = {
  text: string;
  icon: string;
  link: string;
};
