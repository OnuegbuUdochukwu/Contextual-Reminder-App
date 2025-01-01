import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, Picker } from "react-native";

const ReminderTemplateScreen = () => {
  const [template, setTemplate] = useState("grocery");
  const [customInput, setCustomInput] = useState("");
  const [time, setTime] = useState("");

  const handleReminder = () => {
    const message =
      template === "custom"
        ? customInput
        : `Don't forget to ${template === "grocery" ? "buy groceries" : "check your emails"} at ${time}.`;
    Alert.alert("Reminder Set", message);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Reminder Templates</Text>
      <Picker selectedValue={template} onValueChange={(item) => setTemplate(item)}>
        <Picker.Item label="Buy groceries" value="grocery" />
        <Picker.Item label="Check emails" value="email" />
        <Picker.Item label="Custom" value="custom" />
      </Picker>
      {template === "custom" && (
        <TextInput
          style={styles.input}
          placeholder="Enter your custom reminder"
          value={customInput}
          onChangeText={setCustomInput}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Set a time (e.g., 15:30)"
        value={time}
        onChangeText={setTime}
      />
      <Button title="Set Reminder" onPress={handleReminder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  input: { height: 50, borderColor: "#ccc", borderWidth: 1, borderRadius: 5, marginBottom: 10, paddingHorizontal: 10 },
});

export default ReminderTemplateScreen;
