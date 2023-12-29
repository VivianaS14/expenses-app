import { StyleSheet, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Provider as PaperProvider } from "react-native-paper";

import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";
import { useCallback } from "react";

SplashScreen.preventAutoHideAsync();

const BottomTab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraLightItalic": require("./assets/fonts/Poppins-ExtraLightItalic.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <PaperProvider>
        <NavigationContainer>
          <BottomTab.Navigator
            initialRouteName="Recent"
            sceneContainerStyle={{ backgroundColor: "#FFF7D6" }}
            screenOptions={{
              headerStyle: { backgroundColor: "#29556B" },
              headerTitleStyle: {
                fontFamily: "Poppins-SemiBold",
                fontSize: 27,
                color: "#FFF7D6",
              },
              tabBarLabelStyle: {
                fontFamily: "Poppins-SemiBold",
                fontSize: 12,
                bottom: 12,
              },
              tabBarActiveTintColor: "#FFF7D6",
              tabBarInactiveTintColor: "#00BAA3",
              tabBarStyle: {
                backgroundColor: "#29556B",
                height: 70,
              },
            }}
          >
            <BottomTab.Screen
              name="Recent"
              component={RecentExpenses}
              options={{
                tabBarLabel: "Recent",
                tabBarIcon: ({ color, focused }) => (
                  <Ionicons name="hourglass-outline" size={24} color={color} />
                ),
                title: "Recent Expenses",
              }}
            />
            <BottomTab.Screen
              name="All"
              component={AllExpenses}
              options={{
                tabBarLabel: "All Expenses",
                tabBarIcon: ({ color }) => (
                  <Ionicons name="calendar" size={24} color={color} />
                ),
                title: "All Expenses",
              }}
            />
          </BottomTab.Navigator>
        </NavigationContainer>
        <StatusBar style="light" />
      </PaperProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
