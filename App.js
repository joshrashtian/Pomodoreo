import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';

export default function App() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [totalseconds, setTotalSeconds] = useState(0);

  useEffect(() => {
  let interval = setInterval(() => {
    setTotalSeconds(totalseconds + 1);
    if(seconds === 59){
      setMinutes(minutes + 1)
      setSeconds(0);
    } else {
      setSeconds(seconds + 1);
    }
    clearInterval(interval);
  }, 1000)
}, [seconds])

  const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
  const displaySeconds = seconds < 10 ? '0' + seconds : seconds;
 
  return (
    <View style={styles.container}>
      <Text>Stopwatch Function</Text>
      <Text style={styles.clock}>{displayMinutes}:{displaySeconds}</Text>
      <Text style={{ marginTop: 30}}>Total Seconds Passed: {totalseconds}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clock: {
    fontSize: 40,
    fontWeight: '700',
  }
});
