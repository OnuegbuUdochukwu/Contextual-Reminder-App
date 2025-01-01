import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  Alert,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

const LocationReminderScreen = () => {
  const [locationPermission, setLocationPermission] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // Request location permissions
  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Location access is required for this feature.");
      return;
    }
    setLocationPermission(true);
    fetchCurrentLocation();
  };

  // Fetch the user's current location
  const fetchCurrentLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  // Load reminders from AsyncStorage
  const loadReminders = async () => {
    try {
      const savedReminders = await AsyncStorage.getItem("locationReminders");
      if (savedReminders) {
        setReminders(JSON.parse(savedReminders));
      }
    } catch (error) {
      console.error("Error loading reminders:", error);
    }
  };

  // Save reminders to AsyncStorage
  const saveReminders = async (updatedReminders) => {
    try {
      await AsyncStorage.setItem("locationReminders", JSON.stringify(updatedReminders));
      setReminders(updatedReminders);
    } catch (error) {
      console.error("Error saving reminders:", error);
    }
  };

  // Add a new location-based reminder
  const addReminder = () => {
    if (!newReminder || !latitude || !longitude) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const newReminders = [
      ...reminders,
      {
        name: newReminder,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
    ];
    saveReminders(newReminders);
    setNewReminder("");
    setLatitude("");
    setLongitude("");
  };

  // Check if the user is near any reminder location
  const checkProximity = () => {
    if (!currentLocation || reminders.length === 0) return;

    reminders.forEach((reminder) => {
      const distance = calculateDistance(
        currentLocation.latitude,
        currentLocation.longitude,
        reminder.latitude,
        reminder.longitude
      );

      if (distance < 0.5) {
        Alert.alert("Reminder Triggered", `You are near: ${reminder.name}`);
      }
    });
  };

  // Calculate distance between two GPS coordinates (in kilometers)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Earth's radius in km

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  // Initial load and interval-based proximity checks
  useEffect(() => {
    requestLocationPermission();
    loadReminders();

    const interval = setInterval(() => {
      fetchCurrentLocation();
      checkProximity();
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location-Based Reminders</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Reminder Name"
          value={newReminder}
          onChangeText={setNewReminder}
        />
        <TextInput
          style={styles.input}
          placeholder="Latitude"
          keyboardType="numeric"
          value={latitude}
          onChangeText={setLatitude}
        />
        <TextInput
          style={styles.input}
          placeholder="Longitude"
          keyboardType="numeric"
          value={longitude}
          onChangeText={setLongitude}
        />
        <Button title="Add Reminder" onPress={addReminder} />
      </View>

      <FlatList
        data={reminders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.reminderItem}>
            <Text>{item.name}</Text>
            <Text>
              Lat: {item.latitude}, Lon: {item.longitude}
            </Text>
          </View>
        )}
      />
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
  inputContainer: {
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
  reminderItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default LocationReminderScreen;
