import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  ImageBackground,
  Button,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native";

import { API_KEY } from "../constants";

const image = require("../assets/background.png");
const link =
  "https://api.openweathermap.org/data/2.5/weather?q=indore&appid=27506ebae89d5ad0189eaa55b3215086";

function getWeatherData() {
  return fetch(link).then((data) => data.json());
}

export default function HomeScreen() {
  const [data, setData] = useState({
    coord: { lon: 75.8333, lat: 22.7179 },
    weather: [{ id: 721, main: "Haze", description: "haze", icon: "50d" }],
    base: "stations",
    main: {
      temp: 298.25,
      feels_like: 298.04,
      temp_min: 298.25,
      temp_max: 298.25,
      pressure: 1017,
      humidity: 47,
    },
    visibility: 5000,
    wind: { speed: 2.57, deg: 200 },
    clouds: { all: 11 },
    dt: 1639466954,
    sys: {
      type: 1,
      id: 9067,
      country: "IN",
      sunrise: 1639445325,
      sunset: 1639484038,
    },
    timezone: 19800,
    id: 1269743,
    name: "Indore",
    cod: 200,
  });

  //   useEffect(() => {
  //     console.log("I am here");
  //     getWeatherData().then((data) => setData(data));
  //   }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.upperview}>
        <Text style={{ fontSize: 30 }}>{data.name}</Text>
        <Text style={{ fontSize: 60 }}> 24&deg;</Text>
        <Image
          source={{
            uri: "https://openweathermap.org/img/wn/50d@2x.png",
          }}
          style={{ height: 50, width: 50 }}
          resizeMode="cover"
        />
        <Text style={{ fontSize: 20 }}>Haze</Text>
        <Text style={{ fontSize: 15, margin: 10 }}>
          High: 26&deg; Low: 14&deg;
        </Text>
      </View>
      <View style={styles.lowerview}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
  },
  upperview: {
    backgroundColor: "red",
    flex: 0.4,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  lowerview: {
    backgroundColor: "blue",
    flex: 0.6,
    alignItems: "center",
    justifyContent: "center",
  },
});
