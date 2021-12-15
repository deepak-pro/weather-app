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
  Dimensions,
} from "react-native";

import { FlatGrid } from "react-native-super-grid";

import { API_KEY } from "../constants";

const image = require("../assets/background.png");
const link =
  "https://api.openweathermap.org/data/2.5/weather?q=indore&appid=27506ebae89d5ad0189eaa55b3215086";

function getWeatherData() {
  return fetch(link).then((data) => data.json());
}

function generateGridData(data) {
  let gridData = [];
  gridData.push(data.wind.speed);
  gridData.push(data.main.pressure);
  gridData.push(data.main.humidity);
  gridData.push(data.visibility + " m");
  gridData.push(data.main.feels_like);
  gridData.push(data.clouds.all);
  return gridData;
}

export default function HomeScreen() {
  const [gdata, setGdata] = useState([]);
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

  useEffect(() => {
    console.log("I am here");
    //getWeatherData().then((data) => setData(data));
    const gridData = generateGridData(data);
    setGdata(gridData);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.upperview}>
        <Text style={{ fontSize: 30 }}>{data.name}</Text>
        <Text style={{ fontSize: 60 }}> {data.main.temp}&deg;</Text>
        <Image
          source={{
            uri: "https://openweathermap.org/img/wn/50d@2x.png",
          }}
          style={{ height: 50, width: 50 }}
          resizeMode="cover"
        />
        <Text style={{ fontSize: 20 }}>{data.weather[0].main}</Text>
        <Text style={{ fontSize: 15, margin: 10 }}>
          High: {data.main.temp_max}&deg; {data.main.temp_min}: 14&deg;
        </Text>
      </View>
      <View style={styles.lowerview}>
        {/* <FlatGrid
          style={styles.gridView}
          itemDimension={130}
          data={gdata}
          spacing={10}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={{ fontSize: 30 }}>{item}</Text>
            </View>
          )}
        /> */}

        <ScrollView>
          <View style={styles.lowerrow}>
            <View style={styles.loweritem}>
              <Text style={styles.lowerviewtext}> Wind Speed </Text>
              <Text style={styles.lowerviewtext}> {data.wind.speed} </Text>
            </View>
            <View style={styles.loweritem}>
              <Text style={styles.lowerviewtext}> Pressure </Text>
              <Text style={styles.lowerviewtext}> {data.main.pressure} </Text>
            </View>
          </View>
          <View style={styles.lowerrow}>
            <View style={styles.loweritem}>
              <Text style={styles.lowerviewtext}> Humidity </Text>
              <Text style={styles.lowerviewtext}> {data.main.humidity} </Text>
            </View>
            <View style={styles.loweritem}>
              <Text style={styles.lowerviewtext}> Visibility </Text>
              <Text style={styles.lowerviewtext}> {data.visibility} </Text>
            </View>
          </View>
          <View style={styles.lowerrow}>
            <View style={styles.loweritem}>
              <Text style={styles.lowerviewtext}> Feels Like </Text>
              <Text style={styles.lowerviewtext}> {data.main.feels_like} </Text>
            </View>
            <View style={styles.loweritem}>
              <Text style={styles.lowerviewtext}> Clouds </Text>
              <Text style={styles.lowerviewtext}> {data.clouds.all} </Text>
            </View>
          </View>
        </ScrollView>
      </View>
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
    backgroundColor: "white",
    flex: 0.4,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  lowerview: {
    backgroundColor: "white",
    flex: 0.6,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  lowerrow: {
    flexDirection: "row",
    margin: 10,
  },
  loweritem: {
    width: Dimensions.get("window").width / 2 - 30,
    height: Dimensions.get("window").width / 2 - 30,
    backgroundColor: "white",
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
  },
  lowerviewtext: {
    fontSize: 20,
    marginVertical: 10,
  },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    padding: 10,
    height: 150,
    backgroundColor: "grey",
  },
});
