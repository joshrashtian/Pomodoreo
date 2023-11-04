import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-ico";
import { Colors } from "../components/colors";

let toggletext = "Activate Stopwatch";

export default function Stopwatch() {
  const navigation = useNavigation();

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [totalseconds, setTotalSeconds] = useState(0);
  const [isActive, setActive] = useState(false);
  const [settingsOpen, setsettingsOpen] = useState(false);
  const [dynamiccolor, setdynamiccolor] = useState(false);

  const [bcolor, setbcolor] = useState("#823");

  const toggle = () => {
    if (isActive) {
      setActive(false);
      toggletext = "Resume";
    } else {
      setActive(true);
      setSeconds(seconds + 1);
      setTotalSeconds(totalseconds + 1);
      toggletext = "Pause";
    }
  };

  const setBackgroundColor = (color) => {
      setbcolor(color);
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
    <SafeAreaView style={[styles.container, { backgroundColor: bcolor }]}>
      <View style={styles.toprow}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <View style={styles.back}>
            <Icon name="back-2" group="mingcute-tiny-bold-filled" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setsettingsOpen(true)}>
          <View style={styles.back}>
            <Icon name="settings" group="mingcute-tiny-bold-filled" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.container2}>
        <Text style={styles.clock}>
          {displayMinutes}:{displaySeconds}
        </Text>
        <Modal visible={settingsOpen} transparent={true}>
          <View style={modalstyles.container}>
            <View style={{ marginTop: 20, marginHorizontal: 16 }}>
              <Text style={{ fontFamily: "Nexa", fontSize: 30 }}>Settings</Text>
              <Text
                style={{ fontFamily: "NexaLight", fontSize: 26, marginTop: 20 }}
              >
                Background Color
              </Text>
              <View style={modalstyles.colorrow}>
                <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator="false">
                {Colors.map((color, key) => {
                  return (
                    <TouchableOpacity
                      onPress={() => setBackgroundColor(color.colorId)}
                    >
                      <View
                        style={[
                          modalstyles.colors,
                          {
                            backgroundColor: color.colorId,
                          },
                        ]}
                      >
                        <Text style={{color: (color.light = 1 ? "#FFF" : "#000"), fontFamily: 'Nexa'}}>{color.colorName}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
                </ScrollView>
              </View>
              <TouchableOpacity onPress={() => setsettingsOpen(false)}>
                <View style={modalstyles.backbutton}>
                  <Text
                    style={{ fontFamily: "Nexa", fontSize: 24, color: "#FFF", marginTop: 20 }}
                  >
                    Return
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <StatusBar style="light" />
      </View>
      <View style={styles.bottomcontainer}>
        <TouchableOpacity onPress={toggle}>
          <View style={styles.toggle}>
            <Text style={styles.toggletext}>{toggletext}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  clock: {
    color: "#FFF",
    fontSize: 80,
    fontFamily: "NexaLight",
  },
  toggle: {
    padding: 20,
    paddingHorizontal: 30,
    borderRadius: 40,
    backgroundColor: "#EEE",
  },
  toggletext: {
    fontFamily: "Nexa",
    fontSize: 20,
  },
  bottomcontainer: {
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  toprow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  back: {
    padding: 10,
    width: 40,
    marginHorizontal: 15,
    marginTop: 10,
    backgroundColor: "#FFF",
    borderRadius: 20,
  },
});

const modalstyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    backgroundColor: "#fff",
    borderRadius: 30,
    shadowOffset: 0,
    shadowOpacity: "100%",
  },
  backbutton: {
    paddingHorizontal: 24,
    backgroundColor: "#00F",
    marginHorizontal: 30,
    alignSelf: "center",
    justifyContent: 'center',
    borderRadius: 30,
  },
  colorrow: {
    justifyContent: "space-evenly",
    flexDirection: 'row'
  },
  colors: {
    padding: 10,
    borderRadius: 20,
    width: 90,
    marginHorizontal: 3,
    alignItems: 'center',
  },
});
