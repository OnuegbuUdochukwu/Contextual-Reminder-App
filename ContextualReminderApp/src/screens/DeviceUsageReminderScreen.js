import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DeviceUsageReminderScreen = () => {
  const [threshold, setThreshold] = useState(""); // Threshold in minutes
  const [timeUsed, setTimeUsed] = useState(0); // Time in minutes
  const [intervalId, setIntervalId] = useState(null);

  // Load screen time threshold from AsyncStorage
  const loadThreshold = async () => {
    try {
      const savedThreshold = await AsyncStorage.getItem("screenTimeThreshold");
      if (savedThreshold) {
        setThreshold(savedThreshold);
      }
    } catch (error) {
      console.error("Error loading threshold:", error);
    }
  };

  // Save screen time threshold to AsyncStorage
  const saveThreshold = async (newThreshold) => {
    try {
      await AsyncStorage.setItem("screenTimeThreshold", newThreshold.toString());
      setThreshold(newThreshold);
    } catch (error) {
      console.error("Error saving threshold:", error);
    }
  };

  // Start tracking screen time
  const startTracking = () => {
    if (!threshold || isNaN(threshold) || threshold <= 0) {
      Alert.alert("Error", "Please enter a valid threshold (in minutes).");
      return;
    }

    if (intervalId) {
      clearInterval(intervalId);
    }

    const id = setInterval(() => {
      setTimeUsed((prevTime) => {
        const updatedTime = prevTime + 1;
        if (updatedTime >= threshold) {
          Alert.alert(
            "Screen Time Alert",
            `You have used the app for ${updatedTime} minutes. Take a break!`
          );
          clearInterval(id);
        }
        return updatedTime;
      });
    }, 60000); // Increment every minute

    setIntervalId(id);
  };

  // Reset screen time tracking
  const resetTracking = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    setTimeUsed(0);
    setIntervalId(null);
  };

  useEffect(() => {
    loadThreshold();

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Device Usage Reminder</Text>
      <Text style={styles.description}>
        Set a screen time threshold (in minutes) to receive reminders when
        exceeded.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Threshold (minutes)"
        keyboardType="numeric"
        value={threshold}
        onChangeText={(text) => setThreshold(text)}
      />
      <Button
        title="Save Threshold"
        onPress={() => saveThreshold(threshold)}
      />

      <View style={styles.trackingContainer}>
        <Text style={styles.timeText}>Time Used: {timeUsed} minutes</Text>
        <Button title="Start Tracking" onPress={startTracking} />
        <Button title="Reset Tracking" onPress={resetTracking} />
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
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  trackingContainer: {
    marginTop: 20,
  },
  timeText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default DeviceUsageReminderScreen;
