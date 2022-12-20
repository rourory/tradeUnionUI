import { Entity } from './globalTypes';

export interface UserEntityDataType extends Entity {
  lastName: string | undefined;
  firstName: string | undefined;
  username: string | undefined;
  role: string | undefined;
  created: string | undefined;
  updated: string | undefined;
}
