import { useEffect } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import TitleCard from "../components/UI/TitleCard";
import ExpensesCard from "../components/UI/ExpensesCard";

import { expensesData } from "../data/dummy-data";
import { Expense } from "../types/Expense";
import { RootParamList } from "../types/Navigation";

import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { allExpenses, fetchExpenses } from "../features/expenses/expensesSlice";
import { ActivityIndicator } from "react-native-paper";
import { Colors } from "../utils/colors";
import { authState } from "../features/auth/authSlice";

type Props = NativeStackScreenProps<RootParamList, "All">;

export default function AllExpenses({ navigation }: Props) {
  const expenses = useSelector(allExpenses);
  const expensesStatus = useSelector(
    (state: RootState) => state.expenses.status
  );
  const error = useSelector((state: RootState) => state.expenses.error);
  const { profile, token } = useSelector(authState);
  const dispatch = useDispatch<AppDispatch>();

  const total = expenses.reduce((total, expense) => total + expense.value, 0);
  const pressHandler = (id: string) => {
    navigation.navigate("Expense", {
      id,
    });
  };

  useEffect(() => {
    if (expensesStatus === "idle") {
      dispatch(fetchExpenses({ userId: profile.localId, token }));
    }
  }, [expensesStatus, dispatch]);

  let content;

  if (expensesStatus === "loading") {
    content = <ActivityIndicator animating={true} color={Colors.mainColor} />;
  } else if (expensesStatus === "succeeded") {
    content = (
      <FlatList
        data={expenses}
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
      <TitleCard title="Total" value={total} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 20,
    marginBottom: 70,
  },
});
