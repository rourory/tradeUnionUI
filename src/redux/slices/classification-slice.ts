import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ClassificationsType, ClassType } from '../types/classification-slice-types';
import { fetchQuery } from '../utils/queries';
import { setTokenToLocalStorage } from '../utils/redux-utils';

const initialState: ClassificationsType = {
  education: [],
  maritalState: [],
  hasErrors: false,
};

type ReturnedData = {
  educations: ClassType[];
  maritalStates: ClassType[];
};

export const fetchClassificationsData = createAsyncThunk<ReturnedData>(
  'fetchClassificationsData/classificationsSlice',
  async (undefined, { rejectWithValue }) => {
    let status = 0;
    let educations: any = [];
    await fetchQuery<ClassType>(`education_states`)
      .then((res) => {
        setTokenToLocalStorage(res.headers.authorization || '');
        educations = res.data;
        status = res.status;
      })
      .catch((err) => {
        console.log(err);
      });
    if (status === 0 || (status < 200 && status >= 300)) {
      return rejectWithValue(educations);
    }

    let maritalStates: any = [];
    await fetchQuery<ClassType>(`marital_states`)
      .then((res) => {
        setTokenToLocalStorage(res.headers.authorization || '');
        maritalStates = res.data;
        status = res.status;
      })
      .catch((err) => {
        console.log(err);
      });
    if (status === 0 || (status < 200 && status >= 300)) {
      return rejectWithValue(maritalStates);
    }

    return { educations, maritalStates };
  },
);

const classificationsSlice = createSlice({
  name: 'classifications',
  initialState,
  reducers: {
    setEducations(state, action: PayloadAction<ClassType[]>) {
      state.education = action.payload;
    },
    setMaritalStates(state, action: PayloadAction<ClassType[]>) {
      state.maritalState = action.payload;
    },
    setHasErrors(state, action: PayloadAction<boolean>) {
      state.hasErrors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchClassificationsData.pending, (state, action) => {
      state.education = [];
      state.maritalState = [];
    });
    builder.addCase(fetchClassificationsData.fulfilled, (state, action) => {
      state.education = action.payload.educations;
      state.maritalState = action.payload.maritalStates;
    });
    builder.addCase(fetchClassificationsData.rejected, (state, action) => {
      state.education = [];
      state.maritalState = [];
      state.hasErrors = true;
    });
  },
});

export default classificationsSlice.reducer;
export const classificationsSelector = (state: RootState) => state.classifications;
export const { setEducations, setMaritalStates, setHasErrors } = classificationsSlice.actions;
