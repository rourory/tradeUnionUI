import { RootState } from '../store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaymentEntityType, initializePaymentEntityData, PaymentEntityDataType } from '../types/payments-slice-types';
import { FetchingStatus } from '../../@types/fetchingStatus';
import { fetchByIdQuery } from '../utils/queries';
import { setTokenToLocalStorage } from '../utils/redux-utils';

const initialState: PaymentEntityType = {
  data: initializePaymentEntityData(),
  fetchStatus: FetchingStatus.LOADING,
};

export const fetchByIdData = createAsyncThunk<PaymentEntityDataType, number>(
  'paymentDetails/fetchByIdData',
  async (id: number, { rejectWithValue }) => {
    let status = 0;
    let response: PaymentEntityDataType = initializePaymentEntityData();
    await fetchByIdQuery<PaymentEntityDataType>(`people`, id, 'payments')
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

const paymentSlice = createSlice({
  name: 'paymentDetails',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<PaymentEntityType>) {
      state.data = action.payload.data;
    },
    setFetchStatus(state, action: PayloadAction<FetchingStatus>) {
      state.fetchStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchByIdData.pending, (state, action) => {
      state.data = initializePaymentEntityData();
      state.fetchStatus = FetchingStatus.LOADING;
    });
    builder.addCase(fetchByIdData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.fetchStatus = FetchingStatus.SUCCESS;
    });
    builder.addCase(fetchByIdData.rejected, (state, action) => {
      state.data = initializePaymentEntityData();
      state.fetchStatus = FetchingStatus.ERROR;
    });
  },
});

export default paymentSlice.reducer;
export const paymentsSelector = (state: RootState) => state.payments;
export const { setData, setFetchStatus } = paymentSlice.actions;
