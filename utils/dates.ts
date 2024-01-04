import { Expense } from "../types/Expense";

export const getLastSevenDays = (data: Expense[]) => {
  const currentDate = new Date();

  const sevenDaysAgo = new Date(
    currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
  );

  const expensesLast7Days = data.filter((expense) => {
    const expenseDate = new Date(expense.date as string);
    return expenseDate >= sevenDaysAgo && expenseDate <= currentDate;
  });

  expensesLast7Days.sort((a, b) => {
    const dateA = new Date(a.date as string).getTime();
    const dateB = new Date(b.date as string).getTime();
    return dateB - dateA;
  });

  return expensesLast7Days;
};

export const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const hours = String(today.getHours()).padStart(2, "0");
  const minutes = String(today.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};
