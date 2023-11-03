import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-ico";

let toggletext = "Activate Stopwatch";

export default function Stopwatch() {
  const navigation = useNavigation();

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [totalseconds, setTotalSeconds] = useState(0);
  const [isActive, setActive] = useState(false);
  const [settingsOpen, setsettingsOpen] = useState(false);

  const [bcolor, setbcolor] = useState("#823");

  const toggle = () => {
    if (isActive) {
      setActive(false);
      toggletext = "Resume";
    } else {
      setActive(true);
      setSeconds(seconds + 1);
      setTotalSeconds(totalseconds + 1);
      setBackgroundColor("gray");
      toggletext = "Pause";
    }
  };



  const setBackgroundColor = (color, modal) => {
    if(color === "gray") { 
    setbcolor("#bbb")
    }
  }

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
    <View style={[styles.container, { backgroundColor: bcolor}]}>
    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
      <View style={styles.back}>
        <Icon name="back-2" group="mingcute-tiny-bold-filled"/>
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
      <Modal
      visible={settingsOpen} transparent={true}>
        <View style={{ marginTop: 40, backgroundColor: '#FFF', flex: 1}}>
          <Text>Testing</Text>
          <TouchableOpacity onPress={() => setsettingsOpen(false)}>
            <Text>Settings Off</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    alignItems: "center",
    justifyContent: "center",
  },
  clock: {
    color: "#FFF",
    fontSize: 80,
    fontFamily: 'NexaLight',
  },
  toggle: {
    position: "absolute",
    alignSelf: "center",
    marginTop: 200,
    padding: 20,
    paddingHorizontal: 30,
    borderRadius: 40,
    backgroundColor: "#EEE",
  },
  toggletext: {
    fontFamily: 'Nexa',
    fontSize: 20,
  },
  back: {
    position: 'absolute',
    marginTop: -300,
    marginLeft: -170,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 20,
  }
});
