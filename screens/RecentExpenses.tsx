import { View, StyleSheet, FlatList, ListRenderItemInfo } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import TitleCard from "../components/TitleCard";
import ExpensesCard from "../components/ExpensesCard";

import { RootParamList } from "../types/Navigation";
import { getLastSevenDays } from "../utils/dates";
import { expensesData } from "../data/dummy-data";
import { Expense } from "../types/Expense";

type Props = NativeStackScreenProps<RootParamList, "Recent">;

export default function RecentExpenses({ navigation }: Props) {
  const lastSevenDays = getLastSevenDays(expensesData);

  const total = lastSevenDays.reduce(
    (total, expense) => total + expense.value,
    0
  );

  const pressHandler = (id: string) => {
    navigation.navigate("Expense", {
      id: id,
    });
  };

  return (
    <View style={styles.container}>
      <TitleCard title="Last 7 days" value={total} />

      <FlatList
        data={lastSevenDays}
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
  },
});
