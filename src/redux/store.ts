import { configureStore } from '@reduxjs/toolkit';
import personDetails from './slices/person-details-slice';
import drawer from './slices/drawer-slice';
import payments from './slices/payments-slice';
import unions from './slices/trade-unions-slice';
import editPersonForm from './slices/edit-peson-form-slice';
import classifications from './slices/classification-slice';
import confirmClose from './slices/confirm-close-slice';
import operationResult from './slices/operation-result-slice';
import user from './slices/user-slice';
import signUpForm from './slices/localStates/signUp-slice';
import notificator from './slices/notificator-slice';
import mainContentRender from './slices/localStates/main-content-rendered-slice';
import peopleDatagridEditing from './slices/person-datagrid-editing-slice';

export const store = configureStore({
  reducer: {
    personDetails,
    drawer,
    payments,
    unions,
    editPersonForm,
    classifications,
    confirmClose,
    operationResult,
    user,
    signUpForm,
    notificator,
    mainContentRender,
    peopleDatagridEditing,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
