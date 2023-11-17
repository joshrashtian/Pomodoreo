import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Touchable,
  TextInput,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-ico";

const types = ["Work", "School", "Leisure"];

export default function Taskodo({ setTask, minutes, seconds }) {
  const [newTask, setCurrentTask] = useState();
  const [newType, setNewType] = useState();
  const [taskActive, setTaskActive] = useState();
  const [task, selectedTask] = useState({});

  const [intSeconds, setIntSeconds] = useState(seconds);
  const [intMinutes, setIntMinutes] = useState(minutes);
  const [newSeconds, setNewSeconds] = useState(seconds);
  const [newMinutes, setNewMinutes] = useState(minutes);
  const [firstUse, setFirstUse] = useState(true);
  const [viewModal, setViewModal] = useState(false);

  const [globaltype, setType] = useState("Work");
  const [editType, setEditType] = useState(1);
  const [inputTask, setInputTask] = useState(false);
  const [globaltasks, createTask] = useState([
    {
      id: 0,
      name: "Math Homework",
      description: "Do Your Math Homework!!",
      type: "School",
      focusedMinutes: 0,
      focusedSeconds: 0,
    },
    {
      id: 1,
      name: "Feed Dog",
      description: "Feed Your Dog!",
      type: "Leisure",
      focusedMinutes: 0,
      focusedSeconds: 0,
    },
    {
      id: 2,
      name: "Excel Spreadsheet",
      description: "Finish Your Excel Spreadsheet!",
      type: "Work",
      focusedMinutes: 0,
      focusedSeconds: 0,
    },
  ]);

  {
    /* Data */
  }
  const storeData = async () => {
    try {
      const jsonObjects = JSON.stringify(globaltasks);
      const state = JSON.stringify(taskActive);
      const intMin = JSON.stringify(intMinutes);
      const intSec = JSON.stringify(intSeconds);
      const currentTaskJSON = JSON.stringify(task);
      //console.log("Stored Tasks: " + jsonObjects)
      await AsyncStorage.setItem("@tasklist", jsonObjects);
      await AsyncStorage.setItem("@state", state);
      await AsyncStorage.setItem("@intmin", intMin);
      await AsyncStorage.setItem("@intsec", intSec);
      await AsyncStorage.setItem("@currenttask", currentTaskJSON);
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    const tasksinfo = await AsyncStorage.getItem("@tasklist");
    const state = await AsyncStorage.getItem("@state");
    const intMin = await AsyncStorage.getItem("@intmin");
    const intSec = await AsyncStorage.getItem("@intsec");
    const currentJSON = await AsyncStorage.getItem("@currenttask");
    createTask(tasksinfo != null ? JSON.parse(tasksinfo) : globaltasks);
    setTaskActive(state != null ? (state == true ? true : false) : null);
    setIntSeconds(intSec != null ? JSON.parse(intSec) : null);
    setIntMinutes(intMin != null ? JSON.parse(intMin) : null);
    selectTask(currentJSON != null ? JSON.parse(currentJSON) : null);
    console.log("Current State: " + taskActive + ". Stored Point: " + state);
  };

  const [filteredTasks, setFilteredTasks] = useState([{}]);

  const deleteTask = (index) => {
    let taskListCopy = [...globaltasks];
    taskListCopy.splice(index, 1);
    createTask(taskListCopy);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setFilteredTasks(globaltasks);
  }, [deleteTask]);

  const addTask = () => {
    const task = {
      name: newTask,
      id: globaltasks.length,
      description: "",
      type: newType,
      focusedMinutes: 0,
      focusedSeconds: 0,
    };
    if (task.name == "" || task.name == null) {
      console.log("Can't Add Nothin'");
    } else {
      createTask([...globaltasks, task]);
      setTask("");
      setType("");
    }
  };

  const newTime = (index) => {
    let array = globaltasks;

    console.log(intMinutes, intSeconds);
    let tempsec = seconds - intSeconds;
    if (tempsec < 0) {
      tempsec = tempsec + 60;
    }
    if (tempsec > 60) {
      tempmin = tempmin + 1;
      tempsec = tempsec - 60;
    }
    let tempmin = minutes - intMinutes;
    console.log("Minutes To Go In: " + tempmin + ", Seconds: " + tempsec);
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === index) {
        array[i].focusedSeconds =
          array[i].focusedSeconds > 60
            ? array[i].focusedMinutes + 1 + array[i].focusedSeconds - 60
            : array[i].focusedSeconds + tempsec;
        array[i].focusedMinutes = array[i].focusedMinutes + tempmin;
        console.log(
          "Minutes Focused: " +
            array[i].focusedMinutes +
            ", Seconds Focused: " +
            array[i].focusedSeconds
        );
      }
    }
    console.log(array);
    createTask(array);
  };

  const selectTask = (task) => {
    console.log(task);
    selectedTask(task);
  };

  const changeTask = (task, index) => {
    if (taskActive == false) {
      setTask(task);
      setIntSeconds(seconds);
      setIntMinutes(minutes);
      console.log(
        "Initial Minutes: " + minutes + ", Initial Seconds: " + seconds
      );
      setTaskActive(true);
      storeData();
    } else {
      console.log("New Minutes: " + minutes + ", New Seconds: " + seconds);
      setTask(null);
      newTime(index);
      setTaskActive(false);
      storeData();
    }
  };

  return (
    <View>
      {taskActive == true ? (
        <View style={styles.focusContainer}>
          <View style={{ padding: 3, paddingHorizontal: 5, backgroundColor: '#777', borderRadius: 20}}>
            <Text style={{ fontSize: 20, fontFamily: "Nexa", color: '#FFF' }}>
              {"Focusing"}
            </Text>
          </View>
          <Text style={{ fontSize: 20, fontFamily: "Nexa", color: "#888" }}>
            {minutes + ":" + seconds}
          </Text>
          <Text style={{ fontSize: 20, fontFamily: "Nexa", color: "#888" }}>
            {(((minutes - intMinutes) * 60) + seconds) - intSeconds}s
          </Text>
          <Text style={{ fontSize: 20, fontFamily: "Nexa", color: "#888" }}>
            {intMinutes + ":" + intSeconds}
          </Text>
        </View>
      ) : null}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator="false"
        style={{ flexWrap: "wrap" }}
      >
        {filteredTasks.map((task, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                editType == 1
                  ? changeTask(task.name, index) + selectTask(task)
                  : deleteTask(index) + storeData();
              }}
            >
              <View style={styles.taskStyle}>
                <Text style={styles.taskText}>{task.name}</Text>
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <Icon
                    name="tag"
                    group="ui-interface"
                    width="15"
                    height="15"
                    style={{ alignSelf: "center", marginRight: 3 }}
                  />
                  <Text style={styles.tagText}>{task.type}</Text>
                  <Icon
                    name="wall-clock"
                    group="ui-interface"
                    width="15"
                    height="15"
                    style={{ alignSelf: "center", marginHorizontal: 3 }}
                  />
                  <Text style={styles.tagText}>
                    {task.focusedMinutes}:
                    {task.focusedSeconds < 10
                      ? "0" + task.focusedSeconds
                      : task.focusedSeconds}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          inputTask ? setInputTask(false) : setInputTask(true);
        }}
      >
        <View
          style={{
            backgroundColor: "#ddd",
            padding: 10,
            marginHorizontal: 30,
            marginTop: 3,
            borderRadius: 30,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Nexa",
            }}
          >
            {inputTask == false ? "Task Editor" : "Close Editor"}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          viewModal
            ? setViewModal(false)
            : task != "{}"
            ? console.log(task) + setViewModal(true)
            : null;
        }}
      >
        <View
          style={{
            backgroundColor: "#ddd",
            padding: 10,
            marginHorizontal: 30,
            marginTop: 3,
            borderRadius: 30,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Nexa",
            }}
          >
            View Details
          </Text>
        </View>
      </TouchableOpacity>
      {inputTask ? (
        <View style={styles.inputcontainer}>
          <TextInput
            style={styles.input}
            value={newTask}
            placeholder="Task Name..."
            onChangeText={(text) => {
              setCurrentTask(text) + text != ""
                ? setInputTask(true)
                : setInputTask(false);
            }}
          />
          <TextInput
            style={styles.input}
            value={newType}
            placeholder="Tag Name..."
            onChangeText={(text) => {
              setNewType(text);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              addTask();
            }}
          >
            <View
              style={{
                padding: 15,
                backgroundColor: "#A00",
                borderRadius: 30,
              }}
            >
              <Icon
                name="upload"
                group="ui-interface"
                color="#FFF"
                width="16"
                height="16"
              />
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
      <Modal transparent={true} visible={viewModal}>
        <View style={styles.viewcontainer}>
          <TouchableOpacity
            onPress={() => {
              setViewModal(false);
            }}
          >
            <View
              style={{
                padding: 10,
                paddingHorizontal: 50,
                backgroundColor: "#DDD",
                alignSelf: "center",
                justifyContent: "center",
                borderRadius: 30,
                marginTop: 20,
              }}
            ></View>
          </TouchableOpacity>

          <Text
            style={{
              fontFamily: "Nexa",
              fontSize: 26,
              textAlign: "center",
              marginTop: 10,
            }}
          >
            {task.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              padding: 10,
              backgroundColor: "#EEE",
              marginHorizontal: 2,
              borderRadius: 20,
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <View style={styles.modaltextcontainer}>
              <Text style={styles.modaltext}>Desc</Text>
            </View>
            <Text
              style={{
                fontFamily: "NexaLight",
                fontSize: 18,
                textAlign: "center",
              }}
            >
              {task.description}
            </Text>
          </View>
          <View
            style={{
              marginTop: 2,
              flexDirection: "row",
              padding: 10,
              backgroundColor: "#EEE",
              marginHorizontal: 2,
              borderRadius: 20,
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <View style={styles.modaltextcontainer}>
              <Text style={styles.modaltext}>Time Spent</Text>
            </View>
            <Text
              style={{
                fontFamily: "NexaLight",
                fontSize: 18,
                textAlign: "center",
              }}
            >
              {task.focusedMinutes}m {task.focusedSeconds}s
            </Text>
          </View>
          <View
            style={{
              marginTop: 2,
              flexDirection: "row",
              padding: 10,
              backgroundColor: "#EEE",
              marginHorizontal: 2,
              borderRadius: 20,
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <View style={[styles.modaltextcontainer, { paddingHorizontal: 6 }]}>
              <Text style={styles.modaltext}>Tag</Text>
            </View>
            <Text
              style={{
                fontFamily: "NexaLight",
                fontSize: 18,
                textAlign: "center",
              }}
            >
              {task.type}
            </Text>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => {
          editType == 1 ? setEditType(0) : setEditType(1);
        }}
      >
        <View
          style={{
            backgroundColor: editType == 1 ? "#ddd" : "#F00",
            padding: 10,
            marginHorizontal: 30,
            marginTop: 3,
            borderRadius: 30,
          }}
        >
          <Text
            style={{
              color: editType == 1 ? "#000" : "#FFF",
              textAlign: "center",
              fontFamily: "Nexa",
            }}
          >
            {editType == 1 ? "Upload Mode" : "Delete Mode"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  taskStyle: {
    padding: 10,
    backgroundColor: "#DDD",
    borderRadius: 10,
    margin: 3,
  },
  inputcontainer: {
    flexDirection: "row",
    marginHorizontal: 5,
    marginVertical: 3,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  input: {
    flex: 1,
    padding: 12,
    backgroundColor: "#EEE",
    borderRadius: 30,
    marginHorizontal: 5,
    fontFamily: "NexaLight",
  },
  taskText: {
    fontFamily: "Nexa",
  },
  tagText: {
    fontFamily: "NexaLight",
  },
  viewcontainer: {
    flex: 1,
    marginTop: 120,
    backgroundColor: "#FFF",
    borderRadius: 30,
  },
  modaltext: {
    fontFamily: "Nexa",
    fontSize: 16,
    textAlign: "center",
    color: "#FFF",
  },
  modaltextcontainer: {
    backgroundColor: "#0AA",
    padding: 2,
    borderRadius: 10,
    paddingHorizontal: 4,
    marginRight: 10,
  },
  focusContainer: {
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 4,
    borderRadius: 10,
    backgroundColor: "#DDD",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
