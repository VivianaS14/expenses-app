import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Expense } from "../../types/Expense";

export interface State {
  expenses: Expense[];
}

const initialState: State = {
  expenses: [
    {
      id: "EX1EOVJJ",
      subject: "Sun Cream",
      date: "2024-01-13 12:17",
      value: 75,
    },
    {
      id: "EX1EOVJ2",
      subject: "Netflix",
      date: "2024-01-01 12:17",
      value: 25,
    },
  ],
};

export const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    newExpense: (state, action: PayloadAction<Expense>) => {
      state.expenses.unshift(action.payload);
    },
    updateExpense: (state, action: PayloadAction<Expense>) => {
      const index = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );
      if (index !== -1) {
        state.expenses[index] = action.payload;
      }
    },
    deleteExpense: (state, action: PayloadAction<string>) => {
      const index = state.expenses.findIndex(
        (expense) => expense.id === action.payload
      );
      if (index !== -1) {
        state.expenses.splice(index, 1);
      }
    },
  },
});

export const { newExpense, updateExpense, deleteExpense } =
  expenseSlice.actions;

export default expenseSlice.reducer;
