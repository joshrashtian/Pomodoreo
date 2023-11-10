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

export default function Listorodo({ seconds, minutes, onSumbit, toggle }) {
  const [currentTime, setCurrentTime] = useState();
  const [times, setTimes] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState();
  const [customTask, setCustomTask] = useState(false);

  const deleteEntry = (deleted) => {
    let timesCopy = [...times];
    let tasksCopy = [...tasks];
    timesCopy.splice(deleted, 1);
    tasksCopy.splice(deleted, 1);
    setTimes(timesCopy);
    setTasks(tasksCopy);
  };

  const newEntry = (newTime) => {
    setTimes([...times, minutes + ":" + seconds]);
    setTasks([...tasks, newTask == null ? "Lap" : newTask == "" ? "Lap" : newTask ])
    console.log(tasks)
  };

  const syncList = async () => {
    try {
      const jsonValue = JSON.stringify(times);
      await AsyncStorage.setItem("@times", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const getList = async () => {
    const listinfo = await AsyncStorage.getItem("@times");
    setTimes(listinfo != null ? JSON.parse(listinfo) : "");
  };


  return (
    <View>
      {times != "" ? (
        <ScrollView
        pagingEnabled>
          {times.map((time, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  deleteEntry(index);
                }}
              >
                <View style={styles.timeinput}>
                  <Text style={{ fontFamily: "NexaLight"}}>{tasks[index]} {index + 1}</Text>
                  <Text style={{ fontFamily: "Nexa" }}>{time}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : null}
      <View style={styles.bottomrow}>
      <TouchableOpacity
        onPress={() => {
          newEntry(currentTime) + syncList;
        }}
      >
        <View style={styles.newtime}>
          <Text style={styles.newtimetext}>+ New Time</Text>
        </View>
      </TouchableOpacity>
      { customTask == true ?
      <TextInput style={styles.textinput} placeholder="Lap" value={newTask} onChangeText={(text) => {setNewTask(text)}}/>
      : 
      <TouchableOpacity onPress={() => {setCustomTask(true)}}><View style={styles.newtime}>
        <Text style={styles.newtimetext}>Custom Task</Text>
        </View></TouchableOpacity>}
      <TouchableOpacity
        onPress={() => {toggle()}}
      >
        <View style={styles.newtime}>
          <Text style={styles.newtimetext}>Play/Pause</Text>
        </View>
      </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  newtime: {
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "#8C8",
    marginHorizontal: 3,
    borderRadius: 10,
  },
  newtimetext: {
    fontFamily: "Nexa",
    color: '#FFF'
  },
  timeinput: {
    padding: 10,
    backgroundColor: "#EEE",
    marginHorizontal: 10,
    borderRadius: 10,
    marginVertical: 2,
  },
  bottomrow: {
    position: 'absolute',
    marginTop: 290,
    padding: 8,
    backgroundColor: "#EEE",
    alignSelf: 'center',
    borderRadius: 30,
    flexDirection: 'row',
    shadowOpacity: '100%',
    shadowColor: '#BBB',
    shadowOffset: {
        height: 2,
    }
  },
  textinput: {
    padding: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
    backgroundColor: '#FFF'
  }
});
