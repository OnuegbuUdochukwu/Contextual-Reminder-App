import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import axios from "axios";

const WeatherReminderScreen = () => {
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            q: "New York", // Replace with user's location dynamically
            appid: "YOUR_API_KEY",
            units: "metric",
          },
        }
      );
      setWeather(response.data);
      checkWeatherCondition(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const checkWeatherCondition = (data) => {
    if (data.weather.some((condition) => condition.main === "Rain")) {
      Alert.alert("Weather Alert", "Don't forget your umbrella! Rain is expected.");
    } else {
      Alert.alert("Weather Alert", "No rain forecasted today.");
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather-Based Reminder</Text>
      <Button title="Check Weather" onPress={fetchWeather} />
      {weather && (
        <Text style={styles.description}>
          Current weather in {weather.name}: {weather.weather[0].description}, {weather.main.temp}°C
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  description: { fontSize: 16, marginTop: 10 },
});

export default WeatherReminderScreen;
