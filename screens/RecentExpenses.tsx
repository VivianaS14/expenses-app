import {
  View,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
  Text,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import TitleCard from "../components/TitleCard";
import ExpensesCard from "../components/ExpensesCard";

import { expensesData } from "../data/dummy-data";
import { RootParamList } from "../types/Navigation";
import { Expense } from "../types/Expense";
import { getLastSevenDays } from "../utils/dates";

import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { allExpenses, fetchExpenses } from "../features/expenses/expensesSlice";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";
import { Colors } from "../utils/colors";

type Props = NativeStackScreenProps<RootParamList, "Recent">;

export default function RecentExpenses({ navigation }: Props) {
  const expenses = useSelector(allExpenses);
  const expensesStatus = useSelector(
    (state: RootState) => state.expenses.status
  );
  const error = useSelector((state: RootState) => state.expenses.error);
  const dispatch = useDispatch<AppDispatch>();

  const lastSevenDays = getLastSevenDays(expenses);
  const total = lastSevenDays.reduce(
    (total, expense) => total + expense.value,
    0
  );

  const pressHandler = (id: string) => {
    navigation.navigate("Expense", {
      id,
    });
  };

  useEffect(() => {
    if (expensesStatus === "idle") {
      dispatch(fetchExpenses());
    }
  }, [expensesStatus, dispatch]);

  let content;

  if (expensesStatus === "loading") {
    content = <ActivityIndicator animating={true} color={Colors.mainColor} />;
  } else if (expensesStatus === "succeeded") {
    content = (
      <FlatList
        data={lastSevenDays}
        renderItem={({ item }: ListRenderItemInfo<Expense>) => (
          <ExpensesCard
            value={item.value}
            subject={item.subject}
            date={item.date}
            onPress={() => pressHandler(item.key)}
          />
        )}
      />
    );
  } else if (expensesStatus === "failed") {
    content = <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <TitleCard title="Last 7 days" value={total} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 20,
  },
});
