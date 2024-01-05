import { KeyboardTypeOptions, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";
import { Colors } from "../../utils/colors";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
  placeholder?: string;
  isNumeric?: boolean;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  error?: boolean;
  disabled?: boolean;
}

export default function CustomInput({
  value,
  onChangeText,
  label,
  placeholder,
  isNumeric,
  keyboardType,
  secureTextEntry,
  error,
  disabled,
}: Props) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        label={label}
        placeholder={placeholder}
        keyboardType={keyboardType}
        left={isNumeric && <TextInput.Icon icon="cash" />}
        mode="outlined"
        selectionColor={Colors.secondColor}
        activeOutlineColor={Colors.secondColor}
        outlineColor={Colors.mainColor}
        secureTextEntry={secureTextEntry}
        error={error}
        disabled={disabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 12,
  },
});
