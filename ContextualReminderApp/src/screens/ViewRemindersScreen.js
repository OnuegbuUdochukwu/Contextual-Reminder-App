import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ViewRemindersScreen = () => {
  const [reminders, setReminders] = useState([]);

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
          renderItem={({ item }) => (
            <View style={styles.reminderItem}>
              <Text style={styles.reminderText}>{item.reminderName}</Text>
              <Text style={styles.reminderTime}>{item.time}</Text>
            </View>
          )}
        />
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
});

export default ViewRemindersScreen;
