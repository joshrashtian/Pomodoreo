import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-ico";


export default function Home({ seconds }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pomodoreo Menu</Text>
      <View style={styles.menu}>
        <TouchableOpacity onPress={() => navigation.navigate("Stopwatch")}>
          <View style={styles.menubutton}>
            <Icon
              name="stopwatch"
              height="50"
              width="50"
              group="mingcute-tiny-bold-filled"
            />
            <Text
              style={{ fontWeight: "300", fontSize: 30, marginLeft: 14, marginTop: 4, color: '#555'}}
            >
              Stopwatch
            </Text>
            <Text>
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontWeight: "600",
    fontSize: 36,
    fontFamily: 'Nexa',
    marginLeft: 20,
    textAlign: 'center',
    color: "#444"
  },
  menubutton: {
    borderRadius: 30,
    marginHorizontal: 20,
    backgroundColor: "#EEE",
    padding: 20,
    paddingVertical: 50,
    flexDirection: "row",
  },
});
