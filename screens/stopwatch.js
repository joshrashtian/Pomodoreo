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

export default function Stopwatch() {
  const navigation = useNavigation();

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [totalseconds, setTotalSeconds] = useState(0);
  const [isActive, setActive] = useState(false);
  const [settingsOpen, setsettingsOpen] = useState(false);
  const [bottomRow, setbottomRow] = useState(true);
  const [selectedId, setselectedId] = useState(null);
  const [dynamiccolor, setdynamiccolor] = useState(false);

  const [bcolor, setbcolor] = useState("#823");

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
      { bottomRow == true ? 
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
      : null}
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
                <ScrollView
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator="false"
                >
                  {Colors.map((color, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => setBackgroundColor(color.colorId) + setselectedId(color.id)}
                        key={index}
                      >
                        <View
                          style={[
                            modalstyles.colors,
                            {
                              backgroundColor: color.colorId,
                            },
                          ]}
                        >
                          <Text
                            style={{
                              color: (color.light = 1 ? "#FFF" : "#000"),
                              fontFamily: "Nexa",
                            }}
                          >
                            {color.colorName}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
              <Text style={{marginTop: 10, fontFamily: 'NexaLight'}}>* Each Mystery Color is Randomized Every Launch!</Text>
              <TouchableOpacity onPress={() => setsettingsOpen(false)}>
                <View style={modalstyles.backbutton}>
                  <Text
                    style={{
                      fontFamily: "Nexa",
                      fontSize: 24,
                      color: "#FFF",
                      justifyContent: 'center',
                    }}
                  >
                    Back
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <StatusBar style="light" />
      </View>

      {bottomRow == true ? (
        <View
          style={[
            styles.bottomcontainer,
            { backgroundColor: bcolor == "#DDD" ? "#FFF" : "#EEE" },
          ]}
        >
          <View style={{ flexDirection: "row", marginBottom: -10 }}>
            <TouchableOpacity
              onPress={() => {
                isActive == true
                  ? setActive(false)
                  : setActive(true) + setSeconds(seconds + 1);
              }}
            >
              <View
                style={[
                  styles.toggle,
                  { backgroundColor: bcolor == "#DDD" ? "#FFF" : "#EEE" },
                ]}
              >
                {isActive == true ? (
                  <Icon name="pause" group="ui-interface" />
                ) : (
                  <Icon name="play" group="ui-interface" />
                )}
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setbottomRow(false)}>
            <View style={[styles.toggle]}>
              <Icon name="down" group="mingcute-tiny-bold-filled" />
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={() => setbottomRow(true)}>
          <View style={{ alignSelf: "center", marginBottom: -10 }}>
            <Icon name="up" group="mingcute-tiny-bold-filled" />
          </View>
        </TouchableOpacity>
      )}
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
    padding: 30,
    paddingHorizontal: 30,
    borderRadius: 80,
    shadowOpacity: "90%",
    shadowOffset: {
      height: 2,
    },
    shadowColor: "#aaa",
  },
  downarrow: {
    padding: 0,
    shadowOpacity: "90%",
    shadowOffset: {
      height: 2,
    },
    shadowColor: "#aaa",
  },
  toggletext: {
    fontFamily: "Nexa",
    fontSize: 20,
  },
  bottomcontainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,

    height: 100,
    marginHorizontal: 15,
    marginBottom: -10,
    shadowOpacity: "90%",
    shadowOffset: {
      height: 2,
    },
    shadowColor: "#999",
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
    shadowOffset: {
      height: 1,
    },
    shadowOpacity: "100%",
  },
  backbutton: {
    padding: 10,
    paddingHorizontal: 25,
    backgroundColor: "#00F",
    marginHorizontal: 30,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 30,
    marginTop: 20,
  },
  colorrow: {
    marginTop: 10,
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  colors: {
    padding: 10,
    borderRadius: 20,
    width: 110,
    marginHorizontal: 3,
    alignItems: "center",
  },
});
