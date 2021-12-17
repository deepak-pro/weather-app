import React, { useState, useEffect } from "react";
import {
  Text,
  View,
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
import { get } from "react-native/Libraries/Utilities/PixelRatio";

import { API_KEY, testData } from "../constants";

const image = require("../assets/background.png");
// https://api.openweathermap.org/data/2.5/weather?units=metric&q=indore&appid=27506ebae89d5ad0189eaa55b3215086
const linkPrefix =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const linkSuffix = "&appid=27506ebae89d5ad0189eaa55b3215086";

export default function HomeScreen() {
  const [iconLink, setIconLink] = useState("https://google.com");
  const [city, setCity] = useState("indore");
  const [data, setData] = useState(testData);

  const getWeatherData = () => {
    return fetch(linkPrefix + city + linkSuffix).then((data) => data.json());
  };

  const refresh = () => {
    getWeatherData().then((data) => {
      if (data.cod === 200) {
        setData(data);
      } else {
        setCity("Indore");
        Alert.alert("City not found");
      }
    });
  };

  useEffect(() => {
    refresh();
  }, [city]);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require("../assets/background.png")}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView>
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
                  backgroundColor: "transparent",
                }}
              >
                <Button
                  color="white"
                  title="Refresh"
                  onPress={() => {
                    refresh();
                  }}
                />
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
                    Alert.prompt("Enter city name", "", (cityText) => {
                      if (cityText) {
                        setCity(cityText);
                      }
                    });
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
                  uri:
                    "https://openweathermap.org/img/wn/" +
                    data.weather[0].icon +
                    "@2x.png",
                }}
                style={{ height: 50, width: 50, tintColor: "white" }}
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
            </View>
          </ScrollView>
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
    paddingTop: 50,
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
    backgroundColor: "rgba(0,60,130,0.3)",
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderColor: "white",
    borderWidth: 0.5,
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
