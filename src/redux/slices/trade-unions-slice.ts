import { RootState } from '../store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FetchingStatus } from '../../@types/fetchingStatus';
import { TradeUnionEntitiesType, TradeUnionEntityDataType } from '../types/trade-union-slice-types';
import { fetchQuery } from '../utils/queries';
import { setTokenToLocalStorage } from '../utils/redux-utils';


const initialState: TradeUnionEntitiesType = {
  data: [],
  fetchStatus: FetchingStatus.LOADING,
};


export const fetchData = createAsyncThunk<TradeUnionEntityDataType[]>(
  'tradeUnion/fetchData',
  async (undefined, { rejectWithValue }) => {
    let status = 0;
    let response: any = [];
    await fetchQuery<TradeUnionEntityDataType>(`unions`)
      .then((res) => {
        setTokenToLocalStorage(res.headers.authorization || '');
        response = res.data;
        status = res.status;
      })
      .catch((err) => {
        console.log(err);
      });
    if (status === 0 || (status < 200 && status >= 300)) {
      return rejectWithValue(response);
    }
    return response;
  },
);

const tradeUnionSlice = createSlice({
  name: 'tradeUnion',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<TradeUnionEntitiesType>) {
      state.data = action.payload.data;
    },
    setFetchStatus(state, action: PayloadAction<FetchingStatus>) {
      state.fetchStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state, action) => {
      state.data = [];
      state.fetchStatus = FetchingStatus.LOADING;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.fetchStatus = FetchingStatus.SUCCESS;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.data = [];
      state.fetchStatus = FetchingStatus.ERROR;
    });
  },
});

export default tradeUnionSlice.reducer;
export const tradeUnionSelector = (state: RootState) => state.unions;
export const { setData, setFetchStatus } = tradeUnionSlice.actions;
