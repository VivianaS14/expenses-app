import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button } from "react-native-paper";
import { DateType } from "react-native-ui-datepicker";

import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewExpense,
  updateExpense,
  deleteExpense,
  expenseById,
  fetchExpenses,
} from "../features/expenses/expensesSlice";

import { RootParamList } from "../types/Navigation";
import { Status } from "../types/Expense";

import CustomInput from "../components/UI/CustomInput";
import CustomDatePicker from "../components/UI/CustomDatePicker";
import { getToday } from "../utils/dates";
import { Colors } from "../utils/colors";
import { authState } from "../features/auth/authSlice";

type Props = NativeStackScreenProps<RootParamList, "Expense">;

export default function Expense({ route, navigation }: Props) {
  const id = route.params.id;
  const expense = useSelector((state: RootState) => expenseById(state, id));
  const { profile } = useSelector(authState);
  const dispatch = useDispatch<AppDispatch>();

  const today = getToday();

  const [subject, setSubject] = useState(expense ? expense.subject : "");
  const [value, setValue] = useState(expense ? `${expense.value}` : "");
  const [date, setDate] = useState<DateType>(expense ? expense.date : today);
  const [addNewStatus, setAddNewStatus] = useState<Status>("idle");

  const canSave =
    [subject, value, date].every(Boolean) && addNewStatus === "idle";

  const onUpdateExpense = async () => {
    if (!canSave) {
      Alert.alert("Empty fill", "Please complete All fills to save changes", [
        { text: "OK" },
      ]);
      return;
    }

    try {
      setAddNewStatus("loading");
      await dispatch(
        updateExpense({
          expense: {
            key: expense!.key,
            subject: subject!,
            value: Number(value),
            date,
          },
          userId: profile.localId,
        })
      ).unwrap();
    } catch (error) {
      setAddNewStatus("failed");
      console.error("Failed to save expense: ", error);
    } finally {
      setAddNewStatus("idle");
      dispatch(fetchExpenses(profile.localId));
      navigation.goBack();
    }
  };

  const onDeleteExpense = async () => {
    await dispatch(deleteExpense({ id, userId: profile.localId }));
    dispatch(fetchExpenses(profile.localId));
    navigation.goBack();
  };

  const handleSubmit = async () => {
    if (!canSave) {
      Alert.alert("Empty fill", "Please complete All fills to save changes", [
        { text: "OK" },
      ]);
      return;
    }

    try {
      setAddNewStatus("loading");
      await dispatch(
        addNewExpense({
          userId: profile.localId,
          expense: { date, subject, value: Number(value) },
        })
      ).unwrap();
      setSubject("");
      setValue("");
      setDate(today);
    } catch (error) {
      setAddNewStatus("failed");
      console.error("Failed to save expense: ", error);
    } finally {
      dispatch(fetchExpenses(profile.localId));
      setAddNewStatus("idle");
      navigation.goBack();
    }
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
        keyboardType="number-pad"
        value={value}
        onChangeText={(value) => setValue(value)}
      />

      <Text style={styles.title}>Date:</Text>
      <CustomDatePicker date={date} onValueChange={(date) => setDate(date)} />

      <View style={styles.buttonsContainer}>
        {expense ? (
          <>
            <Button
              mode="contained"
              color={Colors.mainColor}
              onPress={onUpdateExpense}
            >
              Update
            </Button>
            <Button color="#86363B" onPress={onDeleteExpense}>
              Delete
            </Button>
          </>
        ) : (
          <Button
            mode="contained"
            color={Colors.mainColor}
            onPress={handleSubmit}
          >
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
    borderColor: Colors.mainColor,
    borderWidth: 1,
  },

  buttonsContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
});
