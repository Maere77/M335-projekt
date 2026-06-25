import {StyleSheet, Text, View} from 'react-native';
import {useState} from 'react';

export default function StartScreen() {
  const [steps, setSteps] = useState(0);
  const [height, setHeight] = useState(0);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>START</Text>
      <Text>{steps}</Text>
      <Text>{height}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    letterSpacing: 2,
  },
});
