import { FetchingStatus } from "../../@types/fetchingStatus";
import { Entity } from "../../@types/globalTypes";

export type TradeUnionEntityType = {
  data: TradeUnionEntityDataType,
  fetchStatus: FetchingStatus;
}

export type TradeUnionEntitiesType = {
  data: TradeUnionEntityDataType[],
  fetchStatus: FetchingStatus;
}

export interface TradeUnionEntityDataType extends Entity {
  name: string | undefined;
  city: string | null | undefined;
  address: string | null | undefined;
}

export const initializeTradeUnionEntityData = (): TradeUnionEntityDataType => {
  return {
    id: undefined,
    name: '',
    city: '',
    address: '',
  };
};



