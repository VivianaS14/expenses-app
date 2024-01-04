import { StyleSheet, View } from "react-native";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import { Colors } from "../utils/colors";

interface Props {
  date: DateType;
  onValueChange: (date: DateType) => void;
}

export default function CustomDatePicker({ date, onValueChange }: Props) {
  return (
    <View style={styles.dateContainer}>
      <View style={styles.datePicker}>
        <DateTimePicker
          mode="date"
          value={date}
          onValueChange={onValueChange}
          maximumDate={new Date()}
          displayFullDays={true}
          headerButtonColor={Colors.secondColor}
          headerContainerStyle={{ paddingBottom: 5 }}
          selectedItemColor={Colors.secondColor}
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
  );
}

const styles = StyleSheet.create({
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
});
