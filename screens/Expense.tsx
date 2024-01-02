import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { RootParamList } from "../types/Navigation";

type Props = NativeStackScreenProps<RootParamList, "Expense">;

export default function Expense({ route }: Props) {
  const id = route.params.id;

  return (
    <View>
      <Text>Expense # {id}</Text>
    </View>
  );
}
