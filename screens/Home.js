import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-ico";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function Home({ route, navigation }) {
  const {newseconds} = route.params;
  const [seconds, setSeconds] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [clockfont, setclockfont] = useState("Lemonmilk");

  let currentSeconds = JSON.stringify(newseconds);

  const getData = async () => {
    const secondinfo = await AsyncStorage.getItem("@time");
    const minuteinfo = await AsyncStorage.getItem("@minutes");
    const fontinfo = await AsyncStorage.getItem("@fonts");
    setSeconds(secondinfo != null ? JSON.parse(secondinfo) : null);
    setMinutes(minuteinfo != null ? JSON.parse(minuteinfo) : null);
    setclockfont(clockfont != null ? JSON.parse(fontinfo) : null);
  };

  setInterval(getData, 1000);

  const displayMinutes = minutes;
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
            {seconds > 0 ? (
            <View
              style={{ padding: 10, backgroundColor: "#DDD", borderRadius: 30, flexDirection: 'row' }}
            >
              <Icon name="clock-2" group="mingcute-tiny-bold-filled" width="12" height="12"/>
              <Text style={{ fontFamily: clockfont, verticalAlign: 'middle', marginLeft: 2}}>
                {displayMinutes}:{displaySeconds}
              </Text>
            </View>
          ) : null}
          </View>
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
  },
});
