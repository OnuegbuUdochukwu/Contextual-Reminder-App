import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddReminderScreen from "./AddReminderScreen";
import ViewRemindersScreen from "./ViewRemindersScreen";
import WeatherReminderScreen from "./screens/WeatherReminderScreen";
import ReminderTemplateScreen from "./screens/ReminderTemplateScreen";

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
        
        <Stack.Screen name="Weather Reminder" component={WeatherReminderScreen} />
        <Stack.Screen name="Templates" component={ReminderTemplateScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
