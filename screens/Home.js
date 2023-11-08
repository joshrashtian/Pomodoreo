import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-ico";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home({ route, navigation }) {
  const {newseconds} = route.params;
  const [seconds, setSeconds] = useState(null);
  const [minutes, setMinutes] = useState(null);

  const getData = async () => {
    const secondinfo = await AsyncStorage.getItem("@time");
    const minuteinfo = await AsyncStorage.getItem("@minutes");
    setSeconds(secondinfo != null ? JSON.parse(secondinfo) : null);
    setMinutes(minuteinfo != null ? JSON.parse(minuteinfo) : null);
  };

  useEffect(() => {
    getData();
  }, [newseconds] );

  const displayMinutes = minutes < 10 ? "0" + minutes : minutes;
  const displaySeconds = seconds < 10 ? "0" + seconds : seconds;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pomodoreo</Text>
      <View style={styles.menu}>
        <TouchableOpacity onPress={() => navigation.navigate("Stopwatch")}>
          <View style={styles.menubutton}>
            <Icon
              name="stopwatch"
              height="50"
              width="50"
              group="mingcute-tiny-bold-filled"
            />
            <Text
              style={{
                fontFamily: "NexaLight",
                fontWeight: "300",
                fontSize: 30,
                marginLeft: 14,
                marginTop: 4,
                color: "#555",
              }}
            >
              Stopwatch
            </Text>
          </View>
          {seconds > 0 ? (
            <View
              style={{ padding: 10, backgroundColor: "#DDD", borderRadius: 30 }}
            >
              <Text style={{ fontFamily: "Nexa" }}>
                {displayMinutes}:{displaySeconds}
              </Text>
            </View>
          ) : null}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontWeight: "600",
    fontSize: 36,
    fontFamily: "Nexa",
    textAlign: "center",
    color: "#444",
  },
  menubutton: {
    borderRadius: 30,
    marginHorizontal: 20,
    backgroundColor: "#EEE",
    padding: 20,
    paddingVertical: 50,
    flexDirection: "row",
  },
});
