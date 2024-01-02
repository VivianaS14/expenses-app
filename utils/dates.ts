import { Expense } from "../types/Expense";

export const getLastSevenDays = (data: Expense[]) => {
  const currentDate = new Date();

  const sevenDaysAgo = new Date(
    currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
  );

  const expensesLast7Days = data.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= sevenDaysAgo && expenseDate <= currentDate;
  });

  expensesLast7Days.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  return expensesLast7Days;
};
