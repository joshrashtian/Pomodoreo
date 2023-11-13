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
  const [globaltype, setType] = useState("Work");
  const [editType, setEditType] = useState(1);
  const [inputTask, setInputTask] = useState(false);
  const [globaltasks, createTask] = useState([
    {
      id: 0,
      name: "Math Homework",
      type: "School",
    },
    {
      id: 1,
      name: "Feed Dog",
      type: "Leisure",
    },
    {
      id: 2,
      name: "Excel Spreadsheet",
      type: "Work",
    },
  ]);
  const [filteredTasks, setFilteredTasks] = useState([{}]);

  const deleteTask = (index) => {
    let taskListCopy = globaltasks;
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

  const changeTask = (task) => {
    setTask(task);
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
                  ? changeTask(task.name)
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
                  <Text style={styles.tagText}>{task.type}</Text>
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
