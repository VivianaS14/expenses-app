import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Button, Modal, Portal, TextInput } from "react-native-paper";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";

import uuid from "react-native-uuid";

import { Expense } from "../types/Expense";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onSubmitForm: (expense: Expense) => void;
}

export default function ModalNewExpense({
  isVisible,
  onClose,
  onSubmitForm,
}: Props) {
  const [subject, setSubject] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState<DateType>(new Date());

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

    onSubmitForm({
      date,
      subject,
      value: Number(value),
      id: uuid.v4().toString(),
    });

    setSubject("");
    setValue("");
    setDate(new Date());
    onClose();
  };

  return (
    <Portal>
      <Modal
        visible={isVisible}
        onDismiss={onClose}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.title}>Add New Expense</Text>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              value={subject}
              onChangeText={(text) => setSubject(text)}
              label="Subject"
              placeholder="Example: A Book"
              mode="outlined"
              selectionColor="#00BAA3"
              activeOutlineColor="#00BAA3"
              outlineColor="#29556B"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={value}
              onChangeText={(value) => setValue(value)}
              label="Price"
              placeholder="$ 0"
              keyboardType="number-pad"
              mode="outlined"
              selectionColor="#00BAA3"
              activeOutlineColor="#00BAA3"
              outlineColor="#29556B"
            />
          </View>
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
              <Button color="#00BAA3" onPress={() => setDate(new Date())}>
                Today
              </Button>
            </View>
          </View>
          <Button
            mode="contained"
            color="#29556B"
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            Add New
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 16,
    backgroundColor: "#FFF7D6",
    borderRadius: 8,
    elevation: 10,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },

  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: "#29556B",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  formContainer: {
    gap: 20,
  },

  inputContainer: {
    paddingHorizontal: 12,
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

  submitButton: {
    marginHorizontal: 12,
  },
});
