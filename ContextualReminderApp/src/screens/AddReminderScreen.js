import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const AddReminderScreen = () => {
  const [reminderName, setReminderName] = useState("");
  const [time, setTime] = useState("");

  const handleSaveReminder = () => {
    console.log("Reminder saved:", { reminderName, time });
    // Here you will save the reminder to AsyncStorage (we'll add this later)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Reminder</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter reminder name"
        value={reminderName}
        onChangeText={setReminderName}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter time (e.g., 3:00 PM)"
        value={time}
        onChangeText={setTime}
      />

      <Button title="Save Reminder" onPress={handleSaveReminder} />
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
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
});

export default AddReminderScreen;
