import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Text,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import { AddRow } from "./components/AddRow";
import { CountableRow } from "./components/CountableRow";
import { loadCountables, saveCountables } from "./storage/CountableStorage";

export default function App() {
  const [countables, setCountables] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadCountables().then((result) => {
      setCountables(result);
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveCountables(countables);
    }
  }, [countables, isLoaded]);

  const changeCount = (amount, index) => {
    const newState = [...countables];
    newState[index].count += amount;

    newState.sort((a, b) => b.count - a.count);

    setCountables(newState);
  };

  const addNewCountable = (name, setName) => {
    if (!name.trim()) {
      Alert.alert("Enter a name!");
      return;
    }

    if (countables.some((countable) => countable.name === name)) {
      Alert.alert("Error", "This name already exists!");
      return;
    }

    const newState = [...countables, { name, count: 0 }];

    newState.sort((a, b) => b.count - a.count);

    setCountables(newState);
    setName("");
  };

  const removeCountable = (index) => {
    const newState = [...countables];
    newState.splice(index, 1);
    setCountables(newState);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "undefined"}
          style={styles.container}
        >
          <ScrollView>
            {countables.length > 0 ? (
            countables.map((countable, index) => (
              <CountableRow
                countable={countable}
                key={countable.name}
                changeCount={changeCount}
                index={index}
                removeCountable={removeCountable}
              />
            ))
            ) : (
              <Text style={styles.emptyMessage}>The list is empty!</Text>
            )}
          </ScrollView>
          <AddRow addNewCountable={addNewCountable} />
        </KeyboardAvoidingView>
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  emptyMessage: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
    color: "gray",
  },
});
