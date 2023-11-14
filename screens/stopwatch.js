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
import Colorodo from "../components/Colorodo";
import { fonts } from "../components/Fonts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Listorodo from "../components/Listorodo";
import Taskodo from "../components/Taskodo";

export default function Stopwatch({ getList }) {
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [totalseconds, setTotalSeconds] = useState(0);
  const [isActive, setActive] = useState(false);
  const [settingsOpen, setsettingsOpen] = useState(false);
  const [bottomRow, setbottomRow] = useState(true);
  const [tasksOpen, setTasksOpen] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [selectedId, setselectedId] = useState(null);
  const [dynamiccolor, setdynamiccolor] = useState(false);
  const [colorodo, setColorodo] = useState(false);
  const [history, setHistory] = useState(false);
  const [clockfont, setclockfont] = useState("NexaLight");
  const [cooldown, setcooldown] = useState(false);
  const [task, setTask] = useState();
  const [bcolor, setbcolor] = useState("#823");
  const [size, setSize] = useState(80);

  const [clearconfirm, setclearconfirm] = useState(false);

  const [customList, setCustomList] = useState([{
    id: 0,
    color: 'rgb(150,150,150)'
  }])

  useEffect(() => {
    getData();
  }, [null]);

  const handleOnReturn = (color) => {
    setbcolor(color);
    syncBG(color);
    console.log(color);
  };

  const setBackgroundColor = (color) => {
    setbcolor(color);
    syncBG(color);
  };

  const syncBG = async (color) => {
    try {
      const jsonValue = JSON.stringify(color);
      await AsyncStorage.setItem("@bcolor", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const changeTask = (task) => {
    setTask(task);
  }

  const syncfont = async (font) => {
    try {
      const jsonValue = JSON.stringify(font);
      await AsyncStorage.setItem("@fonts", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    const counterinfo = await AsyncStorage.getItem("@time");
    const minuteinfo = await AsyncStorage.getItem("@minutes");
    const bginfo = await AsyncStorage.getItem("@bcolor");
    const fontinfo = await AsyncStorage.getItem("@fonts");

    setSeconds(counterinfo != null ? JSON.parse(counterinfo) : null);
    setMinutes(minuteinfo != null ? JSON.parse(minuteinfo) : null);
    setBackgroundColor(bginfo != null ? JSON.parse(bginfo) : null);
    setclockfont(fontinfo != null ? JSON.parse(fontinfo) : null);
  };

  const syncSeconds = async (time, type) => {
    if (type == "seconds") {
      try {
        const jsonValue = JSON.stringify(time);
        await AsyncStorage.setItem("@time", jsonValue);
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const minValue = JSON.stringify(time);
        await AsyncStorage.setItem("@minutes", minValue);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const clearTimerSync = async (time) => {
    try {
      const jsonValue = JSON.stringify(time);
      await AsyncStorage.setItem("@time", jsonValue);
      await AsyncStorage.setItem("@minutes", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const handlelist = async () => {};

  useEffect(() => {
    if (isActive) {
      let interval = setInterval(() => {
        setTotalSeconds(totalseconds + 1);
        if (!cooldown) {
          if (seconds >= 59) {
            syncSeconds(seconds + 1, "seconds");
            syncSeconds(minutes + 1, "minutes");
            setMinutes(minutes + 1);
            setSeconds(0);
          } else {
            syncSeconds(seconds + 1, "seconds");
            setSeconds(seconds + 1);
          }
          clearInterval(interval);
        }
      }, 1000);
    }
  }, [seconds]);

  if (isLoading) {
    return null;
  }

  const createColor = (color) => {
    const newColor = {
      id: customList.length + 1,
      color: color
    }
    console.log(newColor)
    setCustomList([...customList, newColor])
  }

  const navigateHome = () => {
    navigation.navigate("Home", seconds);
  };

  const displayMinutes = minutes < 10 ? "0" + minutes : minutes;
  const displaySeconds = seconds < 10 ? "0" + seconds : seconds;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bcolor }]}>
      {bottomRow == true ? (
        <View style={styles.toprow}>
          <TouchableOpacity onPress={navigateHome}>
            <View style={styles.back}>
              <Icon name="back-2" group="mingcute-tiny-bold-filled" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setsettingsOpen(true)}>
            <View style={styles.back}>
              <Icon name="menu" group="mingcute-tiny-bold-filled" />
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
      <View style={styles.container2}>
        <Text style={[styles.clock, { fontFamily: clockfont, fontSize: 16, marginBottom: 1, marginTop: 5 }]}>{task != null ? task : null}</Text>
        <Text style={[styles.clock, { fontFamily: clockfont, fontSize: size }]}>
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
                        onPress={() =>
                          setBackgroundColor(color.colorId) +
                          setselectedId(color.id)
                        }
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
                  {customList.map((color, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          setBackgroundColor(color.color)
                        }
                        key={index}
                      >
                        <View
                          style={[
                            modalstyles.colors,
                            {
                              backgroundColor: color.color,
                            },
                          ]}
                        >
                          <Text
                            style={{
                              color: "#FFF",
                              fontFamily: "Nexa",
                            }}
                          >
                            {color.color}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )
                  })}
                </ScrollView>
              </View>
              <Text style={{ marginTop: 10, fontFamily: "NexaLight" }}>
                * Each Mystery Color is Randomized Every Launch!
              </Text>
              <TouchableOpacity
                onPress={() => setColorodo(true) + setsettingsOpen(false)}
              >
                <View
                  style={[
                    modalstyles.colorodobutton,
                    {
                      backgroundColor:
                        "#" +
                        Math.floor(Math.random() * 9) +
                        Math.floor(Math.random() * 9) +
                        Math.floor(Math.random() * 9),
                    },
                  ]}
                >
                  <Icon
                    name="color-setting"
                    group="sign-and-symbols"
                    color="#FFF"
                    width="25"
                    height="25"
                    style={{ marginRight: 10 }}
                  />
                  <Text
                    style={{
                      fontFamily: "Nexa",
                      fontSize: 24,
                      color: "#FFF",
                      fontFamily: "Gratina",
                    }}
                  >
                    Colorodo
                  </Text>
                </View>
              </TouchableOpacity>
              <Text
                style={{ fontFamily: "NexaLight", fontSize: 26, marginTop: 20 }}
              >
                Clock Font
              </Text>
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator="false"
              >
                {fonts.map((font, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        setclockfont(font.fontname) + syncfont(font.fontname)
                      }
                      key={index}
                    >
                      <View
                        style={[
                          modalstyles.fonts,
                          {
                            backgroundColor:
                              font.fontname === clockfont ? "#DDD" : "#EEE",
                          },
                        ]}
                      >
                        <Text
                          style={{
                            fontFamily: font.fontname,
                          }}
                        >
                          {font.displayname}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
              <TouchableOpacity onPress={() => setsettingsOpen(false)}>
                <View style={modalstyles.backbutton}>
                  <Text
                    style={{
                      fontFamily: "Nexa",
                      fontSize: 24,
                      color: "#FFF",
                      justifyContent: "center",
                    }}
                  >
                    Back
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal visible={colorodo} transparent={true}>
          <View
            style={[
              modalstyles.container,
              {
                justifyContent: "center",
                marginVertical: 160,
                marginTop: 160,
                marginHorizontal: 20,
              },
            ]}
          >
            <Colorodo onSumbit={handleOnReturn} onNewColor={createColor} />
            <TouchableOpacity
              onPress={() =>
                setColorodo(false) + setsettingsOpen(true) + setbottomRow(false)
              }
            >
              <View
                style={[modalstyles.backbutton, { backgroundColor: "#444" }]}
              >
                <Text
                  style={{
                    fontFamily: "Nexa",
                    fontSize: 24,
                    color: "#FFF",
                    justifyContent: "center",
                  }}
                >
                  Back
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal visible={history} transparent={true}>
          <View
            style={[
              modalstyles.container,
              {
                marginTop: 360,
              },
            ]}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={modalstyles.title}>Listorodo</Text>
              <TouchableOpacity onPress={() => setHistory(false)}>
                <View
                  style={[
                    modalstyles.backbutton,
                    {
                      backgroundColor: "#AAA",
                      padding: 1,
                      paddingHorizontal: 10,
                      margin: 10,
                      marginTop: 10,
                    },
                  ]}
                >
                  <Text
                    style={{
                      fontFamily: "Nexa",
                      fontSize: 24,
                      color: "#FFF",
                      justifyContent: "center",
                    }}
                  >
                    X
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <Listorodo
              seconds={displaySeconds}
              minutes={displayMinutes}
              color={bcolor}
              font={clockfont}
              timeractive={isActive}
              toggle={() => {
                isActive
                  ? setActive(false)
                  : setActive(true) + setSeconds(seconds + 1);
              }}
            />
          </View>
        </Modal>
        <StatusBar style="light" />
      </View>

      {tasksOpen == true ? (
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View style={musicstyles.container}>
            <Text style={musicstyles.header}>Task Box</Text>
            <View style={{ justifyContent: "center" }}>
              <Taskodo setTask={changeTask} seconds={seconds} minutes={minutes} />
            </View>
          </View>
        </View>
      ) : null}
      {optionsOpen == true ? (
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View style={musicstyles.container}>
            <Text style={musicstyles.header}>Quick Options</Text>
            <View style={{ justifyContent: "center", marginTop: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  clearconfirm == true
                    ? setActive(false) +
                      setSeconds(0) +
                      setMinutes(0) +
                      setclearconfirm(false) +
                      clearTimerSync(0)
                    : setclearconfirm(true);
                }}
              >
                <View
                  style={[
                    musicstyles.musicbutton,
                    { backgroundColor: clearconfirm == true ? "#AAA" : "#DDD" },
                  ]}
                >
                  <Text style={{ fontFamily: "Nexa", textAlign: "center" }}>
                    {clearconfirm == false ? "Clear Timer" : "Confirm Clear?"}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setHistory(true);
                }}
              >
                <View
                  style={[
                    musicstyles.musicbutton,
                    {
                      marginTop: 5,
                      backgroundColor: clearconfirm == true ? "#AAA" : "#DDD",
                    },
                  ]}
                >
                  <Text style={{ fontFamily: "Nexa", textAlign: "center" }}>
                    History
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : null}
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
                tasksOpen == true ? setTasksOpen(false) : setTasksOpen(true);
              }}
            >
              <View
                style={[
                  styles.toggle,
                  {
                    padding: 15,
                    paddingVertical: 20,
                    margin: 20,
                    backgroundColor:
                      tasksOpen == true
                        ? "#DDD"
                        : bcolor == "#DDD"
                        ? "#FFF"
                        : "#EEE",
                  },
                ]}
              >
                <Icon name="tag" group="ui-interface" />
              </View>
            </TouchableOpacity>
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
                  {
                    backgroundColor: bcolor == "#DDD" ? "#FFF" : "#EEE",
                  },
                ]}
              >
                {isActive == true ? (
                  <Icon name="pause" group="ui-interface" />
                ) : (
                  <Icon name="play" group="ui-interface" />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                optionsOpen == true
                  ? setOptionsOpen(false)
                  : setOptionsOpen(true);
              }}
            >
              <View
                style={[
                  styles.toggle,
                  {
                    padding: 15,
                    paddingVertical: 20,
                    margin: 20,
                    backgroundColor:
                      optionsOpen == true
                        ? "#DDD"
                        : bcolor == "#DDD"
                        ? "#FFF"
                        : "#EEE",
                  },
                ]}
              >
                <Icon name="menu" group="ui-interface" />
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() =>
              setbottomRow(false) + setTasksOpen(false) + setOptionsOpen(false)
            }
          >
            <View
              style={{
                padding: 30,
                paddingHorizontal: 30,
                borderRadius: 80,
                marginTop: -10,
              }}
            >
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
    borderRadius: 40,

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
  title: {
    fontFamily: "Nexa",
    fontSize: 30,
    color: "#555",
    margin: 10,
    marginLeft: 15,
  },
  backbutton: {
    padding: 10,
    paddingHorizontal: 50,
    backgroundColor: "#aaa",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 30,
    marginTop: 20,
  },
  colorodobutton: {
    padding: 30,
    paddingHorizontal: 130,
    backgroundColor: "#00F",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 30,
    marginTop: 20,
    shadowOffset: { height: 2 },
    shadowColor: "#AAA",
    shadowOpacity: "100%",
    flexDirection: "row",
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
  fonts: {
    padding: 10,
    borderRadius: 20,
    width: 110,
    height: 40,
    backgroundColor: "#EEE",
    marginHorizontal: 3,
    alignItems: "center",
  },
});

const musicstyles = StyleSheet.create({
  container: {
    width: 320,
    height: 300,
    backgroundColor: "#EEE",
    marginBottom: -20,
    borderRadius: 20,
  },
  musicbutton: {
    padding: 10,
    marginHorizontal: 30,
    borderRadius: 20,
    backgroundColor: "#DDD",
  },
  header: {
    marginLeft: 12,
    marginTop: 8,
    fontFamily: "Nexa",
  },
});
