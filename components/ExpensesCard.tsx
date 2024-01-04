import { Pressable, StyleSheet, Text, View } from "react-native";
import { DateType } from "react-native-ui-datepicker";
import { Colors } from "../utils/colors";

interface Props {
  subject: string;
  value: number;
  date: DateType;
  onPress: () => void;
}

export default function ExpensesCard({ subject, value, date, onPress }: Props) {
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.innerContainer, styles.textContainer]}
        android_ripple={{ color: "#ccc" }}
        onPress={onPress}
      >
        <View>
          <Text style={styles.textTitle}>{subject}</Text>
          <Text style={styles.date}>{date?.toString().split(" ")[0]}</Text>
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>$ {value}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 5,
  },

  innerContainer: {
    height: 80,
    width: "95%",
    backgroundColor: "#94c0d6",

    borderRadius: 8,
    elevation: 10,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: "hidden",
  },

  textContainer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  textTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 17,
  },

  date: {
    fontFamily: "Poppins-ExtraLightItalic",
    fontSize: 16,
    color: Colors.thirdColor,
  },

  valueContainer: {
    paddingHorizontal: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.mainColor,
    borderRadius: 8,
    width: 90,
  },

  value: {
    color: "#FFFFFF",
    fontFamily: "Poppins-SemiBold",
    fontSize: 17,
  },
});
