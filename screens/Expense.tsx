import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button } from "react-native-paper";
import { DateType } from "react-native-ui-datepicker";

import uuid from "react-native-uuid";

import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import {
  updateExpense,
  deleteExpense,
  newExpense,
} from "../features/expenses/expensesSlice";

import { RootParamList } from "../types/Navigation";

import CustomInput from "../components/CustomInput";
import CustomDatePicker from "../components/CustomDatePicker";
import { getToday } from "../utils/dates";

type Props = NativeStackScreenProps<RootParamList, "Expense">;

export default function Expense({ route, navigation }: Props) {
  const { expenses } = useSelector((state: RootState) => state.expenses);
  const dispatch = useDispatch();

  const today = getToday();

  const id = route.params.id;
  const expense = expenses.find((expense) => expense.id === id);

  const [subject, setSubject] = useState(expense ? expense.subject : "");
  const [value, setValue] = useState(expense ? `${expense.value}` : "");
  const [date, setDate] = useState<DateType>(expense ? expense.date : today);

  const onUpdateExpense = () => {
    dispatch(
      updateExpense({
        id: expense!.id,
        subject: subject!,
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

  const handleSubmit = () => {
    if (!subject) {
      Alert.alert("Invalid subject", "Please enter a subject", [
        { text: "OK" },
      ]);
      return;
    }
    if (isNaN(Number(value)) || Number(value) <= 0) {
      Alert.alert("Invalid value", "Please enter the correct price", [
        { text: "OK" },
      ]);
      return;
    }
    dispatch(
      newExpense({
        date,
        subject,
        value: Number(value),
        id: uuid.v4().toString(),
      })
    );

    setSubject("");
    setValue("");
    setDate(today);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subject:</Text>
      <CustomInput
        label=""
        placeholder="Example: A Book"
        value={subject}
        onChangeText={(text) => setSubject(text)}
      />

      <Text style={styles.title}>Value:</Text>
      <CustomInput
        label=""
        placeholder="0"
        isNumeric={true}
        value={value}
        onChangeText={(value) => setValue(value)}
      />

      <Text style={styles.title}>Date:</Text>
      <CustomDatePicker date={date} onValueChange={(date) => setDate(date)} />

      <View style={styles.buttonsContainer}>
        {expense ? (
          <>
            <Button mode="contained" color="#29556B" onPress={onUpdateExpense}>
              Update
            </Button>
            <Button color="#86363B" onPress={onDeleteExpense}>
              Delete
            </Button>
          </>
        ) : (
          <Button mode="contained" color="#29556B" onPress={handleSubmit}>
            Add New
          </Button>
        )}
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
    paddingHorizontal: 15,
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
