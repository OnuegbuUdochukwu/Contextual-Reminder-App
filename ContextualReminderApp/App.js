import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AddReminderScreen from "./src/screens/AddReminderScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AddReminder">
        <Stack.Screen
          name="AddReminder"
          component={AddReminderScreen}
          options={{ title: "Add Reminder" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
