import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, TextInput } from "react-native-paper";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";

import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import {
  updateExpense,
  deleteExpense,
} from "../features/expenses/expensesSlice";

import { RootParamList } from "../types/Navigation";

type Props = NativeStackScreenProps<RootParamList, "Expense">;

export default function Expense({ route, navigation }: Props) {
  const { expenses } = useSelector((state: RootState) => state.expenses);
  const dispatch = useDispatch();

  const id = route.params.id;
  const expense = expenses.find((expense) => expense.id === id)!;

  const [subject, setSubject] = useState(expense?.subject);
  const [value, setValue] = useState(expense?.value.toString());
  const [date, setDate] = useState<DateType>(expense?.date);

  const onUpdateExpense = () => {
    dispatch(
      updateExpense({
        id: expense?.id,
        subject,
        value: Number(value),
        date,
      })
    );

    navigation.goBack();
  };

  const onDeleteExpense = () => {
    dispatch(deleteExpense(id));

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subject:</Text>
      <TextInput
        value={subject}
        onChangeText={(text) => setSubject(text)}
        placeholder="Example: A Book"
        mode="outlined"
        selectionColor="#00BAA3"
        activeOutlineColor="#00BAA3"
        outlineColor="#29556B"
      />

      <Text style={styles.title}>Value:</Text>
      <TextInput
        value={value}
        onChangeText={(value) => setValue(value)}
        keyboardType="number-pad"
        mode="outlined"
        selectionColor="#00BAA3"
        activeOutlineColor="#00BAA3"
        outlineColor="#29556B"
        left={<TextInput.Icon icon="cash" />}
      />

      <Text style={styles.title}>Date:</Text>
      <View style={styles.dateContainer}>
        <View style={styles.datePicker}>
          <DateTimePicker
            mode="date"
            value={date}
            onValueChange={(date) => setDate(date)}
            maximumDate={new Date()}
            displayFullDays={true}
            headerButtonColor="#00BAA3"
            headerContainerStyle={{ paddingBottom: 5 }}
            selectedItemColor="#00BAA3"
            selectedTextStyle={{
              fontFamily: "Poppins-SemiBold",
            }}
            todayContainerStyle={{
              borderWidth: 1,
            }}
            calendarTextStyle={{ fontFamily: "Poppins-Medium" }}
          />
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <Button mode="contained" color="#29556B" onPress={onUpdateExpense}>
          Update
        </Button>
        <Button color="#86363B" onPress={onDeleteExpense}>
          Delete
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 10,
  },

  title: {
    fontFamily: "Poppins-Medium",
    fontSize: 18,
  },

  dateContainer: {
    alignItems: "center",
  },

  datePicker: {
    width: 330,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    borderColor: "#29556B",
    borderWidth: 1,
  },

  buttonsContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
});
