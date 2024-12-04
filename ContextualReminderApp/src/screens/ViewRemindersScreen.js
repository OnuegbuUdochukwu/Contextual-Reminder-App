import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button, Alert, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ViewRemindersScreen = () => {
  const [reminders, setReminders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentReminder, setCurrentReminder] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedTime, setEditedTime] = useState("");

  // Fetch reminders from AsyncStorage
  const fetchReminders = async () => {
    try {
      const savedReminders = await AsyncStorage.getItem("reminders");
      if (savedReminders) {
        setReminders(JSON.parse(savedReminders));
      }
    } catch (error) {
      console.error("Error fetching reminders:", error);
    }
  };

  // Save updated reminders to AsyncStorage
  const saveReminders = async (updatedReminders) => {
    try {
      await AsyncStorage.setItem("reminders", JSON.stringify(updatedReminders));
      setReminders(updatedReminders);
    } catch (error) {
      console.error("Error saving reminders:", error);
    }
  };

  // Delete a reminder
  const deleteReminder = (index) => {
    const updatedReminders = reminders.filter((_, i) => i !== index);
    saveReminders(updatedReminders);
  };

  // Start editing a reminder
  const startEditing = (index) => {
    const reminder = reminders[index];
    setCurrentReminder(index);
    setEditedName(reminder.reminderName);
    setEditedTime(reminder.time);
    setIsEditing(true);
  };

  // Save edited reminder
  const saveEdit = () => {
    if (!editedName || !editedTime) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const updatedReminders = reminders.map((reminder, index) =>
      index === currentReminder
        ? { reminderName: editedName, time: editedTime }
        : reminder
    );

    saveReminders(updatedReminders);
    setIsEditing(false);
    setCurrentReminder(null);
    setEditedName("");
    setEditedTime("");
  };

  // Fetch reminders when the screen loads
  useEffect(() => {
    fetchReminders();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Reminders</Text>
      {reminders.length === 0 ? (
        <Text style={styles.noReminders}>No reminders found!</Text>
      ) : (
        <FlatList
          data={reminders}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.reminderItem}>
              <Text style={styles.reminderText}>{item.reminderName}</Text>
              <Text style={styles.reminderTime}>{item.time}</Text>
              <View style={styles.actions}>
                <Button title="Edit" onPress={() => startEditing(index)} />
                <Button title="Delete" onPress={() => deleteReminder(index)} color="red" />
              </View>
            </View>
          )}
        />
      )}
      {isEditing && (
        <View style={styles.editContainer}>
          <Text style={styles.editTitle}>Edit Reminder</Text>
          <TextInput
            style={styles.input}
            placeholder="Reminder Name"
            value={editedName}
            onChangeText={setEditedName}
          />
          <TextInput
            style={styles.input}
            placeholder="Time (e.g., 3:00 PM)"
            value={editedTime}
            onChangeText={setEditedTime}
          />
          <Button title="Save Changes" onPress={saveEdit} />
          <Button title="Cancel" onPress={() => setIsEditing(false)} color="red" />
        </View>
      )}
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
  noReminders: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
  reminderItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 5,
  },
  reminderText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  reminderTime: {
    fontSize: 16,
    color: "#555",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  editContainer: {
    marginTop: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  editTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
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
});

export default ViewRemindersScreen;
