import { View, Text, StyleSheet } from "react-native";
import TitleCard from "../components/TitleCard";
import ExpensesCard from "../components/ExpensesCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../types/Navigation";

type Props = NativeStackScreenProps<RootParamList, "Recent">;

export default function RecentExpenses({ navigation }: Props) {
  const pressHandler = (id: string) => {
    navigation.navigate("Expense", {
      id: id,
    });
  };

  return (
    <View style={styles.container}>
      <TitleCard title="Last 7 days" value="67.16" />
      <ExpensesCard
        subject="A book"
        date="2088-02-09"
        value="14.09"
        onPress={() => pressHandler("coming")}
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
