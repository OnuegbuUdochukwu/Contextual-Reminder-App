import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const AddReminderScreen = () => {
  const [reminderName, setReminderName] = useState("");
  const [time, setTime] = useState("");
  const navigation = useNavigation();

  const saveReminder = async () => {
    if (!reminderName || !time) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      const existingReminders = await AsyncStorage.getItem("reminders");
      const reminders = existingReminders ? JSON.parse(existingReminders) : [];
      reminders.push({ reminderName, time });
      await AsyncStorage.setItem("reminders", JSON.stringify(reminders));
      Alert.alert("Success", "Reminder saved!");
      setReminderName("");
      setTime("");
    } catch (error) {
      console.error("Error saving reminder:", error);
      Alert.alert("Error", "Failed to save reminder.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a Reminder</Text>
      <TextInput
        style={styles.input}
        placeholder="Reminder Name"
        value={reminderName}
        onChangeText={setReminderName}
      />
      <TextInput
        style={styles.input}
        placeholder="Time (e.g., 3:00 PM)"
        value={time}
        onChangeText={setTime}
      />
      <Button title="Save Reminder" onPress={saveReminder} />
      <View style={styles.viewButton}>
        <Button title="View Reminders" onPress={() => navigation.navigate("ViewReminders")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  viewButton: {
    marginTop: 10,
  },
});

export default AddReminderScreen;
