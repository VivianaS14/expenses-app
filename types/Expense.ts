import { DateType } from "react-native-ui-datepicker";

export type Expense = {
  id: string;
  subject: string;
  date: DateType;
  value: number;
};
