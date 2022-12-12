import { Entity } from "../../@types/globalTypes";
import { FetchingStatus } from '../../@types/fetchingStatus'

export interface PaymentEntityDataType extends Entity {
  finished: string;
  tradeUnionId: number | undefined;
}

export const initializePaymentEntityData = (): PaymentEntityDataType => {
  return {
    id: undefined,
    finished: '',
    tradeUnionId: undefined,
  };
};

export type PaymentEntityType = {
  data: PaymentEntityDataType;
  fetchStatus: FetchingStatus;
};