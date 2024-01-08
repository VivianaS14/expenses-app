import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddExpense, Expense, ExpenseAPI } from "../../types/Expense";
import { RootState } from "../../store";
import { expensesApi } from "../../api";

export interface State {
  expenses: Expense[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  expenses: [],
  status: "idle",
  error: null,
};

export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async ({ userId, token }: { userId: string; token: string }) => {
    const { data } = await expensesApi.get<ExpenseAPI>(
      `/expenses${userId}.json?auth=${token}`
    );
    return data;
  }
);

export const addNewExpense = createAsyncThunk(
  "expenses/addNewExpense",
  async ({
    userId,
    expense,
    token,
  }: {
    expense: AddExpense;
    userId: string;
    token: string;
  }) => {
    const { data } = await expensesApi.post(
      `/expenses${userId}.json?auth=${token}`,
      expense
    );
    return data;
  }
);

export const updateExpense = createAsyncThunk(
  "expenses/updateExpense",
  async ({
    expense,
    userId,
    token,
  }: {
    expense: Expense;
    userId: string;
    token: string;
  }) => {
    const { data } = await expensesApi.put(
      `/expenses${userId}/${expense.key}.json?auth=${token}`,
      {
        subject: expense.subject,
        value: expense.value,
        date: expense.date,
      }
    );
    return data;
  }
);

export const deleteExpense = createAsyncThunk(
  "expenses/deleteExpense",
  async ({
    id,
    userId,
    token,
  }: {
    id: string;
    userId: string;
    token: string;
  }) => {
    const { data } = await expensesApi.delete(
      `/expenses${userId}/${id}.json?auth=${token}`
    );
    return data;
  }
);

export const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    logOut: (state) => {
      state.status = "idle";
      state.expenses = [];
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload !== null) {
          const arrayData: Expense[] = Object.values(action.payload).map(
            (obj, idx) => {
              const key = Object.keys(action.payload)[idx];
              return { key, ...obj };
            }
          );
          state.expenses = arrayData;
        }
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message!;
      })
      .addCase(addNewExpense.fulfilled, (state, action) => {
        state.expenses.push(action.payload);
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        const index = state.expenses.findIndex(
          (expense) => expense.key === action.payload.id
        );
        if (index !== -1) {
          state.expenses[index] = action.payload;
        }
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        const index = state.expenses.findIndex(
          (expense) => expense.key === action.payload
        );
        if (index !== -1) {
          state.expenses.splice(index, 1);
        }
      });
  },
});

export const { logOut } = expenseSlice.actions;

export default expenseSlice.reducer;

export const allExpenses = (state: RootState) => state.expenses.expenses;

export const expenseById = (state: RootState, id: string) =>
  state.expenses.expenses.find((expense) => expense.key === id);
