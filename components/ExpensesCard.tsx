import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  subject: string;
  value: string;
  date: string;
}

export default function ExpensesCard({ subject, value, date }: Props) {
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.innerContainer, styles.textContainer]}
        android_ripple={{ color: "#ccc" }}
      >
        <View>
          <Text style={styles.textTitle}>{subject}</Text>
          <Text style={styles.date}>{date}</Text>
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
  },

  innerContainer: {
    height: 75,
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
    color: "#FFF7D6",
  },

  valueContainer: {
    paddingHorizontal: 6,
    justifyContent: "center",
    backgroundColor: "#29556B",
    borderRadius: 8,
  },

  value: {
    color: "#FFFFFF",
    fontFamily: "Poppins-SemiBold",
    fontSize: 17,
  },
});
