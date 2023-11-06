import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { ScrollView, Modal } from "react-native";

export default function Colorodo({ onSumbit }) {
  const [rmax, setrmax] = useState(255);
  const [gmax, setgmax] = useState(255);
  const [bmax, setbmax] = useState(255);
  const [prevcolor, setprevcolor] = useState(null);
  const [currentcolor, setcurrentcolor] = useState(
    "rgb(" +
      Math.floor(Math.random() * rmax) +
      "," +
      Math.floor(Math.random() * gmax) +
      "," +
      Math.floor(Math.random() * bmax) +
      ")"
  );
  const [upcomingcolor, setupcomingcolor] = useState(
    "rgb(" +
      Math.floor(Math.random() * rmax) +
      "," +
      Math.floor(Math.random() * gmax) +
      "," +
      Math.floor(Math.random() * bmax) +
      ")"
  );
  const [nummodal, setnummodal] = useState(true);

  const handleReturn = () => {
    onSumbit(currentcolor);
  };

  const nextColor = () => {
    setprevcolor(currentcolor);
    setcurrentcolor(upcomingcolor);
    setupcomingcolor(
      "rgb(" +
        Math.floor(Math.random() * rmax) +
        "," +
        Math.floor(Math.random() * gmax) +
        "," +
        Math.floor(Math.random() * bmax) +
        ")"
    );
  };

  const handleColorChange = (color) => {
    setcurrentcolor("rgb(" + color + ")");
  };

  const lastcolor = () => {
    setupcomingcolor(currentcolor);
    setcurrentcolor(prevcolor);
    setprevcolor(null);
  };

  return (
    <View>
      <Text style={styles.title}>Colorodo</Text>
      <View style={{ backgroundColor: "#ffffff" }}>
        <View
          style={{
            marginHorizontal: 40,
            marginVertical: 0,
            borderRadius: 10,
            padding: 15,
            backgroundColor: prevcolor,
          }}
        />
      </View>
      <View
        style={{
          backgroundColor: "#EEE",
          marginHorizontal: 10,
          paddingVertical: 10,
          borderRadius: 40,
        }}
      >
        <View
          style={{
            marginHorizontal: 20,
            borderRadius: 10,
            padding: 30,
            backgroundColor: currentcolor,
          }}
        />
        <Text
          style={{
            marginHorizontal: 20,
            fontFamily: "Nexa",
            fontSize: 30,
            textAlign: "center",
          }}
        >
          {currentcolor === "rgb()"
            ? "Invalid Color"
            : currentcolor === "rgb( )"
            ? "Invalid Color"
            : currentcolor}
        </Text>
      </View>
      <View style={{ backgroundColor: "#ffffff" }}>
        <View
          style={{
            marginHorizontal: 40,
            marginVertical: 10,
            borderRadius: 10,
            padding: 15,
            backgroundColor: upcomingcolor,
          }}
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <TouchableOpacity onPress={nextColor}>
          <View style={styles.button}>
            <Text style={styles.buttontext}>Next Color</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={
            prevcolor === null ? null : prevcolor === "rgb()" ? null : lastcolor
          }
        >
          <View
            style={
              prevcolor === null
                ? [styles.button, { backgroundColor: "#DDD" }]
                : styles.button
            }
          >
            <Text style={styles.buttontext}>Previous Color</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleReturn}>
          <View style={styles.button}>
            <Text style={styles.buttontext}>Apply Color</Text>
          </View>
        </TouchableOpacity>
      </View>
      {nummodal == true ? (
        <View style={styles.modal}>
          <Text style={{ fontFamily: "NexaLight", marginBottom: 3 }}>
            "Colorado Customs"
          </Text>
          <View style={styles.inputcontainer}>
            <Text style={[styles.buttontext, {marginRight: 10}]}>
              Your Color: 
            </Text>
            <TextInput
              style={styles.textinput}
              placeholder={"255, 255, 255"}
              onChangeText={(text) => handleColorChange(text)}
            />
          </View>
          <View style={styles.inputcontainer}>
            <Text style={[styles.buttontext, {marginRight: 10}]}>
              Narrow Max Value: 
            </Text>
            <TextInput
              style={styles.textinput}
              placeholder={"255"}
              onChangeText={(text) => setrmax(text)}
            />
            <TextInput
              style={styles.textinput}
              placeholder={"255"}
              onChangeText={(text) => setgmax(text)}
            />
            <TextInput
              style={styles.textinput}
              placeholder={"255"}
              onChangeText={(text) => setbmax(text)}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              setnummodal(false);
            }}
          >
            <View style={[styles.button, {padding: 5, marginTop: 5}]}>
              <Text style={[styles.buttontext,
                { fontFamily: "Nexa", textAlign: "center" },
              ]}>Minimize</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => {
            setnummodal(true);
          }}
        >
          <View
            style={[
              styles.button,
              { marginHorizontal: 10, backgroundColor: "#070", marginTop: 10 },
            ]}
          >
            <Text
              style={[
                styles.buttontext,
                { color: "#FFF", fontFamily: "Nexa", textAlign: "center" },
              ]}
            >
              Feeling creative?
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "Nexa",
    textAlign: "center",
    marginTop: 20,
    fontSize: 35,
  },
  button: {
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 30,
  },
  buttontext: {
    fontFamily: "NexaLight",
    fontSize: 16,
  },
  modal: {
    padding: 10,
    backgroundColor: "#DDD",
    margin: 10,
    borderRadius: 20,
  },
  textinput: {
    backgroundColor: "#EEE",
    padding: 0,
    borderRadius: 30,
    fontFamily: 'NexaLight',
    paddingHorizontal: 10,
    marginRight: 5
  },
  inputcontainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 5,
  }
});
