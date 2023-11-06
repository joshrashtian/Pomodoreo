import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native";

export default function Colorodo({ onSumbit }) {
  const [prevcolor, setprevcolor] = useState(null);
  const [currentcolor, setcurrentcolor] = useState(
    "rgb(" +
      Math.floor(Math.random() * 255) +
      "," +
      Math.floor(Math.random() * 255) +
      "," +
      Math.floor(Math.random() * 255) +
      ")"
  );
  const [upcomingcolor, setupcomingcolor] = useState(
    "rgb(" +
      Math.floor(Math.random() * 255) +
      "," +
      Math.floor(Math.random() * 255) +
      "," +
      Math.floor(Math.random() * 255) +
      ")"
  );

  const handleReturn = () => {
    onSumbit(currentcolor);
  };

  const nextColor = () => {
    setprevcolor(currentcolor);
    setcurrentcolor(upcomingcolor);
    setupcomingcolor(
      "rgb(" +
        Math.floor(Math.random() * 255) +
        "," +
        Math.floor(Math.random() * 255) +
        "," +
        Math.floor(Math.random() * 255) +
        ")"
    );
  };

  const lastcolor = () => {
    setupcomingcolor(currentcolor)
    setcurrentcolor(prevcolor);
    setprevcolor(null);
  }

  return (
    <View>
      <Text style={styles.title}>Colorodo</Text>
      <View style={{backgroundColor: '#ffffff'}}>
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
          style={{ marginHorizontal: 20, fontFamily: "Nexa", fontSize: 30, textAlign: 'center' }}
        >
          {currentcolor}
        </Text>
      </View>
      <View style={{backgroundColor: '#ffffff'}}>
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
      <View style={{ flexDirection: "row", justifyContent: 'space-evenly' }}>
        <TouchableOpacity onPress={nextColor}>
          <View style={styles.button}>
            <Text style={styles.buttontext}>Next Color</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={ prevcolor === null ? null : lastcolor}>
          <View style={ prevcolor === null ? [styles.button, {backgroundColor: '#DDD'}] : styles.button }>
            <Text style={styles.buttontext}>Previous Color</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleReturn}>
          <View style={styles.button}>
            <Text style={styles.buttontext}>Apply Color</Text>
          </View>
        </TouchableOpacity>
      </View>
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
    backgroundColor: '#eee',
    borderRadius: 30,
  },
  buttontext: {
    fontFamily: 'NexaLight',
    fontSize: 16,
  }
});
