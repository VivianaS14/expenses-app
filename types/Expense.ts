import { DateType } from "react-native-ui-datepicker";

export type Expense = {
  key: string;
  subject: string;
  date: DateType;
  value: number;
};

export interface ExpenseAPI {
  [key: string]: {
    date: string;
    subject: string;
    value: number;
  };
}

export interface AddExpense {
  subject: string;
  date: DateType;
  value: number;
}

export type Status = "idle" | "loading" | "succeeded" | "failed";
