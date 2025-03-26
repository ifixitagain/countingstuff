import { useState } from "react";
import { View, TextInput, StyleSheet, Keyboard } from "react-native";

import { CountableButton } from "./CountableButton";
import { CommonStyles } from "../styles/CommonStyles";

export const AddRow = ({ addNewCountable }) => {
  const [name, setName] = useState("");

  return (
    <View style={CommonStyles.row}>
      <TextInput
        style={styles.input}
        placeholder="Enter name"
        onChangeText={setName}
        value={name}
      />
      <CountableButton
        label="Add"
        submit={() => {
          addNewCountable(name, setName);
          Keyboard.dismiss();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    fontSize: 16,
    marginRight: 10,
  },
});

