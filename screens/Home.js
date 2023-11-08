import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, {useState, useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-ico";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const navigation = useNavigation();
  const [seconds, setSeconds] = useState(null);

  const getData = async () => {
    const counterinfo = await AsyncStorage.getItem('@time')
    setSeconds(counterinfo != null ? JSON.parse(counterinfo) : null);
  }

  useEffect(() => {
    getData()
  }, [seconds]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pomodoreo</Text>
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
              style={{ fontFamily: 'NexaLight',fontWeight: "300", fontSize: 30, marginLeft: 14, marginTop: 4, color: '#555'}}
            >
              Stopwatch
            </Text>
          </View>
          <View style={{ padding: 10, backgroundColor: '#DDD', borderRadius: 30}}>
            <Text style={{fontFamily: 'Nexa'}}>
            {seconds}
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
