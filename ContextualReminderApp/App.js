import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddReminderScreen from "./AddReminderScreen";
import ViewRemindersScreen from "./ViewRemindersScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AddReminder">
        <Stack.Screen 
          name="AddReminder" 
          component={AddReminderScreen} 
          options={{ title: "Add Reminder" }}
        />
        <Stack.Screen 
          name="ViewReminders" 
          component={ViewRemindersScreen} 
          options={{ title: "Your Reminders" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
