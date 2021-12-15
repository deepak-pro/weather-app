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
  Alert,
} from "react-native";

import { FlatGrid } from "react-native-super-grid";

import { API_KEY } from "../constants";

const image = require("../assets/background.png");
const link =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=indore&appid=27506ebae89d5ad0189eaa55b3215086";

function getWeatherData() {
  return fetch(link).then((data) => data.json());
}

export default function HomeScreen() {
  const [data, setData] = useState({
    coord: { lon: 75.8333, lat: 22.7179 },
    weather: [{ id: 721, main: "Haze", description: "haze", icon: "50d" }],
    base: "stations",
    main: {
      temp: 16.1,
      feels_like: 16.06,
      temp_min: 16.1,
      temp_max: 16.1,
      pressure: 1019,
      humidity: 88,
    },
    visibility: 1000,
    wind: { speed: 0, deg: 0 },
    clouds: { all: 40 },
    dt: 1639540766,
    sys: {
      type: 1,
      id: 9067,
      country: "IN",
      sunrise: 1639531760,
      sunset: 1639570459,
    },
    timezone: 19800,
    id: 1269743,
    name: "Indore",
    cod: 200,
  });

  useEffect(() => {
    console.log("I am here");
    //getWeatherData().then((data) => setData(data));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/background.png")}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.upperview}>
            <View
              style={{
                position: "absolute",
                left: 10,
                top: 10,
                width: 80,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button color="white" title="Refresh" />
            </View>
            <View
              style={{
                position: "absolute",
                right: 10,
                top: 10,
                width: 80,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                color="white"
                title="Search"
                onPress={() => {
                  Alert.prompt("Enter the name of a city");
                }}
              />
            </View>
            <Text style={[{ fontSize: 30 }, styles.whitetext]}>
              {data.name}
            </Text>
            <Text style={[{ fontSize: 60 }, styles.whitetext]}>
              {" "}
              {data.main.temp}&deg;
            </Text>
            <Image
              source={{
                uri: "https://openweathermap.org/img/wn/" + "03d" + "@2x.png",
              }}
              style={{ height: 50, width: 50 }}
              resizeMode="cover"
            />
            <Text style={[{ fontSize: 20 }, styles.whitetext]}>
              {data.weather[0].main}
            </Text>
            <Text style={[{ fontSize: 15, margin: 10 }, styles.whitetext]}>
              High: {data.main.temp_max}&deg; Low: {data.main.temp_min}&deg;
            </Text>
          </View>
          <View style={styles.lowerview}>
            <ScrollView>
              <View style={styles.lowerrow}>
                <View style={styles.loweritem}>
                  <Text style={styles.lowerviewtext}> Wind Speed </Text>
                  <Text style={styles.lowerviewtext}>
                    {" "}
                    {data.wind.speed} meter/sec{" "}
                  </Text>
                </View>
                <View style={styles.loweritem}>
                  <Text style={styles.lowerviewtext}> Pressure </Text>
                  <Text style={styles.lowerviewtext}>
                    {" "}
                    {data.main.pressure} hPa{" "}
                  </Text>
                </View>
              </View>
              <View style={styles.lowerrow}>
                <View style={styles.loweritem}>
                  <Text style={styles.lowerviewtext}> Humidity </Text>
                  <Text style={styles.lowerviewtext}>
                    {" "}
                    {data.main.humidity}%{" "}
                  </Text>
                </View>
                <View style={styles.loweritem}>
                  <Text style={styles.lowerviewtext}> Visibility </Text>
                  <Text style={styles.lowerviewtext}>
                    {" "}
                    {data.visibility} meter{" "}
                  </Text>
                </View>
              </View>
              <View style={styles.lowerrow}>
                <View style={styles.loweritem}>
                  <Text style={styles.lowerviewtext}> Feels Like </Text>
                  <Text style={styles.lowerviewtext}>
                    {" "}
                    {data.main.feels_like}&deg;{" "}
                  </Text>
                </View>
                <View style={styles.loweritem}>
                  <Text style={styles.lowerviewtext}> Cloudiness </Text>
                  <Text style={styles.lowerviewtext}> {data.clouds.all}% </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
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
    backgroundColor: "transparent",
    flex: 0.4,
    alignItems: "center",
    justifyContent: "center",
  },
  lowerview: {
    backgroundColor: "transparent",
    flex: 0.6,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  lowerrow: {
    flexDirection: "row",
    margin: 10,
  },
  whitetext: {
    color: "white",
  },
  loweritem: {
    width: Dimensions.get("window").width / 2 - 30,
    height: Dimensions.get("window").width / 2 - 30,
    backgroundColor: "rgba(255,255,255,0.1)",
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    borderColor: "white",
    borderWidth: 1,
  },
  lowerviewtext: {
    fontSize: 20,
    marginVertical: 10,
    color: "white",
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
