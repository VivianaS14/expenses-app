import { useCallback, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatListComponent,
  Pressable,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Button, Provider as PaperProvider } from "react-native-paper";

import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";
import Expense from "./screens/Expense";

import { RootParamList } from "./types/Navigation";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import ModalNewExpense from "./components/ModalNewExpense";
import { Expense as ExpenseType } from "./types/Expense";
import { newExpense as addNewExpense } from "./features/expenses/expensesSlice";

SplashScreen.preventAutoHideAsync();

const BottomTab = createBottomTabNavigator<RootParamList>();

const Stack = createNativeStackNavigator<RootParamList>();

function BottomNavigator() {
  const [isOpenNewExpense, setIsOpenNewExpense] = useState(false);

  const dispatch = useDispatch();

  const newExpenseHandler = (expense: ExpenseType) => {
    dispatch(addNewExpense(expense));
  };

  return (
    <>
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
          headerRight: () => (
            <Pressable
              style={({ pressed }) => [
                styles.menuButton,
                pressed ? { opacity: 0.5 } : null,
              ]}
              onPress={() => setIsOpenNewExpense(true)}
            >
              <Ionicons name="add-circle-outline" size={27} color="#FFF7D6" />
            </Pressable>
          ),
        }}
      >
        <BottomTab.Screen
          name="Recent"
          component={RecentExpenses}
          options={{
            tabBarLabel: "Recent",
            tabBarIcon: ({ color }) => (
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
      <ModalNewExpense
        isVisible={isOpenNewExpense}
        onClose={() => setIsOpenNewExpense(false)}
        onSubmitForm={newExpenseHandler}
      />
    </>
  );
}

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
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                headerStyle: { backgroundColor: "#29556B" },
                headerTitleStyle: {
                  fontFamily: "Poppins-SemiBold",
                  fontSize: 27,
                  color: "#FFF7D6",
                },
                headerTitleAlign: "center",
                headerTintColor: "#FFF7D6",
                contentStyle: { backgroundColor: "#FFF7D6" },
              }}
            >
              <Stack.Screen name="Buttons" component={BottomNavigator} />
              <Stack.Screen name="Recent" component={RecentExpenses} />
              <Stack.Screen
                name="Expense"
                component={Expense}
                options={{
                  headerShown: true,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>

        <StatusBar style="light" />
      </PaperProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  menuButton: {
    marginRight: 16,
  },
});
