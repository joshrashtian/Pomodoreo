import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-ico";

export default function Listorodo({
  seconds,
  minutes,
  color,
  font,
  onSumbit,
  toggle,
  timeractive,
}) {
  const [currentTime, setCurrentTime] = useState();
  const [times, setTimes] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState();
  const [customTask, setCustomTask] = useState(false);
  const [timer, setTimer] = useState(false);

  const deleteEntry = (deleted) => {
    let timesCopy = [...times];
    let tasksCopy = [...tasks];
    timesCopy.splice(deleted, 1);
    tasksCopy.splice(deleted, 1);
    setTimes(timesCopy);
    setTasks(tasksCopy);
    const jsonValue = JSON.stringify(times);
    AsyncStorage.setItem("@times", jsonValue);

    const jsonValue2 = JSON.stringify(tasks);
    AsyncStorage.setItem("@tasks", jsonValue2);

    console.log(jsonValue + "\n" + jsonValue2)
  };

  const newEntry = () => {
    setTimes([...times, minutes + ":" + seconds])
    setTasks([
      ...tasks,
      newTask == null
        ? "Lap "  + (tasks.length + 1)
        : newTask == ""
        ? "Lap"
        : newTask,
    ])


    const jsonValue = JSON.stringify(times);
    AsyncStorage.setItem("@times", jsonValue);

    const jsonValue2 = JSON.stringify(tasks);
    AsyncStorage.setItem("@tasks", jsonValue2);

    console.log(jsonValue + "\n" + jsonValue2)
  };

  useEffect(() => {
    getList()
  }, [])

  const syncList = async () => {
    try {
      const jsonValue = JSON.stringify(times);
      const jsonValue2 = JSON.stringify(tasks);
      await AsyncStorage.setItem("@times", jsonValue);
      await AsyncStorage.setItem("@tasks", jsonValue2);
      console.log("Times: " + jsonValue + " Tasks: " + jsonValue2 )
    } catch (e) {
      console.log(e);
    }
  };

  const getList = async () => {
    const listinfo = await AsyncStorage.getItem("@times");
    const tasksinfo = await AsyncStorage.getItem("@tasks");
    setTimes(listinfo != null ? JSON.parse(listinfo) : times);
    setTasks(tasksinfo != null ? JSON.parse(tasksinfo) : tasks);
    console.log(times);
  };
  
  const clearList = async () => {
    try{
      await AsyncStorage.removeItem('@times')
      await AsyncStorage.removeItem('@tasks')
      setTimes("");
      setTasks("");
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <View>
      <View style={{ marginBottom: 20 }}>
        {timer ? (
          <TouchableOpacity
            onPress={() => {
              setTimer(false);
            }}
          >
            <Text
              style={{
                fontFamily: font,
                color: color,
                fontSize: 30,
                textAlign: "center",
              }}
            >
              {minutes}:{seconds}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setTimer(true);
            }}
          >
            <View
              style={{
                backgroundColor: color,
                padding: 4,
                paddingHorizontal: 30,
                alignSelf: "center",
                borderRadius: 20,
              }}
            ></View>
          </TouchableOpacity>
        )}
      </View>
      {times != "" ? (
        <ScrollView>
          {times.map((time, index) => {
            let idNumber = index + 1;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  deleteEntry(index);
                }}
              >
                <View style={styles.timeinput}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ fontFamily: "NexaLight" }}>
                      {tasks[index]}
                    </Text>
                    <Text style={{ fontFamily: "Nexa", color: "#AAA" }}>
                      {index}
                    </Text>
                  </View>
                  <Text style={{ fontFamily: "Nexa" }}>{time}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : (
        <View style={{ alignSelf: "center", marginTop: 15 }}>
          <Icon
            name="daily-calendar-empty-page"
            group="coolicons"
            height="50"
            width="50"
            color="#AAA"
            style={{ alignSelf: "center", marginBottom: 10 }}
          />
          <Text
            style={{ fontFamily: "Nexa", color: "#AAA", textAlign: "center" }}
          >
            it's looking a little empty in here
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{ fontFamily: "Nexa", color: "#AAA", textAlign: "center" }}
            >
              Add a task with the
            </Text>
            <View
              style={{
                backgroundColor: "#AAA",
                borderRadius: 5,
                paddingHorizontal: 4,
                marginHorizontal: 3,
              }}
            >
              <Icon
                name="plus"
                group="ui-interface"
                color="#FFF"
                height="10"
                width="10"
                style={{ marginVertical: 4 }}
              />
            </View>
            <Text
              style={{ fontFamily: "Nexa", color: "#AAA", textAlign: "center" }}
            >
              button!
            </Text>
          </View>
        </View>
      )}
      <View style={styles.bottomrow}>
        <ScrollView pagingEnabled horizontal>
          <TouchableOpacity
            onPress={() => {
              newEntry(currentTime);
            }}
          >
            <View style={[styles.newtime, { height: 60 }]}>
              <Icon name="plus" group="ui-interface" color="#FFF" />
            </View>
          </TouchableOpacity>
          {customTask == true ? (
            <TextInput
              style={styles.textinput}
              placeholder="'Lap'...."
              value={newTask}
              onChangeText={(text) => {
                setNewTask(text);
              }}
            />
          ) : (
            <TouchableOpacity
              onPress={() => {
                setCustomTask(true);
              }}
            >
              <View style={styles.newtime}>
                <Icon name="tag" group="ui-interface" color="#FFF" />
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => {
              toggle();
            }}
          >
            <View style={styles.newtime}>
              <Icon
                name={timeractive ? "pause" : "play"}
                group="ui-interface"
                color="#FFF"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              clearList();
            }}
          >
            <View style={styles.newtime}>
              <Icon
                name="trash"
                group="ui-interface"
                color="#FFF"
              />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  newtime: {
    padding: 10,
    paddingHorizontal: 20,
    height: 60,
    backgroundColor: "#777",
    marginHorizontal: 3,
    borderRadius: 20,
    justifyContent: "center",
  },
  newtimetext: {
    fontFamily: "Nexa",
    color: "#FFF",
  },
  timeinput: {
    padding: 10,
    backgroundColor: "#EEE",
    marginHorizontal: 10,
    borderRadius: 10,
    marginVertical: 2,
  },
  bottomrow: {
    position: "absolute",
    marginTop: 320,
    marginHorizontal: 20,
    padding: 8,
    width: 280,
    backgroundColor: "#EEE",
    alignSelf: "center",
    borderRadius: 30,
    flexDirection: "row",
    shadowOpacity: "100%",
    shadowColor: "#777",
    shadowOffset: {
      height: 2,
    },
  },
  textinput: {
    padding: 10,
    height: 30,
    width: 100,
    borderRadius: 30,
    marginHorizontal: 3,
    fontFamily: "Nexa",
    backgroundColor: "#FFF",
  },
});
