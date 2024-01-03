import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./features/expenses/expensesSlice";

export const store = configureStore({
  reducer: {
    expenses: expenseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
