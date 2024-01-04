import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  label: string;
  placeholder: string;
  isNumeric?: boolean;
}

export default function CustomInput({
  value,
  onChangeText,
  label,
  placeholder,
  isNumeric,
}: Props) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        label={label}
        placeholder={placeholder}
        keyboardType={isNumeric ? "number-pad" : "default"}
        left={isNumeric && <TextInput.Icon icon="cash" />}
        mode="outlined"
        selectionColor="#00BAA3"
        activeOutlineColor="#00BAA3"
        outlineColor="#29556B"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 12,
  },
});
