import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

let toggletext = "Activate Stopwatch";

export default function Stopwatch() {
  const navigation = useNavigation();

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [totalseconds, setTotalSeconds] = useState(0);
  const [isActive, setActive] = useState(false);

  const toggle = () => {
    if (isActive) {
      setActive(false);
      toggletext = "Turn On";
    } else {
      setActive(true);
      setSeconds(seconds + 1);
      setTotalSeconds(totalseconds + 1);
      toggletext = "Turn Off";
    }
  };

  useEffect(() => {
    if (isActive) {
      let interval = setInterval(() => {
        setTotalSeconds(totalseconds + 1);
        if (seconds === 59) {
          setMinutes(minutes + 1);
          setSeconds(0);
        } else {
          setSeconds(seconds + 1);
        }
        clearInterval(interval);
      }, 1000);
    }
  }, [seconds]);

  const displayMinutes = minutes < 10 ? "0" + minutes : minutes;
  const displaySeconds = seconds < 10 ? "0" + seconds : seconds;

  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
      <View style={styles.back}>
        <Text>Back</Text>
      </View>
    </TouchableOpacity>
      <Text style={styles.clock}>
        {displayMinutes}:{displaySeconds}
      </Text>
      {useEffect(() => {
        if (isActive) {
          return () => {
            <Text style={{ marginTop: 30 }}>
              Total Seconds Passed: {totalseconds}
            </Text>;
          };
        }
      }, [seconds])}
      <TouchableOpacity onPress={toggle}>
        <View style={styles.toggle}>
          <Text style={styles.toggletext}>{toggletext}</Text>
        </View>
      </TouchableOpacity>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#37526b",
    alignItems: "center",
    justifyContent: "center",
  },
  clock: {
    color: "#FFF",
    fontSize: 80,
    fontWeight: "500",
  },
  toggle: {
    position: "absolute",
    alignSelf: "center",
    marginTop: 200,
    padding: 30,
    borderRadius: 40,
    backgroundColor: "#EEE",
  },
  toggletext: {
    fontWeight: "700",
    fontSize: 20,
  },
  back: {

  }
});
