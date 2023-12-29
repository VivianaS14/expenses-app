import { View, Text, StyleSheet } from "react-native";
import TitleCard from "../components/TitleCard";
import ExpensesCard from "../components/ExpensesCard";

export default function RecentExpenses() {
  return (
    <View style={styles.container}>
      <TitleCard title="Last 7 days" value="67.16" />
      <ExpensesCard subject="A book" date="2088-02-09" value="14.09" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 20,
  },
});
