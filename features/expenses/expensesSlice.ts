import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Expense } from "../../types/Expense";

export interface State {
  expenses: Expense[];
}

const initialState: State = {
  expenses: [],
};

export const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    newExpense: (state, action: PayloadAction<Expense>) => {
      state.expenses.push(action.payload);
    },
  },
});

export const { newExpense } = expenseSlice.actions;

export default expenseSlice.reducer;
