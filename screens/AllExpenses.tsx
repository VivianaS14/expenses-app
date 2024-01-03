import { FlatList, ListRenderItemInfo, StyleSheet, View } from "react-native";

import TitleCard from "../components/TitleCard";
import { expensesData } from "../data/dummy-data";
import ExpensesCard from "../components/ExpensesCard";
import { Expense } from "../types/Expense";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../types/Navigation";
import { useSelector } from "react-redux";
import { RootState } from "../store";

type Props = NativeStackScreenProps<RootParamList, "All">;

export default function AllExpenses({ navigation }: Props) {
  const { expenses } = useSelector((state: RootState) => state.expenses);

  const total = expenses.reduce((total, expense) => total + expense.value, 0);

  const allExpenses = expenses.sort((a, b) => {
    const dateA = new Date(a.date as string).getTime();
    const dateB = new Date(b.date as string).getTime();
    return dateB - dateA;
  });

  const pressHandler = (id: string) => {
    navigation.navigate("Expense", {
      id,
    });
  };

  return (
    <View style={styles.container}>
      <TitleCard title="Total" value={total} />

      <FlatList
        data={allExpenses}
        renderItem={({ item }: ListRenderItemInfo<Expense>) => (
          <ExpensesCard
            value={item.value}
            subject={item.subject}
            date={item.date}
            onPress={() => pressHandler(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
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
