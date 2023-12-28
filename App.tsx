import { StyleSheet, Text, SafeAreaView } from "react-native";

import { StatusBar } from "expo-status-bar";

import { Provider, Button } from "react-native-paper";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Provider>
        <Text>Open up App.tsx to start working on your app!</Text>

        <Button mode="contained" onPress={() => console.log("Pressed")}>
          Press Me!
        </Button>
        <StatusBar style="auto" />
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
});
