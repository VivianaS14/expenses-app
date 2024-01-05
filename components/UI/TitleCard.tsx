import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../utils/colors";

interface Props {
  title: string;
  value: number;
}

export default function TitleCard({ title, value = 0 }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.value}>$ {value}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  innerContainer: {
    height: 60,
    width: "95%",
    backgroundColor: Colors.mainColor,
    borderRadius: 8,
    elevation: 10,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },

  textContainer: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  title: {
    fontFamily: "Poppins-Medium",
    fontSize: 20,
    color: Colors.thirdColor,
  },

  value: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    color: Colors.thirdColor,
  },
});
