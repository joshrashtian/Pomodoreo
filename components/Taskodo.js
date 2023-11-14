import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Touchable,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-ico";

const types = ["Work", "School", "Leisure"];

export default function Taskodo({ setTask, minutes, seconds }) {
  const [newTask, setCurrentTask] = useState();
  const [newType, setNewType] = useState();
  const [taskActive, setTaskActive] = useState(false)
  
  const [intSeconds, setIntSeconds] = useState(seconds)
  const [intMinutes, setIntMinutes] = useState(minutes)
  const [newSeconds, setNewSeconds] = useState(seconds)
  const [newMinutes, setNewMinutes] = useState(minutes)


  const [globaltype, setType] = useState("Work");
  const [editType, setEditType] = useState(1);
  const [inputTask, setInputTask] = useState(false);
  const [globaltasks, createTask] = useState([
    {
      id: 0,
      name: "Math Homework",
      type: "School",
      focusedMinutes: 0,
      focusedSeconds: 0,
    },
    {
      id: 1,
      name: "Feed Dog",
      type: "Leisure",
      focusedMinutes: 0,
      focusedSeconds: 0,
    },
    {
      id: 2,
      name: "Excel Spreadsheet",
      type: "Work",
      focusedMinutes: 0,
      focusedSeconds: 0,
    },
  ]);
  const [filteredTasks, setFilteredTasks] = useState([{}]);

  const deleteTask = (index) => {
    let taskListCopy = [...globaltasks];
    taskListCopy.splice(index, 1);
    createTask(taskListCopy);
  };

  useEffect(() => {
    setFilteredTasks(globaltasks);
  }, [deleteTask]);

  const addTask = () => {
    const task = {
      name: newTask,
      id: globaltasks.length + 1,
      type: newType,
    };
    if (task.name == "" || task.name == null) {
      console.log("Can't Add Nothin'");
    } else {
      createTask([...globaltasks, task]);
      setTask("")
      setType("")
    }
  };

  const newTime = (index) => {
    console.log(intMinutes, intSeconds)
    let tempsec = seconds - intSeconds
    if(tempsec < 0){
      tempsec = tempsec + 60;
    }
    let tempmin = minutes - intMinutes
    let array = [...globaltasks];
    for (let i = 0; i < array.length; i++) {
      if(array[i].id == index){ 
      array[i].focusedSeconds = tempsec;
      array[i].focusedMinutes = tempmin;
      console.log("Minutes Focused: " + array[i].focusedMinutes + ", Seconds Focused: " + array[i].focusedSeconds)
      }
    }
    createTask(array);
  }
  const changeTask = (task, index) => {
    console.log(taskActive)
    if(taskActive == false){
    setTask(task);
    setIntSeconds(seconds);
    setIntMinutes(minutes);
    console.log("Initial Minutes: " + minutes + ", Initial Seconds: " + seconds )
    setTaskActive(true);
    } else {
    console.log("New Minutes: " + minutes + ", New Seconds: " + seconds )
    setTask(null);
    newTime(index)
    setTaskActive(false);
    }
  };

  return (
    <View>
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator="false">
        {filteredTasks.map((task, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                editType == 1
                  ? changeTask(task.name, index)
                  : deleteTask(index) + console.log(index);
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
                    style={{ alignSelf: "center" }}
                  />
                  <Text style={styles.tagText}>{task.type} - {task.focusedMinutes}:{task.focusedSeconds}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      {inputTask ? 
      <View style={styles.inputcontainer}>
        <TextInput
          style={styles.input}
          value={newTask}
          placeholder="Task Name..."
          onChangeText={(text) => {
            setCurrentTask(text) + text != "" ? setInputTask(true) : setInputTask(false);
          }}
        />
        <TextInput
          style={styles.input}
          value={newType}
          placeholder="Tag Name..."
          onChangeText={(text) => {
            setNewType(text)
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
    : null}
    <TouchableOpacity
          onPress={() => {
            inputTask ? setInputTask(false) : setInputTask(true)
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
            <Text style={{
              color: editType == 1 ? "#000" : "#FFF",
              textAlign: 'center',
              fontFamily: 'Nexa'
            }}>{inputTask == false ? "Task Editor" : "Close Editor"}</Text>
          </View>
        </TouchableOpacity>
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
            <Text style={{
              color: editType == 1 ? "#000" : "#FFF",
              textAlign: 'center',
              fontFamily: 'Nexa'
            }}>{editType == 1 ? "Upload Mode" : "Delete Mode"}</Text>
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
  },
  input: {
    flex: 1,
    padding: 12,
    backgroundColor: "#DDD",
    borderRadius: 30,
    marginHorizontal: 5,
    fontFamily: 'NexaLight'
  },
  taskText: {
    fontFamily: "Nexa",
  },
  tagText: {
    fontFamily: "NexaLight",
  },
});
